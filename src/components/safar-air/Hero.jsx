import React, { useState, useEffect, useRef } from "react";
import { Plane, ChevronRight, Award, Compass, MapPin } from "lucide-react";
import hero from "../../assets/images/skyroo-hero.jpg";
import aboutHero from "../../assets/images/dubai-sky.jpg";
import dest2 from "../../assets/images/our-achievments.jpg";

// Count animation hook
const useCountAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(start + (end - start) * percentage);
      setCount(currentCount);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
};

const Hero = ({ openGlobalModal }) => {
  const years = useCountAnimation(15);
  const clients = useCountAnimation(5000);

  return (
    <div className="w-full font-dm overflow-hidden max-w-[1536px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-auto lg:h-[750px] min-h-[600px]">
        {/* MAIN HERO */}
        <div className="lg:col-span-3 relative overflow-hidden h-screen lg:h-full rounded-2xl md:rounded-3xl">
          <img
            src={hero}
            alt="Main Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent z-10"></div>

          <div className="absolute inset-0 z-20 p-6 sm:p-10 md:p-14 lg:p-14 flex flex-col items-start pt-28 sm:pt-32 lg:pt-40">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 text-white text-[0.65rem] uppercase tracking-widest font-medium">
              <Award className="text-[#F59E0B] w-4 h-4" />
              <span>Premium Luxury Travel</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sansita font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Experience the World with{" "}
              <span className="text-[#F59E0B]">Excellence</span>
            </h1>

            <p className="text-gray-200 text-base md:text-lg font-dm font-light leading-relaxed mb-10 max-w-xl opacity-90">
              Bespoke itineraries, premium stays, and unforgettable memories
              crafted specifically for the discerning traveler.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openGlobalModal("Premium Travel Package")}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-3 md:py-4 font-dm font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg text-sm tracking-wide"
              >
                Book Your Escape
                <Plane className="w-4 h-4 rotate-45" size={18} />
              </button>

              <button className="bg-white/10 border border-white/30 text-white px-8 py-3 md:py-4 font-dm font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-sm tracking-wide">
                Discover More
              </button>
            </div>

            {/* Stats */}
            {/* <div className="mt-auto hidden lg:flex gap-12 pt-10">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-[#F59E0B]">
                  {years}+
                </span>
                <span className="text-white/70 text-xs uppercase tracking-wide">
                  Years of Trust
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-[#F59E0B]">
                  {clients}+
                </span>
                <span className="text-white/70 text-xs uppercase tracking-wide">
                  Global Clients
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="lg:col-span-1 hidden lg:flex flex-col gap-3 h-full">
          {/* TOP CARD */}
          <div className="h-[58%] relative group overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={dest2}
              alt="Paris"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

            <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end items-start pb-6">
              <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-[0.65rem] font-medium font-dm uppercase tracking-widest">
                  Europe
                </span>
              </div>

              <h3 className="text-white text-xl lg:text-2xl font-sansita font-bold leading-tight mb-1">
                Parisian Elegance
              </h3>

              <p className="text-white/80 text-xs font-dm font-light mb-4">
                Exclusive Deals Available
              </p>

              <button className="text-white text-xs font-medium border-b border-[#F59E0B] pb-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Offer
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* BOTTOM CARD */}
          <div className="h-[42%] relative group overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={aboutHero}
              alt="Dubai"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

            <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end items-start pb-6">
              <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                <Compass className="w-4 h-4" />
                <span className="text-[0.65rem] font-medium font-dm uppercase tracking-widest">
                  Middle East
                </span>
              </div>

              <h3 className="text-white text-xl lg:text-2xl font-sansita font-bold leading-tight mb-1">
                Dubai Luxury
              </h3>

              <p className="text-white/80 text-xs font-dm font-light mb-4">
                Bespoke Itineraries
              </p>

              <button className="text-white text-xs font-medium border-b border-[#F59E0B] pb-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Offer
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
