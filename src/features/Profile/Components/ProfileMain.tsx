import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function ProfileMain() {
  return (
    <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          <Link
            className="hover:text-white transition-colors duration-200"
            href={`/`}
          >
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">My Account</span>
        </nav>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              My Account
            </h1>
            <p className="text-white/80 mt-1">
              Manage your addresses and account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
