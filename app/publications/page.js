
import PublicationsClient from "./PublicationsClient";
import { getCatalogWithStock } from "@/lib/inventory/getCatalogWithStock";

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const books = await getCatalogWithStock();

  return <PublicationsClient books={books} />;
}
