
"use client";

import { useState } from "react";
import Link from "next/link";
import AddressSelector from "./AddressSelector";
import OrderReview from "./OrderReview";
import BankTransferDetails from "@/app/components/BankTransferDetails";

export default function CheckoutClient({ addresses }) {
  const initialAddress =
    addresses.find((address) => address.is_default) ?? addresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState(
    initialAddress?.id ?? null
  );

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId
  );

  return (
    <>
      {/* DELIVERY ADDRESS */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">
          Delivery Address
        </h2>

        {addresses.length > 0 ? (
          <AddressSelector
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
          />
        ) : (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-semibold text-amber-900">
              No saved delivery address found.
            </p>

            <p className="mt-2 text-sm text-gray-700">
              Please add a delivery address to continue.
            </p>

            <Link
              href="/account/addresses"
              className="mt-4 inline-block rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
            >
              Add Delivery Address
            </Link>
          </div>
        )}
      </section>

      {/* ORDER REVIEW */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Order Review
        </h2>

        <OrderReview selectedAddressId={selectedAddressId} />

        {selectedAddress ? (
          <p className="mt-4 text-sm text-gray-600">
            Selected delivery address:{" "}
            <span className="font-semibold text-gray-900">
              {selectedAddress.recipient_name}
            </span>
            , {selectedAddress.city}, {selectedAddress.state} –{" "}
            {selectedAddress.postal_code}
          </p>
        ) : (
          <p
            role="alert"
            className="mt-4 text-sm font-semibold text-red-700"
          >
            Select a delivery address before placing an order.
          </p>
        )}
      </section>

      {/* PAYMENT INFORMATION */}
      <section className="mt-6">
        <BankTransferDetails paymentReady={false} />
      </section>
    </>
  );
}
