import CategoryPage from "@/app/components/CategoryPage";

export default function CommentariesPage() {
  return (
    <CategoryPage
      title="Commentaries"
      filterFn={(book) =>
        book.category === "Commentaries"
      }
    />
  );
}