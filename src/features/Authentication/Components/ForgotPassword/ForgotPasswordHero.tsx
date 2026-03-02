import {
  faEnvelope,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ForgotPasswordHero() {
  return (
    <>
      <div className="hidden lg:block">
        <div className="text-center space-y-6">
          <div className="w-full h-96 bg-linear-to-br from-primary-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary-100/50" />
            <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
            <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50" />

            <div className="relative flex flex-col items-center gap-6 z-10">
              <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLock} />
                </div>
              </div>
              <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>

              <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-primary-400 animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-primary-500 animate-pulse [animation-delay:150ms]" />
                <span className="w-3 h-3 rounded-full bg-primary-600 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Reset Your Password
            </h2>
            <p className="text-lg text-gray-600">
              Don't worry, it happens to the best of us. We'll help you get back
              into your account in no time.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} />
                Email Verification
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faShieldHalved} />
                Secure Reset
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} />
                Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
