"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "../../types/products.types";

export default function ProductReviews({ product }: { product: IProduct }) {
  const { ratingsAverage, ratingsQuantity } = product;

  const total = ratingsQuantity || 0;

  const ratingBreakdown = [
    { stars: 5, count: Math.round(total * 0.6) },
    { stars: 4, count: Math.round(total * 0.2) },
    { stars: 3, count: Math.round(total * 0.1) },
    { stars: 2, count: Math.round(total * 0.07) },
    { stars: 1, count: Math.round(total * 0.03) },
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {ratingsAverage?.toFixed(1)}
            </div>

            <div className="flex justify-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    i < Math.round(ratingsAverage)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Based on {ratingsQuantity} reviews
            </p>
          </div>

          <div className="flex-1 w-full">
            {ratingBreakdown.map((rating) => {
              const percentage = total > 0 ? (rating.count / total) * 100 : 0;

              return (
                <div
                  key={rating.stars}
                  className="flex items-center gap-3 mb-2"
                >
                  <span className="text-sm text-gray-600 w-12">
                    {rating.stars} star
                  </span>

                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <span className="text-sm text-gray-500 w-10">
                    {rating.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="text-center py-8">
            <FontAwesomeIcon
              icon={faStar}
              className="text-4xl text-gray-300 mb-3"
            />
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
            <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
