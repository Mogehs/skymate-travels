import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import { Navigation, Autoplay } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import { fetchBestDeals } from "../services/packageService";
import { japan, italy, usa, europe, bgWallpaper } from "../assets/index.js"; // Import bgWallpaper
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; // Import icons
import BookingForm from "./BookingForm"; // Import BookingForm modal

// Fallback static data
const fallbackDeals = [
  {
    title: "Kyoto, Japan",
    days: "10 Days Trip",
    price: "$5.42k",
    imageUrl: japan,
    rating: 4.8,
  },
  {
    title: "Rome, Italy",
    days: "12 Days Trip",
    price: "$4.2k",
    imageUrl: italy,
    rating: 4.7,
  },
  {
    title: "New York City, USA",
    days: "28 Days Trip",
    price: "$15k",
    imageUrl: usa,
    rating: 4.9,
  },
  {
    title: "Full Europe",
    days: "28 Days Trip",
    price: "$15k",
    imageUrl: europe,
    rating: 4.8,
  },
  {
    title: "Bali, Indonesia",
    days: "7 Days Trip",
    price: "$3.5k",
    imageUrl: japan, // Reusing existing image as placeholder
    rating: 4.6,
  },
];

export default function BestDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        console.log("🔍 [BEST DEALS] Starting to fetch data...");
        const data = await fetchBestDeals();

        if (data && data.length > 0) {
          console.log("✅ [BEST DEALS] Using Firebase data");
          // Map Firebase data to component format
          const mappedData = data.map((deal) => ({
            title: deal.title || deal.name,
            days: deal.days || deal.duration,
            price: deal.price,
            imageUrl: deal.imageUrl,
            rating: deal.rating || 4.8, // Add default rating if missing
          }));
          setDeals(mappedData);
        } else {
          console.log("❌ [BEST DEALS] Using fallback data");
          setDeals(fallbackDeals);
        }
      } catch (err) {
        console.error("🚨 [BEST DEALS] Error loading packages:", err);
        setError(err.message);
        setDeals(fallbackDeals);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const handleBookNow = (dealTitle) => {
    setSelectedPackage(dealTitle);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <section className="relative w-full py-4 font-dm overflow-hidden bg-gray-900">
        {/* Background Image Loading State */}
        <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
      </section>
    );
  }

  return (
    <>
      <section className="relative w-full py-4 font-dm overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgWallpaper}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20">
          {error && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded relative z-20">
              <p>Unable to load deals from server. Showing cached data.</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* LEFT COLUMN: Title Only */}
            <div className="w-full lg:w-auto min-w-[300px] flex-shrink-0 flex items-start mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-sansita font-bold text-white leading-tight shadow-black/50 drop-shadow-md whitespace-nowrap">
                Best Deal <span className="text-[#EB662B]">Destinations</span>
              </h2>
            </div>

            {/* RIGHT COLUMN: Swiper Carousel */}
            <div className="w-full lg:w-3/4 min-w-0">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 2.5 },
                  1280: { slidesPerView: 3 },
                }}
                className="h-full !pb-6 !px-2" // Padding for shadows
              >
                {deals.map((deal, idx) => (
                  <SwiperSlide key={idx} className="h-auto">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={deal.imageUrl}
                          alt={deal.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Star
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-sm font-bold text-gray-800">
                            {deal.rating || 4.8}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {deal.title}
                        </h3>
                        <p className="text-[#EB662B] font-medium mb-4 text-sm uppercase tracking-wider">
                          {deal.days}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500">
                              Starting from
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {deal.price}
                            </p>
                          </div>
                          <button
                            onClick={() => handleBookNow(deal.title)}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#EB662B] group-hover:text-white transition-colors cursor-pointer"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom Navigation buttons if needed, or rely on Swiper defaults */}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* BookingForm Modal - Rendered via Portal */}
      {isModalOpen &&
        createPortal(
          <BookingForm
            onClose={() => setIsModalOpen(false)}
            packageName={selectedPackage}
          />,
          document.body,
        )}
    </>
  );
}
