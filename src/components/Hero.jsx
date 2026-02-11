import React, { useState, useEffect, useRef } from "react";
import { Plane, ChevronRight } from "lucide-react";
import { hero } from "../assets/index.js";
import "../assets/scrollbar.css";
import ItineraryDesigner from "./ItineraryDesigner.jsx";

// Count animation hook
const useCountAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Function to animate the counter
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;

      // Calculate the current count based on progress
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(start + (end - start) * percentage);

      setCount(currentCount);

      // Continue animation until duration is complete
      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    // Start animation
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup function
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
    <div className="max-w-[1536px] mx-auto overflow-hidden">
      <section
        id="home"
        className="relative min-h-screen lg:h-screen lg:max-h-[850px] flex items-center"
      >
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>

        {/* Hero Image with optimized height */}
        <img
          src={hero}
          alt="Travel Destination"
          className="absolute inset-0 h-full w-full object-cover object-center z-0 scale-105 animate-slow-zoom"
        />

        {/* Content Container */}
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-16 pt-24 lg:pt-32 pb-20 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-3xl">
              {/* Main Heading */}
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-sansita font-bold text-white leading-tight mb-6 mt-4 drop-shadow-md">
                Start your unforgettable{" "}
                <span className="text-[#EB662B] inline-block hover:scale-105 transition-transform duration-300">
                  journey
                </span>{" "}
                with us
              </h1>

              {/* Subheading */}
              <p className="text-white/90 text-lg md:text-xl font-dm mb-10 max-w-xl leading-relaxed">
                Explore breathtaking destinations and create memories that last
                a lifetime with our personalized travel packages.
              </p>

              {/* CTA Buttons - Hidden on desktop if designer is shown, or kept small */}
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => openGlobalModal("Journey Package")}
                  className="lg:hidden bg-[#EB662B] text-white px-8 py-4 rounded-md text-base font-semibold hover:bg-[#d05a26] transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Plane className="rotate-45" size={18} />
                  Book Your Journey
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("umrah")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md text-base font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Explore Destinations
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Stats/Trust Indicators */}
              <div className="hidden md:flex gap-10">
                <div className="flex flex-col">
                  <span className="text-[#EB662B] font-sansita text-4xl font-bold">
                    {useCountAnimation(2000)}+
                  </span>
                  <span className="text-white/80 font-dm text-sm tracking-wide uppercase">
                    Happy Travelers
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#EB662B] font-sansita text-4xl font-bold">
                    {useCountAnimation(100)}+
                  </span>
                  <span className="text-white/80 font-dm text-sm tracking-wide uppercase">
                    Destinations
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#EB662B] font-sansita text-4xl font-bold">
                    {useCountAnimation(10)}+
                  </span>
                  <span className="text-white/80 font-dm text-sm tracking-wide uppercase">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Itinerary Designer */}
            <div className="flex justify-center lg:justify-end">
              <ItineraryDesigner packageName="Hero Landing Page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
