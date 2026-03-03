"use client";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { WishlistProductDetails } from "../types/wishlist.types";
import Swal from "sweetalert2";
import {
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from "../server/wishlist.action";
import {
  addProductToCart,
  getLoggedUserCart,
} from "../../Cart/server/cart.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/Store/store";
import { setWishlistInfo } from "../store/wishlist.slice";
import { useState } from "react";
import { setCartnfo } from "@/features/Cart/Store/cart.slice";

export default function WishlistItem({
  info,
}: {
  info: WishlistProductDetails;
}) {
  const { _id, title, imageCover, category, price, ratingsAverage, id } = info;

  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    const result = await Swal.fire({
      html: `<div class="text-center py-2">
      <div class="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900">Remove from Wishlist</h3>
      <p class="text-sm text-gray-500">Remove <span class="font-semibold text-gray-700">${title.slice(0, 40)}${title.length > 40 ? "..." : ""}</span> from your wishlist?</p>
      </div>`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      const response = await removeProductFromWishlist(id);
      dispatch(setWishlistInfo(response));
      toast.success("Product removed from wishlist");
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await addProductToCart({ ProductId: id });
      if (response.status == "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartnfo(cartInfo));
      }
    } catch (error) {
      toast.error("Failed to add the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
      <div className="flex gap-4 sm:gap-6">
        <Link href={``} className="relative shrink-0 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden">
            <Image
              src={imageCover}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              width={128}
              height={128}
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="mb-3">
            <Link href={``}>
              <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                {title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              {category?.name && (
                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {category.name}
                </span>
              )}
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                SKU {_id.slice(-6).toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-yellow-500 font-medium">
                ★ {ratingsAverage?.toFixed(1) ?? "N/A"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-primary-600 font-bold text-lg">
                {price} EGP
              </span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-md shadow-primary-600/20 active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Add to Cart</span>
            </button>

            <button
              className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
              onClick={handleRemove}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
