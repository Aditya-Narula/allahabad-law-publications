"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({
  slug,
  book,
  compact = false,
  showViewCart = false,
}) {
  const {
    addItem,
    increaseQuantity,
    decreaseQuantity,
    getItemQuantity,
    isReady,
  } = useCart();

  const quantity = getItemQuantity(slug);

  if (!isReady) {
    return (
      <button
        type="button"
        disabled
        className={`w-full rounded-xl bg-gray-200 font-semibold text-gray-500 ${
          compact ? "py-3" : "py-4"
        }`}
      >
        Loading Cart...
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(slug, book, 1)}
        className={`w-full rounded-xl bg-amber-600 font-semibold text-white shadow-sm transition hover:bg-amber-700 ${
          compact ? "py-3" : "py-4"
        }`}
      >
        🛒 Add to Cart
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-green-200 bg-green-50 p-3">
        <p className="mb-3 text-center text-sm font-semibold text-green-700">
          ✓ Added to Cart
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => decreaseQuantity(slug)}
            className="h-10 w-10 rounded-lg border border-gray-300 bg-white text-xl font-bold text-gray-800 transition hover:border-amber-600 hover:text-amber-700"
            aria-label={`Decrease quantity of ${book.englishTitle}`}
          >
            −
          </button>

          <span className="min-w-12 text-center text-xl font-bold text-gray-900">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(slug)}
            className="h-10 w-10 rounded-lg border border-gray-300 bg-white text-xl font-bold text-gray-800 transition hover:border-amber-600 hover:text-amber-700"
            aria-label={`Increase quantity of ${book.englishTitle}`}
          >
            +
          </button>
        </div>
      </div>

      {showViewCart && (
        <Link
          href="/cart"
          className="block w-full rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-black"
        >
          View Cart →
        </Link>
      )}
    </div>
  );
}