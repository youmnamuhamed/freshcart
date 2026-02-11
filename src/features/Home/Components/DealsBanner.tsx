import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DealsBanner() {
  return (
    <>
      <section className=" py-16 ">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-full text-sm font-medium">
                🔥 Deal of the Day
              </div>

              <h2 className="mt-6 text-4xl font-bold">Fresh Organic Fruits</h2>

              <p className="mt-4 text-lg text-white/80">
                Get up to 40% off on selected organic fruits
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl font-extrabold">40% OFF</span>
                <span className="text-lg">
                  Use code: <span className="font-semibold">ORGANIC40</span>
                </span>
              </div>

              <button className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                ✨ New Arrivals
              </div>

              <h2 className="mt-6 text-4xl font-bold">Exotic Vegetables</h2>

              <p className="mt-4 text-lg text-white/80">
                Discover our latest collection of premium vegetables
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl font-extrabold">25% OFF</span>
                <span className="text-lg">
                  Use code: <span className="font-semibold">FRESH25</span>
                </span>
              </div>

              <button className="mt-8 inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Explore Now
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
