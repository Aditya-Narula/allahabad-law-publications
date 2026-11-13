
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const emptyForm = {
  recipient_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  landmark: "",
  city: "",
  state: "",
  postal_code: "",
};

const fields = [
  { name: "recipient_name", label: "Recipient Name", required: true },
  { name: "phone", label: "Mobile Number", required: true },
  { name: "address_line1", label: "Address Line 1", required: true },
  { name: "address_line2", label: "Address Line 2" },
  { name: "landmark", label: "Landmark" },
  { name: "city", label: "City", required: true },
  { name: "state", label: "State", required: true },
  { name: "postal_code", label: "PIN Code", required: true },
];

export default function AddressManager({ userId }) {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadAddresses = useCallback(async () => {
    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("customer_addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    return data ?? [];
  }, [userId]);

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const data = await loadAddresses();

        if (active) {
          setAddresses(data);
        }
      } catch {
        if (active) {
          setError("Unable to load your saved addresses.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      active = false;
    };
  }, [loadAddresses]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setMessage("");
    setShowForm(true);
  }

  function openEditForm(address) {
    const nextForm = {};

    for (const field of fields) {
      nextForm[field.name] = address[field.name] ?? "";
    }

    setForm(nextForm);
    setEditingId(address.id);
    setError("");
    setMessage("");
    setShowForm(true);
  }

  async function handleSave(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanForm = {};

    for (const field of fields) {
      cleanForm[field.name] = form[field.name].trim();
    }

    if (!/^[6-9][0-9]{9}$/.test(cleanForm.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^[1-9][0-9]{5}$/.test(cleanForm.postal_code)) {
      setError("Enter a valid 6-digit Indian PIN code.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      let operationError;

      if (editingId) {
        const result = await supabase
          .from("customer_addresses")
          .update(cleanForm)
          .eq("id", editingId)
          .eq("user_id", userId);

        operationError = result.error;
      } else {
        const result = await supabase
          .from("customer_addresses")
          .insert({
            ...cleanForm,
            user_id: userId,
            is_default: addresses.length === 0,
          });

        operationError = result.error;
      }

      if (operationError) {
        throw operationError;
      }

      const updated = await loadAddresses();

      setAddresses(updated);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setMessage(
        editingId
          ? "Address updated successfully."
          : "Address saved successfully."
      );
    } catch (saveError) {
      setError(
        saveError?.message ?? "Unable to save your address."
      );
    } finally {
      setSaving(false);
    }
  }


async function handleSetDefault(address) {
  setError("");
  setMessage("");
  setSaving(true);

  try {
    const supabase = createClient();

    const { error: defaultError } = await supabase.rpc(
      "set_default_customer_address",
      {
        p_address_id: address.id,
      }
    );

    if (defaultError) {
      throw defaultError;
    }

    const updated = await loadAddresses();

    setAddresses(updated);
    setMessage("Default delivery address updated successfully.");
  } catch (defaultError) {
    setError(
      defaultError?.message ??
        "Unable to update your default address."
    );
  } finally {
    setSaving(false);
  }
}


  async function handleDelete(address) {
    if (!window.confirm("Delete this saved address?")) {
      return;
    }

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const supabase = createClient();

      const { error: deleteError } = await supabase
        .from("customer_addresses")
        .delete()
        .eq("id", address.id)
        .eq("user_id", userId);

      if (deleteError) {
        throw deleteError;
      }

      setAddresses(await loadAddresses());
      setShowForm(false);
      setMessage("Address deleted successfully.");
    } catch (deleteError) {
      setError(
        deleteError?.message ?? "Unable to delete your address."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/account"
          className="text-sm font-semibold text-blue-900 hover:underline"
        >
          ← Back to My Account
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Saved Delivery Addresses
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your delivery addresses for future orders.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={openAddForm}
              className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              + Add Address
            </button>
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.name === "address_line1" ||
                    field.name === "address_line2"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                    {field.required ? " *" : ""}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={
                      field.name === "phone" ||
                      field.name === "postal_code"
                        ? "tel"
                        : "text"
                    }
                    value={form[field.name]}
                    onChange={updateField}
                    required={Boolean(field.required)}
                    maxLength={
                      field.name === "phone"
                        ? 10
                        : field.name === "postal_code"
                          ? 6
                          : field.name === "address_line1" ||
                              field.name === "address_line2"
                            ? 300
                            : field.name === "landmark"
                              ? 150
                              : 100
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <section className="mt-8">
          {loading ? (
            <p className="text-gray-600">Loading addresses...</p>
          ) : addresses.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="text-gray-600">
                You have no saved delivery addresses yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {addresses.map((address) => (
                <article
                  key={address.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      {address.recipient_name}
                    </h2>

                    {address.is_default && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-700">
                    <p>{address.address_line1}</p>
                    {address.address_line2 && (
                      <p>{address.address_line2}</p>
                    )}
                    {address.landmark && (
                      <p>Landmark: {address.landmark}</p>
                    )}
                    <p>
                      {address.city}, {address.state} -{" "}
                      {address.postal_code}
                    </p>
                    <p>Mobile: {address.phone}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => openEditForm(address)}
                      className="rounded-lg border border-blue-900 px-4 py-2 text-sm font-semibold text-blue-900 disabled:opacity-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleDelete(address)}
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>


{!address.is_default && (
  <button
    type="button"
    disabled={saving}
    onClick={() => handleSetDefault(address)}
    className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-200 disabled:opacity-50"
  >
    Set as Default
  </button>
)}

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
