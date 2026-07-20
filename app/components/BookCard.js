import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function BookCard({ slug, book }) {
  const discount = book.discountPercent || 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-80 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        {book.newArrival && (
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            NEW
          </span>
        )}

        {book.featured && (
          <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ★ Featured
          </span>
        )}

        <Image
          src={book.cover || "/covers/alp-placeholder.jpg"}
          alt={book.englishTitle}
          width={210}
          height={310}
          className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <span className="inline-block mb-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          {book.category}
        </span>

        <h2 className="text-xl font-bold leading-7 text-gray-900 line-clamp-2 min-h-[60px]">
          {book.englishTitle}
        </h2>

        <p className="mt-2 text-gray-500 line-clamp-2 min-h-[42px]">
          {book.hindiTitle}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            {book.language}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            {book.binding}
          </span>
        </div>

        <div className="mt-5 space-y-2 text-sm text-gray-700">
          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>Edition:</strong> {book.edition}
          </p>
        </div>

        <hr className="my-5" />

        <div>
          {discount > 0 && book.mrp > book.salePrice && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 line-through">
                ₹{book.mrp}
              </span>

              <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                {discount}% OFF
              </span>
            </div>
          )}

          <div className="mt-1 text-3xl font-bold text-amber-700">
            ₹{book.salePrice}
          </div>
        </div>

        <p className="mt-4 font-semibold text-green-600">
          ✓ In Stock ({book.stock})
        </p>

        <div className="mt-6 grid gap-3">
          <Link
            href={`/books/${slug}`}
            className="block rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-black"
          >
            View Details →
          </Link>

          <AddToCartButton slug={slug} book={book} compact />
        </div>
      </div>
    </div>
  );
}