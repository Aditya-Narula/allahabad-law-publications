import Link from "next/link";
import { books } from "@/app/data/books";

export default function BareActsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          Bare Acts
        </h1>

        <p className="text-center text-gray-600 mb-12">
          बेयर एक्ट्स
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(books).map(([slug, book]) => (
            <div
              key={slug}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-semibold">Book Cover</p>
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
                  <strong>Author / लेखक:</strong> {book.author}
                </p>

                <p>
                  <strong>Edition / संस्करण:</strong> {book.edition}
                </p>

                <p>
                  <strong>MRP:</strong> ₹{book.mrp}
                </p>

                <p>
                  <strong>Sale Price:</strong> ₹{book.salePrice}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  In Stock ({book.stock} Available)
                </p>

                <Link
                  href={`/books/${slug}`}
                  className="block mt-4 text-center bg-black text-white py-2 rounded-lg"
                >
                  View Details / विवरण देखें
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}