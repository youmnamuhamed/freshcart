"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddAddressPayload,
  Address,
} from "@/features/Profile/Types/addresses.types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAddressSchema,
  AddAddressFormValues,
} from "../../Schemas/address.schema";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddAddressPayload) => void;
  initialValues?: Address | null;
}

export default function AddAddressModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressSchema),
  });

  const onSubmitHandler = (data: AddAddressFormValues) => {
    console.log(data);
    onSubmit(data);
    reset();
    onClose();
  };

  // Always call hooks first
  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name,
        details: initialValues.details,
        phone: initialValues.phone,
        city: initialValues.city,
      });
    } else {
      reset({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
    }
  }, [initialValues, reset]);

  // Then conditionally render the modal
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
            {/* Address Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Name
              </label>
              <input
                type="text"
                placeholder="e.g. Home, Office"
                {...register("name")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address
              </label>
              <textarea
                placeholder="Street, building, apartment..."
                {...register("details")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />

              {errors.details && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>

            {/* Phone + City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Cairo"
                  {...register("city")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />

                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
              >
                {initialValues ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
