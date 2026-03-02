"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEye,
  faHeart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IProduct } from "../types/products.types";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/Cart/server/cart.actions";
import { toast } from "react-toastify";
import { use, useState } from "react";
import { setCartnfo } from "@/features/Cart/Store/cart.slice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/Store/store";

export default function ProductCard({ info }: { info: IProduct }) {
  const {
    imageCover,
    id,
    category,
    title,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch();

  const Onsale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await addProductToCart({ ProductId: id });
      console.log(response);
      if (response.status == "success") {
        toast.success(response.message);

        const cartInfo = await getLoggedUserCart();
        dispatch(setCartnfo(cartInfo));
      }
    } catch (error) {
      toast.error("failed to add the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative">
          <Link href={`/products/${id}`}>
            <Image
              src={imageCover}
              alt={title}
              width={300}
              height={300}
              className="w-full h-60 object-contain bg-white"
            />
          </Link>
          <div className="absolute top-3 left-3">
            {Onsale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {discountPercentage} %
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <Link
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
              href={``}
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{category.name}</div>
          <h3 className="font-medium mb-1 cursor-pointer ">
            <Link href={`/products/${id}`} className="line-clamp-2">
              {title}
            </Link>
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400 mr-2">
              <div className="text-yellow-400">{/* Rating component */}</div>
            </div>
            <div className="text-xs text-gray-500">
              {ratingsAverage} ({ratingsQuantity} reviews)
            </div>
            <span className="text-xs text-gray-500"></span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-600">
                {priceAfterDiscount || price} EGP
              </span>
              {Onsale && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {price}
                </span>
              )}
            </div>
            <button
              className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-70"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
