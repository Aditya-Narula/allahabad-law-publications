import CategoryPage from "@/app/components/CategoryPage";

export default function LLBTextbooksPage() {
  return (
    <CategoryPage
      title="LL.B. Textbooks"
      filterFn={(book) =>
        book.category === "LL.B. Textbooks"
      }
    />
  );
}