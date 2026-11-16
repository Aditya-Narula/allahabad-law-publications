
import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSessionClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 16384;
const MAX_BOOKS = 50;
const MAX_QUANTITY = 99;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function reply(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request) {
  // Safety lock: real orders must remain disabled.
  if (process.env.ALP_ENABLE_ORDER_CREATION !== "true") {
    return reply(
      { error: "Order placement is not yet enabled." },
      503
    );
  }

  // Reject requests from an unexpected browser origin.
  const origin = request.headers.get("origin");

  if (!origin || origin !== request.nextUrl.origin) {
    return reply({ error: "Invalid request origin." }, 403);
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return reply({ error: "JSON request required." }, 415);
  }

  // Authenticate using the customer's existing session.
  const sessionClient = await createSessionClient();

  const {
    data: { user },
    error: authError,
  } = await sessionClient.auth.getUser();

  if (authError || !user || !user.email_confirmed_at) {
    return reply(
      { error: "Verified customer login required." },
      401
    );
  }


  // Reject oversized requests before loading them into memory.
  const declaredLength = request.headers.get("content-length");

  if (
    declaredLength !== null &&
    Number.isFinite(Number(declaredLength)) &&
    Number(declaredLength) > MAX_REQUEST_BYTES
  ) {
    return reply({ error: "Request too large." }, 413);
  }

  let body;
  const reader = request.body?.getReader();

  if (!reader) {
    return reply({ error: "Request body is required." }, 400);
  }

  const chunks = [];
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      receivedBytes += value.byteLength;

      if (receivedBytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return reply({ error: "Request too large." }, 413);
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(receivedBytes);
    let offset = 0;

    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const raw = new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);

    body = JSON.parse(raw);
  } catch {
    return reply({ error: "Invalid request body." }, 400);
  } finally {
    reader.releaseLock();
  }


  const { addressId, requestId, items } = body ?? {};

  if (
    typeof addressId !== "string" ||
    !UUID_PATTERN.test(addressId) ||
    typeof requestId !== "string" ||
    !UUID_PATTERN.test(requestId)
  ) {
    return reply(
      { error: "Invalid checkout identifiers." },
      400
    );
  }

  if (
    !Array.isArray(items) ||
    items.length < 1 ||
    items.length > MAX_BOOKS
  ) {
    return reply(
      { error: "Cart must contain 1 to 50 publications." },
      400
    );
  }

  const seen = new Set();

  for (const item of items) {
    if (
      !item ||
      typeof item.slug !== "string" ||
      !/^[A-Za-z0-9_-]{1,200}$/.test(item.slug) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_QUANTITY ||
      seen.has(item.slug)
    ) {
      return reply(
        { error: "Invalid or duplicate cart item." },
        400
      );
    }

    seen.add(item.slug);
  }

  // Confirm the selected address belongs to this customer.
  const { data: address, error: addressError } =
    await sessionClient
      .from("customer_addresses")
      .select("id")
      .eq("id", addressId)
      .eq("user_id", user.id)
      .maybeSingle();

  if (addressError) {
    return reply(
      { error: "Unable to verify delivery address." },
      503
    );
  }

  if (!address) {
    return reply(
      { error: "Invalid delivery address." },
      400
    );
  }

  // Privileged credentials must exist only on the server.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Checkout backend is not configured.");
    return reply(
      { error: "Order service unavailable." },
      503
    );
  }

  const admin = createSupabaseClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  // The database recomputes prices and reserves stock.
  // Never trust totals supplied by the browser.
  const { data: orderId, error: checkoutError } =
    await admin.rpc(
      "alp_create_pending_checkout_gateway",
      {
        p_user_id: user.id,
        p_address_id: addressId,
        p_request_id: requestId,
        p_items: items,
      }
    );

  if (checkoutError) {
    console.error(
      "Checkout transaction failed:",
      checkoutError.code
    );

    return reply(
      {
        error:
          "Unable to create this order. Please review your cart.",
      },
      409
    );
  }

  return reply(
    {
      orderId,
      status: "pending",
      message: "Pending order created.",
    },
    201
  );
}
