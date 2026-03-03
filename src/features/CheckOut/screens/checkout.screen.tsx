"use client";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  shippingAddressSchema,
  shippingAddressValues,
} from "../schema/checkout.schema";
import ShippingForm from "../components/ShippingForm";
import PaymentMethods from "../components/PaymentMethods";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/store";
import { createCashOrder, createOnlineOrder } from "../server/checkouts.action";
import OrderSummary from "../components/OrderSummary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/Cart/Store/cart.slice";

export default function CheckOutScreen() {
  const { numberOfCartItems, totalCartPriced, products } = useAppSelector(
    (state) => state.cart,
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(shippingAddressSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { cartId } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<shippingAddressValues> = async (values) => {
    try {
      if (!cartId) {
        return;
      }
      if (paymentMethod === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: values,
        });
        console.log(response);
        if (response.status === "success") {
          toast.success("Order created successfully");
          dispatch(clearCart());
          reset();
          setTimeout(() => {
            router.push("/orders");
          }, 3000);
        }
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: values,
          url: location.origin,
        });
        console.log(response);
        if (response.status === "success") {
          toast.loading("redirecting you to payment gateway");
          dispatch(clearCart());
          setTimeout(() => {
            location.href = response.session.url;
          }, 3000);
        }
      }
    } catch (error) {}
  };

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  return (
    <>
      <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href={`/`} className="hover:text-primary-600 transition">
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href={`/cart`}
                className="hover:text-primary-600 transition"
              >
                Cart
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <FontAwesomeIcon icon={faReceipt} />
                  </span>
                  Complete Your Order
                </h1>
                <p className="text-gray-500 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>
              <Link
                href={`/cart`}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
              >
                Back to cart
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ShippingForm register={register} errors={errors} />

                <PaymentMethods
                  selectedMethod={paymentMethod}
                  changeMethod={setPaymentMethod}
                />
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                  totalCartPrice={totalCartPriced}
                  numOfCartItems={numberOfCartItems}
                  cartItems={products}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
