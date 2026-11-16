
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BOOKS = 50;
const MAX_QUANTITY = 99;

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email_confirmed_at) {
    return jsonResponse(
      { error: "Please sign in with a verified account." },
      401
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const items = body?.items;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > MAX_BOOKS
  ) {
    return jsonResponse(
      { error: "Cart must contain 1 to 50 publications." },
      400
    );
  }

  const quantities = new Map();

  for (const item of items) {
    if (
      !item ||
      typeof item.slug !== "string" ||
      !/^[A-Za-z0-9_-]{1,200}$/.test(item.slug) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_QUANTITY ||
      quantities.has(item.slug)
    ) {
      return jsonResponse(
        { error: "Invalid or duplicate cart item." },
        400
      );
    }

    quantities.set(item.slug, item.quantity);
  }

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("slug, title, price, stock")
    .in("slug", [...quantities.keys()]);

  if (booksError) {
    console.error("Checkout review database error:", booksError.code);

    return jsonResponse(
      { error: "Unable to verify your cart right now." },
      503
    );
  }

  const bookMap = new Map(
    (books ?? []).map((book) => [book.slug, book])
  );

  let subtotalPaise = 0;
  const reviewedItems = [];

  for (const [slug, quantity] of quantities) {
    const book = bookMap.get(slug);

    if (!book) {
      return jsonResponse(
        { error: "A publication is unavailable. Please review your cart." },
        409
      );
    }

    const price = Number(book.price);
    const stock = Number(book.stock);
    const pricePaise = Math.round(price * 100);

    if (
      !Number.isFinite(price) ||
      !Number.isSafeInteger(pricePaise) ||
      pricePaise <= 0 ||
      !Number.isInteger(stock) ||
      stock < quantity
    ) {
      return jsonResponse(
        {
          error:
            `${book.title} is unavailable or has insufficient stock.`,
        },
        409
      );
    }

    const lineTotalPaise = pricePaise * quantity;

    if (!Number.isSafeInteger(lineTotalPaise)) {
      return jsonResponse(
        { error: "Invalid order amount." },
        400
      );
    }

    subtotalPaise += lineTotalPaise;

    if (!Number.isSafeInteger(subtotalPaise)) {
      return jsonResponse(
        { error: "Invalid order total." },
        400
      );
    }

    reviewedItems.push({
      slug,
      title: book.title,
      quantity,
      price: pricePaise / 100,
      lineTotal: lineTotalPaise / 100,
    });
  }

  const shippingPaise = subtotalPaise < 50000 ? 6000 : 0;

  return jsonResponse({
    items: reviewedItems,
    subtotal: subtotalPaise / 100,
    shipping: shippingPaise / 100,
    total: (subtotalPaise + shippingPaise) / 100,
    currency: "INR",
    note: "Estimate verified against current catalogue prices.",
  });
}
