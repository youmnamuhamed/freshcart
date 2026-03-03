import {
  faCheck,
  faCreditCard,
  faMoneyBill,
  faShieldHalved,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaymentMethodsProps {
  selectedMethod: "cash" | "card";
  changeMethod: (method: "cash" | "card") => void;
}
export default function PaymentMethods({
  selectedMethod,
  changeMethod,
}: PaymentMethodsProps) {
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faWallet} />
            Payment Method
          </h2>
          <p className="text-primary-100 text-sm mt-1">
            Choose how you'd like to pay
          </p>
        </div>
        <div className="p-6 space-y-4">
          <button
            type="button"
            className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group  ${selectedMethod === "cash" ? "border-2 border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => {
              changeMethod("cash");
            }}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all  ${selectedMethod === "cash" ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30" : " bg-gray-100 group-hover:bg-gray-200 "}`}
            >
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-primary-700">Cash on Delivery</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Pay when your order arrives at your doorstep
              </p>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${selectedMethod === "cash" ? "bg-primary-600 text-white" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            >
              {selectedMethod === "cash" && <FontAwesomeIcon icon={faCheck} />}
            </div>
          </button>
          <button
            type="button"
            className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group  ${selectedMethod === "card" ? "border-2 border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => {
              changeMethod("card");
            }}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all  ${selectedMethod === "card" ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30" : " bg-gray-100 group-hover:bg-gray-200 "}`}
            >
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-primary-700">Pay Online</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Secure payment with Credit/Debit Card via Stripe
              </p>
              <div className="flex items-center gap-2 mt-2">
                {/* <Image
                          className="h-5"
                          width={5}
                          height={5}
                          alt="visa"
                          src="https://img.icons8.com/color/48/visa.png"
                        ></Image>
                        <Image
                          className="h-5"
                          width={5}
                          height={5}
                          alt="Master card"
                          src="https://img.icons8.com/color/48/mastercard.png"
                        ></Image>
                        <Image
                          className="h-5"
                          width={5}
                          height={5}
                          alt="amex"
                          src="https://img.icons8.com/color/48/amex.png"
                        ></Image> */}
              </div>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${selectedMethod === "card" ? "bg-primary-600 text-white" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            >
              {selectedMethod === "card" && <FontAwesomeIcon icon={faCheck} />}
            </div>
          </button>
          <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                Secure & Encrypted
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
