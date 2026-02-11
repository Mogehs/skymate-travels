import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Plane,
  MapPin,
  Compass,
  PhoneCall,
  Home,
  Info,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { logo } from "../../assets/index.js";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(78); // Default height

  // Determine active link based on current route
  const getActiveLink = () => {
    const path = location.pathname;
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/skyroo") return "skyroo";
    if (path === "/safar-air") return "safar-air";
    return "home";
  };

  // Smooth scroll function with navbar offset
  const scrollToSection = (sectionId, event) => {
    // Only smooth scroll if we are on the homepage
    if (location.pathname === "/") {
      if (event) event.preventDefault();

      const section = document.getElementById(sectionId);
      if (!section) return;

      const navbarOffset = navHeight + 20; // Add extra padding
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionTop - navbarOffset,
        behavior: "smooth",
      });
    }
    // If on another page, let the default link behavior work (navigate to /#section)

    if (isOpen) setIsOpen(false);
  };

  // Handle scroll effects and active section detection
  useEffect(() => {
    // Get navbar height for dynamic offset calculation
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }

    const handleScroll = () => {
      // Update navbar style based on scroll position
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`w-[98%] max-w-[1536px] mx-auto px-3 sm:px-6 py-[14px] ${
        scrolled ? "h-[70px]" : "h-[78px]"
      } bg-gradient-to-r from-[#ffffff8a]/60 via-[#ffffff6b]/40 to-transparent backdrop-blur-[18px] left-1/2 -translate-x-1/2 rounded-xl flex items-center justify-between font-sansita fixed top-[21px] z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "shadow-lg shadow-orange-200/10 border-b border-orange-100/30"
          : "shadow-md shadow-orange-100/10"
      }`}
    >
      {/* Logo & Brand with flying plane animation */}
      <div className="flex items-center gap-2 group">
        <div className="relative">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 relative z-10 transition-transform group-hover:scale-110 duration-300"
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-bold text-black text-md sm:text-lg lg:text-xl relative leading-tight block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EB662B] to-[#ff8f41]">
              Sky
            </span>
            <span className="text-black">mate</span>
            <div className="absolute -bottom-[2px] left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#EB662B] to-transparent transition-all duration-300"></div>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-normal text-gray-500 leading-none mt-0">
            Travels & Holidays
          </span>
        </div>
      </div>{" "}
      {/* Desktop Nav Links with Hover Effects */}
      <div className="hidden lg:flex gap-8 text-black text-sm mr-5 font-dm items-center font-medium">
        <Link
          to="/"
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300 ${
            getActiveLink() === "home" ? "bg-white/70 shadow-sm" : ""
          }`}
        >
          <span>Home</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </Link>
        <Link
          to="/about"
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300 ${
            getActiveLink() === "about" ? "bg-white/70 shadow-sm" : ""
          }`}
        >
          <span>About</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </Link>
        <Link
          to="/skyroo"
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300 ${
            getActiveLink() === "skyroo" ? "bg-white/70 shadow-sm" : ""
          }`}
        >
          <span>Skyroo</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </Link>
        <Link
          to="/safar-air"
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300 ${
            getActiveLink() === "safar-air" ? "bg-white/70 shadow-sm" : ""
          }`}
        >
          <span>Safar Air</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </Link>
        <a
          href="/#testimonials"
          onClick={(e) => {
            scrollToSection("testimonials", e);
          }}
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300`}
        >
          <span>Testimonials</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </a>
        <Link
          to="/contact"
          className={`relative group py-2 px-3 rounded-full hover:bg-white/60 transition-all duration-300 ${
            getActiveLink() === "contact" ? "bg-white/70 shadow-sm" : ""
          }`}
        >
          <span>Contact Us</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[70%] bg-[#EB662B] rounded-full transition-all duration-300"></div>
        </Link>
      </div>{" "}
      {/* Book Now Button with Animation */}
      <div className="hidden lg:flex items-center font-dm">
        {" "}
        <a
          href="#"
          onClick={(e) => scrollToSection("contact", e)}
          className="relative overflow-hidden group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EB662B] to-[#ff8a3d] text-white text-sm font-medium shadow-lg shadow-orange-200/30 hover:shadow-orange-300/40 transition-all duration-300"
        >
          <span className="flex items-center gap-2 relative z-10">
            <Compass className="w-4 h-4" />
            Book Now
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff8a3d] to-[#EB662B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
        </a>
      </div>{" "}
      {/* Animated Hamburger Icon */}
      <div className="lg:hidden flex items-center gap-3">
        {" "}
        <a
          href="#"
          onClick={(e) => scrollToSection("contact", e)}
          className="flex items-center gap-1 bg-gradient-to-r from-[#EB662B] to-[#ff8a3d] text-white text-xs px-3 py-1.5 rounded-full shadow-md"
        >
          <Compass className="w-3 h-3" />
          <span>Book</span>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="relative w-9 h-9 flex items-center justify-center bg-white/80 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white"
        >
          {isOpen ? (
            <X size={18} className="text-[#EB662B]" />
          ) : (
            <Menu size={18} className="text-[#EB662B]" />
          )}
        </button>
      </div>{" "}
      {/* Enhanced Mobile Dropdown Menu with Animations */}
      <div
        className={`absolute top-[78px] right-0 w-[85%] md:w-[50%] max-h-[80vh] overflow-hidden rounded-xl shadow-2xl lg:hidden z-40 font-dm transform transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md">
          <div className="py-3 px-4 border-b border-orange-100/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-100/50 rounded-full">
                <Plane size={12} className="text-[#EB662B]" />
              </div>
              <p className="text-sm font-medium text-gray-800">Navigation</p>
            </div>
          </div>

          <div className="flex flex-col py-2">
            <Link
              to="/"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/skyroo"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Skyroo
            </Link>
            <Link
              to="/safar-air"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Safar Air
            </Link>
            <a
              href="/#testimonials"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={(e) => {
                scrollToSection("testimonials", e);
              }}
            >
              Testimonials
            </a>
            <Link
              to="/contact"
              className="px-5 py-3 hover:bg-orange-50 transition-colors text-black text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          <div className="p-4 bg-gradient-to-br from-orange-50 to-white border-t border-orange-100/30">
            {" "}
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#EB662B] to-[#ff8a3d] text-white rounded-lg shadow-md"
              onClick={(e) => scrollToSection("contact", e)}
            >
              <Compass size={16} />
              Book Your Adventure
              <Plane size={14} className="ml-1 animate-pulse" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
