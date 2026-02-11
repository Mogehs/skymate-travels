import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SkyrooPage from "./pages/SkyrooPage";
import SafarAirPage from "./pages/SafarAirPage";
import BookingForm from "./components/BookingForm";
import {
  debugFirebaseConnection,
  createSampleBestDeals,
  logAllPackagesData,
} from "./services/packageService";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
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

    const handleBeforeUnload = () => {};

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Add keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setShowDebugButton((prev) => !prev);
        console.log("🔧 Debug button toggled");
      }
      // Ctrl+Shift+L to log all packages data
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        console.log("🚀 Fetching all packages data...");
        logAllPackagesData().catch((err) => {
          console.error("❌ Failed to fetch all packages data:", err);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Make logging function available globally for easy debugging
    window.logAllPackagesData = logAllPackagesData;
    console.log("🔍 Global function available: window.logAllPackagesData()");

    // Debug Firebase connection on app load
    debugFirebaseConnection().then((result) => {
      console.log("🔍 Firebase Debug Results:", result);

      // Log summary of all package types

      Object.entries(result.collections || {}).forEach(([category, info]) => {
        console.log(`📁 ${category.toUpperCase()}:`, {
          exists: info.exists,
          itemCount: info.itemsCount,
          hasData: info.hasItems,
          sampleItem: info.sampleItem,
        });
      });

      // If best-deals collection is empty, create sample data
      if (
        result.connected &&
        result.collections["best-deals"] &&
        !result.collections["best-deals"].hasItems
      ) {
        console.log("⚡ Creating sample best deals data...");
        setShowDebugButton(true); // Show debug button in case auto-creation fails
        createSampleBestDeals()
          .then(() => {
            console.log(
              "✅ Sample best deals created, refreshing in 2 seconds...",
            );
            setShowDebugButton(false);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            console.error("❌ Failed to create sample data:", err);
            setShowDebugButton(true); // Keep button visible if creation failed
          });
      }
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openGlobalModal = (packageName) => {
    setGlobalModal({ isOpen: true, packageName });
  };

  const closeGlobalModal = () => {
    setGlobalModal({ isOpen: false, packageName: "" });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        className={`max-w-[1536px] mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<HomePage openGlobalModal={openGlobalModal} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/skyroo" element={<SkyrooPage />} />
          <Route path="/safar-air" element={<SafarAirPage />} />
        </Routes>

        <Footer />
      </div>

      {/* Global Modal - Rendered at root level for proper positioning */}
      {globalModal.isOpen && (
        <BookingForm
          onClose={closeGlobalModal}
          packageName={globalModal.packageName}
        />
      )}
    </BrowserRouter>
  );
};

export default App;
