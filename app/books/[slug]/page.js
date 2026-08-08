import { books } from "@/app/data/books";
import Image from "next/image";
import Link from "next/link";
import RelatedBookCard from "@/app/components/RelatedBookCard";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = books[slug];

  if (!book) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Book Not Found
          </h1>

          <Link
            href="/publications"
            className="inline-block mt-8 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white"
          >
            Browse Publications
          </Link>
        </div>
      </main>
    );
  }

  const discount = book.discountPercent || 0;
  const savings = book.mrp - book.salePrice;

  const relatedBooks = Object.entries(books)
    .filter(
      ([key, relatedBook]) =>
        key !== slug && relatedBook.category === book.category
    )
    .slice(0, 3);

  const categorySlug = book.category
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/&/g, "")
    .replace(/\s+/g, "-");

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 text-sm text-gray-600 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-amber-700">
            Home
          </Link>

          <span>›</span>

          <Link href="/publications" className="hover:text-amber-700">
            Publications
          </Link>

          <span>›</span>

          <Link
            href={`/categories/${categorySlug}`}
            className="hover:text-amber-700"
          >
            {book.category}
          </Link>

          <span>›</span>

          <span className="font-semibold text-gray-900">
            {book.englishTitle}
          </span>
        </div>

        <Link
          href="/publications"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 transition"
        >
          ← Back to Publications
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="bg-white border rounded-2xl shadow-sm h-[500px] md:h-[560px] flex items-center justify-center p-8">
                <Image
                  src={book.cover || "/covers/alp-placeholder.jpg"}
                  alt={book.englishTitle}
                  width={350}
                  height={500}
                  className="object-contain max-h-full hover:scale-105 transition duration-300"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {book.category}
                </span>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {book.language}
                </span>

                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {book.binding}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
  {book.englishTitle}
</h1>

{book.englishSubtitle && (
  <p className="text-lg md:text-xl font-semibold leading-8 text-gray-700 mb-3">
    {book.englishSubtitle}
  </p>
)}

<h2 className="text-xl md:text-2xl text-amber-700 mb-3">
  {book.hindiTitle}
</h2>

{book.hindiSubtitle && (
  <p className="text-lg leading-8 text-gray-600 mb-6">
    {book.hindiSubtitle}
  </p>
)}

              <div className="bg-gray-50 border rounded-2xl overflow-x-auto">
                <div className="bg-gray-100 px-6 py-4 border-b">
                  <h3 className="text-2xl font-bold">
                    Book Specifications
                  </h3>
                </div>

                <table className="w-full min-w-[520px]">
                  <tbody>
                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 w-1/3 bg-white">
                        Author
                      </td>
                      <td className="px-6 py-4">{book.author}</td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Publisher
                      </td>
                      <td className="px-6 py-4">
                        {book.publisher || "Allahabad Law Publications"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Edition
                      </td>
                      <td className="px-6 py-4">{book.edition}</td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Language
                      </td>
                      <td className="px-6 py-4">{book.language}</td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Binding
                      </td>
                      <td className="px-6 py-4">{book.binding}</td>
                    </tr>

                    {book.pages && (
  <tr className="border-b">
    <td className="font-semibold px-6 py-4 bg-white">
      Pages
    </td>

    <td className="px-6 py-4">
      {book.pages}
    </td>
  </tr>
)}

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Category
                      </td>
                      <td className="px-6 py-4">{book.category}</td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Subject
                      </td>
                      <td className="px-6 py-4">
                        {book.subject || "Law"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="font-semibold px-6 py-4 bg-white">
                        Publication Year
                      </td>
                      <td className="px-6 py-4">
                        {book.publicationYear || "To be updated"}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-semibold px-6 py-4 bg-white">
                        ISBN
                      </td>
                      <td className="px-6 py-4">
                        {book.isbn || "To be updated"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="my-6" />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <p className="text-gray-500 text-lg">
                  Maximum Retail Price
                </p>

                <p className="text-2xl text-gray-500 line-through">
                  ₹{book.mrp}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="text-4xl md:text-5xl font-bold text-amber-700">
                    ₹{book.salePrice}
                  </span>

                  {discount > 0 && (
                    <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <p className="mt-5 text-green-700 font-semibold">
                  ✅ In Stock ({book.stock} Available)
                </p>

                <p className="mt-2 text-amber-700 font-semibold">
                  💰 You Save ₹{savings}
                </p>

                <div className="mt-4 rounded-xl border border-amber-200 bg-white p-4">
  <p className="text-sm font-semibold text-gray-800">
    📦 Postal Charge Policy
  </p>

  <p className="mt-1 text-sm leading-6 text-gray-600">
    ₹60 postal charge applies when the total discounted
    order value is below ₹500. Postal delivery is free
    on orders of ₹500 or more.
  </p>
</div>
              </div>

              <div className="grid gap-4 mt-8">
                <AddToCartButton
                  slug={slug}
                  book={book}
                  showViewCart
                />

                <a
                  href="tel:+919235650006"
                  className="w-full border-2 border-gray-300 hover:border-amber-600 hover:text-amber-700 text-center py-4 rounded-xl font-semibold transition"
                >
                  📞 Call Us
                </a>

                <Link
                  href="/publications"
                  className="w-full bg-gray-900 hover:bg-black text-white text-center py-4 rounded-xl font-semibold transition"
                >
                  📚 Browse More Books
                </Link>
              </div>
            </div>
          </div>

          <hr className="my-10" />

          <div>
            <h2 className="text-3xl font-bold mb-6">
              About this Book
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
              {book.description}
            </p>
          </div>

          <hr className="my-10" />

          <div>
            <h2 className="text-3xl font-bold mb-6">
              You May Also Like
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedBooks.map(([relatedSlug, relatedBook]) => (
                <RelatedBookCard
                  key={relatedSlug}
                  slug={relatedSlug}
                  book={relatedBook}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}