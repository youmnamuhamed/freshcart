"use client";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { CartItem as cartItemType } from "../Types/cart.types";
import Swal from "sweetalert2";
import {
  getLoggedUserCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../server/cart.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/Store/store";
import { removePorductFromCart, setCartnfo } from "../Store/cart.slice";
import { useEffect } from "react";

export default function CartItem({ info }: { info: cartItemType }) {
  const { _id, product, count, price } = info;
  const { brand, category, imageCover, title, quantity, id } = product;

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function loadCart() {
      try {
        const cart = await getLoggedUserCart();
        dispatch(setCartnfo(cart));
      } catch (err) {
        console.log(err);
      }
    }
    loadCart();
  }, [dispatch]);

  const handleRemove = async () => {
    const result = await Swal.fire({
      html: `<div class="text-center py-2">
      <div class="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
      <svg class="w-8 h-8 text-red-500 mx-auto mb-3"fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 12m0 0l7-7m0 0v12"></path>
      </svg>
      </div>
    </div>
    <h3 class="text-lg font-bold text-gray-900">Remove item</h3>
    <p class="text-sm text-gray-500">Remove <span class="font-semibold text-gray-700"> ${title.slice(0, 40)}${title.length > 40 ? "..." : ""}</span></p>`,

      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });
    if (result.isConfirmed) {
      const response = await removeProductFromCart(id); // this calls your API

      // Update Redux with fresh cart from server
      dispatch(setCartnfo(response));
      toast.success("Product removed from cart successfully");
    }
  };

  const handleUpdate = async (newCount: number) => {
    if (newCount < 1) return;
    try {
      const response = await updateProductQuantity(id, newCount);
      dispatch(setCartnfo(response));
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 ">
        <div className="flex gap-4 sm:gap-6">
          <Link href={``} className="relative shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden">
              <Image
                src={imageCover}
                alt={title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                width={128}
                height={128}
              ></Image>
            </div>
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link href={``}>
                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                  {title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {category.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  SKU {_id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary-600 font-bold text-lg">
                  {price} EGP
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button
                  className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                  disabled={count > quantity}
                  onClick={() => {
                    handleUpdate(count - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">
                  {count}
                </span>
                <button
                  className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                  onClick={() => {
                    handleUpdate(count + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {price * count}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
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
      </div>
    </>
  );
}
