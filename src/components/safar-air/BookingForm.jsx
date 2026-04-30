import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  MapPin,
  X,
  Users,
  MessageSquare,
  Plane,
  Mail,
  User,
  Phone,
} from "lucide-react";
import { sendBookingEmail } from "../../utils/sendEmailSafarAir";

const BookingForm = ({
  onClose,
  packageName = "Explore Our Premium Packages",
}) => {
  useEffect(() => {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = (e) => {
    sendBookingEmail(e);
    if (onClose) onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      style={{ isolation: "isolate" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl rounded-[32px] bg-white text-slate-900 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in duration-300"
        style={{ transform: "translateZ(0)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto scrollbar-hide p-6 sm:p-10 space-y-8 flex-1">
          <header className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F59E0B] font-dm font-bold mb-3">
                Bespoke travel brief
              </p>
              <h3 className="text-2xl sm:text-4xl font-sansita font-bold text-slate-900 leading-[1.1]">
                Share your vision and <br className="hidden sm:block" />
                we'll map the route
              </h3>
              <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-100/80">
                <MapPin size={16} className="text-[#1E40AF]" />
                <span className="text-[0.75rem] font-dm font-medium text-slate-500 uppercase tracking-[0.1em]">
                  Interest:{" "}
                  <span className="text-slate-900 font-bold">
                    {packageName}
                  </span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="group w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:border-slate-300 transition-all duration-300 bg-white shadow-sm flex-shrink-0"
              aria-label="Close"
            >
              <X
                size={22}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot & Meta */}
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value={`New Safar Air Booking: ${packageName}`}
            />
            <input type="hidden" name="package_name" value={packageName} />
            <input
              type="hidden"
              name="submission_time"
              value={new Date().toLocaleString()}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Traveler Name
                </label>
                <div className="relative group/input">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Digital Reach
                </label>
                <div className="relative group/input">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Direct Line
                </label>
                <div className="relative group/input">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 / +92 / etc."
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Estimated Departure
                </label>
                <div className="relative group/input">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="date"
                    name="travelDate"
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all cursor-pointer text-slate-600 appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Traveler Count
                </label>
                <div className="relative group/input">
                  <Users
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    placeholder="E.g. 2"
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2 font-dm">
                <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Destination interest
                </label>
                <div className="relative group/input">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                  />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Dubai, UK, etc."
                    className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-3.5 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 font-dm">
              <label className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Luxury Nuances
              </label>
              <div className="relative group/input">
                <MessageSquare
                  size={18}
                  className="absolute left-4 top-4 text-slate-400 group-focus-within/input:text-[#F59E0B] transition-colors"
                />
                <textarea
                  name="specialRequests"
                  rows={3}
                  placeholder="Preferred airlines, dietary notes, or cabin requirements..."
                  className="w-full rounded-2xl bg-slate-50/50 border border-slate-200/60 px-12 py-4 text-sm outline-none focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/5 transition-all resize-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100/60">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[#F59E0B] font-dm font-bold">
                  Elite Service Promise
                </p>
                <p className="text-[0.75rem] font-dm text-slate-400 font-medium">
                  Response within{" "}
                  <span className="text-slate-900">2 business hours</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 lg:px-14 bg-slate-900 text-white font-dm font-bold text-sm rounded-2xl shadow-[0_15px_40px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:bg-slate-800 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.97]"
              >
                <span>SEND FLIGHT BRIEF</span>
                <Plane size={18} className="rotate-45" />
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BookingForm;
