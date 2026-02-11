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

const FeatureCard = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between w-full mb-12 relative z-10 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content Side */}
      <div
        className={`w-full md:w-5/12 ${isEven ? "text-right md:pr-12" : "text-left md:pl-12"} mb-8 md:mb-0`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="group relative inline-block w-full"
        >
          {/* Animated Gradient Border */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#EB662B] via-[#DD5471] to-[#EB662B] opacity-30 group-hover:opacity-100 blur-sm transition-opacity duration-500"
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

          <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-300 group-hover:bg-black/80 overflow-hidden h-full">
            {/* Hover Glow Effect */}
            <div
              className={`absolute top-0 ${isEven ? "left-0 rounded-br-full -ml-8 -mt-8" : "right-0 rounded-bl-full -mr-8 -mt-8"} w-32 h-32 bg-gradient-to-br from-[#EB662B]/10 to-transparent transition-transform group-hover:scale-150 duration-500 pointer-events-none`}
            ></div>

            <div
              className={`relative z-10 flex flex-col ${isEven ? "items-end" : "items-start"} gap-4`}
            >
              <div className="shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#EB662B]/50 transition-colors shadow-lg shadow-black/50">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white mb-2 font-sansita group-hover:text-[#EB662B] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center Circle & Node */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 md:top-auto flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className="w-4 h-4 rounded-full bg-[#EB662B] relative z-20 shadow-[0_0_15px_rgba(235,102,43,0.8)] ring-4 ring-black"
        ></motion.div>
      </div>

      {/* Spacer Side for Layout Balance */}
      <div className="hidden md:block w-5/12"></div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 px-6 lg:px-20 overflow-hidden font-dm bg-[#111]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img
          src={maldives}
          alt="Background"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/80 to-[#111]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#EB662B] font-bold tracking-[0.3em] uppercase text-xs mb-4">
              Why Choose Us
            </h3>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-sansita">
              The SkyMate Difference
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block -translate-x-1/2"></div>

          {/* Dashed Flight Path for visual interest */}
          <svg
            className="absolute left-[50%] top-0 bottom-0 -translate-x-1/2 w-20 h-full hidden md:block pointer-events-none opacity-20"
            overflow="visible"
          >
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="100%"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="flex flex-col relative z-20 py-10">
            {features.map((item, index) => (
              <FeatureCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Decorative Plane Icon at the bottom */}
          <div className="absolute left-[50%] bottom-0 -translate-x-1/2 translate-y-full pt-10 hidden md:flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-8 h-8 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
