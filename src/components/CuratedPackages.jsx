// Import statements and package data
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCuratedPackages } from "../services/packageService";
import {
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
} from "../assets/index.js";

// Fallback static data in case Firebase data is not available
const fallbackPackages = [
  { title: "Thailand 5 Days Tour", imageUrl: pkg1Jpg },
  { title: "Baku", imageUrl: pkg2Jpg },
  { title: "E-Visa", imageUrl: pkg3Jpg },
  { title: "Amercia Visa", imageUrl: pkg4Jpg },
  { title: "Visit Visa Dubai", imageUrl: pkg5Jpg },
  { title: "Europe Visa", imageUrl: pkg6Jpg },
  { title: "London Tour", imageUrl: pkg7Jpg },
  { title: "UK Visa", imageUrl: pkg8Jpg },
];

const CuratedPackages = ({ openGlobalModal }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window width for breakpoint checks
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log("🔍 [CURATED] Starting to fetch data...");
        const data = await fetchCuratedPackages();

        console.log("📊 [CURATED] Raw Firebase data:", data);
        console.log("📊 [CURATED] Data count:", data ? data.length : 0);

        if (data && data.length > 0) {
          console.log("✅ [CURATED] Using Firebase data");
          console.log("📋 [CURATED] Sample item structure:", data[0]);

          const mappedData = data.map((pkg, index) => {
            console.log(`📦 [CURATED] Mapping package ${index + 1}:`, pkg);
            return {
              title: pkg.title || pkg.name,
              imageUrl: pkg.imageUrl,
            };
          });
          console.log("✅ [CURATED] Final mapped data:", mappedData);
          setPackages(mappedData);
        } else {
          console.log(
            "❌ [CURATED] No Firebase data found, using fallback data",
          );
          console.log(
            "📋 [CURATED] Fallback data count:",
            fallbackPackages.length,
          );
          setPackages(fallbackPackages);
        }
      } catch (err) {
        console.error("🚨 [CURATED] Error loading packages:", err);
        setError(err.message);
        setPackages(fallbackPackages);
      } finally {
        setLoading(false);
        console.log("✅ [CURATED] Loading completed");
      }
    };

    loadPackages();
  }, []);

  // Minimum items required for carousel based on screen size
  const getMinItemsRequired = () => {
    if (windowWidth >= 1024) return 4; // Large screens
    if (windowWidth >= 768) return 4; // Medium screens
    return 2; // Small screens
  };

  const shouldShowCarousel = packages.length >= getMinItemsRequired();

  if (loading) {
    return (
      <section className="py-12 md:py-20 flex flex-col justify-center px-4 md:px-12 lg:px-20 font-dm max-w-[1536px] mx-auto">
        <h2 className="text-3xl font-semibold text-right text-gray-800 mb-8">
          Explore Our <span className="text-orange-500">Curated Packages</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md animate-pulse"
            >
              <div className="aspect-square bg-gray-300 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 flex flex-col justify-center px-4 md:px-12 lg:px-20 font-dm max-w-[1536px] mx-auto overflow-hidden bg-white">
      <h2 className="text-3xl font-semibold text-right text-gray-800 mb-8">
        Explore Our <span className="text-orange-500">Curated Packages</span>
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <p>Unable to load packages from server. Showing cached data.</p>
        </div>
      )}

      {shouldShowCarousel ? (
        <div className="relative flex-1 flex items-center">
          {/* Custom Nav Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-32px] md:left-[-40px] z-10">
            <button
              className="text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer"
              ref={prevRef}
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-32px] md:right-[-40px] z-10">
            <button
              className="text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer"
              ref={nextRef}
            >
              <ChevronRight />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            centeredSlides={true}
            initialSlide={1}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-8 w-full"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div
                  className="group relative overflow-hidden cursor-pointer h-[500px] w-full bg-gray-100"
                  onClick={() => openGlobalModal(pkg.title)}
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Minimalistic Gradient Mask (Bottom to Center) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />

                  {/* Content - Bottom Aligned */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start justify-end transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-white text-2xl font-bold font-sansita mb-2 tracking-wide">
                      {pkg.title}
                    </h3>

                    {/* Button reveals on hover */}
                    <button className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-sm font-medium text-white/90 hover:text-[#EB662B] border-b border-[#EB662B] pb-1 uppercase tracking-widest">
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="group relative overflow-hidden cursor-pointer h-[500px] w-full bg-gray-100"
              onClick={() => openGlobalModal(pkg.title)}
            >
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Minimalistic Gradient Mask (Bottom to Center) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />

              {/* Content - Bottom Aligned */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start justify-end transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-white text-2xl font-bold font-sansita mb-2 tracking-wide">
                  {pkg.title}
                </h3>

                {/* Button reveals on hover */}
                <button className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-sm font-medium text-white/90 hover:text-[#EB662B] border-b border-[#EB662B] pb-1 uppercase tracking-widest">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CuratedPackages;
