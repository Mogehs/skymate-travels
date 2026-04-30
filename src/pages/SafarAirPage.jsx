import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import bgWallpaper from "../assets/images/bg-wallpaper.jpg";
import Navbar from "../components/common/Navbar";
import Hero from "../components/safar-air/Hero";
import PopularTourTypes from "../components/safar-air/Popular";
import AboutUs from "../components/safar-air/About";
import WhyChooseUs from "../components/safar-air/Choose";
import Umrah from "../components/Umrah";
import MostSearched from "../components/MostSearched";
import BestDeals from "../components/BestDeals";
import Footer from "../components/common/Footer";
import Testimonials from "../components/Testimonials";
import Destinations from "../components/Destinations";
import CuratedPackages from "../components/CuratedPackages";
import Map from "../components/Map";
import DestinationHighlights from "../components/Destination";
import ContactUs from "../components/safar-air/ContactUs";
import BookingForm from "../components/BookingForm";
import ScrollToTop from "../components/safar-air/ScrollToTop";
import {
  debugFirebaseConnection,
  createSampleBestDeals,
  logAllPackagesData,
} from "../services/packageService";

const SafarAirPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDebugButton, setShowDebugButton] = useState(false);
  const [globalModal, setGlobalModal] = useState({
    isOpen: false,
    packageName: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Remove the #
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            const navbarHeight = 90;
            const sectionTop =
              section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: sectionTop - navbarHeight,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    };

    handleHashNavigation();

    const handleBeforeUnload = () => {};

    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setShowDebugButton((prev) => !prev);
      }
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        logAllPackagesData().catch((err) => {
          console.error("❌ Failed to fetch all packages data:", err);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    window.logAllPackagesData = logAllPackagesData;

    debugFirebaseConnection().then((result) => {
      if (
        result.connected &&
        result.collections["best-deals"] &&
        !result.collections["best-deals"].hasItems
      ) {
        setShowDebugButton(true);
        createSampleBestDeals()
          .then(() => {
            setShowDebugButton(false);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            console.error("❌ Failed to create sample data:", err);
            setShowDebugButton(true);
          });
      }
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCreateSampleData = async () => {
    try {
      await createSampleBestDeals();
      alert(
        "✅ Sample best deals created! The page will refresh in 2 seconds.",
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("❌ Error creating sample data:", error);
      alert("❌ Failed to create sample data. Check console for details.");
    }
  };

  const openGlobalModal = (packageName) => {
    setGlobalModal({ isOpen: true, packageName });
  };

  const closeGlobalModal = () => {
    setGlobalModal({ isOpen: false, packageName: "" });
  };

  return (
    <>
      {/* Debug Button for Testing */}
      {showDebugButton && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleCreateSampleData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            🚀 Create Sample Best Deals
          </button>
        </div>
      )}

      <div
        className={`w-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Navbar />
        <Hero openGlobalModal={openGlobalModal} />

        <div className="w-full">
          {/* <PopularTourTypes /> */}
          <AboutUs />
          {/* <WhyChooseUs /> */}
          <Umrah openGlobalModal={openGlobalModal} brand="safar-air" />
          <MostSearched openGlobalModal={openGlobalModal} brand="safar-air" />
          <BestDeals brand="safar-air" />
          <CuratedPackages openGlobalModal={openGlobalModal} brand="safar-air" />
          <DestinationHighlights brand="safar-air" />
          <Testimonials brand="safar-air" />
          <Destinations brand="safar-air" />
          <Map brand="safar-air" />
          {/* Final CTA Section */}
          <section
            className="py-20 w-full md:w-[98%] mx-auto rounded-2xl relative flex items-center justify-center overflow-hidden mb-8"
            style={{
              backgroundImage: `url(${bgWallpaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-sansita text-white mb-6">
                Your World. Your Trips.
              </h2>
              <p className="text-xl text-white/90 font-dm max-w-3xl mx-auto mb-8 leading-relaxed">
                Like a perfectly tailored suit, each trip we plan is different;
                just as each traveller is different. We're here to help you
                experience the world on your terms.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold font-dm text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                <Sparkles size={20} />
                Start Your Journey
              </Link>
            </div>
          </section>
          {/* <Footer /> */}
        </div>
      </div>

      {/* Global Modal - Rendered at root level for proper positioning */}
      {globalModal.isOpen && (
        <BookingForm
          onClose={closeGlobalModal}
          packageName={globalModal.packageName}
        />
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
};

export default SafarAirPage;
