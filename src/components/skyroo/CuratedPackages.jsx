// Import statements and package data
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchCuratedPackages } from '../../services/packageService';
import {
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
} from '../../assets/skyroo/index.js';

const fallbackImages = [
  pkg1Jpg,
  pkg2Jpg,
  pkg3Jpg,
  pkg4Jpg,
  pkg5Jpg,
  pkg6Jpg,
  pkg7Jpg,
  pkg8Jpg,
];

const CuratedPackages = ({ openGlobalModal }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window width for breakpoint checks
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log('🔍 [CURATED] Starting to fetch data...');
        const data = await fetchCuratedPackages();

        console.log('📊 [CURATED] Raw Firebase data:', data);
        console.log('📊 [CURATED] Data count:', data ? data.length : 0);

        if (data && data.length > 0) {
          console.log('✅ [CURATED] Using Firebase data');
          console.log('📋 [CURATED] Sample item structure:', data[0]);

          const mappedData = data.map((pkg, index) => {
            console.log(`📦 [CURATED] Mapping package ${index + 1}:`, pkg);
            return {
              title: pkg.title || pkg.name,
              imageUrl: pkg.imageUrl || fallbackImages[index % fallbackImages.length],
            };
          });
          console.log('✅ [CURATED] Final mapped data:', mappedData);
          setPackages(mappedData);
        } else {
          throw new Error('No curated packages available');
        }
      } catch (err) {
        console.error('🚨 [CURATED] Error loading packages:', err);
        setError(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
        console.log('✅ [CURATED] Loading completed');
      }
    };

    loadPackages();
  }, []);

  // Minimum items required for carousel based on screen size
  const getMinItemsRequired = () => {
    if (windowWidth >= 1024) return 4; // Large screens
    if (windowWidth >= 768) return 4; // Medium screens
    return 2; // Small screens
  };

  const shouldShowCarousel = packages.length >= getMinItemsRequired();

  if (loading) {
    return (
      <section className='py-16 px-4 md:px-12 lg:px-20 font-dm max-w-[1280px] mx-auto bg-white rounded-3xl shadow-sm border border-gray-100'>
        <h2 className='text-3xl font-semibold text-center text-gray-900 mb-8'>
          Explore Our <span className='text-sky-accent'>Curated Packages</span>
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className='bg-white p-4 rounded-xl shadow-md animate-pulse'
            >
              <div className='aspect-square bg-gray-300 rounded-xl mb-4'></div>
              <div className='h-4 bg-gray-300 rounded mb-2'></div>
              <div className='h-8 bg-gray-300 rounded'></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!packages.length) {
    return (
      <section className='py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto'>
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10 text-center text-gray-500'>
          No curated packages are available right now.
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto'>
      <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden px-6 sm:px-10 py-10'>
        <div className='text-center mb-8'>
          <p className='text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent mb-2'>
            Signature collections
          </p>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
            Explore Our <span className='text-sky-accent'>Curated Packages</span>
          </h2>
          <p className='mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto'>
            Visa, stays and flights bundled into quiet, ready‑to‑fly experiences
            that can be fine‑tuned to your dates.
          </p>
        </div>

        {error && (
          <div className='mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl text-sm'>
            <p>Unable to load packages from server.</p>
          </div>
        )}

        {shouldShowCarousel ? (
        <div className='relative flex-1 flex items-center'>
          {/* Custom Nav Buttons */}
          <div className='absolute top-1/2 -translate-y-1/2 left-[-32px] md:left-[-40px] z-10'>
              <button
                className='text-neutral-500 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-sky-accent transition-colors'
                ref={prevRef}
              >
              <ChevronLeft />
            </button>
          </div>
          <div className='absolute top-1/2 -translate-y-1/2 right-[-32px] md:right-[-40px] z-10'>
              <button
                className='text-neutral-500 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-sky-accent transition-colors'
                ref={nextRef}
              >
              <ChevronRight />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            centeredSlides={true}
            initialSlide={1}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3 },
            }}
            className='pb-8 w-full'
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div
                  className='transition-transform duration-300 transform bg-white text-gray-900 p-4 text-center rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 cursor-pointer'
                  onClick={() => openGlobalModal(pkg.title)}
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className='w-full aspect-square object-cover rounded-2xl mb-4'
                  />
                  <p className='text-lg font-medium'>{pkg.title}</p>
                  <button className='mt-3 gradient-sky-primary text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#0ba2e022] hover:translate-y-[-2px] transition'>
                    Book Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className='transition-transform duration-300 transform bg-white text-gray-900 p-4 text-center rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-100 cursor-pointer'
                onClick={() => openGlobalModal(pkg.title)}
              >
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className='w-full aspect-square object-cover rounded-2xl mb-4'
                />
                <p className='text-lg font-medium'>{pkg.title}</p>
                <button className='mt-3 gradient-sky-primary text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#0ba2e022] hover:translate-y-[-2px] transition'>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CuratedPackages;
