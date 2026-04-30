import React from "react";
import Achievements from "./Achievements";
import { travelConceptWorldwide } from "../../assets/safar-air/index.js";
import { Target, Users, Award } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <section
        id="about"
        className="w-full bg-white font-dm py-10 lg:py-14 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Text Section */}
          <div className="lg:w-1/2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 text-[#F59E0B]">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                About Our Legacy
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-sansita font-bold mb-8 text-slate-900 leading-[1.1]">
              Crafting stories through <br className="hidden sm:block" />
              <span className="text-[#1E40AF]">bespoke journeys</span>
            </h2>

            <div className="space-y-6 max-w-xl">
              <p className="text-slate-600 text-base lg:text-lg font-light leading-relaxed">
                Safar Air International is a premier travel concierge dedicated
                to sculpting exceptional experiences across the globe. With a
                commitment to excellence and surgical attention to detail, we
                transform the ordinary into the unforgettable.
              </p>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1E40AF]/5 rounded-2xl flex-shrink-0">
                    <Target className="text-[#1E40AF] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-sansita font-bold mb-3 text-slate-900">
                      Our Philosophy
                    </h3>
                    <p className="text-slate-500 text-sm lg:text-base font-light leading-relaxed">
                      To deliver world-class travel experiences through
                      personalized service and unwavering commitment. We believe
                      every journey should be seamless, enriching, and tailored
                      to the soul of the traveler.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
              <img
                src={travelConceptWorldwide}
                alt="World Landmarks"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Minimal Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#1E40AF]/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>
      <Achievements />
    </>
  );
};

export default AboutUs;
