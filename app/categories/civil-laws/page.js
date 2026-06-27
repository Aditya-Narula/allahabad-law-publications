import CategoryPage from "@/app/components/CategoryPage";

export default function CivilLawsPage() {
  return (
    <CategoryPage
      title="Civil Laws"
      filterFn={(book) =>
        book.category === "Civil Laws"
      }
    />
  );
}