"use client";
import {
  faArrowRight,
  faHeart,
  faShoppingCart,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useAppSelector } from "@/Store/store";
import CartItem from "../Components/CartItem";
import CartSummary from "../Components/CartSummary";

export default function CartScreen() {
  const { numberOfCartItems, products, totalCartPriced } = useAppSelector(
    (state) => state.cart,
  );

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faTrash} />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. <br />
            Start exploring our products!
          </p>

          <Link
            href={`/`}
            className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            Start Shopping
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <div className="mb-8">
              <Link
                className="hover:text-primary-600 transition"
                href={`/`}
              ></Link>
              <span className="text-gray-900 font-medium">Shopping cart</span>
            </div>
          </nav>
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {numberOfCartItems}{" "}
                  {numberOfCartItems === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {products.map((product) => (
                  <CartItem key={product._id} info={product} />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href={`/`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                >
                  <span>←</span> Continue Shopping
                </Link>
                <button className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
                  <FontAwesomeIcon icon={faTrash} />{" "}
                  <span>Clear all items</span>
                </button>
              </div>
            </div>
            <CartSummary
              totalCartPrice={totalCartPriced}
              numOfCartItems={numberOfCartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
