
"use client";

import Link from "next/link";

export default function AddressSelector({ addresses, selectedAddressId, onSelectAddress }) {

  return (
    <fieldset className="mt-6 space-y-4">
      <legend className="mb-4 font-semibold text-gray-900">
        Select your delivery address
      </legend>

      {addresses.map((address) => {
        const selected = selectedAddressId === address.id;

        return (
          <label
            key={address.id}
            className={`block cursor-pointer rounded-xl border p-5 transition ${
              selected
                ? "border-amber-600 bg-amber-50 ring-2 ring-amber-100"
                : "border-gray-200 bg-gray-50 hover:border-amber-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="delivery_address_id"
                value={address.id}
                checked={selected}
                onChange={() => onSelectAddress(address.id)}
                className="mt-1 h-5 w-5 accent-amber-600"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-bold text-gray-900">
                    {address.recipient_name}
                  </span>

                  {address.is_default && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-700">
                  {address.address_line1}
                </p>

                {address.address_line2 && (
                  <p className="text-gray-700">
                    {address.address_line2}
                  </p>
                )}

                {address.landmark && (
                  <p className="text-gray-700">
                    Landmark: {address.landmark}
                  </p>
                )}

                <p className="mt-1 text-gray-700">
                  {address.city}, {address.state} -{" "}
                  {address.postal_code}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Phone: {address.phone}
                </p>

                {selected && (
                  <p className="mt-3 font-semibold text-amber-800">
                    Selected for delivery
                  </p>
                )}
              </div>
            </div>
          </label>
        );
      })}

      <Link
        href="/account/addresses"
        className="inline-block pt-2 font-semibold text-amber-700 hover:underline"
      >
        Manage Saved Addresses
      </Link>
    </fieldset>
  );
}
