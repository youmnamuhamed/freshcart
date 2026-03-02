"use client";
import ChangePasswordForm from "@/features/Authentication/Components/ChangePassword/ChangePasswordForm";
import {
  faChevronRight,
  faFloppyDisk,
  faGear,
  faLocationDot,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UpdateProfileForm from "../UpdateProfile/UpdateProfileForm";

export default function Settings() {
  const pathname = usePathname();

  const isAddresses = pathname === "/profile/addresses";
  const isSettings = pathname === "/profile/settings";
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">My Account</h2>
              </div>
              <ul className="p-2">
                <li>
                  <Link
                    href="/profile/addresses"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isAddresses
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isAddresses
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <span className="font-medium flex-1">My Addresses</span>

                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-xs ${
                        isAddresses ? "text-primary-500" : "text-gray-400"
                      }`}
                    />
                  </Link>
                </li>

                {/* Settings Link */}
                <li>
                  <Link
                    href="/profile/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isSettings
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSettings
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faGear} />
                    </div>

                    <span className="font-medium flex-1">My Settings</span>

                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-xs ${
                        isSettings ? "text-primary-500" : "text-gray-400"
                      }`}
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Account settings{" "}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Update your profile information and change your password
                </p>
              </div>
              <UpdateProfileForm />
              <ChangePasswordForm />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
