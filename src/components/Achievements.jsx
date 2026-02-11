import React from "react";
import { ourAchievments } from "../assets/index.js";

const Achievements = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row justify-between w-full bg-white font-dm mt-15">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 h-full leading-none hidden lg:block mb-10">
        <img
          src={ourAchievments}
          alt="Travel Collage"
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 px-6 py-12 lg:py-20 lg:pr-12 lg:pl-8">
        <h3 className="text-sm text-[#EB662B] tracking-widest uppercase mb-3 text-center lg:text-left">
          Our Philosophy
        </h3>

        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black font-sansita text-center lg:text-left">
          Pursuit of Feeling
        </h2>
        <p className="text-gray-700 text-base lg:text-lg mb-6 leading-relaxed text-center lg:text-left">
          Travel has always been about more than just going ‘somewhere else’.
          For us, travel – breathless and beautiful – is about feeling somewhere
          else; a kind of emotional high that stays with you for the rest of
          your life.
        </p>

        <p className="text-gray-700 text-base lg:text-lg mb-8 leading-relaxed text-center lg:text-left">
          The Pursuit of Feeling – our brand-new collection of trips, features,
          and luxury travel experiences – bottles this soulful, sensual desire,
          taking us back to one of our founding philosophies:
        </p>

        <p className="text-xl lg:text-2xl font-sansita font-bold text-[#EB662B] text-center lg:text-left italic">
          "It’s not where you want to go; it’s how you want to feel."
        </p>
      </div>
    </section>
  );
};

export default Achievements;
