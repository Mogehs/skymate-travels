import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { user1, user2, user3 } from "../../assets/safar-air/index.js";
import { fetchTestimonialsContent } from "../../services/packageService";
import { Star, Quote } from "lucide-react";
import Loader from "../common/Loader";



const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchTestimonialsContent('safar-air');
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
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();

    return () => clearTimeout(loadingTimeout);
  }, []);

  const TestimonialCard = ({ item }) => (
    <div className="bg-white border border-slate-100 p-8 flex flex-col h-full hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
      {/* Quote Icon - Minimalist */}
      <div className="mb-8">
        <Quote className="text-[#1E40AF]/10 w-10 h-10" />
      </div>

      {/* Message */}
      <p className="text-slate-600 font-dm font-light text-base md:text-lg leading-relaxed mb-8 flex-grow italic">
        "{item.message}"
      </p>

      {/* Footer info */}
      <div className="mt-auto">
        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < item.rating
                  ? "text-[#F59E0B] fill-current"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover border border-slate-100"
          />
          <div className="font-dm">
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">
              {item.name}
            </h4>
            <p className="text-[0.65rem] text-slate-400 uppercase tracking-widest font-bold">
              {item.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-10 lg:py-14 bg-white font-dm overflow-hidden border-b border-slate-50"
      id="testimonials"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 text-[#1E40AF]">
              <Star className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                Traveler Voices
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-sansita font-bold text-slate-900 leading-tight">
              Honest <span className="text-[#F59E0B]">Experiences</span>
            </h2>
          </div>

          <p className="text-slate-500 text-sm lg:text-base font-light leading-relaxed max-w-sm">
            Discover why the world's most discerning travelers trust Safar Air
            for their curated journeys.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader message="Gathering Feedback..." />
          </div>
        ) : items.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="border-l border-t border-slate-100"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </section>
  );
};

export default Testimonials;
