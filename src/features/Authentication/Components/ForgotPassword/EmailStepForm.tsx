"use client";

import {
  faArrowLeft,
  faEnvelope,
  faKey,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from "../../Schemas/forgotPassword.schema";
import forgotPasswordAction from "../../server/forgotPassword.action";
import { toast } from "react-toastify";

type EmailStepFormProps = {
  onNext: () => void;
};

export default function EmailStepForm({ onNext }: EmailStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (values) => {
    try {
      const response = await forgotPasswordAction(values);

      if (response?.success) {
        toast.success(response.message);

        setTimeout(() => {
          onNext(); 
        }, 1500);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof ForgotPasswordFormValues, {
              message: response.errors![key],
            });
          });
        } else {
          toast.error(response?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            Forgot Password?
          </h1>
          <p className="text-gray-500">
            No worries, we'll send you a reset code
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {" "}
          <div className="flex items-center">
            {" "}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} />{" "}
            </div>{" "}
            <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>{" "}
          </div>{" "}
          <div className="flex items-center">
            {" "}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
              {" "}
              <FontAwesomeIcon icon={faKey} />{" "}
            </div>{" "}
            <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>{" "}
          </div>{" "}
          <div className="flex items-center">
            {" "}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
              {" "}
              <FontAwesomeIcon icon={faLock} />{" "}
            </div>{" "}
          </div>{" "}
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
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
                Sending...
              </>
            ) : (
              "Send Reset Code"
            )}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
