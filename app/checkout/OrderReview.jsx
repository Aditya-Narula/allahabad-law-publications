
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

export default function OrderReview({ selectedAddressId }) {
  const { cartItems, isReady } = useCart();

  const [review, setReview] = useState(null);
  const [error, setError] = useState("");
  const [reviewedKey, setReviewedKey] = useState("");

  const items = useMemo(
    () =>
      cartItems.map((item) => ({
        slug: item.slug,
        quantity: Number(item.quantity),
      })),
    [cartItems]
  );

  const cartKey = JSON.stringify(items);
  const loading = isReady && items.length > 0 &&
    reviewedKey !== cartKey;

  useEffect(() => {
    if (!isReady || items.length === 0) {
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function loadReview() {
      try {
        const response = await fetch("/api/checkout/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
          signal: controller.signal,
          cache: "no-store",
        });

        const data = await response.json();

        if (!active) return;

        if (!response.ok) {
          setReview(null);
          setError(data.error || "Unable to review cart.");
        } else {
          setReview(data);
          setError("");
        }

        setReviewedKey(cartKey);
      } catch (err) {
        if (!active || err.name === "AbortError") return;

        setReview(null);
        setError("Unable to connect. Please try again.");
        setReviewedKey(cartKey);
      }
    }

    loadReview();

    return () => {
      active = false;
      controller.abort();
    };
  }, [items, cartKey, isReady]);

  if (!isReady) {
    return <p className="text-gray-600">Loading your cart...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link href="/publications" className="font-semibold text-amber-700">
          Browse Publications
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5">
      {loading ? (
        <p className="text-gray-600">
          Verifying prices and availability...
        </p>
      ) : error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-semibold text-red-700">{error}</p>
          <Link
            href="/cart"
            className="mt-3 inline-block font-semibold text-red-800 underline"
          >
            Return to Cart
          </Link>
        </div>
      ) : review && reviewedKey === cartKey ? (
        <>
          <div className="divide-y divide-gray-200">
            {review.items.map((item) => (
              <div key={item.slug} className="py-4">
                <p className="font-semibold text-gray-900">
                  {item.title}
                </p>

                <div className="mt-2 flex justify-between gap-4 text-sm text-gray-600">
                  <span>
                    {item.quantity} × {money(item.price)}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {money(item.lineTotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-5">
            <div className="flex justify-between">
              <span>Books subtotal</span>
              <strong>{money(review.subtotal)}</strong>
            </div>

            <div className="flex justify-between">
              <span>Postal charges</span>
              <strong>
                {review.shipping === 0
                  ? "FREE"
                  : money(review.shipping)}
              </strong>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total payable</span>
              <span className="text-amber-700">
                {money(review.total)}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Prices and availability have been checked against
            the ALP database. Final verification will occur
            when order placement is enabled.
          </p>
        </>
      ) : null}

      {!selectedAddressId && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          Please select a delivery address.
        </p>
      )}

      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-xl bg-gray-800 py-4 font-bold text-white opacity-60"
      >
        Place Order - Coming Soon
      </button>
    </div>
  );
}
