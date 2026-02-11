import React from "react";
import { logo } from "../../assets/index.js";

const Footer = () => {
  return (
    <footer className="bg-[#fff2ed] text-gray-800 w-full md:w-[98%] mx-auto rounded-2xl py-12 mt-10 mb-4 px-4 lg:px-20 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 border-b border-orange-100 pb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center mb-3">
              <img src={logo} alt="Logo" className="w-16 h-16 mr-3" />
              <div>
                <h2 className="font-sansita font-bold text-2xl">Skymate</h2>
                <p className="font-sansita text-lg text-[#EB662B]">
                  Travels & Holidays
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 max-w-md mt-2 font-dm">
              We make your travel dreams come true with personalized experiences
              and unforgettable adventures.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <h3 className="font-semibold mb-3 font-sansita text-lg">
              Stay Updated
            </h3>
            <p className="text-sm mb-3 font-dm text-gray-600">
              Subscribe to our newsletter for exclusive deals and travel tips
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 border font-dm border-gray-200 rounded-l-md w-full lg:w-64 focus:outline-none focus:ring-1 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="bg-[#EB662B] hover:bg-orange-600 transition-colors text-white px-5 py-3 rounded-r-md font-dm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-sansita font-bold text-lg mb-4 text-[#EB662B]">
              Company
            </h3>
            <ul className="space-y-3 font-dm">
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Tour Reviews
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Travel Guides
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Data Policy
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sansita font-bold text-lg mb-4 text-[#EB662B]">
              Support
            </h3>
            <ul className="space-y-3 font-dm">
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Get in Touch
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                New Services
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Live Chat
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Follow Us
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sansita font-bold text-lg mb-4 text-[#EB662B]">
              Popular Destinations
            </h3>
            <ul className="space-y-3 font-dm">
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Dubai
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Europe
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Japan
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                Italy
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer transition-colors">
                USA
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sansita font-bold text-lg mb-4 text-[#EB662B]">
              Contact Us
            </h3>
            <ul className="space-y-3 font-dm">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 text-[#EB662B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+92 300 8680747</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 text-[#EB662B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>skymatetravels@gmail.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mr-2 pb-4 text-[#EB662B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="max-w-xs">
                  9MQC+4FX, Noor Mahal Rd, adjacent Faysal Bank, Officer Colony,
                  Bahawalpur
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com/SkymatePakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EB662B] hover:bg-orange-600 transition-colors text-white p-2 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@skymatetravel?_r=1&_t=ZS-93TizQVnt7H"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EB662B] hover:bg-orange-600 transition-colors text-white p-2 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12-1.04 2.88.38 6.57-1.74 8.71-2.9 2.93-8.85 1.77-9.59-2.34-.69-3.83 2.84-7.48 6.74-6.85.2.04.4.1.6.15v4.11a2.6 2.6 0 0 0-1.28-.35c-1.03.07-1.92.83-2.07 1.85-.18 1.25.73 2.5 1.95 2.67 1.25.18 2.5-.73 2.67-1.95.06-.4.07-.81.02-1.21l-.01-12.69z"></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/skymateholidays/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EB662B] hover:bg-orange-600 transition-colors text-white p-2 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-orange-100">
          <p className="text-sm text-gray-600 font-dm">
            © {new Date().getFullYear()} Skymate Travels & Holidays. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
