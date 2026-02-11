import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import {
  CircleArrowLeft,
  CircleArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import { fetchMostSearched } from '../../services/packageService';
import { manila, dubai, france, himalya } from '../../assets/safar-air/index.js';
import Loader from '../common/Loader';

const fallbackCities = [
  {
    name: 'Manila',
    imageUrl: manila,
    rating: 5.0,
    reviews: 35,
    price: '$150',
  },
  {
    name: 'Dubai',
    imageUrl: dubai,
    rating: 5.0,
    reviews: 35,
    price: '$150',
  },
  {
    name: 'Paris',
    imageUrl: france,
    rating: 5.0,
    reviews: 35,
    price: '$150',
  },
  {
    name: 'Himalaya',
    imageUrl: himalya,
    rating: 5.0,
    reviews: 35,
    price: '$150',
  },
  {
    name: 'London',
    imageUrl:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 42,
    price: '$180',
  },
  {
    name: 'Tokyo',
    imageUrl:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 38,
    price: '$200',
  },
  {
    name: 'New York',
    imageUrl:
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 45,
    price: '$220',
  },
];

export default function MostSearched({ openGlobalModal }) {
  const swiperRef = useRef(null);
  const [cities, setCities] = useState(fallbackCities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const loadCities = async () => {
      try {
        const data = await fetchMostSearched();

        if (data && data.length > 0) {
          const mappedData = data.map((city) => ({
            name: city.title || city.name,
            imageUrl: city.imageUrl,
            rating: city.rating ? parseFloat(city.rating) : 5.0,
            reviews: city.reviews || 35,
            price: city.price,
          }));
          setCities(mappedData);
        }
      } catch (err) {
        console.error('Error loading most searched:', err);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadCities();
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section className='py-20 px-6 lg:px-20 bg-gradient-to-br from-white to-blue-50/40 font-inter'>
      <div className='text-center mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4'>
          <TrendingUp className='text-[#1E40AF] w-4 h-4' />
          <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
            Trending
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair'>
          Most{' '}
          <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
            Popular
          </span>{' '}
          Destinations
        </h2>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          Explore the world's most sought-after travel destinations
        </p>
      </div>

      {loading ? (
        <Loader message='Loading Popular Destinations...' />
      ) : (
        <div className='relative max-w-7xl mx-auto'>
          <Swiper
            modules={[Autoplay]}
            navigation={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={cities.length > 4}
            loopAdditionalSlides={2}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index} className='!pb-4 !pt-4'>
                <div
                  onClick={() => openGlobalModal(city.name)}
                  className='group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_25px_70px_rgba(30,64,175,0.35)] transition-all duration-500 cursor-pointer  border-2 border-transparent hover:border-[#F59E0B]'
                >
                  {/* Full height image container */}
                  <div className='relative h-96'>
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className='w-full h-full min-h-96 object-cover group-hover:scale-110 transition-transform duration-700'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10'></div>

                    {/* Premium Rating Badge */}
                    <div className='absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-2xl border border-amber-200'>
                      <Star className='w-5 h-5 text-[#F59E0B] fill-current' />
                      <span className='text-base font-bold text-gray-800'>
                        {city.rating}
                      </span>
                    </div>

                    {/* Trending Badge */}
                    <div className='absolute top-5 left-5 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white px-4 py-2 rounded-xl font-semibold shadow-lg text-sm backdrop-blur-sm border border-white/20'>
                      🔥 Trending
                    </div>

                    {/* Content Section */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent'>
                      <h3 className='text-3xl font-bold text-white mb-4 font-playfair group-hover:text-[#F59E0B] transition-colors drop-shadow-lg'>
                        {city.name}
                      </h3>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg'>
                          <span className='font-semibold'>
                            ⭐ {city.reviews} reviews
                          </span>
                        </div>
                        <div className='bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] bg-size-200 text-white px-5 py-2.5 rounded-2xl font-bold shadow-2xl text-lg border-2 border-white/30'>
                          {city.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200'
          >
            <CircleArrowLeft className='w-6 h-6' />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200'
          >
            <CircleArrowRight className='w-6 h-6' />
          </button>
        </div>
      )}
    </section>
  );
}
