import CategoryPage from "@/app/components/CategoryPage";

export default function LabourLawsPage() {
  return (
    <CategoryPage
      title="Labour Laws"
      filterFn={(book) =>
        book.category === "Labour Laws"
      }
    />
  );
}