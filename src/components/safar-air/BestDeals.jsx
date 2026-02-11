import React, { useState, useEffect } from 'react';
import { fetchBestDeals } from '../../services/packageService';
import { japan, italy, usa, europe } from '../../assets/safar-air/index.js';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import Loader from '../common/Loader';

const fallbackDeals = [
  {
    title: 'Kyoto, Japan',
    days: '10 Days Trip',
    price: '$5.42k',
    imageUrl: japan,
  },
  {
    title: 'Rome, Italy',
    days: '12 Days Trip',
    price: '$4.2k',
    imageUrl: italy,
  },
  {
    title: 'New York City, USA',
    days: '28 Days Trip',
    price: '$15k',
    imageUrl: usa,
  },
  {
    title: 'Full Europe',
    days: '28 Days Trip',
    price: '$15k',
    imageUrl: europe,
  },
];

export default function BestDeals() {
  const [deals, setDeals] = useState(fallbackDeals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadDeals = async () => {
      try {
        const data = await fetchBestDeals();

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
        console.error('Error loading best deals:', err);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadDeals();
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section className='py-20 px-6 lg:px-20 bg-gradient-to-br from-blue-50/30 via-white to-amber-50/20 font-inter'>
      <div className='text-center mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4'>
          <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
            Special Offers
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair'>
          Best{' '}
          <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
            Deals
          </span>
        </h2>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          Exclusive offers on premium travel packages
        </p>
      </div>

      {loading ? (
        <Loader message='Loading Best Deals...' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {deals.map((deal, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_25px_70px_rgba(30,64,175,0.4)] transition-all duration-500 hover:-translate-y-3 cursor-pointer border-2 border-blue-100 hover:border-[#F59E0B]'
            >
              {/* Full height professional image */}
              <div className='relative h-[450px]'>
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[450px]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10'></div>

                {/* Premium Price Badge */}
                <div className='absolute top-5 right-5 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] bg-size-200 text-white px-5 py-3 rounded-2xl font-bold shadow-2xl text-xl border-2 border-white/30 backdrop-blur-sm'>
                  {deal.price}
                </div>

                {/* Best Deal Badge */}
                <div className='absolute top-5 left-5 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white px-4 py-2 rounded-xl font-semibold shadow-xl text-sm backdrop-blur-sm border border-white/20'>
                  💎 Best Deal
                </div>

                {/* Content Section */}
                <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent'>
                  {/* Duration Badge */}
                  <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-xl mb-4 border border-white/20'>
                    <Clock className='w-4 h-4' />
                    <span className='font-semibold'>{deal.days}</span>
                  </div>

                  <h3 className='text-2xl font-bold text-white mb-4 font-playfair group-hover:text-[#F59E0B] transition-colors drop-shadow-lg leading-tight'>
                    {deal.title}
                  </h3>

                  <div className='flex items-center justify-between pt-3 border-t border-white/20'>
                    <div className='flex items-center gap-2 text-white/90 text-sm'>
                      <MapPin className='w-5 h-5 text-[#F59E0B]' />
                      <span className='font-semibold'>Explore Destination</span>
                    </div>

                    <div className='flex items-center gap-2 text-white group-hover:gap-3 transition-all bg-gradient-to-r from-[#F59E0B]/20 to-transparent px-3 py-2 rounded-lg'>
                      <span className='text-sm font-bold'>View</span>
                      <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated border on hover */}
              <div className='absolute inset-0 border-4 border-transparent group-hover:border-[#F59E0B] rounded-3xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100'></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
