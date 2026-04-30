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
        <div className="w-full lg:w-1/2 px-6 py-12 lg:py-20 lg:pl-12 lg:pr-8">
          <p className="text-gray-700 text-base lg:text-lg mb-8 leading-relaxed text-center lg:text-left">
            We believe travel isn't just about destinations—it's about the
            stories you collect, the cultures you embrace, and the memories that
            last forever. Whether you're chasing sunsets in Santorini, exploring
            ancient temples in Bali, or finding peace in the Swiss Alps, we're
            here to turn your travel dreams into reality.
          </p>

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
        <div className="w-full lg:w-1/2 h-full hidden lg:block leading-none my-10">
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
