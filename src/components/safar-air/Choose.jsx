import React from "react";
import {
  glob,
  coin,
  time,
  date,
  group84,
  beautifulCollageTravel,
} from "../../assets/safar-air/index.js";
import { Shield, Award, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Reliability",
    desc: "Two decades of proven excellence and thousands of verified global testimonials.",
  },
  {
    icon: Award,
    title: "Elite Status",
    desc: "Exclusive access to premium routes and best-in-class price guarantees.",
  },
  {
    icon: Clock,
    title: "Concierge Support",
    desc: "24/7 dedicated personal travel associates at your immediate disposal.",
  },
  {
    icon: CreditCard,
    title: "Seamless Transactions",
    desc: "Secured, encrypted, and frictionless booking experiences for peace of mind.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white py-10 lg:py-14 font-dm overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left image section */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative z-10">
              <img
                src={beautifulCollageTravel}
                alt="Travel Suitcase"
                className="max-w-[280px] md:max-w-sm drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative z-10 rounded-2xl"
              />
            </div>
            {/* Ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#1E40AF]/5 to-[#F59E0B]/5 blur-3xl rounded-full -z-10"></div>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 text-[#1E40AF]">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                  Service Excellence
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-sansita font-bold text-slate-900 leading-tight mb-6">
                Why select <br />
                <span className="text-[#F59E0B]">Safar Air?</span>
              </h2>
              <p className="text-slate-500 text-base lg:text-lg font-light leading-relaxed max-w-lg">
                We go beyond booking, providing a comprehensive travel ecosystem
                designed for the most discerning global citizens.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="group space-y-4">
                    <div className="inline-flex p-3 rounded-2xl bg-slate-50 text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white transition-all duration-500 shadow-sm">
                      <IconComponent size={18} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sansita font-bold text-lg text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
