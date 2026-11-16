
import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getWebsiteStock(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    return {};
  }

  const uniqueSlugs = [
    ...new Set(
      slugs.filter(
        (slug) =>
          typeof slug === "string" &&
          /^[A-Za-z0-9_-]+$/.test(slug)
      )
    ),
  ];

  if (uniqueSlugs.length === 0) {
    return {};
  }

  const supabase = await createClient();

  const stockMap = {};

  // Bounded batches for larger catalogues.
  const BATCH_SIZE = 100;

  for (let i = 0; i < uniqueSlugs.length; i += BATCH_SIZE) {
    const batch = uniqueSlugs.slice(i, i + BATCH_SIZE);

    const { data, error } = await supabase
      .from("books")
      .select("slug, stock, price")
      .in("slug", batch);

    if (error) {
      console.error("Website stock lookup failed:", error.code);
      throw new Error("Unable to retrieve current publication stock.");
    }

    for (const book of data ?? []) {
      stockMap[book.slug] =
        Number(book.price) > 0
          ? Math.max(0, Number(book.stock) || 0)
          : 0;
    }
  }

  return stockMap;
}
