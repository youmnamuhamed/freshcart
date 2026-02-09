"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormValues } from "../../Schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../Schemas/signup.schema";
import signUpActions from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    try {
      const response = await signUpActions(values);
      console.log(response);

      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignUpFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h1>
          <p>Start your fresh journey with us today</p>
        </div>

        {/* Social buttons */}
        <div className="register-options flex gap-2 *:grow my-10">
          <button className="btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            Google
          </button>

          <button className="btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
            Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ali"
              className="form-control"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 mt-1"> * {errors.name.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="ali@example.com"
              className="form-control"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-1"> * {errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              className="form-control"
              {...register("password")}
            />
            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div
                  className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Password strength: Weak"
                >
                  <div className="progress bg-red-500 h-full transition-all duration-300 ease-out w-0"></div>
                </div>
                <span className="text-sm font-medium min-w-12.5">Weak</span>
              </div>
              <p className="text-gray-500 mt-2 text-xs">
                Must be at least 8 characters with numbers and symbols
              </p>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1"> * {errors.password.message}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rePaasword">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              id="rePaasword"
              type="password"
              placeholder="Confirm your password"
              className="form-control"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 mt-1">* {errors.rePassword.message}</p>
            )}
          </div>
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNum">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNum"
              type="tel"
              placeholder="+1 234 567 8900"
              className="form-control"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1"> * {errors.phone.message}</p>
            )}
          </div>
          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" {...register("terms")} />
            <p className="text-gray-600">
              I agree to the{" "}
              <span className="text-green-600 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-green-600 cursor-pointer">
                Privacy Policy
              </span>{" "}
              <span className="text-red-500">*</span>
            </p>
            {errors.terms && (
              <p className="text-red-500 mt-1"> * {errors.terms.message}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 cusror-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} />
                Creating an account
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} />
                Create My Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
