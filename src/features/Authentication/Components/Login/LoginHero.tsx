import {
  faClock,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import LoginHeroImage from "../../../../assets/Images/LoginHero.png";

export default function LoginHero() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Hero Image Container */}

          <div className="text-center space-y-6">
            <Image
              src={LoginHeroImage}
              alt="Login Hero"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            ></Image>
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800 py-4">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>
            {/* Features */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              {/* Free Delivery */}
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="svg-inline--fa fa-shield-halved text-primary-600 mr-2"
                />

                <span className="text-gray-700 font-medium">Free Delivery</span>
              </div>
              {/* Secure Payment */}
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className=" text-primary-600 mr-2"
                />

                <span className="text-gray-700 font-medium">
                  Secure Payment
                </span>
              </div>
              {/* 24/7 Support */}
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faClock}
                  className=" text-primary-600 mr-2"
                />
                <span className="text-gray-700 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
