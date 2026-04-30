import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // import Autoplay module
import "swiper/css";
import "swiper/css/pagination";
import { user1, user2, user3, commsVector } from "../assets/index.js";
import { fetchTestimonialsContent } from "../services/packageService";



const Testimonials = ({ brand = 'skymate' }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    skymate: {
      accent: "text-[#EB662B]",
      bg: "from-gray-50 to-orange-50",
      border: "border-[#EB662B]/20 group-hover:border-[#EB662B]/40",
      badge: "bg-gradient-to-r from-[#EB662B] to-[#DD5471]"
    },
    skyroo: {
      accent: "text-[#0ea5e9]",
      bg: "from-gray-50 to-sky-50",
      border: "border-[#0ea5e9]/20 group-hover:border-[#0ea5e9]/40",
      badge: "bg-gradient-to-r from-[#38bdf8] to-[#0f82d8]"
    },
    'safar-air': {
      accent: "text-[#1E40AF]",
      bg: "from-gray-50 to-blue-50",
      border: "border-[#1E40AF]/20 group-hover:border-[#1E40AF]/40",
      badge: "bg-[#1E40AF]"
    }
  }[brand] || {
    accent: "text-[#EB662B]",
    bg: "from-gray-50 to-orange-50",
    border: "border-[#EB662B]/20 group-hover:border-[#EB662B]/40",
    badge: "bg-gradient-to-r from-[#EB662B] to-[#DD5471]"
  };

  useEffect(() => {
    (async () => {
      const data = await fetchTestimonialsContent(brand);
      if (data.length) {
        setItems(
          data.map((t) => ({
            id: t.id,
            name: t.name,
            image: t.imageUrl || user1,
            rating: Number(t.rating) || 5,
            location: t.location || "Traveler",
            message: t.message || "",
          })),
        );
      } else {
        setItems([]);
      }
      setLoading(false);
    })();
  }, [brand]);

  return (
    <section
      className={`py-16 font-dm overflow-hidden bg-gradient-to-br ${theme.bg}`}
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className={theme.accent}>Customers Say</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of travelers choose {brand === 'skymate' ? 'Skymate' : brand === 'skyroo' ? 'Skyroo' : 'Safar Air'} for their
            journeys
          </p>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[300px] h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Be the first to share your experience with {brand}!
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-8"
          >
            {items.map(
              (testimonial, index) => (
                <SwiperSlide key={testimonial.id || index}>
                  <div className="testimonial-card bg-white shadow-lg hover:shadow-xl p-6 my-2 w-full max-w-sm mx-auto transition-all duration-300 cursor-grab active:cursor-grabbing h-fit rounded-2xl border border-gray-100 overflow-hidden group hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className={`w-14 h-14 rounded-full object-cover border-2 ${theme.border} transition-all duration-300`}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${theme.badge} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-[10px]">★</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          {testimonial.name}
                        </h4>
                        <div className={`flex items-center gap-1 ${theme.accent}`}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {testimonial.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`${theme.badge} text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm`}>
                        {testimonial.location}
                      </span>
                      <div className={`${theme.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pr-1`}>
                        <img
                          src={commsVector}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
