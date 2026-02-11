import React from "react";
import { motion } from "framer-motion";
import { glob, coin, time, date, maldives } from "../assets/index.js";

const features = [
  {
    icon: glob,
    title: "Trusted By Thousands",
    desc: "Proven reliability with happy travelers worldwide.",
  },
  {
    icon: coin,
    title: "Best Price Guarantee",
    desc: "Top offers with prices you won’t find elsewhere.",
  },
  {
    icon: time,
    title: "24/7 Concierge",
    desc: "Support anytime, anywhere — always on.",
  },
  {
    icon: date,
    title: "Instant Booking",
    desc: "Fast, safe, and hassle-free reservations.",
  },
];

const FeatureCard = ({ item }) => (
  <div className="group relative mb-8">
    {/* Animated Gradient Border */}
    <motion.div
      className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-[#EB662B] via-[#DD5471] to-[#EB662B] opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-500"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    />

    {/* Glassmorphism Card Content */}
    <div className="relative h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 transition-all duration-300 overflow-hidden group-hover:bg-black/50">
      {/* Hover Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EB662B]/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10 transition-colors duration-300">
          <img
            src={item.icon}
            alt={item.title}
            className="w-10 h-10 object-contain"
          />
        </div>

        <h3 className="font-bold text-2xl text-white mb-3 font-sansita group-hover:text-[#EB662B] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-lg font-light">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 px-6 lg:px-20 overflow-hidden font-dm">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={maldives}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-[#EB662B] font-bold tracking-widest uppercase text-sm mb-4">
            Why Choose Us
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-sansita">
            Relentless Focus on Quality
          </h2>
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <FeatureCard item={features[0]} />
            <FeatureCard item={features[1]} />
          </div>

          {/* Column 2 - Staggered */}
          <div className="flex flex-col gap-8 lg:pt-16">
            <FeatureCard item={features[2]} />
            <FeatureCard item={features[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
