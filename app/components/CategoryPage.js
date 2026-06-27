import Link from "next/link";
import BookCard from "@/app/components/BookCard";
import { books } from "@/app/data/books";

export default function CategoryPage({
  title,
  filterFn,
}) {

  const categoryBooks = Object.entries(books).filter(
    ([, book]) => filterFn(book)
  );

  const sortedBooks = [...categoryBooks].sort((a, b) =>
  a[1].englishTitle.localeCompare(b[1].englishTitle)
);

  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          {title}
        </h1>

        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
  Browse our collection of {categoryBooks.length} carefully curated
  legal publications in this category.
</p>

<div className="flex flex-col md:flex-row justify-between items-center mb-8">

  <p className="text-gray-600">
    Showing {categoryBooks.length} Publications
  </p>

  <Link
    href="/publications"
    className="text-amber-700 font-semibold hover:underline"
  >
    ← Back to Publications
  </Link>

</div>

        <div className="grid md:grid-cols-3 gap-8">

  {sortedBooks.map(([slug, book]) => (

    <BookCard
      key={slug}
      slug={slug}
      book={book}
    />

  ))}

</div>

      </div>

    </main>
  );
}