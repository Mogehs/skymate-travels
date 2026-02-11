import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from "lucide-react";
import { fetchUmrahPackages } from "../services/packageService";

// Fallback static data for Umrah packages
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
    title: "Group Umrah Package",
    price: "Rs 180,000",
    duration: "18 Days",
    rating: 4.7,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1519748174340-95c2c2c0e0e5?w=400&h=400&fit=crop&crop=center",
    description:
      "Group Umrah package with special group discounts and coordination.",
    features: [
      "Group Visa Processing",
      "Group Accommodation",
      "Coordinated Transportation",
      "Group Activities",
    ],
  },
];

export default function Umrah({ openGlobalModal }) {
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
        console.log("🔍 [UMRAH] Starting to fetch data...");
        const data = await fetchUmrahPackages();

        if (data && data.length > 0) {
          console.log("✅ [UMRAH] Using Firebase data");
          const mappedData = data.map((pkg) => ({
            title: pkg.title || pkg.name,
            price: pkg.price || "Contact Us",
            duration: pkg.duration || "Contact Us",
            rating: pkg.rating ? parseFloat(pkg.rating) : 4.8,
            location: pkg.location || "Makkah & Madinah",
            imageUrl: pkg.imageUrl,
            description:
              pkg.description ||
              "Complete Umrah journey with professional services.",
            features: pkg.features || [
              "Visa Processing",
              "Hotel Accommodation",
              "Transportation",
            ],
          }));
          setPackages(mappedData);
        } else {
          console.log("📋 [UMRAH] Using fallback data");
          setPackages(fallbackUmrahPackages);
        }
      } catch (err) {
        console.error("🚨 [UMRAH] Error loading packages:", err);
        setError(err.message);
        setPackages(fallbackUmrahPackages);
      } finally {
        setLoading(false);
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
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Sacred Journey to{" "}
              <span className="text-[#EB662B]">Makkah & Madinah</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the spiritual journey of a lifetime with our
              comprehensive Umrah packages. From visa processing to
              accommodation, we handle everything for your blessed pilgrimage.
            </p>
          </div>

          {/* Shimmer Loading Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col animate-pulse"
              >
                {/* Square Image Shimmer */}
                <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gray-300 rounded-t-2xl"></div>
                </div>

                {/* Content Shimmer */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 flex-1"></div>

                  {/* Location and Duration Shimmer */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>

                  {/* Features Shimmer */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, idx) => (
                        <div
                          key={idx}
                          className="h-6 bg-gray-300 rounded-full w-20"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Button Shimmer */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="py-16 bg-gradient-to-br from-orange-50 to-amber-50"
        id="umrah"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Sacred Journey to{" "}
              <span className="text-[#EB662B]">Makkah & Madinah</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the spiritual journey of a lifetime with our
              comprehensive Umrah packages. From visa processing to
              accommodation, we handle everything for your blessed pilgrimage.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              <p>
                Unable to load Umrah packages from server. Showing cached data.
              </p>
            </div>
          )}

          {/* Packages Display - Carousel or Grid */}
          {shouldShowCarousel ? (
            <div className="relative flex-1 flex items-center">
              {/* Custom Nav Buttons - Positioned on sides of carousel */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[-32px] md:left-[-40px] z-10">
                <button
                  className="text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-[#EB662B] transition-colors"
                  ref={prevRef}
                >
                  <ChevronLeft />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-[-32px] md:right-[-40px] z-10">
                <button
                  className="text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-[#EB662B] transition-colors"
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
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                      {/* Square Image Container */}
                      <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-current"
                          />
                          <span className="text-sm font-semibold text-gray-800">
                            {pkg.rating}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#EB662B] transition-colors duration-300 line-clamp-2">
                          {pkg.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                          {pkg.description}
                        </p>

                        {/* Location and Duration */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} className="text-[#EB662B]" />
                            <span className="font-medium">{pkg.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} className="text-[#EB662B]" />
                            <span className="font-medium">{pkg.duration}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-5">
                          <div className="flex flex-wrap gap-2">
                            {(Array.isArray(pkg.features)
                              ? pkg.features
                              : pkg.features?.split(",").map((f) => f.trim()) ||
                                []
                            )
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 text-xs rounded-full font-medium border border-orange-200"
                                >
                                  {feature}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Price and Book Button */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-xl font-bold text-[#EB662B]">
                            {pkg.price}
                          </div>
                          <button
                            onClick={() => openGlobalModal(pkg.title)}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white rounded-lg hover:from-[#d05a26] hover:to-[#c04a5f] transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            /* Grid Layout for fewer items */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100 h-full flex flex-col"
                >
                  {/* Square Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                      <Star
                        size={14}
                        className="text-yellow-500 fill-current"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content - Flex-grow to fill remaining space */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#EB662B] transition-colors duration-300 line-clamp-2">
                      {pkg.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                      {pkg.description}
                    </p>

                    {/* Location and Duration */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-[#EB662B]" />
                        <span className="font-medium">{pkg.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-[#EB662B]" />
                        <span className="font-medium">{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(pkg.features)
                          ? pkg.features
                          : pkg.features?.split(",").map((f) => f.trim()) || []
                        )
                          .slice(0, 3)
                          .map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 text-xs rounded-full font-medium border border-orange-200"
                            >
                              {feature}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Price and Book Button - Push to bottom */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-xl font-bold text-[#EB662B]">
                        {pkg.price}
                      </div>
                      <button
                        onClick={() => openGlobalModal(pkg.title)}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white rounded-lg hover:from-[#d05a26] hover:to-[#c04a5f] transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dedicated Custom Package Banner - Outside Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-16 font-dm">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          {/* Decorative Background Gradient (Subtle) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-100/50 transition-colors duration-500"></div>

          <div className="text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-sansita font-bold text-gray-900 mb-3">
              Looking for a <span className="text-[#EB662B]">Bespoke</span>{" "}
              Experience?
            </h3>
            <p className="text-gray-600 text-base max-w-xl leading-relaxed">
              We specialize in curating personalized spiritual journeys tailored
              exclusively to your preferences, schedule, and comfort
              requirements.
            </p>
          </div>

          <button
            onClick={() => openGlobalModal("Custom Umrah Package")}
            className="flex-shrink-0 px-8 py-3.5 bg-[#EB662B] text-white rounded-xl font-medium shadow-lg shadow-orange-200 hover:shadow-xl hover:bg-[#d05a26] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            Get Custom Package
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
