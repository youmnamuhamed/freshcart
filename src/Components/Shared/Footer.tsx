import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
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
    <footer className="bg-gray-900 text-gray-300 py-12">
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
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
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
            <Link
              href={`/`}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              href={`/`}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              href={`/`}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              href={`/`}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div className="sm:col-span-1 md:col-span-1">
          <h3 className="font-semibold text-lg mb-5">Shop</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href={`/products`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href={`/categories`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href={`/Brands`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href={`/electronics`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href={`/men's Fashion`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Men's Fashion
              </Link>
            </li>
            <li>
              <Link
                href={`/Women's Fashion`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Women's Fashion
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="sm:col-span-1 md:col-span-1">
          <h3 className="font-semibold text-lg mb-5">Account</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href={`/account`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                href={`/Order History`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Order History
              </Link>
            </li>
            <li>
              <Link
                href={`/Wishlist`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href={`/Shopping Cart`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link
                href={`/Signin`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href={`/signup`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="sm:col-span-1 md:col-span-1">
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href={`/contact`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href={`/Shipping Info`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Shipping Info
              </Link>
            </li>
            <li>
              <Link
                href={`/Returns & Refunds`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link
                href={`/Track Order`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href={`/policy`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href={`/policy`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href={`/policy`}
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-12">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 FreshCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
