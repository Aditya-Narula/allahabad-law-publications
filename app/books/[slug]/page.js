import { books } from "@/app/data/books";

export default async function BookPage({ params }) {
  const { slug } = await params;

  const book = books[slug];

  if (!book) {
    return <h1>Book Not Found</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="font-bold">Book Cover</p>
              <p className="text-gray-600">
                Image Coming Soon
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">
              {book.englishTitle}
            </h1>

            <h2 className="text-2xl text-gray-600 mb-6">
              {book.hindiTitle}
            </h2>

            <p>
              <strong>Author / लेखक:</strong> R.K. Narula
            </p>

            <p>
              <strong>Edition / संस्करण:</strong> 2026 Edition
            </p>

            <p>
              <strong>Pages / पृष्ठ:</strong> 100
            </p>

            <p>
              <strong>Language / भाषा:</strong> English & Hindi
            </p>

            <p>
              <strong>MRP:</strong> ₹{book.mrp}
            </p>

            <p className="font-bold text-orange-700">
              Sale Price / विक्रय मूल्य:
              ₹{book.salePrice}
            </p>

            <p className="text-green-600 font-semibold">
              In Stock (10 Available)
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}