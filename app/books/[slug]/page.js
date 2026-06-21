import { books } from "@/app/data/books";
import Image from "next/image";
import Link from "next/link";

export default async function BookPage({ params }) {
  const { slug } = await params;

  const book = books[slug];
  const relatedBooks = Object.entries(books)
  .filter(
    ([key, relatedBook]) =>
      key !== slug &&
      relatedBook.category === book.category
  )
  .slice(0, 3);

  if (!book) {
    return <h1>Book Not Found</h1>;
  }

  return (
  <main className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-6xl mx-auto px-6">

      <div className="bg-white rounded-2xl shadow-md p-8">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Cover Section */}
          <div>

            <div className="bg-gray-100 border rounded-xl h-[500px] flex items-center justify-center">

              <Image
  src={book.cover || "/covers/placeholder-book.jpg"}
  alt={book.englishTitle}
  width={350}
  height={500}
  className="object-contain max-h-full"
/>
            </div>

          </div>

          {/* Details Section */}
          <div>

            <h1 className="text-4xl font-bold mb-3">
              {book.englishTitle}
            </h1>

            <h2 className="text-2xl text-amber-700 mb-6">
              {book.hindiTitle}
            </h2>

            <div className="bg-gray-50 border rounded-xl p-5">

  <h3 className="text-xl font-bold mb-4">
    Book Information
  </h3>

  <div className="space-y-3">

    <p>
      <strong>Author:</strong> {book.author}
    </p>

    <p>
      <strong>Edition:</strong> {book.edition}
    </p>

    <p>
      <strong>Pages:</strong> {book.pages}
    </p>

    <p>
      <strong>Language:</strong> {book.language}
    </p>

    <p>
      <strong>Subject:</strong> {book.subject}
    </p>

    <p>
      <strong>Binding:</strong> {book.binding}
    </p>

    <p>
      <strong>Publication Year:</strong> {book.publicationYear}
    </p>

    <p>
      <strong>Category:</strong> {book.category}
    </p>

  </div>

</div>

            <hr className="my-6" />

            <p className="text-xl text-gray-600">
              MRP: ₹{book.mrp}
            </p>

            <p className="text-4xl font-bold text-amber-700 my-3">
              ₹{book.salePrice}
            </p>

            <p className="text-green-600 font-semibold text-lg">
              In Stock ({book.stock} Available)
            </p>

            <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg">
              Contact for Purchase
            </button>

          </div>

              </div>

      <hr className="my-10" />

      <div>

        <h2 className="text-3xl font-bold mb-4">
          Description
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          {book.description}
        </p>

      </div>

      <hr className="my-10" />

<div>

  <h2 className="text-3xl font-bold mb-6">
    Related Books
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {relatedBooks.map(([relatedSlug, relatedBook]) => (

      <div
        key={relatedSlug}
        className="border rounded-xl p-4 bg-gray-50"
      >

        <div className="h-40 bg-gray-100 rounded-lg overflow-hidden border mb-4">

  <Image
    src={relatedBook.cover || "/covers/placeholder-book.jpg"}
    alt={relatedBook.englishTitle}
    width={160}
    height={224}
    className="w-full h-full object-cover"
  />

</div>

        <h3 className="font-bold mb-2">
          {relatedBook.englishTitle}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {relatedBook.hindiTitle}
        </p>

        <p className="text-amber-700 font-bold mb-3">
          ₹{relatedBook.salePrice}
        </p>

        <Link
          href={`/books/${relatedSlug}`}
          className="block text-center bg-black text-white py-2 rounded-lg"
        >
          View Details
        </Link>

      </div>

    ))}

  </div>

</div>

    </div>

  </div>
</main>
);
}