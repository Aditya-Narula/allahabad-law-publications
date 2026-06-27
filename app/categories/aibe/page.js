import CategoryPage from "@/app/components/CategoryPage";

export default function AIBEPage() {
  return (
    <CategoryPage
      title="AIBE"
      filterFn={(book) =>
        book.category === "AIBE"
      }
    />
  );
}