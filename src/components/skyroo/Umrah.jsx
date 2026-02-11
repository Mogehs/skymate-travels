import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { fetchUmrahPackages } from '../../services/packageService';

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log('🔍 [UMRAH] Starting to fetch data...');
        const data = await fetchUmrahPackages();

        if (data && data.length > 0) {
          console.log('✅ [UMRAH] Using Firebase data');
          const mappedData = data.map((pkg) => ({
            title: pkg.title || pkg.name,
            price: pkg.price || 'Contact Us',
            duration: pkg.duration || 'Contact Us',
            rating: pkg.rating ? parseFloat(pkg.rating) : 4.8,
            location: pkg.location || 'Makkah & Madinah',
            imageUrl: pkg.imageUrl,
            description:
              pkg.description ||
              'Complete Umrah journey with professional services.',
            features: pkg.features || [
              'Visa Processing',
              'Hotel Accommodation',
              'Transportation',
            ],
          }));
          setPackages(mappedData);
        } else {
          throw new Error('No Umrah packages available');
        }
      } catch (err) {
        console.error('🚨 [UMRAH] Error loading packages:', err);
        setError(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
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
      <section className='relative py-16'>
        <div className='absolute inset-0 gradient-sky-secondary opacity-20 blur-3xl -z-10'></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
              Sacred Journey to{' '}
              <span className='text-sky-accent'>Makkah & Madinah</span>
            </h2>
            <p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Experience the spiritual journey of a lifetime with our
              comprehensive Umrah packages. From visa processing to
              accommodation, we handle everything for your blessed pilgrimage.
            </p>
          </div>

          {/* Shimmer Loading Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col animate-pulse'
              >
                {/* Square Image Shimmer */}
                <div className='relative w-full aspect-square overflow-hidden flex-shrink-0'>
                  <div className='w-full h-full bg-gray-300 rounded-t-2xl'></div>
                </div>

                {/* Content Shimmer */}
                <div className='p-5 flex-1 flex flex-col'>
                  <div className='h-6 bg-gray-300 rounded mb-3'></div>
                  <div className='h-4 bg-gray-300 rounded mb-4 flex-1'></div>

                  {/* Location and Duration Shimmer */}
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='h-4 bg-gray-300 rounded w-20'></div>
                    <div className='h-4 bg-gray-300 rounded w-16'></div>
                  </div>

                  {/* Features Shimmer */}
                  <div className='mb-5'>
                    <div className='flex flex-wrap gap-2'>
                      {[...Array(3)].map((_, idx) => (
                        <div
                          key={idx}
                          className='h-6 bg-gray-300 rounded-full w-20'
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Button Shimmer */}
                  <div className='flex items-center justify-between mt-auto'>
                    <div className='h-6 bg-gray-300 rounded w-20'></div>
                    <div className='h-10 bg-gray-300 rounded w-24'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!packages.length) {
    return (
      <section className='relative py-16' id='umrah'>
        <div className='absolute inset-0 gradient-sky-secondary opacity-20 blur-3xl -z-10'></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-gray-500'>
          No Umrah packages are available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className='relative py-16' id='umrah'>
      <div className='absolute inset-0 gradient-sky-secondary opacity-20 blur-3xl -z-10'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Sacred Journey to{' '}
            <span className='text-sky-accent'>Makkah & Madinah</span>
          </h2>
          <p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Experience the spiritual journey of a lifetime with our
            comprehensive Umrah packages. From visa processing to accommodation,
            we handle everything for your blessed pilgrimage.
          </p>
        </div>

        {error && (
          <div className='mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg'>
            <p>Unable to load Umrah packages from server.</p>
          </div>
        )}

        {/* Packages Display - Carousel or Grid */}
        {shouldShowCarousel ? (
          <div className='relative flex-1 flex items-center'>
            {/* Custom Nav Buttons - Positioned on sides of carousel */}
            <div className='absolute top-1/2 -translate-y-1/2 left-[-32px] md:left-[-40px] z-10'>
              <button
                className='text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-sky-accent transition-colors'
                ref={prevRef}
              >
                <ChevronLeft />
              </button>
            </div>
            <div className='absolute top-1/2 -translate-y-1/2 right-[-32px] md:right-[-40px] z-10'>
              <button
                className='text-neutral-600 text-3xl font-bold px-2 py-1 cursor-pointer hover:text-sky-accent transition-colors'
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
                  <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100 h-full flex flex-col'>
                    {/* Square Image Container */}
                    <div className='relative w-full aspect-square overflow-hidden flex-shrink-0'>
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                      {/* Rating Badge */}
                      <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md'>
                        <Star
                          size={14}
                          className='text-yellow-500 fill-current'
                        />
                        <span className='text-sm font-semibold text-gray-800'>
                          {pkg.rating}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-5 flex-1 flex flex-col'>
                      <h3 className='text-lg font-bold text-gray-800 mb-3 group-hover:text-sky-accent transition-colors duration-300 line-clamp-2'>
                        {pkg.title}
                      </h3>

                      <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1'>
                        {pkg.description}
                      </p>

                      {/* Location and Duration */}
                      <div className='flex items-center gap-4 mb-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <MapPin size={16} className='text-sky-accent' />
                          <span className='font-medium'>{pkg.location}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock size={16} className='text-sky-accent' />
                          <span className='font-medium'>{pkg.duration}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className='mb-5'>
                        <div className='flex flex-wrap gap-2'>
                          {(Array.isArray(pkg.features)
                            ? pkg.features
                            : pkg.features?.split(',').map((f) => f.trim()) ||
                              []
                          )
                            .slice(0, 3)
                            .map((feature, idx) => (
                              <span
                                key={idx}
                                className='px-3 py-1.5 text-xs rounded-full font-medium bg-white/10 border border-white/15 text-white/80 backdrop-blur'
                              >
                                {feature}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Price and Book Button */}
                      <div className='flex items-center justify-between mt-auto'>
                        <div className='text-xl font-bold text-sky-accent'>
                          {pkg.price}
                        </div>
                        <button
                          onClick={() => openGlobalModal(pkg.title)}
                          className='px-6 py-2.5 gradient-sky-primary text-slate-900 rounded-full transition-all duration-300 font-medium text-sm shadow-lg shadow-[#0ba2e033] hover:translate-y-[-2px]'
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          /* Grid Layout for fewer items */
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100 h-full flex flex-col'
              >
                {/* Square Image Container */}
                <div className='relative w-full aspect-square overflow-hidden flex-shrink-0'>
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                  {/* Rating Badge */}
                  <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md'>
                    <Star size={14} className='text-yellow-500 fill-current' />
                    <span className='text-sm font-semibold text-gray-800'>
                      {pkg.rating}
                    </span>
                  </div>
                </div>

                {/* Content - Flex-grow to fill remaining space */}
                <div className='p-5 flex-1 flex flex-col'>
                  <h3 className='text-lg font-bold text-gray-800 mb-3 group-hover:text-sky-accent transition-colors duration-300 line-clamp-2'>
                    {pkg.title}
                  </h3>

                  <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1'>
                    {pkg.description}
                  </p>

                  {/* Location and Duration */}
                  <div className='flex items-center gap-4 mb-4 text-sm text-gray-500'>
                    <div className='flex items-center gap-1'>
                      <MapPin size={16} className='text-sky-accent' />
                      <span className='font-medium'>{pkg.location}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock size={16} className='text-sky-accent' />
                      <span className='font-medium'>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className='mb-5'>
                    <div className='flex flex-wrap gap-2'>
                      {(Array.isArray(pkg.features)
                        ? pkg.features
                        : pkg.features?.split(',').map((f) => f.trim()) || []
                      )
                        .slice(0, 3)
                        .map((feature, idx) => (
                          <span
                            key={idx}
                            className='px-3 py-1.5 text-xs rounded-full font-medium bg-white/10 border border-white/15 text-white/80 backdrop-blur'
                          >
                            {feature}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Price and Book Button - Push to bottom */}
                  <div className='flex items-center justify-between mt-auto'>
                    <div className='text-xl font-bold text-sky-accent'>
                      {pkg.price}
                    </div>
                    <button
                      onClick={() => openGlobalModal(pkg.title)}
                      className='px-6 py-2.5 gradient-sky-primary text-slate-900 rounded-full transition-all duration-300 font-medium text-sm shadow-lg shadow-[#0ba2e033] hover:translate-y-[-2px]'
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <p className='text-gray-600 mb-6 text-base md:text-lg'>
            Need a custom Umrah package? Contact us for personalized
            <br className='hidden sm:block' />
            <span className='text-sky-accent font-medium'>
              spiritual journey planning
            </span>
          </p>
          <button
            onClick={() => openGlobalModal('Custom Umrah Package')}
            className='px-8 py-3 gradient-sky-primary text-slate-900 rounded-full transition-all duration-300 font-semibold shadow-lg shadow-[#0ba2e033] hover:translate-y-[-2px]'
          >
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
