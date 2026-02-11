import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { fetchMostSearched } from '../../services/packageService';
import { manila, dubai, france, himalya } from '../../assets/skyroo/index.js';

export default function MostSearched({ openGlobalModal }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        console.log('🔍 [MOST SEARCHED] Starting to fetch data...');
        const data = await fetchMostSearched();

        console.log('📊 [MOST SEARCHED] Raw Firebase data:', data);
        console.log('📊 [MOST SEARCHED] Data count:', data ? data.length : 0);

        if (data && data.length > 0) {
          console.log('✅ [MOST SEARCHED] Using Firebase data');
          console.log('📋 [MOST SEARCHED] Sample item structure:', data[0]);

          // Map Firebase data to component format
          const mappedData = data.map((city, index) => {
            console.log(`📦 [MOST SEARCHED] Mapping city ${index + 1}:`, city);
            return {
              name: city.title || city.name,
              imageUrl: city.imageUrl,
              rating: city.rating ? parseFloat(city.rating) : 5.0,
              reviews: city.reviews || 35,
              price: city.price,
            };
          });
          console.log('✅ [MOST SEARCHED] Final mapped data:', mappedData);
          setCities(mappedData);
        } else {
          throw new Error('No most searched destinations available');
        }
      } catch (err) {
        console.error('🚨 [MOST SEARCHED] Error loading packages:', err);
        setError(err.message);
        setCities([]);
      } finally {
        setLoading(false);
        console.log('✅ [MOST SEARCHED] Loading completed');
      }
    };

    loadCities();
  }, []);

  if (loading) {
    return (
      <section className='py-12 bg-gray-100 my-10 font-dm px-6 md:px-12 lg:px-20'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            The Most Searched For{' '}
            <span className='text-sky-accent'>
              Cities Skyroo International Pvt Ltd
            </span>
          </h2>
          <div className='flex space-x-3'>
            <div className='cursor-pointer text-gray-400'>
              <CircleArrowLeft />
            </div>
            <div className='cursor-pointer text-gray-400'>
              <CircleArrowRight />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md overflow-hidden animate-pulse my-5'
            >
              <div className='w-35 h-35 bg-gray-300 rounded-xl m-4'></div>
              <div className='p-4 space-y-2'>
                <div className='h-4 bg-gray-300 rounded'></div>
                <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                <div className='h-3 bg-gray-300 rounded w-1/3'></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (cities.length === 0) {
    return (
      <section className='py-12 bg-gray-100 my-10 font-dm px-6 md:px-12 lg:px-20'>
        <div className='text-center text-gray-500'>
          No most-searched destinations available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className='py-12 bg-gray-100 my-10 font-dm px-6 md:px-12 lg:px-20'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          The Most Searched For{' '}
          <span className='text-sky-accent'>
            Cities Skyroo International Pvt Ltd
          </span>
        </h2>
        <div className='flex space-x-3'>
          <div
            ref={prevRef}
            className='cursor-pointer text-gray-700 hover:text-sky-accent transition'
          >
            <CircleArrowLeft />
          </div>
          <div
            ref={nextRef}
            className='cursor-pointer text-gray-700 hover:text-sky-accent transition'
          >
            <CircleArrowRight />
          </div>
        </div>
      </div>

      {error && (
        <div className='mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded'>
          <p>Unable to load cities from server.</p>
        </div>
      )}

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[Navigation, Autoplay]}
      >
        {cities.map((city, index) => (
          <SwiperSlide key={index}>
            <div
              className='bg-white rounded-xl pl-4 py-4 my-5 shadow-md overflow-hidden flex sm:w-[90%] 
            md:w-[98%] xl:w-full'
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                className='w-35 h-35 object-cover rounded-xl'
              />
              <div className='p-4 space-y-2'>
                <h3 className='text-lg font-semibold'>{city.name}</h3>{' '}
                <button
                  onClick={() => openGlobalModal(city.name)}
                  className='mt-2 px-4 py-1 gradient-sky-primary text-slate-900 rounded-full transition text-sm shadow-lg shadow-[#0ba2e022] hover:translate-y-[-1px]'
                >
                  Book Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}{' '}
      </Swiper>
    </section>
  );
}
