import {
  faArrowLeft,
  faHeart,
  faShoppingCart,
  faTag,
  faTruck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function WishlistSummary({
  totalWishlistPrice,
  numOfWishlistItems,
}: {
  numOfWishlistItems: number;
  totalWishlistPrice: number;
}) {
  const averagePrice =
    numOfWishlistItems > 0
      ? Math.round(totalWishlistPrice / numOfWishlistItems)
      : 0;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
          <h2 className="text-white font-bold text-lg">
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            Wishlist Summary
          </h2>
          <p className="text-rose-100 text-sm mt-1">
            You have {numOfWishlistItems} saved{" "}
            {numOfWishlistItems !== 1 ? "items" : "item"}
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Saved Items</span>
              <span className="font-medium text-gray-900">
                {numOfWishlistItems}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Value</span>
              <span className="font-medium text-gray-900">
                {totalWishlistPrice} EGP
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Avg. Price</span>
              <span className="font-medium text-gray-900">
                {averagePrice} EGP
              </span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">
                  Est. Total
                </span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {totalWishlistPrice}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/cart`}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Go to Cart</span>
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
  );
}