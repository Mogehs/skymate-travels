import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { fetchCuratedPackages } from '../../services/packageService';
import Loader from '../common/Loader';
import {
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
} from '../../assets/safar-air/index.js';

const fallbackPackages = [
  { title: 'Thailand 5 Days Tour', imageUrl: pkg1Jpg },
  { title: 'Baku Premium Package', imageUrl: pkg2Jpg },
  { title: 'E-Visa Services', imageUrl: pkg3Jpg },
  { title: 'America Visa', imageUrl: pkg4Jpg },
  { title: 'Dubai Visit Visa', imageUrl: pkg5Jpg },
  { title: 'Europe Visa Package', imageUrl: pkg6Jpg },
  { title: 'London Tour', imageUrl: pkg7Jpg },
  { title: 'UK Visa Services', imageUrl: pkg8Jpg },
];

const CuratedPackages = ({ openGlobalModal }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [packages, setPackages] = useState(fallbackPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadPackages = async () => {
      try {
        const data = await fetchCuratedPackages();

        if (data && data.length > 0) {
          const mappedData = data.map((pkg) => ({
            title: pkg.title || pkg.name,
            imageUrl: pkg.imageUrl,
          }));
          setPackages(mappedData);
        }
      } catch (err) {
        console.error('Error loading curated packages:', err);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadPackages();
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section className='py-20 px-6 lg:px-20 bg-gradient-to-br from-white via-amber-50/30 to-blue-50/30 font-inter'>
      <div className='text-center mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4'>
          <Sparkles className='text-[#F59E0B] w-4 h-4' />
          <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
            Hand Picked
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair'>
          Curated{' '}
          <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
            Packages
          </span>
        </h2>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          Specially designed travel packages tailored to your needs
        </p>
      </div>

      {loading ? (
        <Loader message='Loading Curated Packages...' />
      ) : (
        <div className='relative max-w-7xl mx-auto'>
          <Swiper
            modules={[Autoplay]}
            navigation={false}
            onSwiper={setSwiperInstance}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
              1280: { slidesPerView: 5, spaceBetween: 32 },
            }}
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index} className='!pb-4 !pt-4'>
                <div
                  onClick={() => openGlobalModal(pkg.title)}
                  className='group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl hover:shadow-[0_20px_60px_rgba(30,64,175,0.35)] transition-all duration-500 hover:-translate-y-2 border-2 border-blue-100 hover:border-[#F59E0B]'
                >
                  {/* Professional height image container */}
                  <div className='relative h-80'>
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-80'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent'></div>

                    {/* Premium badge */}
                    <div className='absolute top-4 right-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white px-4 py-2 rounded-xl font-bold shadow-xl text-sm backdrop-blur-sm border border-white/30'>
                      ✨ Curated
                    </div>

                    {/* Content */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent'>
                      <h3 className='text-white font-bold text-xl font-playfair group-hover:text-[#F59E0B] transition-colors leading-tight drop-shadow-lg'>
                        {pkg.title}
                      </h3>
                      <p className='text-white/80 text-sm mt-2 font-medium'>
                        Click to explore package
                      </p>
                    </div>

                    {/* Premium Hover Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[#1E40AF]/95 via-[#3B82F6]/95 to-[#F59E0B]/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3'>
                      <div className='w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40'>
                        <ArrowRight className='w-8 h-8 text-white' />
                      </div>
                      <span className='text-white font-bold text-xl drop-shadow-lg'>
                        Explore Package
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      )}
    </section>
  );
};

export default CuratedPackages;
