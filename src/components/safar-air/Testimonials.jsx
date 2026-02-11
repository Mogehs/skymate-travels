import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { user1, user2, user3, commsVector } from '../../assets/safar-air/index.js';
import { fetchTestimonialsContent } from '../../services/packageService';
import { Star, Quote } from 'lucide-react';
import Loader from '../common/Loader';

const fallbackTestimonials = [
  {
    name: 'David Thompson',
    image: user1,
    rating: 5,
    location: 'New York',
    message:
      'Safar Air International provided an exceptional travel experience. The attention to detail and personalized service exceeded all expectations. Highly recommended!',
  },
  {
    name: 'Sarah Mitchell',
    image: user2,
    rating: 5,
    location: 'London',
    message:
      'From booking to arrival, everything was seamless. The team went above and beyond to ensure our journey was perfect. Will definitely book again!',
  },
  {
    name: 'Maria Garcia',
    image: user3,
    rating: 5,
    location: 'Barcelona',
    message:
      'Outstanding service and incredible destinations. Safar Air made our dream vacation a reality with their expert planning and support.',
  },
  {
    name: 'James Wilson',
    image: user1,
    rating: 5,
    location: 'Dubai',
    message:
      'Professional, reliable, and truly cares about their clients. The premium experience they offer is worth every penny.',
  },
  {
    name: 'Emma Chen',
    image: user2,
    rating: 5,
    location: 'Singapore',
    message:
      'Best travel agency I have ever worked with. They handle everything with precision and care. A truly premium service.',
  },
];

const Testimonials = () => {
  const [items, setItems] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchTestimonialsContent();
        if (data.length) {
          setItems(
            data.map((t) => ({
              id: t.id,
              name: t.name,
              image: t.imageUrl || user1,
              rating: Number(t.rating) || 5,
              location: t.location || 'Traveler',
              message: t.message || '',
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section
      className='py-20 px-4 md:px-12 lg:px-20 font-inter max-w-[1536px] mx-auto overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-amber-50/30'
      id='testimonials'
    >
      <div className='text-center mb-16'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-6'>
          <Star className='text-[#F59E0B] w-4 h-4 fill-current' />
          <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
            Testimonials
          </span>
        </div>
        
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-6 font-playfair'>
          What Our{' '}
          <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
            Travelers Say
          </span>
        </h2>
        <p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
          Discover why thousands of travelers trust Safar Air International for their journeys
        </p>
      </div>

      {loading ? (
        <Loader message='Loading Testimonials...' />
      ) : (

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 2.5, spaceBetween: 30 },
          1280: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className='testimonials-swiper'
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className='!pb-4 !pt-4'>
            <div className='group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 h-full flex flex-col hover:scale-105'>
              {/* Quote Icon */}
              <div className='mb-6'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <Quote className='text-white w-7 h-7' />
                </div>
              </div>

              {/* Message */}
              <p className='text-gray-700 text-base leading-relaxed mb-6 flex-grow line-clamp-4'>
                "{item.message}"
              </p>

              {/* Rating */}
              <div className='flex gap-1 mb-6'>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < item.rating
                        ? 'text-[#F59E0B] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className='flex items-center gap-4 pt-6 border-t-2 border-blue-100'>
                <div className='relative'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-14 h-14 rounded-full object-cover border-2 border-blue-200'
                  />
                  <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-full flex items-center justify-center'>
                    <Star className='w-3 h-3 text-white fill-current' />
                  </div>
                </div>
                <div>
                  <h4 className='font-bold text-[#1E3A8A] text-lg'>
                    {item.name}
                  </h4>
                  <p className='text-sm text-gray-600'>{item.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )}
    </section>
  );
};

export default Testimonials;

