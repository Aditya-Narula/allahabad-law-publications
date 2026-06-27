import CategoryPage from "@/app/components/CategoryPage";

export default function NewArrivalsPage() {
  return (
    <CategoryPage
      title="New Arrivals"
      filterFn={(book) =>
        book.newArrival === true
      }
    />
  );
}