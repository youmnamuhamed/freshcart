import { faBox, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { getLoggedUserOrders } from "../server/orders.action";
import { OrdersResponse } from "../types/orders.types";
import OrderCard from "../components/OrderCard";

export default async function OrdersScreen() {
  const orders: OrdersResponse = await getLoggedUserOrders();

  if (!orders.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <FontAwesomeIcon icon={faBox} className="text-5xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't placed any orders.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-xl hover:bg-primary-700 transition"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <FontAwesomeIcon icon={faBox} className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders.length} orders
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="self-start sm:self-auto text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary-50 transition-all text-sm"
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
