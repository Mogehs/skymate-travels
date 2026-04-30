import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { fetchCuratedPackages } from "../../services/packageService";
import Loader from "../common/Loader";
import {
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
  hero,
} from "../../assets/safar-air/index.js";



const CuratedPackages = ({ openGlobalModal }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadPackages = async () => {
      try {
        const data = await fetchCuratedPackages('safar-air');
        if (data && data.length > 0) {
          const mappedData = data.map((pkg) => ({
            title: pkg.title || pkg.name,
            imageUrl: pkg.imageUrl,
          }));
          setPackages(mappedData);
        }
      } catch (err) {
        console.error("Error loading curated packages:", err);
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadPackages();
    return () => clearTimeout(loadingTimeout);
  }, []);

  const CardItem = ({ pkg }) => (
    <div
      className="relative group overflow-hidden cursor-pointer h-[450px] w-full bg-slate-900 border-x border-white/5"
      onClick={() => openGlobalModal(pkg.title)}
    >
      <img
        src={pkg.imageUrl}
        alt={pkg.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />

      {/* Modern Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 transition-all duration-300" />

      {/* Hover Reveal Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className="text-white text-2xl font-bold font-sansita mb-3 uppercase tracking-wide leading-tight">
          {pkg.title}
        </h3>

        <button className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-[0.6rem] font-bold text-[#F59E0B] border-b border-[#F59E0B] pb-1 uppercase tracking-[0.3em]">
          Secure Experience
        </button>
      </div>

      {/* Top Badge - Minimalist */}
      <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[0.55rem] font-bold text-white uppercase tracking-[0.2em]">
          Signature Selection
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-16 lg:py-24 font-dm overflow-hidden bg-slate-950">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={hero}
          alt="background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase">
              Curated Portfolio
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-sansita font-bold text-white leading-tight">
            Elite <span className="text-[#F59E0B]">Voyages</span> & <br />{" "}
            Signature Experiences
          </h2>
          <p className="text-slate-400 text-sm lg:text-base font-light mt-6 max-w-xl leading-relaxed">
            Discover our restricted collection of the world's most extraordinary
            journeys, meticulously tailored for the global citizen.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader message="Assembling Collection..." />
          </div>
        ) : packages.length > 0 ? (
          <div className="relative">
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
              spaceBetween={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {packages.map((pkg, index) => (
                <SwiperSlide key={index}>
                  <CardItem pkg={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Minimal Side Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] lg:left-[-60px] z-10 hidden sm:block">
              <button
                ref={prevRef}
                className="p-3 text-slate-300 hover:text-[#1E40AF] transition-colors"
              >
                <ChevronLeft size={40} strokeWidth={1} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] lg:right-[-60px] z-10 hidden sm:block">
              <button
                ref={nextRef}
                className="p-3 text-slate-300 hover:text-[#1E40AF] transition-colors"
              >
                <ChevronRight size={40} strokeWidth={1} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CuratedPackages;
