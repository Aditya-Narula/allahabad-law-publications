import CategoryPage from "@/app/components/CategoryPage";

export default function StateLawsPage() {
  return (
    <CategoryPage
      title="State Laws"
      filterFn={(book) =>
        book.category === "State Laws"
      }
    />
  );
}