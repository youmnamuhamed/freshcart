"use client";
import { faArrowRight, faHeart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/Store/store";
import WishlistItem from "../components/WishlistItem";
import WishlistSummary from "../components/WishlistSummary";
import { getLoggedUserWishlist } from "../server/wishlist.action";
import { setWishlistInfo } from "../store/wishlist.slice";

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const { numberOfWishlistItems, products } = useAppSelector(
    (state) => state.wishlist,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const wishlist = await getLoggedUserWishlist();
        dispatch(setWishlistInfo(wishlist));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWishlist();
  }, [dispatch]);

  const safeProducts = products ?? [];

  const totalWishlistPrice = safeProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-rose-500" />
      </div>
    );
  }

  if (safeProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faHeart} className="text-rose-400 text-2xl" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't saved anything yet. <br />
            Start exploring and save your favourites!
          </p>

          <Link
            href={`/`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
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
              <Link className="hover:text-primary-600 transition" href={`/`}></Link>
              <span className="text-gray-900 font-medium">Wishlist</span>
            </div>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-rose-500">
                  {numberOfWishlistItems}{" "}
                  {numberOfWishlistItems === 1 ? "item" : "items"}
                </span>{" "}
                saved to your wishlist
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {safeProducts.map((product) => (
                  <WishlistItem key={product._id} info={product} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href={`/`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                >
                  <span>←</span> Continue Shopping
                </Link>
              </div>
            </div>

            <WishlistSummary
              totalWishlistPrice={totalWishlistPrice}
              numOfWishlistItems={numberOfWishlistItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}