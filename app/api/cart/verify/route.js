import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const response = (body, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

// Read-only public allocation and selling-price validation.
// Private physical inventory is never queried or returned.
export async function POST(request) {
  const size = Number(request.headers.get("content-length") || 0);
  if (size > 8192) {
    return response({ error: "Cart verification request is too large." }, 413);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return response({ error: "Invalid verification request." }, 400);
  }

  const slugs = payload?.slugs;
  if (
    !Array.isArray(slugs) ||
    slugs.length > 50 ||
    slugs.some((slug) =>
      typeof slug !== "string" ||
      !/^[A-Za-z0-9_-]{1,200}$/.test(slug)
    ) ||
    new Set(slugs).size !== slugs.length
  ) {
    return response({ error: "Invalid cart publications." }, 400);
  }

  if (slugs.length === 0) {
    return response({ books: [] });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("slug, price, stock")
    .in("slug", slugs);

  if (error) {
    console.error("Cart verification failed:", error.code);
    return response({ error: "Could not verify the cart right now." }, 503);
  }

  return response({
    books: (data || []).map((book) => ({
      slug: book.slug,
      price: Number(book.price),
      stock: Number(book.stock),
    })),
  });
}
