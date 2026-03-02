"use client";

import { useRef } from "react";
import { IProduct } from "../../types/products.types";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RelatedProductsCarousel({
  products,
}: {
  products: IProduct[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scrollbar-hide scroll-smooth px-12"
      >
        {products.map((product) => (
          <div key={product._id} className="min-w-62.5">
            <ProductCard info={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
