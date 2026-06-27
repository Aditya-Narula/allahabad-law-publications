import BookCard from "@/app/components/BookCard";
import Link from "next/link";
import { books } from "@/app/data/books";

export default async function LetterPage({ params }) {
  const { letter } = await params;

  const filteredBooks = Object.entries(books).filter(
    ([, book]) =>
      book.category === "Bare Acts" &&
      book.letter.toLowerCase() === letter.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          {letter.toUpperCase()}
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Bare Acts Beginning With "{letter.toUpperCase()}"
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {filteredBooks.map(([slug, book]) => (
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