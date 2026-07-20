"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const initialForm = {
  name: "",
  mobile: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  email: "",
  notes: "",
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}

export default function CartPage() {
  const {
    cartItems,
    isReady,
    increaseQuantity,
    decreaseQuantity,
    setItemQuantity,
    removeItem,
    clearCart,
    totalQuantity,
    cartTotal,
    totalSavings,
  } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter the customer name.";
    }

    const mobileDigits = form.mobile.replace(/\D/g, "");

    if (!mobileDigits) {
      newErrors.mobile = "Please enter the mobile number.";
    } else if (mobileDigits.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Please enter the full delivery address.";
    }

    if (!form.city.trim()) {
      newErrors.city = "Please enter the city.";
    }

    if (!form.state.trim()) {
      newErrors.state = "Please enter the state.";
    }

    if (!/^\d{6}$/.test(form.pinCode.trim())) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function createWhatsAppMessage() {
    const orderLines = cartItems
      .map((item, index) => {
        const itemTotal = item.salePrice * item.quantity;

        return `${index + 1}. ${item.englishTitle}
Edition: ${item.edition || "Not specified"}
Quantity: ${item.quantity}
Price per copy: ₹${formatPrice(item.salePrice)}
Item total: ₹${formatPrice(itemTotal)}`;
      })
      .join("\n\n");

    return `Hello Allahabad Law Publications,

I would like to place the following order:

${orderLines}

ORDER SUMMARY
Total books: ${totalQuantity}
Total savings: ₹${formatPrice(totalSavings)}
Total payable: ₹${formatPrice(cartTotal)}
Delivery charges: Included in the sale price

CUSTOMER DETAILS
Name: ${form.name.trim()}
Mobile: ${form.mobile.trim()}
Address: ${form.address.trim()}
City: ${form.city.trim()}
State: ${form.state.trim()}
PIN Code: ${form.pinCode.trim()}
Email: ${form.email.trim() || "Not provided"}
Order Notes: ${form.notes.trim() || "None"}

Please confirm availability and payment details.

Thank you.`;
  }

  function handleWhatsAppOrder(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    if (!validateForm()) {
      const firstErrorField = document.querySelector(
        "[data-form-error='true']"
      );

      firstErrorField?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    const message = createWhatsAppMessage();

    const whatsappUrl = `https://wa.me/919235650006?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  if (!isReady) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-600">Loading your cart...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <div className="text-6xl mb-6">🛒</div>

            <h1 className="text-4xl font-bold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Add legal books to your cart and place the entire order
              through WhatsApp.
            </p>

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
            Review quantities, enter delivery details and send the
            complete order through WhatsApp.
          </p>
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
                      src={item.cover || "/covers/alp-placeholder.jpg"}
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
                          Edition: {item.edition || "Not specified"}
                        </p>
                      </div>

                      <div className="md:text-right">
                        <p className="text-sm text-gray-500">
                          Price per copy
                        </p>

                        <p className="text-2xl font-bold text-amber-700">
                          ₹{formatPrice(item.salePrice)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.slug)}
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
                          className="h-11 w-11 rounded-lg border bg-white text-xl font-bold hover:border-amber-600 hover:text-amber-700"
                          aria-label={`Increase quantity of ${item.englishTitle}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <p className="font-bold text-gray-900">
                          Item total: ₹
                          {formatPrice(
                            item.salePrice * item.quantity
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
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
                  <span className="text-gray-600">Total books</span>
                  <span className="font-bold">{totalQuantity}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Your savings</span>
                  <span className="font-bold text-green-700">
                    ₹{formatPrice(totalSavings)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Delivery charges
                  </span>
                  <span className="font-semibold text-green-700">
                    Included
                  </span>
                </div>

                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-lg font-bold">
                      Total payable
                    </span>

                    <span className="text-3xl font-bold text-amber-700">
                      ₹{formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleWhatsAppOrder}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Fields marked with * are compulsory.
              </p>

              <div className="mt-6 space-y-5">
                <FormField
                  label="Customer Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <FormField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  value={form.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  required
                />

                <FormTextArea
                  label="Full Delivery Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                    required
                  />

                  <FormField
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    error={errors.state}
                    required
                  />
                </div>

                <FormField
                  label="PIN Code"
                  name="pinCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pinCode}
                  onChange={handleChange}
                  error={errors.pinCode}
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <FormTextArea
                  label="Order Notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  error={errors.notes}
                  placeholder="Any special instructions or queries"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-green-700"
              >
                📱 Order Entire Cart on WhatsApp
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                Your order details will open in WhatsApp for your
                review before sending.
              </p>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  inputMode,
  maxLength,
}) {
  return (
    <div data-form-error={error ? "true" : "false"}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-200 ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-amber-600"
        }`}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function FormTextArea({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
}) {
  return (
    <div data-form-error={error ? "true" : "false"}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>

      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full resize-y rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-200 ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-amber-600"
        }`}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}