import { faLeaf, faTag, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Newsletter() {
  return (
    <section className=" py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-500 p-4 rounded-2xl shadow-md">
                <FontAwesomeIcon icon={faLeaf} className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-green-600 font-semibold text-sm">
                  NEWSLETTER
                </p>
                <p className="text-gray-500 text-sm">50,000+ subscribers</p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-bold text-gray-800 leading-snug mb-4">
              Get the Freshest Updates{" "}
              <span className="text-green-600">Delivered Free</span>
            </h2>

            <p className="text-gray-600 mb-6">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="text-green-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700">
                  Fresh Picks Weekly
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-green-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700">
                  Free Delivery Codes
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FontAwesomeIcon
                  icon={faTag}
                  className="text-green-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700">
                  Members-Only Deals
                </span>
              </div>
            </div>

            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
                Subscribe →
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* RIGHT SIDE - APP CARD */}
          <div className="bg-linear-to-br from-[#0f172a] to-[#0b3d2e] text-white rounded-3xl p-10 shadow-xl">
            <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full text-xs font-semibold">
              📱 MOBILE APP
            </span>

            <h3 className="text-2xl font-bold mt-6 mb-3">
              Shop Faster on Our App
            </h3>

            <p className="text-gray-300 mb-6">
              Get app-exclusive deals & 15% off your first order.
            </p>

            {/* Store Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-white/10 hover:bg-white/20 transition rounded-xl py-4 text-left px-6">
                 Download on the App Store
              </button>

              <button className="w-full bg-white/10 hover:bg-white/20 transition rounded-xl py-4 text-left px-6">
                ▶ Get it on Google Play
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              ⭐⭐⭐⭐⭐ 4.9 · 100K+ downloads
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
