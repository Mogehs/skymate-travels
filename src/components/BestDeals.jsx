import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import { Navigation, Autoplay } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import { fetchBestDeals } from "../services/packageService";
import { japan, italy, usa, europe, bgWallpaper } from "../assets/index.js"; // Import bgWallpaper
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react"; // Import icons
import BookingForm from "./BookingForm"; // Import BookingForm modal

export default function BestDeals({ brand = 'skymate' }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const theme = {
    skymate: {
      accent: "text-[#EB662B]",
      btn: "group-hover:bg-[#EB662B]",
      icon: "text-orange-400"
    },
    skyroo: {
      accent: "text-[#0ea5e9]",
      btn: "group-hover:bg-[#0ea5e9]",
      icon: "text-sky-400"
    },
    'safar-air': {
      accent: "text-[#F59E0B]",
      btn: "group-hover:bg-[#1E40AF]",
      icon: "text-[#F59E0B]"
    }
  }[brand] || {
    accent: "text-[#EB662B]",
    btn: "group-hover:bg-[#EB662B]",
    icon: "text-orange-400"
  };

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const data = await fetchBestDeals(brand);

        if (data && data.length > 0) {
          const mappedData = data.map((deal) => ({
            id: deal.id,
            title: deal.title,
            days: deal.days,
            price: deal.price,
            imageUrl: deal.imageUrl,
            rating: deal.rating || 4.8,
          }));
          setDeals(mappedData);
        } else {
          setDeals([]);
        }
      } catch (err) {
        console.error("Error loading deals:", err);
        setError(err.message);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [brand]);

  const handleBookNow = (dealTitle) => {
    setSelectedPackage(dealTitle);
    setIsModalOpen(true);
  };

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

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
          {error && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded relative z-20">
              <p>Unable to load deals from server. Showing cached data.</p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* LEFT COLUMN: Title Only */}
            <div className="w-full lg:w-auto min-w-[300px] flex-shrink-0 flex items-start mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-sansita font-bold text-white leading-tight shadow-black/50 drop-shadow-md whitespace-nowrap">
                Best Deal <span className={theme.accent}>Destinations</span>
              </h2>
            </div>

            {/* RIGHT COLUMN: Swiper Carousel or Loading or Empty */}
            <div className="w-full lg:w-3/4 min-w-0">
              {loading ? (
                <div className="h-64 bg-white/10 animate-pulse rounded-3xl"></div>
              ) : deals.length === 0 ? (
                <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                  <Sparkles className={`w-10 h-10 ${theme.icon} opacity-50 mx-auto mb-3`} />
                  <p className="text-white/80 text-sm max-w-xs mx-auto px-4">
                    We are currently negotiating the best rates to bring you exclusive deals for {brand === 'skymate' ? 'Skymate' : brand === 'skyroo' ? 'Skyroo' : 'Safar Air'}.
                  </p>
                </div>
              ) : (
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
                          <p className={`${theme.accent} font-medium mb-4 text-sm uppercase tracking-wider`}>
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
                              className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${theme.btn} group-hover:text-white transition-colors cursor-pointer`}
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
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
