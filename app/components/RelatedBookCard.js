import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function RelatedBookCard({ slug, book }) {
  const discount = book.discountPercent || 0;

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative bg-gradient-to-b from-gray-50 to-white h-72 flex items-center justify-center p-6">
        {book.featured && (
          <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ★ Featured
          </span>
        )}

        {book.newArrival && (
          <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}

        <Image
          src={book.cover || "/covers/alp-placeholder.jpg"}
          alt={book.englishTitle}
          width={180}
          height={260}
          className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
            {book.category}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-6 line-clamp-2 min-h-[56px]">
          {book.englishTitle}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[42px]">
          {book.hindiTitle}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          🌐 {book.language}
        </p>

        <div className="mt-5">
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

          <div className="text-3xl font-bold text-amber-700 mt-1">
            ₹{book.salePrice}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <Link
            href={`/books/${slug}`}
            className="block text-center rounded-xl bg-gray-900 py-3 font-semibold text-white transition hover:bg-black"
          >
            View Details
          </Link>

          <AddToCartButton slug={slug} book={book} compact />
        </div>
      </div>
    </div>
  );
}