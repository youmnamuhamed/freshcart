import {
    faArrowLeft,
  faArrowRight,
  faLocation,
  faLock,
  faShieldHalved,
  faShoppingBag,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function CartSummary({
  totalCartPrice,
  numOfCartItems,
}: {
  numOfCartItems: number;
  totalCartPrice: number;
}) {
  const subTotal = totalCartPrice;
  const shippingCost = subTotal > 500 ? 0 : 50;
  const total = Math.round(subTotal + shippingCost);
  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
          <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">
              <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
              Order Summary
            </h2>
            <p className="text-primary-100 text-sm mt-1">
              {" "}
              You have {numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""} in
              your cart
            </p>
          </div>

          <div className="p-6 space-y-5">
            {shippingCost > 0 && (
              <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faTruck} />
                  <span className="text-sm font-medium text-gray-700">
                    Add EGP {500 - subTotal} for free shipping
                  </span>
                </div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(subTotal / 500) * 100} %` }}
                  ></div>
                </div>
              </div>
            )}
            {shippingCost === 0 && (
              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <div>
                  <p className="font-semibold text-green-700">Free shipping </p>
                  <p className="text-sm text-green-500">
                    On all orders over EGP 500
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  {subTotal} EGP
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">
                  {shippingCost} EGP
                </span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      {total}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">EGP</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all">
              <FontAwesomeIcon icon={faTag} />
              <span className="text-sm font-medium">Apply Promo Code</span>
            </button>
            <Link
              href={`/checkout`}
              className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faLock} />
              <span className="">Secure Checkout</span>
            </Link>
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Secure Payment</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faTruck} />
                <span>Fast Delivery</span>
              </div>
            </div>
            <Link
              href={`/`}
              className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
