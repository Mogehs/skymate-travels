import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { ArrowUp, MessageCircle } from "lucide-react";
import "../assets/skyroo/scrollbar.css";
import Hero from "../components/skyroo/Hero";
import AboutUs from "../components/skyroo/About";
import PopularTourTypes from "../components/skyroo/Popular";
import WhyChooseUs from "../components/skyroo/Choose";
import Umrah from "../components/skyroo/Umrah";
import BestDeals from "../components/skyroo/BestDeals";
import CuratedPackages from "../components/skyroo/CuratedPackages";
import TopPackages from "../components/skyroo/TopPackage";
import MostSearched from "../components/skyroo/MostSearched";
import DestinationHighlights from "../components/skyroo/Destination";
import Destinations from "../components/skyroo/Destinations";
import Testimonials from "../components/skyroo/Testimonials";
import MapSection from "../components/skyroo/Map";
import ContactUs from "../components/skyroo/ContactUs";

const SkyrooPage = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal form submission handler (FormSubmit.co)
  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    fetch("https://formsubmit.co/ajax/skyroointernational@gmail.com", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully!",
        });
        setTimeout(() => {
          setModalOpen(false);
          setFormStatus({
            submitted: false,
            success: false,
            message: "",
          });
        }, 2000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: false,
          message: "Something went wrong. Please try again.",
        });
      });
  };

  // Global modal handlers
  const openGlobalModal = (context = "") => {
    setModalContext(context);
    setModalOpen(true);
    setFormStatus({
      submitted: false,
      success: false,
      message: "",
    });
  };

  const closeGlobalModal = () => {
    setModalOpen(false);
    setModalContext("");
    setFormStatus({
      submitted: false,
      success: false,
      message: "",
    });
  };

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scrolling to section when navigated from other pages
  useEffect(() => {
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        if (sectionId === "home") {
          // Scroll to top for home/logo click
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          // Scroll to specific section
          const section = document.getElementById(sectionId);
          if (section) {
            const nav = document.querySelector("nav");
            const navHeight = nav ? nav.offsetHeight : 78;
            const navbarOffset = navHeight + 20;
            const sectionTop =
              section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: sectionTop - navbarOffset,
              behavior: "smooth",
            });
          }
        }
      }, 100);

      // Clear the state to prevent re-scrolling on re-renders
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <main className="skyroo-main">
        {/* Hero section */}
        <Hero openGlobalModal={openGlobalModal} />

        {/* Popular tour types */}
        <section id="journeys" className="skyroo-section">
          <div className="skyroo-section-content">
            <p className="skyroo-section-overtitle">Popular sky lanes</p>
            <h2 className="skyroo-section-title">
              Journeys our guests book the most
            </h2>
            <p className="skyroo-section-desc">
              From corporate corridors to once-in-a-lifetime escapes, Skyroo
              assembles routes, cabins and ground services into clear,
              ready-to-fly journeys.
            </p>
          </div>
          <div className="skyroo-tourtype-list">
            <article className="skyroo-tourtype-card">
              <span>Signature</span>
              <strong>Business city pairs</strong>
            </article>
            <article className="skyroo-tourtype-card">
              <span>Weekender</span>
              <strong>Short-haul escapes</strong>
            </article>
            <article className="skyroo-tourtype-card">
              <span>Family</span>
              <strong>Multi‑city itineraries</strong>
            </article>
            <article className="skyroo-tourtype-card">
              <span>Sacred</span>
              <strong>Makkah &amp; Madinah rotations</strong>
            </article>
            <article className="skyroo-tourtype-card">
              <span>Executive</span>
              <strong>Private cabin &amp; jet share</strong>
            </article>
            <article className="skyroo-tourtype-card">
              <span>Seasonal</span>
              <strong>Summer &amp; winter corridors</strong>
            </article>
          </div>
        </section>

        {/* About + achievements block from Skyroo International Pvt Ltd */}
        <section id="about" className="skyroo-section">
          <div className="skyroo-section-content">
            <p className="skyroo-section-overtitle">About Skyroo</p>
            <h2 className="skyroo-section-title">
              Aviation ops, concierge and travel under one roof
            </h2>
            <p className="skyroo-section-desc">
              We sit between global carriers, premium cabins and on‑ground
              partners so your teams, families and guests always have a single
              desk to call.
            </p>
          </div>
          <div className="skyroo-about-grid">
            <div className="skyroo-about-text">
              <div className="skyroo-about-highlights">
                <div className="skyroo-about-highlight">
                  <span className="skyroo-about-highlight-bullet" />
                  <p>
                    Route design that balances time, comfort and total cost of
                    travel—not just the airfare.
                  </p>
                </div>
                <div className="skyroo-about-highlight">
                  <span className="skyroo-about-highlight-bullet" />
                  <p>
                    Visa, lounge and disruption management handled by a single
                    Skyroo mission desk.
                  </p>
                </div>
                <div className="skyroo-about-highlight">
                  <span className="skyroo-about-highlight-bullet" />
                  <p>
                    Quiet upgrades to better cabins and schedules using our
                    partner airline network.
                  </p>
                </div>
              </div>

              <div className="skyroo-mission">
                <h3>Our mission</h3>
                <p>
                  Build the most trusted flight concierge in the region—so every
                  departure feels orchestrated, not improvised.
                </p>
              </div>
            </div>
            <div className="skyroo-about-img" />
          </div>

          <div className="skyroo-achievements-list">
            <div className="skyroo-achievement-card">
              <span className="stat">2.4K+</span>
              <span className="label">Flights curated</span>
            </div>
            <div className="skyroo-achievement-card">
              <span className="stat">40+</span>
              <span className="label">Partner airlines</span>
            </div>
            <div className="skyroo-achievement-card">
              <span className="stat">68</span>
              <span className="label">Cities connected</span>
            </div>
          </div>
        </section>

        {/* Rich Skymate-inspired content blocks */}
        <PopularTourTypes />
        <WhyChooseUs />

        {/* Packages from Firebase */}
        <TopPackages />
        <MostSearched openGlobalModal={openGlobalModal} />
        <Umrah openGlobalModal={openGlobalModal} />
        <BestDeals />
        <CuratedPackages openGlobalModal={openGlobalModal} />

        {/* Destination highlights & destinations of the month from Firebase */}
        <DestinationHighlights />
        <Destinations />
        <Testimonials />
        <MapSection />

        {/* Contact footer block */}
        <ContactUs />
      </main>

      {/* Global enquiry modal */}
      {modalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-3xl bg-white text-slate-900 border border-gray-100 shadow-[0_30px_90px_rgba(15,23,42,0.22)] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.32em] text-sky-accent mb-1">
                    Flight planning brief
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Share a few details and we'll design the route for you
                  </h3>
                  {modalContext && (
                    <p className="mt-2 text-xs text-slate-500">
                      Enquiry source:{" "}
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-100 text-[0.7rem] font-medium">
                        {modalContext}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={closeGlobalModal}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </header>

              <form className="space-y-4" onSubmit={handleModalFormSubmit}>
                {/* FormSubmit honeypot field to prevent spam */}
                <input type="text" name="_honey" style={{ display: "none" }} />
                {/* Disable captcha */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Form subject */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New Booking Request"
                />
                {/* Time */}
                <input
                  type="hidden"
                  name="submission_time"
                  value={new Date().toLocaleString()}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Work email"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone / WhatsApp"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                  <select
                    name="trip_type"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    defaultValue="Return"
                  >
                    <option>Return</option>
                    <option>One way</option>
                    <option>Multi‑city</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="from_city"
                    placeholder="From city / airport"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                  <input
                    type="text"
                    name="to_city"
                    placeholder="To city / airport"
                    className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="departure_date"
                      className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    />
                    <input
                      type="date"
                      name="return_date"
                      className="rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      name="adults"
                      min="1"
                      placeholder="Adults"
                      className="rounded-2xl bg-white border border-gray-200 px-3 py-2.5 text-xs outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    />
                    <input
                      type="number"
                      name="children"
                      min="0"
                      placeholder="Children"
                      className="rounded-2xl bg-white border border-gray-200 px-3 py-2.5 text-xs outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    />
                    <select
                      name="cabin_class"
                      className="rounded-2xl bg-white border border-gray-200 px-3 py-2.5 text-xs outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent"
                    >
                      <option>Economy</option>
                      <option>Premium</option>
                      <option>Business</option>
                      <option>First</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  name="message"
                  placeholder="Anything else we should know? e.g. preferred airlines, time windows, visa support, lounge access…"
                  className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-sky-accent focus:ring-1 focus:ring-sky-accent resize-none"
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-sky-accent focus:ring-sky-accent"
                    />
                    Contact me on WhatsApp if quicker
                  </label>
                  <p className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-400">
                    Response within 2 working hours
                  </p>
                </div>

                {formStatus.submitted && (
                  <div
                    className={`submit-status ${
                      formStatus.success ? "success" : "error"
                    } mb-2`}
                    style={{
                      color: formStatus.success ? "green" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {formStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full gradient-sky-primary text-white font-semibold text-sm rounded-2xl py-2.5 shadow-lg hover:translate-y-[-1px] transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SUBMITTING..." : "Send flight brief"}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}

      {/* Floating helpers */}
      {/* Scroll to top – right side */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-5 lg:bottom-8 lg:right-8 z-40 w-10 h-10 rounded-full gradient-sky-primary text-white shadow-lg shadow-[#0ba2e022] flex items-center justify-center hover:translate-y-[-2px] transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp CTA – left side */}
      <a
        href="https://wa.me/923008680747"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-5 lg:bottom-8 lg:left-8 z-40 w-10 h-10 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center hover:bg-emerald-600 hover:translate-y-[-2px] transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </>
  );
};

export default SkyrooPage;
