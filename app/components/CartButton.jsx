"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartButton({ mobile = false, onClick }) {
  const { totalQuantity, isReady } = useCart();

  const quantity = isReady ? totalQuantity : 0;

  if (mobile) {
    return (
      <Link
        href="/cart"
        onClick={onClick}
        className="flex items-center justify-between px-6 py-4 border-b hover:bg-amber-50 hover:text-amber-700 font-medium"
      >
        <span>🛒 Shopping Cart</span>

        <span className="min-w-7 h-7 px-2 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
          {quantity}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
      aria-label={`Shopping cart containing ${quantity} items`}
    >
      <span aria-hidden="true">🛒</span>
      <span>Cart</span>

      <span className="min-w-6 h-6 px-1.5 rounded-full bg-white text-amber-700 text-xs font-bold flex items-center justify-center">
        {quantity}
      </span>
    </Link>
  );
}