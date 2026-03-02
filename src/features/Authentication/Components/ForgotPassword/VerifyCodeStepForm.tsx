"use client";

import {
  faArrowLeft,
  faEnvelope,
  faKey,
  faLock,
  faShieldHalved,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerifyResetCodeFormValues,
  VerifyResetCodeSchema,
} from "../../Schemas/verifyResetCode.schema";
import verifyResetCodeAction from "../../server/verifyResetCode.action";
import { toast } from "react-toastify";

type VerifyCodeStepFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function VerifyCodeStepForm({
  onNext,
  onBack,
}: VerifyCodeStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<VerifyResetCodeFormValues>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(VerifyResetCodeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<VerifyResetCodeFormValues> = async (values) => {
    try {
      const response = await verifyResetCodeAction(values);

      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          onNext();
        }, 1000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof VerifyResetCodeFormValues, {
              message: response.errors![key],
            });
          });
        } else {
          toast.error(response?.message || "Something went wrong");
        }
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h1>
          <p className="text-gray-500">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-primary-600"></div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
              <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="resetCode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Verification Code
            </label>

            <div className="relative">
              <input
                id="resetCode"
                type="text"
                placeholder="••••••"
                {...register("resetCode")}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.resetCode && (
              <p className="text-red-500 mt-1">{errors.resetCode.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 animate-spin"
                />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>

          <div className="text-center">
            <Link
              href="/forget-password"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Change Email Address
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
