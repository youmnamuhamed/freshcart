"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderImage from "../../../assets/Images/home-slider-1.png";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <>
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
        >
          {/* slide design */}
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${SliderImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex items-center h-100 justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    {" "}
                    Fresh Products Delivered to your Door
                  </h2>
                  <p style={{ opacity: 1 }}>Get 20% off your first order</p>
                  <div className="mt-4" style={{ opacity: 1 }}>
                    <button>
                      <Link
                        href={`/products`}
                        className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Shop Now
                      </Link>
                    </button>
                    <button>
                      <Link
                        href={`/deals`}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        View Deals
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${SliderImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex items-center h-100 justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    {" "}
                    Premium Quality Guaranteed
                  </h2>
                  <p style={{ opacity: 1 }}>Fresh from farm to your table</p>
                  <div className="mt-4" style={{ opacity: 1 }}>
                    <button>
                      <Link
                        href={`/products`}
                        className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Shop Now
                      </Link>
                    </button>
                    <button>
                      <Link
                        href={`/about`}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Learn More
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${SliderImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex items-center h-100 justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container h-full content-center">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    {" "}
                    Fast & Free Delivery
                  </h2>
                  <p style={{ opacity: 1 }}>Same day delivery available</p>
                  <div className="mt-4" style={{ opacity: 1 }}>
                    <button>
                      <Link
                        href={`/products`}
                        className="btn bg-white border-2 border-white/50 text-purple-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Shop Now
                      </Link>
                    </button>
                    <button>
                      <Link
                        href={`/about`}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Learn More
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </section>
    </>
  );
}
