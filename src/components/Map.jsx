import React from "react";
import { map } from "../assets/index.js";

const Map = () => {
  return (
    <section>
      <section className="w-full md:w-[98%] mx-auto h-[400px] md:h-[500px] mt-12 rounded-xl overflow-hidden shadow-lg transform transition-all hover:shadow-2xl duration-300">
        <iframe
          title="Skymate Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.324838426097!2d71.6917!3d29.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzQ0LjIiTiA3McKwNDEnMzAuMSJF!5e0!3m2!1sen!2s!4v1645432123456!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </section>
    </section>
  );
};

export default Map;
