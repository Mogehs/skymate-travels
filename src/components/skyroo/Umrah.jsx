import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Check,
} from "lucide-react";
import { fetchUmrahPackages } from "../../services/packageService";

export default function Umrah({ openGlobalModal }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window width for breakpoint checks
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchUmrahPackages();

        if (data && data.length > 0) {
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
          throw new Error("No Umrah packages available");
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
  }, []);

  const CardItem = ({ pkg }) => (
    <div className="group bg-white w-full sm:w-1/2 lg:w-1/3 flex flex-col hover:bg-slate-50 transition-colors duration-300  border border-slate-200">
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
          <h3 className="text-lg font-sansita font-bold text-slate-900 leading-tight group-hover:text-sky-accent transition-colors">
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
                <div className="w-1 h-1 bg-sky-accent rounded-full"></div>
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
            className="px-4 py-1.5 border border-slate-200 text-slate-900 text-xs font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 rounded-full"
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

  if (!packages.length) return null;

  return (
    <section className="py-12 md:py-16 bg-white font-dm" id="umrah">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs text-sky-accent tracking-[0.2em] uppercase mb-3 font-semibold">
            Spiritual Journeys
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 font-sansita mb-4">
            Sacred Journey to{" "}
            <span className="text-sky-accent">Makkah & Madinah</span>
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Experience the spiritual journey of a lifetime with our
            comprehensive Umrah packages.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-center rounded text-sm">
            Unable to load packages.
          </div>
        )}

        {/* Flex Wrapper for Clean Borders */}
        <div className="flex flex-wrap">
          {packages.map((pkg, index) => (
            <CardItem key={index} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
