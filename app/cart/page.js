"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import {
  FREE_POSTAL_THRESHOLD,
  POSTAL_CHARGE,
  calculatePostalCharge,
} from "@/app/config/shipping";


function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Number(value) || 0);
}


export default function CartPage() {
  const {
    cartItems,
    isReady,
    cartVerified,
    cartVerificationError,
    syncCart,
    increaseQuantity,
    decreaseQuantity,
    setItemQuantity,
    removeItem,
    clearCart,
    totalQuantity,
    cartTotal,
    totalSavings,
  } = useCart();

  const cartSignature = JSON.stringify(
    cartItems.map(({ slug, quantity, stock, salePrice }) => ({
      slug, quantity, stock, salePrice,
    }))
  );

  useEffect(() => {
    if (!isReady) return;
    void syncCart();
  }, [isReady, cartSignature, syncCart]);

  const postalCharge = calculatePostalCharge(cartTotal);
  const grandTotal = cartTotal + postalCharge;

  const amountNeededForFreePostal =
    cartTotal < FREE_POSTAL_THRESHOLD
      ? FREE_POSTAL_THRESHOLD - cartTotal
      : 0;

  if (!isReady) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-600">
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <div className="text-6xl mb-6">
              🛒
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Add legal books to your cart and proceed
              through secure checkout once ordering is enabled.
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">
                Postal charge policy
              </p>

              <p className="mt-1 text-sm text-gray-700">
                ₹{POSTAL_CHARGE} postal charge applies
                on discounted order values below ₹
                {FREE_POSTAL_THRESHOLD}. Postal delivery
                is free on orders of ₹
                {FREE_POSTAL_THRESHOLD} or more.
              </p>
            </div>

            <Link
              href="/publications"
              className="inline-block mt-8 rounded-xl bg-amber-600 px-7 py-4 font-semibold text-white transition hover:bg-amber-700"
            >
              Browse Publications
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            Allahabad Law Publications
          </p>

          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-600">
  Review your selected publications and quantities,
  then proceed to secure checkout to select your
  delivery address and complete your purchase.
</p>
        </div>

        {/* POSTAL POLICY NOTICE */}

        <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex gap-3">
            <span className="text-2xl">
              📦
            </span>

            <div>
              <p className="font-bold text-gray-900">
                Postal Charge Policy
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-700">
                A postal charge of ₹{POSTAL_CHARGE} is
                applicable when the total discounted
                order value is below ₹
                {FREE_POSTAL_THRESHOLD}. Postal delivery
                is free on orders of ₹
                {FREE_POSTAL_THRESHOLD} or more.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">

          <section className="space-y-5">

            {cartItems.map((item) => (
              <article
                key={item.slug}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="grid gap-5 sm:grid-cols-[120px_1fr]">

                  <Link
                    href={`/books/${item.slug}`}
                    className="flex h-44 items-center justify-center rounded-xl bg-gray-50 p-3"
                  >
                    <Image
                      src={
                        item.cover ||
                        "/covers/alp-placeholder.jpg"
                      }
                      alt={item.englishTitle}
                      width={110}
                      height={160}
                      className="max-h-full object-contain"
                    />
                  </Link>

                  <div>

                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                      <div>
                        <Link
                          href={`/books/${item.slug}`}
                          className="text-xl font-bold text-gray-900 hover:text-amber-700"
                        >
                          {item.englishTitle}
                        </Link>

                        {item.hindiTitle && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.hindiTitle}
                          </p>
                        )}

                        <p className="mt-3 text-sm text-gray-600">
                          Edition:{" "}
                          {item.edition ||
                            "Not specified"}
                        </p>
                      </div>

                      <div className="md:text-right">
                        <p className="text-sm text-gray-500">
                          Price per copy
                        </p>

                        <p className="text-2xl font-bold text-amber-700">
                          ₹
                          {formatPrice(
                            item.salePrice
                          )}
                        </p>
                      </div>

                    </div>

                    <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.slug
                            )
                          }
                          className="h-11 w-11 rounded-lg border bg-white text-xl font-bold hover:border-amber-600 hover:text-amber-700"
                          aria-label={`Decrease quantity of ${item.englishTitle}`}
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            setItemQuantity(
                              item.slug,
                              event.target.value
                            )
                          }
                          className="h-11 w-20 rounded-lg border text-center font-bold outline-none focus:border-amber-600"
                          aria-label={`Quantity of ${item.englishTitle}`}
                        />

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.slug)}
                          disabled={item.quantity >= item.stock}
                          className="h-11 w-11 rounded-lg border bg-white text-xl font-bold hover:border-amber-600 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Increase quantity of ${item.englishTitle}`}
                        >
                          +
                        </button>

                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">

                        <p className="font-bold text-gray-900">
                          Item total: ₹
                          {formatPrice(
                            item.salePrice *
                              item.quantity
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.slug)
                          }
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex flex-wrap gap-3">

              <Link
                href="/publications"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:border-amber-600 hover:text-amber-700"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Clear Cart
              </button>

            </div>

          </section>

          <aside className="space-y-6">

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Total books
                  </span>

                  <span className="font-bold">
                    {totalQuantity}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Books subtotal
                  </span>

                  <span className="font-bold">
                    ₹{formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Your savings
                  </span>

                  <span className="font-bold text-green-700">
                    ₹
                    {formatPrice(
                      totalSavings
                    )}
                  </span>
                </div>

                {/* POSTAL CHARGE APPEARS ONLY BELOW ₹500 */}

                {postalCharge > 0 && (
                  <>
                    <div className="flex justify-between gap-4 border-t border-amber-200 pt-4">
                      <span className="font-semibold text-gray-700">
                        Postal charges
                      </span>

                      <span className="font-bold text-red-600">
                        ₹
                        {formatPrice(
                          postalCharge
                        )}
                      </span>
                    </div>

                    <div className="rounded-xl bg-white/70 p-3 text-sm text-gray-700">
                      Add books worth ₹
                      {formatPrice(
                        amountNeededForFreePostal
                      )}{" "}
                      more to get{" "}
                      <strong>
                        free postal delivery.
                      </strong>
                    </div>
                  </>
                )}

                {/* FREE POSTAL MESSAGE */}

                {postalCharge === 0 && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">
                    ✓ Free postal delivery
                  </div>
                )}

                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-lg font-bold">
                      Total payable
                    </span>

                    <span className="text-3xl font-bold text-amber-700">
                      ₹
                      {formatPrice(
                        grandTotal
                      )}
                    </span>
                  </div>
                </div>

              </div>
            </div>


<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">
    Secure Checkout
  </h2>

  <p className="mt-3 text-sm leading-6 text-gray-600">
    Orders will be placed directly through the Allahabad
    Law Publications website. You will be able to select
    a saved delivery address and review your order before
    confirming it.
  </p>


{cartVerificationError && (
    <p role="status" className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
      {cartVerificationError}
    </p>
  )}

  <button
    type="button"
    onClick={() => void syncCart()}
    className="mt-4 w-full rounded-xl border border-amber-600 px-4 py-3 font-semibold text-amber-800"
  >
    Refresh prices and availability
  </button>

  {cartVerified ? (
    <Link
      href="/checkout"
      className="mt-4 block w-full rounded-xl bg-amber-600 px-6 py-4 text-center text-lg font-bold text-white shadow-sm transition hover:bg-amber-700"
    >
      Proceed to Secure Checkout
    </Link>
  ) : (
    <p className="mt-4 rounded-xl bg-gray-100 p-4 text-center font-semibold text-gray-700">
      Checking current stock and prices. Use Refresh if verification fails.
    </p>
  )}


  <p className="mt-3 text-center text-xs text-gray-500">
    WhatsApp assistance will be available after successful
    order placement.
  </p>
</div>


          </aside>

        </div>
      </div>
    </main>
  );
}