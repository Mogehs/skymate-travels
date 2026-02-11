import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/safar-air/Hero";
import PopularTourTypes from "../components/safar-air/Popular";
import AboutUs from "../components/safar-air/About";
import WhyChooseUs from "../components/safar-air/Choose";
import Umrah from "../components/safar-air/Umrah";
import MostSearched from "../components/safar-air/MostSearched";
import BestDeals from "../components/safar-air/BestDeals";
import Footer from "../components/common/Footer";
import Testimonials from "../components/safar-air/Testimonials";
import Destinations from "../components/safar-air/Destinations";
import CuratedPackages from "../components/safar-air/CuratedPackages";
import Map from "../components/safar-air/Map";
import DestinationHighlights from "../components/safar-air/Destination";
import ContactUs from "../components/safar-air/ContactUs";
import BookingForm from "../components/safar-air/BookingForm";
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
        className={`max-w-[1536px] mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Navbar />
        <Hero openGlobalModal={openGlobalModal} />
        <PopularTourTypes />
        <AboutUs />
        <WhyChooseUs />
        <Umrah openGlobalModal={openGlobalModal} />
        <MostSearched openGlobalModal={openGlobalModal} />
        <BestDeals />
        <CuratedPackages openGlobalModal={openGlobalModal} />
        <DestinationHighlights />
        <Testimonials />
        <Destinations />
        <Map />
        <ContactUs />
        <Footer />
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
