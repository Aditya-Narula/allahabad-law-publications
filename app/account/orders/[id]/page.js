
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "id, user_id, created_at, total_amount, payment_status, order_status, customer_name, shipping_address, city, state, pincode"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (orderError) {
    throw new Error("Unable to retrieve order details.");
  }

  if (!order) {
    notFound();
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      "id, quantity, unit_price, books(title, author)"
    )
    .eq("order_id", order.id)
    .order("id", { ascending: true });

  if (itemsError) {
    throw new Error("Unable to retrieve order items.");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/account/orders"
          className="text-sm font-semibold text-blue-900 hover:underline"
        >
          ← Back to My Orders
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{order.id}
          </h1>

          <p className="mt-2 text-gray-600">
            Placed on {formatDate(order.created_at)}
          </p>

          <div className="mt-6 grid gap-5 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Payment Status
              </p>
              <p className="font-semibold text-gray-900">
                {order.payment_status || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Status
              </p>
              <p className="font-semibold text-gray-900">
                {order.order_status || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Publications Ordered
          </h2>

          {!items || items.length === 0 ? (
            <p className="mt-4 text-gray-600">
              No order items are available.
            </p>
          ) : (
            <div className="mt-5 divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap justify-between gap-4 py-5"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.books?.title || "Publication"}
                    </h3>

                    {item.books?.author && (
                      <p className="text-sm text-gray-600">
                        By {item.books.author}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-600">
                      Unit Price: {formatCurrency(item.unit_price)}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    {formatCurrency(
                      Number(item.unit_price) * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Delivery Address
          </h2>

          <div className="mt-4 space-y-1 text-gray-700">
            <p>{order.customer_name}</p>
            <p>{order.shipping_address}</p>
            <p>
              {[order.city, order.state, order.pincode]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </section>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Order Total
            </h2>

            <p className="text-xl font-bold text-blue-900">
              {formatCurrency(order.total_amount)}
            </p>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            The order total is the amount recorded for this order.
          </p>
        </div>
      </div>
    </main>
  );
}
