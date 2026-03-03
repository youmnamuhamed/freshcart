"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBox,
  faCartShopping,
  faChevronDown,
  faCircleUser,
  faGear,
  faGift,
  faHeadset,
  faHeart,
  faLocationDot,
  faPhone,
  faRightFromBracket,
  faSearch,
  faTruck,
  faUser,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import FreshCartLogo from "../../assets/Images/freshcart-logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/Store/store";
import useLogout from "@/features/Authentication/Hooks/useLogout";
import { GetAllCategories } from "@/features/Categories/server/categories.action";

export default function Navbar() {
  const { logout } = useLogout();

  const numberOfCartItems = useAppSelector(
    (state) => state.cart.numberOfCartItems,
  );

  const { isAuthenticated, userInfo } = useSelector(
    (appState: AppState) => appState.auth,
  );
  const userName = userInfo?.name || "";
  const pathname = usePathname();

  const navLinkClasses = (path: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? "text-primary-600"
        : "text-gray-700 hover:text-primary-600"
    }`;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function ToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    GetAllCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <>
      <div className="border-b border-gray-200 shadow-sm">
        {/* ── Top Bar ── */}
        <div className="hidden lg:block  text-gray-500 text-sm">
          <div className="container flex items-center justify-between py-2">
            {/* Left: promo messages */}
            <ul className="flex gap-6 items-center">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTruck} className="text-primary-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGift} className="text-primary-600" />
                <span>New Arrivals Daily</span>
              </li>
            </ul>

            {/* Right: contact + auth */}
            <ul className="flex gap-5 items-center">
              <li className="flex items-center gap-1.5 hover:text-primary-500">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+18001234567" className="">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-1.5 hover:text-primary-500">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
              <li className="w-px h-4 bg-white/40" />
              {isAuthenticated ? (
                <>
                  <li className="flex items-center gap-1.5 cursor-pointer hover:text-primary-500">
                    {/* Email as link to profile */}
                    <Link
                      href="/profile/addresses"
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <p>{userName}</p>
                    </Link>
                  </li>
                  <li
                    className="flex items-center gap-1.5 cursor-pointer hover:text-primary-500"
                    onClick={logout}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Sign Out</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Sign In</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signUp"
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <nav className="bg-white">
          <div className="container flex items-center gap-6 py-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src={FreshCartLogo} alt="FreshCart Logo" />
            </Link>

            {/* Search */}
            <div className="relative flex-1 hidden lg:flex max-w-xl">
              <input
                className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-12 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                placeholder="Search for products, brands and more..."
              />
              <button className="absolute right-0 top-0 bottom-0 bg-primary-600 hover:bg-primary-700 text-white rounded-full w-11 flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-6">
              <li>
                <Link href="/" className={navLinkClasses("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={navLinkClasses("/products")}>
                  Shop
                </Link>
              </li>
              <li className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200">
                  Categories
                  <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                </button>
                <menu className="hidden group-hover:block absolute top-full left-0 mt-2 min-w-52 bg-white rounded-lg shadow-lg border border-gray-100 divide-y divide-gray-100 z-50">
                  <li className="px-4 py-3 hover:bg-gray-50">
                    <Link
                      href={`/categories`}
                      className="text-sm text-gray-700 hover:text-primary-600"
                    >
                      All categories
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat._id} className="px-4 py-3 hover:bg-gray-50">
                      <Link
                        href={`/products?category=${cat._id}`}
                        className="text-sm text-gray-700 hover:text-primary-600"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </menu>
              </li>
              <li>
                <Link href="/brands" className={navLinkClasses("/brands")}>
                  Brands
                </Link>
              </li>
            </ul>

            {/* Right Icons */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              {/* Support */}
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                  <FontAwesomeIcon icon={faHeadset} className="text-lg" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs text-gray-400">Support</p>
                  <p className="text-xs font-semibold text-gray-700">
                    24/7 Help
                  </p>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
              >
                <div>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors "
                  />
                  <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {numberOfCartItems}
                  </span>
                </div>
              </Link>

              {isAuthenticated ? (
                <div className="hidden lg:block relative" ref={menuRef}>
                  {/* User Icon Button */}
                  <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className=" p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  >
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className=" text-xl text-gray-500 group-hover:text-primary-600 transition-colors"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenu && (
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/profile/addresses"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FontAwesomeIcon icon={faUser} />
                        My Profile
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FontAwesomeIcon icon={faBox} />
                        My Orders
                      </Link>

                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        My Wishlist
                      </Link>

                      <Link
                        href="/profile/addresses"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FontAwesomeIcon icon={faLocationDot} />
                        Addresses
                      </Link>

                      <Link
                        href="/profile/settings"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <FontAwesomeIcon icon={faGear} />
                        Settings
                      </Link>

                      <div className="border-t my-2"></div>

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 text-sm"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden ml-auto btn text-white bg-primary-600"
              onClick={ToggleMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Off-Canvas Mobile Menu ── */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed z-30 inset-0 bg-black/50 cursor-pointer"
            onClick={ToggleMenu}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 bottom-0 w-80 z-40 bg-white flex flex-col animate-slide-in overflow-y-auto">
            {/* Search */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="relative">
                <input
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg py-3 pl-4 pr-12 text-sm outline-none focus:border-primary-500 focus:bg-white transition"
                  placeholder="Search products..."
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg w-8 h-8 flex items-center justify-center transition-colors">
                  <FontAwesomeIcon icon={faSearch} className="text-xs" />
                </button>
              </div>
            </div>

            {/* Nav Links */}
            <div className="px-5 py-4 border-b border-gray-100">
              <ul className="space-y-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop" },
                  { href: "/categories", label: "Categories" },
                  { href: "/brands", label: "Brands" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={ToggleMenu}
                      className={`block px-3 py-3.5 text-base font-medium transition-colors rounded-lg ${
                        pathname === href
                          ? "text-primary-600"
                          : "text-gray-700 hover:text-primary-600"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wishlist & Cart */}
            <div className="px-5 py-4 border-b border-gray-100">
              <ul className="space-y-2">
                {/* Wishlist */}
                <li>
                  <Link
                    href="/wishlist"
                    onClick={ToggleMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <span className="text-base font-medium">Wishlist</span>
                  </Link>
                </li>
                {/* Cart */}
                <li>
                  <Link
                    href="/cart"
                    onClick={ToggleMenu}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                        <FontAwesomeIcon icon={faCartShopping} />
                      </div>
                      <span className="text-base font-medium">Cart</span>
                    </div>
                    <span className="bg-primary-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {numberOfCartItems}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sign In / Sign Up buttons */}
            <div className="px-5 py-4 border-b border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {/* Email + Profile */}
                  <Link
                    href="/profile"
                    onClick={ToggleMenu}
                    className="block text-center text-gray-700 font-medium hover:text-primary-600"
                  >
                    <p>{userName}</p>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();
                      ToggleMenu();
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={ToggleMenu}
                    className="flex-1 text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signUp"
                    onClick={ToggleMenu}
                    className="flex-1 text-center border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Need Help */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray-800">
                    Need Help?
                  </p>
                  <p className="text-xs text-gray-400">Contact Support</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
