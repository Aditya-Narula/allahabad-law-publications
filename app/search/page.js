
import SearchClient from "./SearchClient";
import { getCatalogWithStock } from "@/lib/inventory/getCatalogWithStock";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const books = await getCatalogWithStock();

  return <SearchClient books={books} />;
}
