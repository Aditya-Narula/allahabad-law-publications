import CategoryPage from "@/app/components/CategoryPage";

export default function CompetitiveExamBooksPage() {
  return (
    <CategoryPage
      title="Books for Competitive Exams"
      filterFn={(book) =>
        book.category === "Books for Competitive Exams"
      }
    />
  );
}