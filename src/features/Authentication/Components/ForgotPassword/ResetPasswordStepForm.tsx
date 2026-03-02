"use client";

import {
  faArrowLeft,
  faEnvelope,
  faKey,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormValues,
  ResetPasswordSchema,
} from "../../Schemas/resetPassword.schema";
import resetPasswordAction from "../../server/resetPawssord.action";
import { toast } from "react-toastify";

type ResetPasswordStepFormProps = {
  resetCode: string; // optional if API needs it
  onDone: () => void;
  onBack: () => void;
};

export default function ResetPasswordStepForm({
  resetCode,
  onDone,
  onBack,
}: ResetPasswordStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (values) => {
    try {
      const response = await resetPasswordAction(values);

      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          onDone();
        }, 1000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof ResetPasswordFormValues, {
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
            Reset Password
          </h1>
          <p className="text-gray-500">
            Enter your email and new password to reset your account
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
            <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-primary-600"></div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white">
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...register("newPassword")}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="rePassword"
                type="password"
                placeholder="Confirm password"
                {...register("rePassword")}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.rePassword && (
              <p className="text-red-500 mt-1">{errors.rePassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Back Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Verify Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
