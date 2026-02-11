import React, { useState, useEffect } from 'react';
import { fetchBestDeals } from '../../services/packageService';

export default function BestDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        console.log('🔍 [BEST DEALS] Starting to fetch data...');
        const data = await fetchBestDeals();

        console.log('📊 [BEST DEALS] Raw Firebase data:', data);
        console.log('📊 [BEST DEALS] Data count:', data ? data.length : 0);

        if (data && data.length > 0) {
          console.log('✅ [BEST DEALS] Using Firebase data');
          console.log('📋 [BEST DEALS] Sample item structure:', data[0]);

          // Map Firebase data to component format
          const mappedData = data.map((deal, index) => {
            console.log(`📦 [BEST DEALS] Mapping deal ${index + 1}:`, deal);
            return {
              title: deal.title || deal.name,
              days: deal.days || deal.duration,
              price: deal.price,
              imageUrl: deal.imageUrl,
            };
          });
          console.log('✅ [BEST DEALS] Final mapped data:', mappedData);
          setDeals(mappedData);
        } else {
          throw new Error('No best deals available');
        }
      } catch (err) {
        console.error('🚨 [BEST DEALS] Error loading packages:', err);
        setError(err.message);
        setDeals([]); // Clear data when error occurs
      } finally {
        setLoading(false);
        console.log('✅ [BEST DEALS] Loading completed');
      }
    };

    loadDeals();
  }, []);

  if (loading) {
    return (
      <section className='py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto'>
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
            <div>
              <p className='text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent mb-2'>
                Best‑value escapes
              </p>
              <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
                Best Deal <span className='text-sky-accent'>Destinations</span>
              </h2>
            </div>
            <p className='text-xs sm:text-sm text-gray-500 max-w-xs'>
              Hand‑picked routes where timing, cabin and pricing line up
              perfectly for the coming weeks.
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className='bg-white rounded-2xl shadow-md overflow-hidden animate-pulse'
              >
                <div className='aspect-square bg-gray-200'></div>
                <div className='p-4'>
                  <div className='h-4 bg-gray-200 rounded mb-2'></div>
                  <div className='flex justify-between items-center'>
                    <div className='h-3 bg-gray-200 rounded w-1/3'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (deals.length === 0) {
    return (
      <section className='py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto'>
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10 text-center text-gray-500'>
          No best deals available at the moment. Check back soon!
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto'>
      <div className='bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <p className='text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent mb-2'>
              Best‑value escapes
            </p>
            <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
              Best Deal <span className='text-sky-accent'>Destinations</span>
            </h2>
          </div>
          <p className='text-xs sm:text-sm text-gray-500 max-w-xs'>
            Hand‑picked routes where timing, cabin and pricing line up
            perfectly for the coming weeks.
          </p>
        </div>

        {error && (
          <div className='mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl text-sm'>
            <p>Unable to load deals from server.</p>
          </div>
        )}

        {/* Responsive Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {deals.map((deal, idx) => (
            <article
              key={idx}
              className='group bg-slate-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:border-sky-accent/50 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col'
            >
              <div className='relative aspect-square overflow-hidden'>
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <span className='absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[0.7rem] font-medium text-slate-800 shadow-sm'>
                  {deal.days}
                </span>
              </div>
              <div className='p-4 flex-1 flex flex-col justify-between'>
                <h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2'>
                  {deal.title}
                </h3>
                <div className='flex items-center justify-between text-xs text-gray-600 mt-auto pt-1'>
                  <span className='uppercase tracking-[0.18em] text-slate-400'>
                    From
                  </span>
                  <span className='text-base font-semibold text-sky-accent'>
                    {deal.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
