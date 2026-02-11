import React from 'react';
import { parachute, skyline, cruise, wave, travel } from '../../assets/safar-air/index.js';
import { Mountain, Building2, Ship, Waves, Plane } from 'lucide-react';

const tourTypes = [
  { title: 'Adventure', icon: Mountain, color: 'from-[#1E40AF] to-[#3B82F6]' },
  { title: 'City Tour', icon: Building2, color: 'from-[#3B82F6] to-[#60A5FA]' },
  { title: 'Cruise Tour', icon: Ship, color: 'from-[#60A5FA] to-[#93C5FD]' },
  { title: 'Beach Tour', icon: Waves, color: 'from-[#93C5FD] to-[#BFDBFE]' },
  { title: 'Travel', icon: Plane, color: 'from-[#F59E0B] to-[#FCD34D]' },
];

const PopularTourTypes = () => {
  return (
    <section className='max-w-[1280px] mx-auto px-4 py-16 text-center font-inter bg-gradient-to-b from-white to-blue-50/30'>
      <div className='mb-4'>
        <span className='inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full text-sm text-[#1E40AF] font-semibold tracking-wide uppercase mb-4'>
          Explore Tours
        </span>
      </div>
      
      <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A8A] font-playfair mb-4'>
        Popular Tour Types
      </h2>
      <p className='text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed'>
        Discover our most sought-after travel packages and embark on
        unforgettable journeys to diverse destinations around the world
      </p>

      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6'>
        {tourTypes.map((type, index) => {
          const IconComponent = type.icon;
          return (
            <div
              key={index}
              className='group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white cursor-pointer hover:scale-105'
            >
              <div className={`p-4 mb-4 bg-gradient-to-br ${type.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className='w-7 h-7 text-white' />
              </div>
              <p className='text-sm font-bold text-[#1E3A8A] group-hover:text-[#1E40AF] transition-colors'>
                {type.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularTourTypes;

