import {
  faCheck,
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductShipping() {
  return (
    <>
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <h4 className="font-semibold text-gray-900">
                  Shipping Information
                </h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Free shipping on orders over $50</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Standard delivery: 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Express delivery available (1-2 business days)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Track your order in real-time</span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faRotateLeft} />
                </div>
                <h4 className="font-semibold text-gray-900">
                  Returns & Refunds
                </h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>30-day hassle-free returns</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Full refund or exchange available</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Free return shipping on defective items</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Easy online return process</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
            <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faShieldHalved} />{" "}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Buyer Protection Guarantee
              </h4>
              <p className="text-sm text-gray-600">
                Get a full refund if your order doesn't arrive or isn't as
                described. We ensure your shopping experience is safe and
                secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
