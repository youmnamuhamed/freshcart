import { CartItem } from "@/features/Cart/Types/cart.types";
import {
  faBagShopping,
  faBox,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function OrderSummary({
  totalCartPrice,
  numOfCartItems,
  cartItems,
}: {
  numOfCartItems: number;
  totalCartPrice: number;
  cartItems: CartItem[];
}) {
  const subTotal = totalCartPrice;
  const shippingCost = subTotal > 500 ? 0 : 50;
  const total = Math.round(subTotal + shippingCost);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
        <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faBagShopping} />
            Order Summary
          </h2>
          <p className="text-primary-100 text-sm mt-1">
            {" "}
            You have {numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""} in
            your cart
          </p>
        </div>
        <div className="p-5">
          <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Qty: {item.count}
                  </p>
                </div>

                <p className="text-sm font-bold text-gray-900 shrink-0">
                  {item.price} EGP
                </p>
              </div>
            ))}
          </div>
          <hr className="border-gray-100 my-4" />
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span className="">Subtotal</span>
              <span className="font-medium"> {subTotal} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTruck} />
                Shipping
              </span>
              <span className="text-green-600 font-semibold">
                {shippingCost} EGP
              </span>
            </div>
            <hr className="border-gray-100 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary-600">
                  {total}
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>
          <button
            className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            type="submit"
          >
            <FontAwesomeIcon icon={faBox} />
            Place order
          </button>
          <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className=" text-green-500"
              />
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faTruck} className=" text-blue-500" />
              <span>Fast Delivery</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faBox} className=" text-orange-500" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
