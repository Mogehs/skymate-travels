import React from "react";
import { Trophy, Award, Clock } from "lucide-react";

const Achievements = () => {
  const stats = [
    {
      value: "22k+",
      label: "Bespoke Journeys",
      icon: Trophy,
      sublabel: "Delivered since 2008",
    },
    {
      value: "18+",
      label: "Excellence Awards",
      icon: Award,
      sublabel: "Industry leading status",
    },
    {
      value: "15+",
      label: "Years of Trust",
      icon: Clock,
      sublabel: "Global expertise",
    },
  ];

  return (
    <section className="w-full bg-slate-50/50 py-10 lg:py-14 font-dm overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          {/* Left Heading */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-sansita font-bold text-slate-900 leading-tight">
              Our <br className="hidden lg:block" />
              <span className="text-[#F59E0B]">Legacy</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 font-light leading-relaxed">
              A decade and a half of crafting the extraordinary, recognized by
              the world's most discerning travelers.
            </p>
          </div>

          {/* Right Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-slate-50 text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white transition-colors duration-500">
                    <IconComponent size={20} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-3xl font-sansita font-bold text-slate-900">
                      {item.value}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                      {item.label}
                    </p>
                    <p className="text-[0.7rem] text-slate-400 font-light pt-2">
                      {item.sublabel}
                    </p>
                  </div>

                  {/* Subtle accent corner */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-slate-100 rounded-full group-hover:bg-[#F59E0B] transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
