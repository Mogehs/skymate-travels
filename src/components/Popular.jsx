import React from 'react';
import { parachute, skyline, cruise, wave, travel } from '../assets/index.js';

const tourTypes = [
  { title: 'Adventure', icon: parachute },
  { title: 'City Tour', icon: skyline },
  { title: 'Cruses Tour', icon: cruise },
  { title: 'See Tour', icon: wave },
  { title: 'Travel', icon: travel },
];

const PopularTourTypes = () => {
  return (
    <section className='max-w-[1280px] mx-auto px-4 py-12 text-center font-dm'>
      <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
        Popular Tour Types
      </h2>
      <p className='text-sm sm:text-base text-gray-500 mt-2 w-[40%] mx-auto'>
        The most popular tour packages presented to you, explore diverse
        destinations
      </p>

      <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6'>
        {tourTypes.map((type, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 bg-white'
          >
            <img src={type.icon} alt={type.title} className='w-12 h-12 mb-3' />
            <p className='text-sm font-semibold text-gray-700'>{type.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTourTypes;
