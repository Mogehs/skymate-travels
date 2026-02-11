import React from "react";
import { ArrowDownRight } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <section
        id="about"
        className="py-12 px-4 sm:px-6 lg:px-12 bg-white font-dm "
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 flex flex-col  gap-2">
            <div className="flex items-center gap-3">
              <p className="text-xs text-sky-accent tracking-[0.25em] uppercase font-bold">
                About Skyroo
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-slate-900 font-sansita leading-[1.1] tracking-tight">
              A single desk for <br className="hidden lg:block" />
              <span className="text-sky-accent">flights, visas,</span> and{" "}
              <br className="hidden lg:block" />
              follow‑through.
            </h2>
          </div>

          {/* Right Column: Content & Context */}
          <div className="lg:col-span-5 flex flex-col gap-8 pt-2 lg:pt-14 relative">
            {/* Decorative vertical line for desktop */}
            <div className="absolute left-[-2rem] top-16 bottom-0 w-[1px] bg-slate-200 hidden lg:block"></div>

            <p className="text-slate-600 text-lg leading-relaxed font-light">
              We sit between global carriers, premium cabins and on‑ground
              partners so your teams, families and guests always have a single
              point of contact.
            </p>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <ArrowDownRight size={20} />
              </div>
              <div>
                <h4 className="font-sansita text-xl font-bold text-slate-900">
                  Seamless Concierge
                </h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  From the moment you book until you arrive, we handle every
                  detail with precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
