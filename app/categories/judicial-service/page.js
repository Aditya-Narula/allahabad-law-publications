import CategoryPage from "@/app/components/CategoryPage";

export default function JudicialServicePage() {
  return (
    <CategoryPage
      title="Judicial Service"
      filterFn={(book) =>
        book.category === "Judicial Service"
      }
    />
  );
}