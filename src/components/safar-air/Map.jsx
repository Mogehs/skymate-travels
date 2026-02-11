import React from 'react';
import { map } from '../../assets/safar-air/index.js';
import { Globe, MapPin } from 'lucide-react';

const Map = () => {
  return (
    <section className='py-20 px-6 lg:px-20 bg-gradient-to-br from-blue-50/30 to-white'>
      <div className='bg-gradient-to-br from-white to-blue-50/50 rounded-3xl px-8 py-16 text-center shadow-2xl border-2 border-blue-100 max-w-6xl mx-auto'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-6'>
          <Globe className='text-[#1E40AF] w-4 h-4' />
          <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
            Global Reach
          </span>
        </div>
        
        <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair'>
          Explore Destinations{' '}
          <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
            Worldwide
          </span>
        </h3>
        
        <p className='text-gray-600 text-lg mb-10 max-w-2xl mx-auto'>
          Discover premium travel destinations across the globe — your next
          extraordinary adventure awaits
        </p>
        
        <div className='relative inline-block'>
          <div className='absolute -inset-4 bg-gradient-to-r from-[#1E40AF]/20 via-[#3B82F6]/20 to-[#F59E0B]/20 rounded-3xl blur-2xl'></div>
          <img
            src={map}
            alt='World map with destinations'
            className='relative mx-auto w-full max-w-5xl object-contain drop-shadow-2xl rounded-2xl'
          />
        </div>

        <div className='mt-10 flex flex-wrap justify-center gap-6'>
          <div className='flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-blue-100'>
            <MapPin className='text-[#1E40AF] w-5 h-5' />
            <span className='font-bold text-[#1E3A8A]'>150+ Destinations</span>
          </div>
          <div className='flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-blue-100'>
            <Globe className='text-[#F59E0B] w-5 h-5' />
            <span className='font-bold text-[#1E3A8A]'>50+ Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;

