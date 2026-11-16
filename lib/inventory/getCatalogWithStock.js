
import "server-only";

import { books } from "@/app/data/books";
import { getWebsiteStock } from "./getWebsiteStock";

export async function getCatalogWithStock() {
  const entries = Object.entries(books);

  const slugs = entries
    .filter(([, book]) => {
      return (
        book.unavailable !== true &&
        Number(book.salePrice) > 0
      );
    })
    .map(([slug]) => slug);

  const stockMap = await getWebsiteStock(slugs);

  return Object.fromEntries(
    entries.map(([slug, book]) => {
      const stock = stockMap[slug] ?? 0;

      return [
        slug,
        {
          ...book,
          stock,
          unavailable:
            book.unavailable === true ||
            Number(book.salePrice) <= 0 ||
            stock <= 0,
        },
      ];
    })
  );
}
