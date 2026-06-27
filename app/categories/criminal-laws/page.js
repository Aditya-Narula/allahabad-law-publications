import CategoryPage from "@/app/components/CategoryPage";

export default function CriminalLawsPage() {
  return (
    <CategoryPage
      title="Criminal Laws"
      filterFn={(book) =>
        book.category === "Criminal Laws"
      }
    />
  );
}