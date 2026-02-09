"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBabyCarriage,
  faBars,
  faBolt,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faHeart,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSearch,
  faSuitcaseMedical,
  faUser,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import FreshCartLogo from "../../assets/Images/freshcart-logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/Store/store";
import { is } from "zod/v4/locales";
import useLogout from "@/features/Authentication/Hooks/useLogout";
export default function Navbar() {

  const { logout } = useLogout();


  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );

  const pathname = usePathname();
  const linkClasses = (path: string) =>
    `flex flex-col gap-2 transition-colors duration-200
   ${pathname === path ? "text-primary-600" : "hover:text-primary-600"}`;

  const MobileLinkClasses = (path: string) =>
    `flex gap-2 transition-colors duration-200
   ${pathname === path ? "text-primary-600 bg-primary-300/50 rounded" : ""}`;

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

  return (
    <>
      <header>
        <div className="container">
          {/* top */}
          <div className="hidden  lg:flex items-center justify-between py-2 border-b border-gray-300/50">
            <ul className="flex gap-5 items-center *:flex *:gap-2 *:items-center">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1(800) 123-456"> +1(800) 123-456</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a>Support @freshcart.com</a>
              </li>
            </ul>
            <ul className="flex gap-5 items-center">
              <li>
                <Link href={`track-order`}>Track order</Link>
              </li>
              <li>
                <Link href={`About`}>About</Link>
              </li>
              <li>
                <Link href={`contact`}>Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option value={`en`}>English</option>
                  <option value={`ar`}>Arabic</option>
                </select>
              </li>
            </ul>
          </div>
          {/* main */}
          <nav className="flex justify-between items-center py-6">
            <h1>
              <Link href="/">
                <Image src={FreshCartLogo} alt="FreshCart Logo"></Image>
              </Link>
            </h1>
            <search className="relative hidden lg:flex">
              <input
                className="form-control min-w-96"
                placeholder="Search for products"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-2 top-1/2 -translate-1/2"
              />
            </search>

            <ul className="hidden lg:flex gap-8 items-center">
              <li>
                <Link href="/wishlist" className={linkClasses("/wishlist")}>
                  <div className="flex flex-col items-center gap-1">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                    <span className="text-sm">WishList</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link href="/cart" className={linkClasses("/cart")}>
                  <div className="flex flex-col items-center gap-1">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-xl"
                    />
                    <span className="text-sm">Cart</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link href="/account" className={linkClasses("/account")}>
                  <div className="flex flex-col items-center gap-1">
                    <FontAwesomeIcon icon={faUser} className="text-xl" />
                    <span className="text-sm">Account</span>
                  </div>
                </Link>
              </li>

              {isAuthenticated ? (
                <li
                  className="flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-200"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-xl"
                  />
                  <span className="text-sm">Logout</span>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/signUp" className={linkClasses("/signup")}>
                      <div className="flex flex-col items-center gap-1">
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          className="text-xl"
                        />
                        <span className="text-sm">SignUp</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link href="/login" className={linkClasses("/login")}>
                      <div className="flex flex-col items-center gap-1">
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          className="text-xl"
                        />
                        <span className="text-sm">Login</span>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="lg:hidden btn text-white bg-primary-600 "
              onClick={ToggleMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </nav>
        </div>
        {/* categories nav */}
        <nav className="hidden lg:flex bg-gray-100 w-full py-4">
          <div className="container flex gap-8 items-center">
            <div className="relative group">
              <button className="btn flex items-center gap-3 bg-primary-600 text-white hover:bg-primary-600/90">
                <FontAwesomeIcon icon={faBars} />
                <span>All categories</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <menu className="hidden group-hover:block absolute top-10 min-w-60 *:py-3 *:px-3 *:hover:bg-gray-100 rounded-lg bg-white  divide-y-2 divide-gray-300/30">
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-primary-600 text-xl "
                    />
                    <span>Men's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faPersonDress}
                      className="text-primary-600 text-xl "
                    />
                    <span>Women's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faBabyCarriage}
                      className="text-primary-600 text-xl "
                    />
                    <span>Baby & Toys</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faSuitcaseMedical}
                      className="text-primary-600 text-xl "
                    />
                    <span>Beauty & Health</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faBolt}
                      className="text-primary-600 text-xl "
                    />
                    <span>Electronics</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-primary-600 text-xl "
                    />
                    <span>View all categories</span>
                  </Link>
                </li>
              </menu>
            </div>

            <ul className="flex gap-5 ">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <Link href={`/recently-added`}>Recently Added</Link>
              </li>
              <li>
                <Link href={`/featured-products`}>Featured products</Link>
              </li>
              <li>
                <Link href={`/offers`}>Offers</Link>
              </li>
              <li>
                <Link href={`/brands`}>Brands</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* OFF Canvas */}
        {isMenuOpen && (
          <>
            <div
              className=" background fixed z-30 inset-0 bg-black/50 cusror-pointer"
              onClick={ToggleMenu}
            ></div>
            <div className="offCanvas fixed top-0 left-0 bottom-0 w-72 z-40 p-5 bg-white space-y-5 animate-slide-in">
              <div className="flex justify-between items-center pb-5">
                <Image src={FreshCartLogo} alt="FreshCart Logo" />
                <button className="btn rounded-full" onClick={ToggleMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="border-t-2 border-gray-300 pt-5">
                <search className="relative">
                  <input
                    className="form-control min-w-64"
                    placeholder="Search for products"
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-2 top-1/2 -translate-1/2"
                  />
                </search>
              </div>

              <div>
                <h2 className="text-xl font-bold">Main Menu</h2>
                <ul className=" py-3 px-2 *:hover:bg-gray-100 transition-colors duration-200 space-y-3">
                  <li>
                    <Link
                      href="/wishlist"
                      className={MobileLinkClasses("/wishlist") + ` py-3 px-2`}
                    >
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faHeart} className="text-xl" />
                        <span className="text-sm">WishList</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/cart"
                      className={MobileLinkClasses("/cart") + `py-3 px-2`}
                    >
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-xl"
                        />
                        <span className="text-sm">Cart</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/account"
                      className={MobileLinkClasses("/account") + ` py-3 px-2`}
                    >
                      <div className="flex  items-center gap-1">
                        <FontAwesomeIcon icon={faUser} className="text-xl" />
                        <span className="text-sm">Account</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-gray-300 pt-5">
                <h2 className="text-xl font-bold">Account</h2>
                <ul className="py-3 px-2 *:hover:bg-gray-100 transition-colors duration-200 space-y-3">
                  {isAuthenticated ? (
                    <li
                      className="flex  items-center gap-1 hover:text-primary-600  transition-colors duration-200 py-3 px-2"
                      onClick={logout}
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-xl"
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/signup"
                          className={
                            MobileLinkClasses("/signup") + ` py-3 px-2`
                          }
                        >
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              className="text-xl"
                            />
                            <span className="text-sm">SignUp</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/login"
                          className={MobileLinkClasses("/login") + ` py-3 px-2`}
                        >
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon
                              icon={faAddressCard}
                              className="text-xl"
                            />
                            <span className="text-sm">Login</span>
                          </div>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
