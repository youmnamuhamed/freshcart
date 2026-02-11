import {
  faHeadset,
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const features = [
  {
    icon: faTruck,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: faShieldHalved,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: faRotateLeft,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: faHeadset,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default function promoBanner() {
  return (
    <>
      <div className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                key={index}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${feature.iconBgColor} ${feature.iconColor} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className={`${feature.iconColor} text-xl`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
