"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCartShopping,
  faBolt,
  faTruck,
  faRotateLeft,
  faShieldHalved,
  faShareNodes,
  faChevronRight,
  faHouse,
  faMinus,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IProduct } from "../../types/products.types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useState } from "react";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/Cart/server/cart.actions";
import {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from "../../../wishlist/server/wishlist.action";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCartnfo } from "@/features/Cart/Store/cart.slice";
import { setWishlistInfo } from "../../../wishlist/store/wishlist.slice";
import { useAppSelector } from "@/Store/store";

export default function ProductInfo({ product }: { product: IProduct }) {
  const {
    id,
    title,
    description,
    ratingsAverage,
    ratingsQuantity,
    images,
    quantity,
    price,
    priceAfterDiscount,
    category,
    brand,
  } = product;

  const Onsale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const lowStock = quantity > 0 && quantity < 10;

  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const dispatch = useDispatch();

  const wishlistProducts = useAppSelector(
    (state) => state.wishlist.products ?? [],
  );
  const isInWishlist = wishlistProducts.some((p) => p.id === id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await addProductToCart({ ProductId: id });
      if (response.status === "success") {
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

  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    try {
      if (isInWishlist) {
        const response = await removeProductFromWishlist(id);
        dispatch(setWishlistInfo(response));
        toast.success("Removed from wishlist");
      } else {
        await addProductToWishlist({ ProductId: id });
        const wishlist = await getLoggedUserWishlist();
        dispatch(setWishlistInfo(wishlist));
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="max-w-7xl  px-6 py-4 flex items-center text-sm text-gray-600">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-600 transition"
          >
            <FontAwesomeIcon icon={faHouse} className="text-xs" />
            Home
          </Link>

          <FontAwesomeIcon
            icon={faChevronRight}
            className="mx-3 text-xs text-gray-400"
          />

          {/* Category */}
          <Link
            href="/category/women-fashion"
            className="hover:text-green-600 transition"
          >
            {category?.name || "Category"}
          </Link>

          <FontAwesomeIcon
            icon={faChevronRight}
            className="mx-3 text-xs text-gray-400"
          />

          {/* Sub Category */}
          <Link
            href="/category/women-clothing"
            className="hover:text-green-600 transition"
          >
            {product.subcategory?.[0]?.name || "SubCategory"}
          </Link>

          <FontAwesomeIcon
            icon={faChevronRight}
            className="mx-3 text-xs text-gray-400"
          />

          {/* Current Page (No Link) */}
          <span className="text-gray-900 font-medium">{title}</span>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              {/* ================= IMAGE CARD ================= */}
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <ImageGallery
                  items={images.map((Image) => {
                    return {
                      original: Image,
                      thumbnail: Image,
                    };
                  })}
                  showFullscreenButton={false}
                  showNav={false}
                  showPlayButton={false}
                />
              </div>
            </div>
            {/* ================= DETAILS CARD ================= */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                {/* Category */}
                <div className="flex gap-3">
                  {category && (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                      {category.name}
                    </span>
                  )}

                  {brand && (
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                      {brand.name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-semibold">{title}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 text-yellow-400">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <span className="text-gray-500 text-sm ml-2">
                    {ratingsAverage} ({ratingsQuantity} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span className="text-2xl font-bold">
                    {priceAfterDiscount || price} EGP
                  </span>
                  {Onsale && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {price} EGP
                      </span>
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                        Save {discountPercentage} %
                      </span>
                    </>
                  )}
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 mb-6 ">
                  {quantity > 0 ? (
                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-500">
                      <span
                        className={`w-2 h-2 rounded-full ${lowStock ? "bg-yellow-600" : "bg-green-500"}`}
                      ></span>
                      {lowStock
                        ? `only ${quantity} left order-soon!`
                        : "In stock"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                      <span className="w-2 h-2 rounded-full bg-red-500">
                        {" "}
                        Out of stock
                      </span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-500">{description}</p>

                {/* Quantity */}
                <div>
                  <p className="mb-2 font-medium">Quantity</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                        onClick={() => {
                          setCount(count - 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                        value={count}
                        onChange={(e) => {
                          setCount(+e.target.value);
                        }}
                        min={1}
                        max={600}
                        type="number"
                      ></input>
                      <button
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">
                      {quantity} available
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-100 p-4 rounded-xl flex justify-between">
                  <span>Total Price:</span>
                  <span className="text-green-600 font-bold">
                    {count * (priceAfterDiscount || price)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading || quantity === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    <FontAwesomeIcon
                      icon={isLoading ? faSpinner : faCartShopping}
                      spin={isLoading}
                    />
                    {isLoading ? "Adding..." : "Add to Cart"}
                  </button>

                  <button className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faBolt} />
                    Buy Now
                  </button>
                </div>

                {/* Wishlist */}
                <div className="flex gap-4">
                  <button
                    onClick={handleToggleWishlist}
                    disabled={isWishlistLoading}
                    className={`flex-1 border py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${
                      isInWishlist
                        ? "bg-rose-50 border-rose-300 text-rose-500 hover:bg-rose-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        isWishlistLoading
                          ? faSpinner
                          : isInWishlist
                            ? faHeartSolid
                            : faHeart
                      }
                      spin={isWishlistLoading}
                      className={isInWishlist ? "text-rose-500" : ""}
                    />
                    {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                  </button>

                  <button className="px-4 border rounded-xl hover:bg-gray-50">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-gray-500">Orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                      <FontAwesomeIcon icon={faRotateLeft} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">30 Days Return</p>
                      <p className="text-xs text-gray-500">Money back</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Secure Payment</p>
                      <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
