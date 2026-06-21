import Link from "next/link";
import { books } from "@/app/data/books";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BareActsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          Bare Acts
        </h1>

        <p className="text-center text-gray-600 mb-12">
  Browse {Object.values(books).filter(
    (book) => book.category === "Bare Acts"
  ).length} Bare Acts Alphabetically
</p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {letters.map((letter) => {

  const count = Object.values(books).filter(
    (book) =>
      book.category === "Bare Acts" &&
      book.letter === letter
  ).length;

  const sampleBooks = Object.values(books)
    .filter(
      (book) =>
        book.category === "Bare Acts" &&
        book.letter === letter
    )
    .slice(0, 3);

  if (count === 0) return null;

  return (
            <Link
  key={letter}
  href={`/categories/bare-acts/${letter.toLowerCase()}`}
  className="bg-white shadow-md rounded-xl p-8 text-center hover:shadow-lg transition"
>

  <h2 className="text-5xl font-bold mb-3">
  {letter}
</h2>

<p className="text-gray-600 mb-4">
  {count} Books
</p>

<div className="text-sm text-gray-500 space-y-1">

  {sampleBooks.map((book, index) => (

    <p
  key={index}
  className="text-left text-sm leading-5"
>
  • {book.englishTitle}
</p>

  ))}

</div>

</Link>

          );
})}
        </div>

      </div>
    </main>
  );
}