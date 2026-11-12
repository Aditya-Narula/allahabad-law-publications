
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();

  // Verify the customer on the server.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const customerName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            My Account
          </h1>

          <p className="mt-3 text-gray-600">
            Welcome{customerName ? `, ${customerName}` : ""}!
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Signed in as {user.email}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              My Orders
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              View your order history, invoices and delivery status.
            </p>

            <p className="mt-5 text-sm font-medium text-amber-700">
              Coming soon
            </p>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Saved Addresses
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Manage your delivery addresses for future purchases.
            </p>

            <p className="mt-5 text-sm font-medium text-amber-700">
              Coming soon
            </p>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              ALP Reward Points
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              View your reward points balance and redemption history.
            </p>

            <p className="mt-5 text-sm font-medium text-amber-700">
              Coming soon
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link
            href="/publications"
            className="inline-block rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Browse Publications
          </Link>
        </div>
      </div>
    </main>
  );
}
