import React, { useState, useEffect, useRef } from "react";
import { Plane, Sparkles, ArrowUpRight } from "lucide-react";
import { hero } from "../../assets/skyroo/index.js";
// import "../../assets/skyroo/scrollbar.css";

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
    <section id="home" className="relative mt-16 lg:mt-20">
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
          {/* Text column */}
          <div className="space-y-8">
            <div className="sky-chip w-fit">
              <Sparkles size={16} className="text-slate-900" />
              <span className="ml-2">Premium Air Concierge</span>
            </div>
            <h1 className="font-[var(--font-heading)] text-[2.3rem] sm:text-[2.7rem] lg:text-[3.1rem] leading-[1.1] text-slate-900 max-w-xl">
              A more<span className="text-sky-accent"> elegant </span>way to
              plan every mile in the sky.
            </h1>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-slate-600 max-w-xl">
              Skyroo curates premium routes, visa support, and cabin upgrades
              into one seamless concierge experience—so every departure feels
              considered, not chaotic.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => openGlobalModal("Skyroo Signature Flight")}
                className="gradient-sky-primary text-slate-900 font-semibold px-7 py-3 rounded-full flex items-center gap-2 shadow-lg hover:translate-y-[-1px] transition-transform text-sm"
              >
                <Plane className="rotate-45" size={18} />
                Design my itinerary
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("umrah")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-full border border-sky-border-subtle text-[0.8rem] sm:text-sm font-medium text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors"
              >
                View curated escapes
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              {highlightStats.map((stat) => (
                <div key={stat.label} className="sky-card px-4 py-3">
                  <p className="text-lg font-semibold text-sky-accent">
                    {useCountAnimation(stat.value)}+
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column */}
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden bg-white shadow-[0_26px_60px_rgba(15,23,42,0.10)] border border-sky-border-subtle">
              <div className="relative h-[230px] sm:h-[290px] lg:h-[310px]">
                <img
                  src={hero}
                  alt="Curated journey illustration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.26em] uppercase text-slate-500">
                      Featured lane
                    </p>
                    <p className="text-[0.9rem] font-semibold text-slate-900 mt-1">
                      Dubai → Kuala Lumpur · Business
                    </p>
                  </div>
                  <span className="text-[0.7rem] font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-sky-border-subtle">
                    Sample itinerary
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-top border-sky-border-subtle pt-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-accent animate-pulse"></div>
                    <p className="text-[0.78rem] text-slate-600">
                      Priority hotline ·{" "}
                      <span className="font-medium">+92 302 000 SKY</span>
                    </p>
                  </div>
                  <span className="text-[0.7rem] text-slate-400 uppercase tracking-[0.22em]">
                    Mission control
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
