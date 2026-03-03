import {
  faBagShopping,
  faBox,
  faCircleInfo,
  faCity,
  faHouse,
  faLocationDot,
  faPhone,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingAddressValues } from "../schema/checkout.schema";

interface shippingAddressProps {
  register: UseFormRegister<shippingAddressValues>;
  errors: FieldErrors<shippingAddressValues>;
}
export default function ShippingForm({
  register,
  errors,
}: shippingAddressProps) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faHouse} />
            Shipping Address
          </h2>
          <p className="text-primary-100 text-sm mt-1">
            Where should we deliver your order?
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Delivery Information
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                Please ensure your address is accurate for smooth delivery
              </p>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="city"
            >
              city
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faCity} />
              </div>
              <input
                className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                type="text"
                id="city"
                placeholder="e.g. Cairo, Alexandria, Giza"
                {...register("city")}
              ></input>
            </div>
            {errors.city && (
              <p className="text-sm mt-2 text-red-600 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full text-red-500"></span>
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="details"
            >
              Street Address
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <textarea
                className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                id="details"
                placeholder="Street name, building number, floor, apartment..."
                {...register("details")}
              ></textarea>
            </div>
            {errors.details && (
              <p className="text-sm mt-2 text-red-600 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full text-red-500"></span>
                {errors.details.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="phone"
            >
              city
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <input
                className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                type="tel"
                id="phone"
                placeholder="e.g. Cairo, Alexandria, Giza"
                {...register("phone")}
              ></input>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                Egyptian numbers only
              </span>
            </div>
            {errors.phone && (
              <p className="text-sm mt-2 text-red-600 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full text-red-500"></span>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
