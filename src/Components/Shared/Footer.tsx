import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faTruck,
  faRotateLeft,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import FreshCartLogo from "../../assets/Images/freshcart-logo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* 🔹 Features strip */}
      <div className="bg-green-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: faTruck,
                title: "Free Shipping",
                desc: "On orders over 500 EGP",
              },
              {
                icon: faRotateLeft,
                title: "Easy Returns",
                desc: "14-day return policy",
              },
              {
                icon: faShieldHalved,
                title: "Secure Payment",
                desc: "100% secure checkout",
              },
              {
                icon: faHeadset,
                title: "24/7 Support",
                desc: "Contact us anytime",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FontAwesomeIcon icon={item.icon} className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Main footer */}
      <div className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href={`/`} className="inline-block mb-6">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <Image src={FreshCartLogo} alt="FreshCart logo" />
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <Link
                href={`/`}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                <span>+1 (800) 123-4567</span>
              </Link>
              
              <Link
                href={`/`}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500" />
                <span>support@freshcart.com</span>
              </Link>

              <Link
                href={`/`}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-green-500"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[faFacebookF, faTwitter, faInstagram, faYoutube].map(
                (icon, i) => (
                  <Link
                    key={i}
                    href={`/`}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-primary-400">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/electronics" className="hover:text-primary-400">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-primary-400">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-primary-400">
                  Women's Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Account</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/account" className="hover:text-primary-400">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary-400">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-primary-400">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary-400">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-primary-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-primary-400">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary-400">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-primary-400">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/policy" className="hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary-400">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12">
          <div className="container mx-auto py-4 text-gray-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
