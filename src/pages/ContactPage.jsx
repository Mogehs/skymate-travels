import React from "react";
import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import Map from "../components/Map";

import contactUsBg from "../assets/images/contact-us.jpg";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contactUsBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold font-sansita mb-4">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl font-dm opacity-90">
            Get in touch with us - we'd love to hear from you
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[1536px] mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600 font-dm">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Contact Us</span>
        </nav>
      </div>

      {/* Contact Content */}
      <ContactUs />
      <Map />
    </div>
  );
};

export default ContactPage;
