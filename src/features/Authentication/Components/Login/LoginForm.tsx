"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faEye,
  faLock,
  faSpinner,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, LoginSchema } from "../../Schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginAction from "../../server/login.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setToken } from "../../server/auth.action";
import { setAuthInfo } from "@/Store/auth.slice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await LoginAction(values);
      if (response?.success) {
        await setToken(response.data.token, values.rememberMe ?? false);
      
        
        dispatch(
          setAuthInfo({
            isAuthenticated: true,
            userInfo: { ...response.data.user },
          }),
        );

        toast.success(response.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof LoginFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-primary-600">
                Fresh
                <span className="text-gray-800">Cart</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className=" w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-red-500 text-lg"
              />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-500 text-lg"
              />
              <span className="text-gray-700 font-medium">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
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
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  {...register("email")}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="#"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  {" "}
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  {...register("password")}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                {...register("rememberMe")}
              />
              <p className="text-gray-600">Keep me signed in</p>
              {errors.rememberMe && (
                <p className="text-red-500 mt-1">{errors.rememberMe.message}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mb-6"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} />
                    <span>Signing in</span>
                  </>
                ) : (
                  <>{"Sign In"}</>
                )}
              </button>
            </div>
          </form>

          {/* Create Account Link */}
          <div className="text-center mb-6">
            <span className="text-gray-600">New to FreshCart? </span>
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Create an account
            </a>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faLock} className="mr-1" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUsers} className="mr-1" />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
