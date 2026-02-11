import React, { useState, useEffect } from "react";
import { Star, Clock, MapPin, ChevronRight, Check } from "lucide-react";
import { fetchUmrahPackages } from "../services/packageService";

// Fallback static data for Umrah packages
const fallbackUmrahPackages = [
  {
    title: "Economy Umrah Package",
    price: "Rs 150,000",
    duration: "15 Days",
    rating: 4.8,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=400&fit=crop&crop=center",
    description:
      "Complete Umrah journey with economy accommodation and transportation.",
    features: [
      "Visa Processing",
      "Hotel Accommodation",
      "Transportation",
      "Ziyarat Tours",
    ],
  },
  {
    title: "Premium Umrah Package",
    price: "Rs 250,000",
    duration: "20 Days",
    rating: 4.9,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1519748174340-95c2c2c0e0e5?w=400&h=400&fit=crop&crop=center",
    description: "Luxury Umrah experience with 5-star hotels and VIP services.",
    features: [
      "VIP Visa Processing",
      "5-Star Hotels",
      "Luxury Transportation",
      "Expert Guides",
    ],
  },
  {
    title: "Family Umrah Package",
    price: "Rs 350,000",
    duration: "25 Days",
    rating: 4.9,
    location: "Makkah & Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=400&fit=crop&crop=center",
    description:
      "Special family package with child-friendly accommodations and activities.",
    features: [
      "Family Visa Processing",
      "Family Suites",
      "Child Care Services",
      "Educational Tours",
    ],
  },
];

export default function Umrah({ openGlobalModal }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log("🔍 [UMRAH] Starting to fetch data...");
        const data = await fetchUmrahPackages();

        if (data && data.length > 0) {
          console.log("✅ [UMRAH] Using Firebase data");
          const mappedData = data.map((pkg) => ({
            title: pkg.title || pkg.name,
            price: pkg.price || "Contact Us",
            duration: pkg.duration || "Contact Us",
            rating: pkg.rating ? parseFloat(pkg.rating) : 4.8,
            location: pkg.location || "Makkah & Madinah",
            imageUrl: pkg.imageUrl,
            description:
              pkg.description ||
              "Complete Umrah journey with professional services.",
            features: pkg.features || [
              "Visa Processing",
              "Hotel Accommodation",
              "Transportation",
            ],
          }));
          setPackages(mappedData);
        } else {
          console.log("📋 [UMRAH] Using fallback data");
          setPackages(fallbackUmrahPackages);
        }
      } catch (err) {
        console.error("🚨 [UMRAH] Error loading packages:", err);
        setError(err.message);
        setPackages(fallbackUmrahPackages);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  const CardItem = ({ pkg }) => (
    <div className="group bg-white w-full sm:w-1/2 lg:w-1/3 flex flex-col hover:bg-slate-50 transition-colors duration-300 border border-slate-200">
      {/* Image - Sharper, wider aspect to reduce height */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 rounded-sm">
          {pkg.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-sansita font-bold text-slate-900 leading-tight group-hover:text-[#EB662B] transition-colors">
            {pkg.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Star size={12} className="fill-current" />
            <span>{pkg.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <MapPin size={14} />
          {pkg.location}
        </div>

        <div className="space-y-1.5 mt-2 mb-4">
          {(Array.isArray(pkg.features)
            ? pkg.features
            : pkg.features?.split(",").map((f) => f.trim()) || []
          )
            .slice(0, 3)
            .map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-slate-600 text-xs"
              >
                <div className="w-1 h-1 bg-[#EB662B] rounded-full"></div>
                {feature}
              </div>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Starting from
            </p>
            <p className="text-lg font-bold text-slate-900 font-sansita">
              {pkg.price}
            </p>
          </div>
          <button
            onClick={() => openGlobalModal(pkg.title)}
            className="px-4 py-1.5 border border-slate-200 text-slate-900 text-xs font-semibold hover:bg-[#EB662B] hover:text-white hover:border-[#EB662B] transition-all duration-300 rounded-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-12 border-b border-slate-100">
        <div className="text-center text-sm text-slate-400">
          Loading Sacred Journeys...
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 md:py-16 bg-white font-dm" id="umrah">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs text-[#EB662B] tracking-[0.2em] uppercase mb-3 font-semibold">
              Spiritual Journeys
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-sansita mb-4">
              Sacred Journey to{" "}
              <span className="text-[#EB662B]">Makkah & Madinah</span>
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the spiritual journey of a lifetime with our
              comprehensive Umrah packages.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 text-center rounded text-sm border border-yellow-100">
              Unable to load packages. Showing cached data.
            </div>
          )}

          {/* Flex Wrapper for Clean Borders */}
          <div className="flex flex-wrap ">
            {packages.map((pkg, index) => (
              <CardItem key={index} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Custom Package Banner - Outside Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-16 font-dm">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          {/* Decorative Background Gradient (Subtle) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-100/50 transition-colors duration-500"></div>

          <div className="text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-sansita font-bold text-slate-900 mb-3">
              Looking for a <span className="text-[#EB662B]">Bespoke</span>{" "}
              Experience?
            </h3>
            <p className="text-slate-600 text-base max-w-xl leading-relaxed font-light">
              We specialize in curating personalized spiritual journeys tailored
              exclusively to your preferences, schedule, and comfort
              requirements.
            </p>
          </div>

          <button
            onClick={() => openGlobalModal("Custom Umrah Package")}
            className="flex-shrink-0 px-8 py-3 bg-[#EB662B] text-white rounded-full font-medium shadow-lg shadow-orange-200/50 hover:shadow-xl hover:bg-[#d05a26] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            Get Custom Package
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
