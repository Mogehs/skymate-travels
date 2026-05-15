import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // import Autoplay module
import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sansita mb-4">
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
                  <div className="testimonial-card bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 p-8 my-4 w-full max-w-sm mx-auto transition-all duration-500 cursor-grab active:cursor-grabbing h-full rounded-3xl border border-gray-50 overflow-hidden group hover:-translate-y-2 flex flex-col">
                    <div className="relative mb-6">
                      <Quote className={`absolute -top-2 -left-2 w-8 h-8 ${theme.accent} opacity-10`} />
                      <p className="text-gray-600 text-base italic leading-relaxed relative z-10 font-dm">
                        "{testimonial.message}"
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-4 border-t border-gray-50 pt-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className={`w-14 h-14 rounded-full object-cover border-2 ${theme.border} transition-all duration-300 shadow-md`}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${theme.badge} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                          <span className="text-white text-[10px]">★</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                          {testimonial.location}
                        </p>
                        <div className={`flex items-center gap-0.5 mt-1.5`}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-200"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
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
