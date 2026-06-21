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

            <div
              key={slug}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              <div className="h-64 bg-gray-200 flex items-center justify-center">

                <div className="text-center">

                  <p className="font-semibold">
                    Book Cover
                  </p>

                  <p className="text-sm text-gray-500">
                    Image Coming Soon
                  </p>

                </div>

              </div>

              <div className="p-5">

                <h2 className="font-bold text-lg">
                  {book.englishTitle}
                </h2>

                <p className="text-gray-600 mb-4">
                  {book.hindiTitle}
                </p>

                <p>
                  <strong>MRP:</strong> ₹{book.mrp}
                </p>

                <p>
                  <strong>Sale Price:</strong> ₹{book.salePrice}
                </p>

                <Link
                  href={`/books/${slug}`}
                  className="block mt-4 text-center bg-black text-white py-2 rounded-lg"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}