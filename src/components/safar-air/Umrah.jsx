import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { fetchUmrahPackages } from "../../services/packageService";
import Loader from "../common/Loader";

const fallbackUmrahPackages = [
  {
    title: "Economy Umrah Package",
    price: "Rs 150,000",
    duration: "15 Days",
    rating: 4.8,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=400&fit=crop&crop=center",
    description:
      "Complete Umrah journey with economy accommodation and transportation.",
    features: [
      "Visa Processing",
      "Hotel Accommodation",
      "Transportation",
      "Ziyarat Tours",
    ],
  },
  {
    title: "Premium Umrah Package",
    price: "Rs 250,000",
    duration: "20 Days",
    rating: 4.9,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1519748174340-95c2c2c0e0e5?w=400&h=400&fit=crop&crop=center",
    description: "Luxury Umrah experience with 5-star hotels and VIP services.",
    features: [
      "VIP Visa Processing",
      "5-Star Hotels",
      "Luxury Transportation",
      "Expert Guides",
    ],
  },
  {
    title: "Family Umrah Package",
    price: "Rs 350,000",
    duration: "25 Days",
    rating: 4.9,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=400&fit=crop&crop=center",
    description:
      "Special family package with child-friendly accommodations and activities.",
    features: [
      "Family Visa Processing",
      "Family Suites",
      "Child Care Services",
      "Educational Tours",
    ],
  },
  {
    title: "Deluxe Umrah Package",
    price: "Rs 300,000",
    duration: "18 Days",
    rating: 4.9,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop&crop=center",
    description:
      "Premium accommodation with special amenities and personalized services.",
    features: [
      "Express Visa Processing",
      "Deluxe Hotels",
      "Private Transportation",
      "Guided Tours",
    ],
  },
  {
    title: "Group Umrah Package",
    price: "Rs 180,000",
    duration: "16 Days",
    rating: 4.7,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=400&fit=crop&crop=center",
    description:
      "Affordable group package with shared accommodation and group activities.",
    features: [
      "Group Visa Processing",
      "Shared Accommodation",
      "Group Transportation",
      "Community Activities",
    ],
  },
];

export default function Umrah({ openGlobalModal }) {
  const swiperRef = useRef(null);
  const [packages, setPackages] = useState(fallbackUmrahPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchUmrahPackages();
        if (data.length > 0) {
          const enrichedData =
            data.length >= 5
              ? data
              : [...data, ...fallbackUmrahPackages].slice(0, 5);
          setPackages(enrichedData);
        }
      } catch (error) {
        console.error("Error fetching Umrah packages:", error);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section
      id="umrah"
      className="py-20 px-6 lg:px-20 bg-gradient-to-br from-white via-blue-50/30 to-white font-inter"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4">
          <Star className="text-[#F59E0B] w-4 h-4 fill-current" />
          <span className="text-sm text-[#1E40AF] font-semibold tracking-wide uppercase">
            Featured Packages
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair">
          Umrah{" "}
          <span className="bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent">
            Packages
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Embark on a spiritual journey with our carefully curated Umrah
          packages
        </p>
      </div>

      {loading ? (
        <Loader message="Loading Umrah Packages..." />
      ) : (
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay]}
            navigation={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={packages.length > 1}
            loopAdditionalSlides={2}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index} className="!pb-4 !pt-4">
                <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(30,64,175,0.3)] border-2 border-blue-100 hover:border-[#F59E0B] transition-all duration-500 h-full flex flex-col hover:-translate-y-2">
                  {/* Image Section - Fixed professional height */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Price Badge - More prominent */}
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white px-5 py-2.5 rounded-2xl font-bold shadow-2xl text-lg backdrop-blur-sm border-2 border-white/20">
                      {pkg.price}
                    </div>

                    {/* Rating Badge - Better positioned */}
                    <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                      <Star className="w-5 h-5 fill-current text-[#F59E0B]" />
                      <span className="font-bold text-gray-800">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Well-structured */}
                  <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white to-blue-50/30">
                    <h3 className="text-xl font-bold text-[#1E3A8A] mb-4 font-playfair group-hover:text-[#1E40AF] transition-colors leading-tight">
                      {pkg.title}
                    </h3>

                    {/* Info badges */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-[#1E40AF]" />
                        <span className="text-sm font-semibold text-[#1E40AF]">
                          {pkg.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-lg">
                        <MapPin className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-sm font-semibold text-[#F59E0B]">
                          {pkg.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2.5 mb-6">
                      {(Array.isArray(pkg.features)
                        ? pkg.features
                        : typeof pkg.features === "string"
                          ? pkg.features.split(",").map((f) => f.trim())
                          : []
                      )
                        .slice(0, 3)
                        .map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                    </div>

                    {/* CTA Button - More prominent */}
                    <button
                      onClick={() => openGlobalModal(pkg.title)}
                      className="mt-auto w-full bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-3.5 rounded-xl font-bold hover:shadow-2xl transition-all duration-500 shadow-lg text-base"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
