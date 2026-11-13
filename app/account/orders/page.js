
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      "id, created_at, total_amount, payment_status, order_status"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/account"
          className="text-sm font-semibold text-blue-900 hover:underline"
        >
          ← Back to My Account
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View your order history and current order status.
          </p>
        </div>

        {ordersError ? (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
          >
            Unable to load your orders. Please try again later.
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-600">
              Your confirmed website orders will appear here
              when our online ordering system is activated.
            </p>

            <Link
              href="/publications"
              className="mt-6 inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Browse Publications
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Order #{order.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {order.payment_status || "Pending"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Order Status
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {order.order_status || "Pending"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
