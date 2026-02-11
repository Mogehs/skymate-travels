import React, { useState, useEffect, useRef } from "react";
import { Plane, ChevronRight, Globe, Award, Users } from "lucide-react";
import { hero } from "../../assets/safar-air/index.js";
// import "../../assets/safar-air/scrollbar.css";

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

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
};

const Hero = ({ openGlobalModal }) => {
  return (
    <div className="max-w-[1536px] mx-auto">
      <section
        id="home"
        className="relative h-screen max-h-[850px] min-h-[650px]  overflow-hidden"
      >
        {/* Premium overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/60 via-[#1E40AF]/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10"></div>

        {/* Hero Image */}
        {/* must fit the image in the available space */}
        <img
          src={hero}
          alt="Premium Travel Destination"
          className=" w-full h-full min-h-screen object-cover object-center "
        />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-8 lg:px-20 pt-24 md:pt-28">
          <div className="max-w-4xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4 animate-fadeIn">
              <Award className="text-[#F59E0B] w-3.5 h-3.5" />
              <span className="text-white text-xs font-medium">
                Premium Travel Solutions
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] font-playfair font-bold text-white leading-tight mb-4">
              Experience the World with{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-white/95 text-base md:text-lg font-inter font-light mb-8 max-w-2xl leading-relaxed">
              Discover extraordinary destinations and create unforgettable
              memories with Safar Air International's bespoke travel packages.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => openGlobalModal("Premium Travel Package")}
                className="group relative overflow-hidden bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 premium-button flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Explore Packages</span>
                <Plane className="w-3.5 h-3.5 rotate-45 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("umrah")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-white/15 backdrop-blur-md border-2 border-white/40 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/25 hover:border-white/60 transition-all duration-300 flex items-center gap-2"
              >
                <span>View Destinations</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats/Trust Indicators with Premium Design */}
            <div className="hidden md:grid grid-cols-3 gap-6 max-w-2xl">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
                <div className="relative p-4 flex flex-col items-center text-center transition-transform group-hover:scale-105 duration-300">
                  <div className="mb-2 p-2 bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/10 rounded-full">
                    <Users className="text-[#F59E0B] w-5 h-5" />
                  </div>
                  <span className="font-playfair text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                    {useCountAnimation(5000)}+
                  </span>
                  <span className="text-white/90 font-inter text-xs mt-1 font-medium">
                    Happy Travelers
                  </span>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
                <div className="relative p-4 flex flex-col items-center text-center transition-transform group-hover:scale-105 duration-300">
                  <div className="mb-2 p-2 bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/10 rounded-full">
                    <Globe className="text-[#F59E0B] w-5 h-5" />
                  </div>
                  <span className="font-playfair text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                    {useCountAnimation(150)}+
                  </span>
                  <span className="text-white/90 font-inter text-xs mt-1 font-medium">
                    Destinations
                  </span>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
                <div className="relative p-4 flex flex-col items-center text-center transition-transform group-hover:scale-105 duration-300">
                  <div className="mb-2 p-2 bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/10 rounded-full">
                    <Award className="text-[#F59E0B] w-5 h-5" />
                  </div>
                  <span className="font-playfair text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                    {useCountAnimation(15)}+
                  </span>
                  <span className="text-white/90 font-inter text-xs mt-1 font-medium">
                    Years Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>
    </div>
  );
};

export default Hero;
