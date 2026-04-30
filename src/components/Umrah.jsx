import React, { useState, useEffect } from "react";
import { Star, Clock, MapPin, ChevronRight, Check } from "lucide-react";
import { fetchUmrahPackages } from "../services/packageService";

export default function Umrah({ openGlobalModal, brand = 'skymate' }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = {
    skymate: {
      primaryText: "text-[#EB662B]",
      primaryBg: "bg-[#EB662B]",
      primaryHoverBg: "hover:bg-[#d05a26]",
      primaryBorder: "border-[#EB662B]",
      secondaryText: "text-[#EB662B]",
      btnClass: "bg-[#EB662B] text-white hover:bg-[#d05a26] shadow-orange-200/50",
      cardBadge: "bg-orange-50 text-[#EB662B] border-orange-100",
      iconColor: "text-[#EB662B]",
      featureBullet: "bg-[#EB662B]",
      viewBtn: "hover:bg-[#EB662B] hover:text-white hover:border-[#EB662B]",
      accentText: "text-[#EB662B]"
    },
    skyroo: {
      primaryText: "text-[#0ea5e9]",
      primaryBg: "bg-[#0ea5e9]",
      primaryHoverBg: "hover:bg-slate-900",
      primaryBorder: "border-[#0ea5e9]",
      secondaryText: "text-[#0ea5e9]",
      btnClass: "bg-[#0ea5e9] text-white hover:bg-slate-900 shadow-sky-200/50",
      cardBadge: "bg-sky-50 text-[#0ea5e9] border-sky-100",
      iconColor: "text-[#0ea5e9]",
      featureBullet: "bg-[#0ea5e9]",
      viewBtn: "hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9]",
      accentText: "text-[#0ea5e9]"
    },
    'safar-air': {
      primaryText: "text-[#1E40AF]",
      primaryBg: "bg-[#1E40AF]",
      primaryHoverBg: "hover:bg-[#1E3A8A]",
      primaryBorder: "border-[#1E40AF]",
      secondaryText: "text-[#F59E0B]",
      btnClass: "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] shadow-blue-200/50",
      cardBadge: "bg-blue-50 text-[#1E40AF] border-blue-100",
      iconColor: "text-[#F59E0B]",
      featureBullet: "bg-[#1E40AF]",
      viewBtn: "hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF]",
      accentText: "text-[#1E40AF]"
    }
  }[brand] || {
    primaryText: "text-[#EB662B]",
    primaryBg: "bg-[#EB662B]",
    primaryHoverBg: "hover:bg-[#d05a26]",
    primaryBorder: "border-[#EB662B]",
    secondaryText: "text-[#EB662B]",
    btnClass: "bg-[#EB662B] text-white hover:bg-[#d05a26] shadow-orange-200/50",
    cardBadge: "bg-orange-50 text-[#EB662B] border-orange-100",
    iconColor: "text-[#EB662B]",
    featureBullet: "bg-[#EB662B]",
    viewBtn: "hover:bg-[#EB662B] hover:text-white hover:border-[#EB662B]",
    accentText: "text-[#EB662B]"
  };

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log(`🔍 [UMRAH] Starting to fetch data for ${brand}...`);
        const data = await fetchUmrahPackages(brand);

        if (data && data.length > 0) {
          console.log("✅ [UMRAH] Using Firebase data");
          const mappedData = data.map((pkg) => ({
            id: pkg.id,
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
          setPackages([]);
        }
      } catch (err) {
        console.error("🚨 [UMRAH] Error loading packages:", err);
        setError(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, [brand]);

  const CardItem = ({ pkg, openGlobalModal }) => (
    <div className="group bg-white w-full flex flex-col hover:bg-slate-50 transition-colors duration-300 border border-slate-200 overflow-hidden">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${theme.primaryText} shadow-sm`}>
          {pkg.duration}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <h3 className={`text-lg font-sansita font-bold text-slate-900 leading-tight group-hover:${theme.primaryText} transition-colors`}>
            {pkg.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Star size={12} className={`fill-current ${theme.iconColor}`} />
            <span>{pkg.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <MapPin size={14} className={theme.iconColor} />
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
                <div className={`w-1 h-1 ${theme.featureBullet} rounded-full`}></div>
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
            className={`px-4 py-1.5 border border-slate-200 text-slate-900 text-xs font-semibold ${theme.viewBtn} transition-all duration-300`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white font-dm px-4 md:px-8 lg:px-20 overflow-hidden" id="umrah">
      <div className="max-w-[1536px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-sansita font-bold text-gray-900 leading-tight">
              Spiritual <span className={theme.primaryText}>Umrah Journeys</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Embark on a sacred pilgrimage with our meticulously planned Umrah
              packages. We handle every detail so you can focus on your spiritual
              experience.
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 ${theme.secondaryText}`}>
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">Top Rated</span>
            </div>
          </div>
        </div>

        {error && (
          <div className={`mb-8 p-4 border flex items-center gap-3 bg-slate-50 border-slate-100`}>
            <div className={`w-10 h-10 flex items-center justify-center bg-white border border-slate-100 ${theme.iconColor}`}>
              <Star className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-600">Showing our verified standard spiritual packages.</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-80 rounded-3xl"></div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <Star className={`w-12 h-12 ${theme.iconColor} opacity-30 mx-auto mb-4`} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Umrah Packages Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto px-6">
              Our spiritual travel consultants are currently finalizing exclusive Umrah itineraries for {brand === 'skymate' ? 'Skymate' : brand === 'skyroo' ? 'Skyroo' : 'Safar Air'}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {packages.map((pkg, index) => (
              <CardItem key={pkg.id || index} pkg={pkg} openGlobalModal={openGlobalModal} />
            ))}
          </div>
        )}
      </div>

      {/* Dedicated Custom Package Banner - Outside Main Grid Section */}
      <div className="max-w-[1536px] mx-auto mt-16 font-dm">
        <div className="w-full bg-white shadow-sm border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-64 h-64 ${theme.cardBadge.split(' ')[0]} blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all duration-500`}></div>

          <div className="text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-sansita font-bold text-slate-900 mb-3">
              Looking for a <span className={theme.accentText}>Bespoke</span>{" "}
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
            className={`flex-shrink-0 px-8 py-3 font-medium shadow-lg transition-all duration-300 flex items-center gap-2 ${theme.btnClass} hover:-translate-y-0.5`}
          >
            Get Custom Package
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
