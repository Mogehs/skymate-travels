import React, { useState, useEffect } from "react";
import { fetchBestDeals } from "../../services/packageService";
import { japan, italy, usa, europe } from "../../assets/safar-air/index.js";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Loader from "../common/Loader";



export default function BestDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadDeals = async () => {
      try {
        const data = await fetchBestDeals('safar-air');
        if (data && data.length > 0) {
          const mappedData = data.map((deal) => ({
            title: deal.title || deal.name,
            days: deal.days || deal.duration,
            price: deal.price,
            imageUrl: deal.imageUrl,
          }));
          setDeals(mappedData);
        }
      } catch (err) {
        console.error("Error loading best deals:", err);
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadDeals();
    return () => clearTimeout(loadingTimeout);
  }, []);

  const DealCard = ({ deal }) => (
    <div className="group bg-white flex flex-col border border-slate-100 hover:bg-slate-50 transition-all duration-300">
      {/* Image Container - Sharp and focused */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Price Badge - Minimalist but clear */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded shadow-sm border border-slate-100">
          <span className="text-sm font-bold text-slate-900 tracking-tight font-sansita">
            {deal.price}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-[#1E40AF] text-white px-2 py-1 rounded shadow-sm">
          <div className="flex items-center gap-1.5">
            <Tag size={10} className="fill-current" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em]">
              Best Deal
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-1 font-dm">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={14} />
            <span className="text-[0.7rem] font-light uppercase tracking-widest">
              {deal.days}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-sansita font-bold text-slate-900 mb-6 leading-tight group-hover:text-[#1E40AF] transition-colors">
          {deal.title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-slate-400 uppercase tracking-[0.15em] font-bold mb-1">
              Explore
            </span>
            <span className="text-xs font-semibold text-slate-900">
              Destination
            </span>
          </div>

          <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#1E40AF] group-hover:translate-x-1 shadow-lg shadow-slate-200">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white py-10 lg:py-14 font-dm overflow-hidden border-b border-slate-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Header - Minimalist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-6 text-[#1E40AF]">
              <Tag className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                Exclusive Offers
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-sansita font-bold text-slate-900 leading-tight">
              Exceptional <span className="text-[#F59E0B]">Curated Deals</span>
            </h2>
          </div>

          <p className="text-slate-500 text-sm lg:text-base font-light leading-relaxed max-w-sm">
            Hand-picked opportunities where timing and luxury pricing align
            perfectly for the season.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader message="Checking Best Offers..." />
          </div>
        ) : deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
            {deals.map((deal, index) => (
              <DealCard key={index} deal={deal} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
