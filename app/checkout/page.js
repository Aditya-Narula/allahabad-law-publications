import CheckoutClient from "./CheckoutClient";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  if (!user.email_confirmed_at) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Email Verification Required
          </h1>

          <p className="mt-4 text-gray-600">
            Please verify your email address before proceeding
            to checkout.
          </p>
        </div>
      </main>
    );
  }

  const { data: addresses, error: addressError } =
    await supabase
      .from("customer_addresses")
      .select(
        "id, recipient_name, phone, address_line1, address_line2, landmark, city, state, postal_code, is_default"
      )
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

  if (addressError) {
    throw new Error("Unable to load delivery addresses.");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-sm font-semibold text-amber-700 hover:underline"
          >
            Back to Shopping Cart
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Secure Checkout
          </h1>

          <p className="mt-3 text-gray-600">
            Signed in as {user.email}
          </p>
        </div>

        <CheckoutClient addresses={addresses ?? []} />

      </div>
    </main>
  );
}
