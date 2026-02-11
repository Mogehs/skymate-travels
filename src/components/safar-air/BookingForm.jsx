import React from "react";
import {
  CalendarDays,
  MapPin,
  X,
  Users,
  MessageSquare,
  Plane,
} from "lucide-react";
import { sendBookingEmail } from "../../utils/sendEmailSafarAir";

const BookingForm = ({
  onClose,
  packageName = "Explore Our Premium Packages",
}) => {
  const handleSubmit = (e) => {
    sendBookingEmail(e);
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        transform: "none",
      }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar border-4 border-blue-100"
        style={{
          position: "relative",
          transform: "none",
        }}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] rounded-t-3xl p-8 border-b-4 border-blue-200 flex justify-between items-center sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Plane className="text-white w-6 h-6 rotate-45" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-white">
                Book Your Journey
              </h3>
            </div>
            <p className="text-white/90 text-sm font-inter pl-12">
              Fill in the details and let's make your dream vacation a reality
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white hover:bg-white/20 transition-all p-2 rounded-full"
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* Selected Package Info */}
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-lg">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-gray-600">
                Selected Package
              </span>
            </div>
            <p className="text-xl font-bold text-[#1E3A8A] font-playfair ml-11">
              {packageName}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="New Booking Request - Safar Air International"
            />
            <input
              type="hidden"
              name="submission_time"
              value={new Date().toLocaleString()}
            />
            <input type="hidden" name="package" value={packageName} />

            {/* Full Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Full Name *
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <Users className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Email Address *
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <MessageSquare className="text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Phone Number *
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <span className="text-gray-400">📞</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Travel Date */}
            <div className="flex flex-col">
              <label
                htmlFor="travelDate"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Preferred Travel Date
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <CalendarDays className="text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Number of Travelers */}
            <div className="flex flex-col">
              <label
                htmlFor="travelers"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Number of Travelers
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <Users className="text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min="1"
                  placeholder="2"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="flex flex-col">
              <label
                htmlFor="destination"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Preferred Destination
              </label>
              <div className="flex items-center gap-3 border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <MapPin className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="e.g., Dubai, Paris, Tokyo"
                  className="w-full outline-none text-base"
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="specialRequests"
                className="text-sm font-bold mb-2 text-[#1E3A8A] font-inter"
              >
                Special Requests or Questions
              </label>
              <div className="border-2 border-blue-100 rounded-xl px-4 py-3 focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  placeholder="Let us know if you have any special requirements..."
                  className="w-full outline-none text-base resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] hover:from-[#1E3A8A] hover:to-[#1E40AF] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl premium-button flex items-center justify-center gap-3 group"
              >
                <span>Submit Booking Request</span>
                <Plane className="w-5 h-5 rotate-45 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
