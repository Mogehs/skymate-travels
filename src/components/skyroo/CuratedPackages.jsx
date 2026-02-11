// Import statements and package data
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { fetchCuratedPackages } from "../../services/packageService";
import {
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
} from "../../assets/skyroo/index.js";

const fallbackImages = [
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
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

        if (data && data.length > 0) {
          const mappedData = data.map((pkg, index) => {
            return {
              title: pkg.title || pkg.name,
              imageUrl:
                pkg.imageUrl || fallbackImages[index % fallbackImages.length],
            };
          });
          setPackages(mappedData);
        } else {
          throw new Error("No curated packages available");
        }
      } catch (err) {
        console.error("🚨 [CURATED] Error loading packages:", err);
        setError(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Minimum items required for carousel based on screen size
  const getMinItemsRequired = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    return 1;
  };

  const shouldShowCarousel = packages.length >= getMinItemsRequired();

  const CardItem = ({ pkg }) => (
    <div
      className="relative group overflow-hidden cursor-pointer h-[400px] w-full bg-slate-100" // Added bg-slate-100 placeholder
      onClick={() => openGlobalModal(pkg.title)}
    >
      {/* Sharp corners as requested */}
      <img
        src={pkg.imageUrl}
        alt={pkg.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-white font-sansita text-3xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {pkg.title}
        </h3>
        <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 hover:bg-sky-50 transition-colors translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          Book Experience
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );

  if (loading) {
    // Minimal loading skeleton
    return (
      <section className="py-12 md:py-20 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-10 w-64 bg-slate-100 mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-slate-50 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!packages.length) return null;

  return (
    // Removed outer container styling, added border-y
    <section className="py-12 lg:py-20 border-y border-slate-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-sky-accent tracking-[0.2em] uppercase mb-3 font-semibold">
            Signature collections
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-sansita">
            Curated Packages
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-800 text-center">
            Unable to load packages.
          </div>
        )}

        {shouldShowCarousel ? (
          <div className="relative">
            {/* Swiper Container with negative margin to accommodate sharp cards touching? Or just normal gap? User said "make the cards in this make sure to justify it lik just shar coners" - implying maybe grid-like or seamless. I'll stick to a small gap for carousel. */}

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
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              className="w-full"
            >
              {packages.map((pkg, index) => (
                <SwiperSlide key={index}>
                  <CardItem pkg={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Minimal Navigation Arrows - Outside or Floating? User wants "minimalistic". I'll put them floating on sides invisible until hover of section or just simple side arrows. */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] lg:left-[-60px] z-10">
              <button
                ref={prevRef}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] lg:right-[-60px] z-10">
              <button
                ref={nextRef}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <CardItem key={index} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CuratedPackages;
