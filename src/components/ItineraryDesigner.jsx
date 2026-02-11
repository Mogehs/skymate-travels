import React, { useState } from "react";
import {
  Plane,
  MapPin,
  CalendarDays,
  Users,
  ArrowLeftRight,
  ChevronDown,
  Search,
  User,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { submitBooking } from "../services/bookingService";

const ItineraryDesigner = ({ packageName = "Hero Section Booking" }) => {
  const [tripType, setTripType] = useState("Round trip");
  const [passengerCount, setPassengerCount] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cityPairs, setCityPairs] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);

  // Controlled form fields for regular (non-multi-city) bookings
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      await submitBooking(e, tripType, cityPairs, (bookingId) => {
        console.log("🎉 Booking created with ID:", bookingId);
        // Reset city pairs for multi-city
        if (tripType === "Multi-city") {
          setCityPairs([
            { from: "", to: "", date: "" },
            { from: "", to: "", date: "" },
          ]);
        }
        // Reset all form fields
        setFormData({
          origin: "",
          destination: "",
          departure: "",
          arrival: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      });
    } catch (error) {
      console.error("Failed to submit booking:", error);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const addCityPair = () => {
    setCityPairs([...cityPairs, { from: "", to: "", date: "" }]);
  };

  const removeCityPair = (index) => {
    if (cityPairs.length > 2) {
      setCityPairs(cityPairs.filter((_, i) => i !== index));
    }
  };

  const updateCityPair = (index, field, value) => {
    const updated = [...cityPairs];
    updated[index][field] = value;
    setCityPairs(updated);
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-fade-in text-white/95">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Fields for FormSubmit */}
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Itinerary Booking" />
        <input type="hidden" name="package" value={packageName} />
        <input
          type="hidden"
          name="submission_time"
          value={new Date().toLocaleString()}
        />

        {/* Hidden inputs for dropdown values so they get picked up by FormData */}
        <input type="hidden" name="tripType" value={tripType} />
        <input type="hidden" name="adults" value={passengerCount} />
        <input type="hidden" name="class" value={cabinClass} />

        {/* Top Selection Row */}
        <div className="flex flex-wrap gap-3 text-xs font-medium text-white/80 mb-2 relative">
          {/* Trip Type Dropdown */}
          <div className="relative">
            <div
              onClick={() => toggleDropdown("trip")}
              className="flex items-center gap-1 cursor-pointer hover:bg-white/20 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
            >
              <ArrowLeftRight size={14} className="text-orange-400" />
              <span>{tripType}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "trip" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeDropdown === "trip" && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900/95 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden w-32 py-1">
                {["Round trip", "One way", "Multi-city"].map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setTripType(type);
                      setActiveDropdown(null);
                    }}
                    className="px-4 py-2 hover:bg-orange-500/20 cursor-pointer transition-colors"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Passengers Dropdown */}
          <div className="relative">
            <div
              onClick={() => toggleDropdown("passengers")}
              className="flex items-center gap-1 cursor-pointer hover:bg-white/20 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
            >
              <Users size={14} className="text-orange-400" />
              <span>{passengerCount}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "passengers" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeDropdown === "passengers" && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900/95 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden w-32 py-1">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setPassengerCount(num);
                      setActiveDropdown(null);
                    }}
                    className="px-4 py-2 hover:bg-orange-500/20 cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <span>
                      {num} {num === 1 ? "Adult" : "Adults"}
                    </span>
                    {passengerCount === num && (
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Class Dropdown */}
          <div className="relative">
            <div
              onClick={() => toggleDropdown("class")}
              className="flex items-center gap-1 cursor-pointer hover:bg-white/20 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
            >
              <span>{cabinClass}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "class" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeDropdown === "class" && activeDropdown === "class" && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900/95 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden w-40 py-1">
                {["Economy", "Premium Economy", "Business", "First Class"].map(
                  (cls) => (
                    <div
                      key={cls}
                      onClick={() => {
                        setCabinClass(cls);
                        setActiveDropdown(null);
                      }}
                      className="px-4 py-2 hover:bg-orange-500/20 cursor-pointer transition-colors"
                    >
                      {cls}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {/* Origin & Destination Row - Conditional based on trip type */}
        {tripType === "Multi-city" ? (
          <div className="space-y-3 max-h-[130px] overflow-y-auto scrollbar-hide pr-1">
            {cityPairs.map((pair, index) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-xl p-3 space-y-2"
              >
                {/* Flight number label */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/60 tracking-wider">
                    FLIGHT {index + 1}
                  </span>
                  {cityPairs.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeCityPair(index)}
                      className="text-white/50 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* From and To inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      name={`city_${index}_from`}
                      value={pair.from}
                      onChange={(e) =>
                        updateCityPair(index, "from", e.target.value)
                      }
                      placeholder="From"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-lg py-2.5 pl-9 pr-3 text-white placeholder:text-white/40 text-sm transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      name={`city_${index}_to`}
                      value={pair.to}
                      onChange={(e) =>
                        updateCityPair(index, "to", e.target.value)
                      }
                      placeholder="To"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-lg py-2.5 pl-9 pr-3 text-white placeholder:text-white/40 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Date input */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <CalendarDays size={16} />
                  </div>
                  <input
                    type="date"
                    name={`city_${index}_date`}
                    value={pair.date}
                    onChange={(e) =>
                      updateCityPair(index, "date", e.target.value)
                    }
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-lg py-2.5 pl-9 pr-3 text-white text-sm transition-all [color-scheme:dark] cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* Add another flight button */}
            <button
              type="button"
              onClick={addCityPair}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/50 rounded-xl py-3 text-white/70 hover:text-orange-400 text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add Another Flight
            </button>
          </div>
        ) : (
          <>
            {/* Standard Origin & Destination Row */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={(e) => handleFieldChange("origin", e.target.value)}
                  placeholder="Where from?"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>

              <button
                type="button"
                className="hidden sm:flex bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all transform active:scale-95 border border-white/5 cursor-pointer"
              >
                <ArrowLeftRight size={16} />
              </button>

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={(e) =>
                    handleFieldChange("destination", e.target.value)
                  }
                  required
                  placeholder="Where to?"
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
                />
              </div>
            </div>

            {/* Date Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  <CalendarDays size={18} />
                </div>
                <input
                  type="date"
                  name="departure"
                  value={formData.departure}
                  onChange={(e) =>
                    handleFieldChange("departure", e.target.value)
                  }
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3.5 pl-10 pr-3 text-white text-sm transition-all [color-scheme:dark] cursor-pointer"
                />
                <label className="absolute -top-2 left-3 px-1.5 bg-gray-800 border border-white/10 rounded text-[9px] text-white/60 tracking-wider font-bold">
                  DEPARTURE
                </label>
              </div>
              {tripType === "Round trip" && (
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <CalendarDays size={18} />
                  </div>
                  <input
                    type="date"
                    name="arrival"
                    value={formData.arrival}
                    onChange={(e) =>
                      handleFieldChange("arrival", e.target.value)
                    }
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3.5 pl-10 pr-3 text-white text-sm transition-all [color-scheme:dark] cursor-pointer"
                  />
                  <label className="absolute -top-2 left-3 px-1.5 bg-gray-800 border border-white/10 rounded text-[9px] text-white/60 tracking-wider font-bold">
                    RETURN
                  </label>
                </div>
              )}
            </div>
          </>
        )}

        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              required
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
            />
          </div>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
            />
          </div>
          <div className="relative group sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-orange-400 transition-colors">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              required
              placeholder="Phone Number"
              className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all"
            />
          </div>
        </div>

        {/* Message / Requirement */}
        <div className="relative group">
          <div className="absolute left-3 top-3 text-white/50 group-focus-within:text-orange-400 transition-colors">
            <MessageSquare size={18} />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            required
            placeholder="Tell us about your trip (Special requirements...)"
            className="w-full bg-white/5 border border-white/10 focus:border-orange-400/50 outline-none rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 text-sm transition-all resize-none min-h-[90px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#EB662B] hover:bg-[#ff7a3d] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-950/40 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-2 cursor-pointer"
        >
          <Plane
            size={20}
            className="group-hover:scale-110 transition-transform rotate-45"
          />
          <span>Book Now</span>
        </button>
      </form>
    </div>
  );
};

export default ItineraryDesigner;
