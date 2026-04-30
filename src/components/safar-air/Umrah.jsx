import React, { useState, useEffect } from "react";
import { Star, MapPin, ChevronRight, Check } from "lucide-react";
import { fetchUmrahPackages } from "../../services/packageService";
import Loader from "../common/Loader";



export default function Umrah({ openGlobalModal }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchUmrahPackages('safar-air');
        if (data && data.length > 0) {
          setPackages(data.slice(0, 3));
        } else {
          setPackages([]);
        }
      } catch (err) {
        console.error("Error loading Umrah packages:", err);
        setError("Unable to load the latest packages.");
        setPackages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const CardItem = ({ pkg }) => (
    <div className="group bg-white w-full sm:w-1/2 lg:w-1/3 flex flex-col hover:bg-slate-50 transition-colors duration-300 border border-slate-100 overflow-hidden">
      {/* Image - Sharper, wider aspect */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E40AF] rounded shadow-sm border border-slate-100">
          {pkg.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 flex flex-col flex-1 gap-4 font-dm">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-sansita font-bold text-slate-900 leading-tight group-hover:text-[#1E40AF] transition-colors">
            {pkg.title}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
            <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-slate-900">{pkg.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <MapPin size={14} className="text-[#F59E0B]" />
          {pkg.location}
        </div>

        <div className="space-y-2 mt-2 mb-6">
          {(Array.isArray(pkg.features)
            ? pkg.features
            : pkg.features?.split(",").map((f) => f.trim()) || []
          )
            .slice(0, 3)
            .map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-slate-600 text-[0.8rem] font-light"
              >
                <div className="w-1 h-1 bg-[#1E40AF]/40 rounded-full"></div>
                {feature}
              </div>
            ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
              Pricing from
            </p>
            <p className="text-xl font-bold text-slate-900 font-sansita tracking-tight">
              {pkg.price}
            </p>
          </div>
          <button
            onClick={() => openGlobalModal(pkg.title)}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-[#1E40AF] transition-all duration-300 rounded-full shadow-lg shadow-slate-200"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section
        className="py-12 md:py-16 bg-white font-dm overflow-hidden"
        id="umrah"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 text-[#F59E0B]">
              <Star className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                Spiritual Legacy
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-sansita font-bold text-slate-900 leading-tight mb-6">
              Sacred Journey to <br className="hidden md:block" />
              <span className="text-[#1E40AF]">Makkah & Madinah</span>
            </h2>

            <p className="text-slate-500 text-base lg:text-lg font-light leading-relaxed max-w-2xl">
              Experience the spiritual journey of a lifetime with our
              meticulously crafted Umrah experiences designed for utter peace.
            </p>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader message="Fetching Sacred Packages..." />
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-8 p-4 bg-slate-50 text-slate-500 text-xs tracking-widest uppercase text-center border border-slate-100 rounded-xl">
                  {error} Showing verified spiritual pathways.
                </div>
              )}

              {/* Grid Layout */}
              {packages.length > 0 ? (
                <div className="flex flex-wrap border-l border-t border-slate-100">
                  {packages.map((pkg, index) => (
                    <CardItem key={index} pkg={pkg} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* Bespoke Experience Banner */}
      {packages.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 font-dm">
          <div className="w-full bg-slate-50 rounded-[32px] border border-slate-100 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-[#F59E0B]/10 transition-colors duration-700"></div>

            <div className="text-left relative z-10 max-w-2xl">
              <h3 className="text-3xl lg:text-4xl font-sansita font-bold text-slate-900 mb-4 leading-tight">
                Looking for a <span className="text-[#1E40AF]">Bespoke</span>{" "}
                <br className="hidden sm:block" />
                Spiritual Experience?
              </h3>
              <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-light">
                We specialize in curating personalized spiritual journeys tailored
                to your family's unique requirements and schedule.
              </p>
            </div>

            <button
              onClick={() => openGlobalModal("Custom Umrah Experience")}
              className="flex-shrink-0 px-10 py-4 bg-[#1E40AF] text-white rounded-full font-bold shadow-xl shadow-blue-100 hover:shadow-2xl hover:bg-[#1E3A8A] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-sm tracking-widest uppercase"
            >
              Curate Yours
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
