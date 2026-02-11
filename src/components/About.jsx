import React from "react";
import Achievements from "./Achievements";
import { travelConceptWorldwide } from "../assets/index.js";

const AboutUs = () => {
  return (
    <>
      <section
        id="about"
        className="flex flex-col lg:flex-row justify-between w-full bg-white font-dm"
      >
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 px-6 py-5 lg:pl-12 lg:pr-8 mt-10">
          {/* <h3 className="text-sm text-[#EB662B] tracking-widest uppercase mb-3 text-center lg:text-left">
            About Us
          </h3> */}

          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black font-sansita text-center lg:text-left">
            Your Journey Starts Here
          </h2>
          <p className="text-gray-700 text-base lg:text-lg mb-8 leading-relaxed text-center lg:text-left">
            We believe travel isn't just about destinations—it's about the
            stories you collect, the cultures you embrace, and the memories that
            last forever. Whether you're chasing sunsets in Santorini, exploring
            ancient temples in Bali, or finding peace in the Swiss Alps, we're
            here to turn your travel dreams into reality.
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black font-sansita text-center lg:text-left">
            What We Do
          </h2>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed text-center lg:text-left">
            From handpicked itineraries to seamless bookings, we craft
            personalized travel experiences that match your vibe. No
            cookie-cutter packages—just authentic adventures, insider tips, and
            24/7 support to make sure every trip is as smooth as it is
            spectacular. Your wanderlust, our expertise. Let's explore the world
            together.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-1/2 h-full leading-none hidden lg:block mb-10 mt-10">
          <img
            src={travelConceptWorldwide} // Replace with your actual path
            alt="World Landmarks"
            className="w-full h-full object-cover block"
          />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
