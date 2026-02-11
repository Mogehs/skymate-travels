import React from "react";
import {
  CalendarDays,
  MapPin,
  X,
  Users,
  MessageSquare,
  User,
  Mail,
  Phone,
  Plane,
} from "lucide-react";
import { sendBookingEmail } from "../utils/sendEmail";

const BookingForm = ({
  onClose,
  packageName = "Check Our Curated Package Or Just Start The Conversation",
}) => {
  const handleSubmit = (e) => {
    sendBookingEmail(e);
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-white/10 rounded-t-3xl p-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-xl">
          <div>
            <h3 className="text-2xl font-sansita font-bold text-white flex items-center gap-2">
              <Plane size={28} className="text-orange-400 rotate-45" />
              Book Your Dream Vacation
            </h3>
            <p className="text-sm text-white/70 font-dm mt-1">
              Fill in the details below and we'll get back to you
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* FormSubmit honeypot field to prevent spam */}
            <input type="text" name="_honey" style={{ display: "none" }} />
            {/* Disable captcha */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Form subject */}
            <input type="hidden" name="_subject" value="New Booking Request" />
            {/* Time */}
            <input
              type="hidden"
              name="submission_time"
              value={new Date().toLocaleString()}
            />

            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Full Name *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Phone Number *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="flex flex-col">
              <label
                htmlFor="destination"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Destination *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  required
                  placeholder="Where do you want to go?"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="flex flex-col">
              <label
                htmlFor="departure"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Departure Date *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  <CalendarDays size={18} />
                </div>
                <input
                  type="date"
                  id="departure"
                  name="departure"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white text-sm transition-all [color-scheme:dark] cursor-pointer"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="flex flex-col">
              <label
                htmlFor="arrival"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Return Date *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  <CalendarDays size={18} />
                </div>
                <input
                  type="date"
                  id="arrival"
                  name="arrival"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white text-sm transition-all [color-scheme:dark] cursor-pointer"
                />
              </div>
            </div>

            {/* Number of Adults */}
            <div className="flex flex-col">
              <label
                htmlFor="adults"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Number of Adults *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <Users size={18} />
                </div>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  min="1"
                  required
                  placeholder="Number of adults"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Selected Package - Hidden Input */}
            <input type="hidden" name="package" value={packageName} />

            {/* Selected Package - Display */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase">
                Selected Package
              </label>
              <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl px-4 py-3">
                <p className="text-sm text-white/90 font-medium">
                  {packageName}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="message"
                className="text-xs font-bold text-white/60 mb-2 tracking-wider uppercase"
              >
                Message *
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us more about your travel plans..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full bg-[#EB662B] hover:bg-[#ff7a3d] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-950/40 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <Plane
                  size={20}
                  className="group-hover:scale-110 transition-transform rotate-45"
                />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
