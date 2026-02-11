import React, { useState, useEffect, useRef } from "react";
import { Plane, ArrowUpRight, ArrowDown } from "lucide-react";
import { hero } from "../../assets/skyroo/index.js";

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
    return () => frameRef.current && cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
};

const highlightStats = [
  { label: "Flights Curated", value: 2400 },
  { label: "Partner Airlines", value: 42 },
  { label: "Cities Served", value: 68 },
];

const Hero = ({ openGlobalModal }) => {
  return (
    <section
      id="home"
      className="relative w-full bg-[#EAECF0] font-dm pt-32 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5 lg:gap-6">
        {/* Row 1: Title (Left) and Subtitle (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-16">
          <h1 className="font-sansita text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem] leading-[0.95] text-slate-900 tracking-tight lg:w-3/5">
            Priced to help you
            <br />
            <span className="text-sky-accent">grow and thrive.</span>
          </h1>
          <div className="lg:w-2/5 flex flex-col gap-5">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              Skyroo curates premium routes, visa support, and cabin upgrades
              into one seamless concierge experience—so every departure feels
              considered, not chaotic.
            </p>
            {/* Mobile actions moved here for better UX on small screens */}
            <div className="flex lg:hidden flex-wrap gap-3">
              <button
                onClick={() => openGlobalModal("Skyroo Signature Flight")}
                className="gradient-sky-primary text-slate-900 font-semibold px-8 py-4 rounded-full flex items-center gap-2 shadow-lg hover:translate-y-[-1px] transition-transform text-sm"
              >
                <Plane className="rotate-45" size={18} />
                Design my itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Large Feature Image */}
        <div className="relative w-full h-[180px] sm:h-[280px] lg:h-[340px] rounded-[24px] overflow-hidden shadow-2xl shadow-slate-200 border border-white/50">
          <img
            src={hero}
            alt="Globe view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        </div>

        {/* Row 3: Actions & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-slate-300/50 pt-6">
          {/* Left: Action Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => openGlobalModal("Skyroo Signature Flight")}
              className="hidden lg:flex gradient-sky-primary text-slate-900 font-bold px-6 py-3 rounded-full items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide"
            >
              Start your journey
              <ArrowDown size={18} />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("umrah")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-full border border-slate-300 hover:border-sky-accent bg-white text-sm font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all duration-300"
            >
              Explore plans
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Right: Stats */}
          <div className="flex gap-8 sm:gap-12">
            {highlightStats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <p className="text-xl sm:text-2xl font-sansita font-bold text-slate-900">
                  {useCountAnimation(stat.value)}
                  <span className="text-sky-accent">+</span>
                </p>
                <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
