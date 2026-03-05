"use client";

import {
  faBox,
  faCalendarDays,
  faChevronDown,
  faChevronUp,
  faClock,
  faHashtag,
  faLocationDot,
  faMoneyBill,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { Order } from "../types/orders.types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const firstItem = order.cartItems?.[0];

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      {/* Main Card */}
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Product Image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              {firstItem && (
                <Image
                  src={firstItem.product.imageCover}
                  alt={firstItem.product.title}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Items Count Badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {order.cartItems.length}
            </div>
          </div>

          {/* Order Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                {/* Status */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2 ${order.isDelivered ? "bg-green-100" : "bg-amber-100"}`}
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={`text-sm ${order.isDelivered ? "text-green-500" : "text-amber-500"}`}
                  />
                  <span
                    className={`text-xs font-semibold ${order.isDelivered ? "text-green-600" : "text-amber-600"}`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                {/* Order ID */}
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faHashtag} />
                  {order._id.slice(-6)}
                </h3>
              </div>

              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <FontAwesomeIcon icon={faMoneyBill} />
              </div>
            </div>

            {/* Order Details */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} />
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faBox} />
                {order.cartItems.length} items
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faLocationDot} />
                {order.shippingAddress?.city ?? "N/A"}
              </span>
            </div>

            {/* Price + Details Button */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>

              <button
                onClick={() => setShowDetails((prev) => !prev)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  showDetails
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showDetails ? "Hide" : "Details"}
                <FontAwesomeIcon
                  icon={showDetails ? faChevronUp : faChevronDown}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            {/* Order Items */}
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faReceipt}
                  className="text-green-600 text-xs"
                />
              </div>
              Order Items
            </h4>

            <div className="space-y-3 mb-6">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>
                      {" × "}
                      {item.price} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {item.count * item.price}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom: Delivery Address + Order Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Delivery Address */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-primary-500"
                  />
                  Delivery Address
                </h5>
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {order.shippingAddress?.details ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  📞 {order.shippingAddress?.phone ?? "N/A"}
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                  <FontAwesomeIcon
                    icon={faReceipt}
                    className="text-amber-500"
                  />
                  Order Summary
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {order.totalOrderPrice - order.shippingPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{order.shippingPrice} EGP</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-amber-200">
                    <span>Total</span>
                    <span>{order.totalOrderPrice} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
