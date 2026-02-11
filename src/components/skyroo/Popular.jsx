import React from 'react';
import { parachute, skyline, cruise, wave, travel } from '../../assets/skyroo/index.js';

const tourTypes = [
  { title: 'Adventure', icon: parachute },
  { title: 'City Tour', icon: skyline },
  { title: 'Cruses Tour', icon: cruise },
  { title: 'See Tour', icon: wave },
  { title: 'Travel', icon: travel },
];

const PopularTourTypes = () => {
  return (
    <section className='max-w-[1280px] mx-auto px-4 py-16 font-dm'>
      <div className='bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10'>
        <div className='text-center'>
          <p className='text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent mb-2'>
            Popular tour types
          </p>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
            Ways our travelers like to escape
          </h2>
          <p className='text-sm sm:text-base text-gray-500 mt-3 max-w-xl mx-auto'>
            Pick from curated travel archetypes that balance time, budget and
            experience—each ready to personalise in a single brief.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6'>
          {tourTypes.map((type, index) => (
            <article
              key={index}
              className='group flex flex-col items-start justify-between p-4 sm:p-5 rounded-2xl border border-gray-200/80 bg-slate-50 hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300'
            >
              <div className='flex items-center justify-center w-11 h-11 rounded-full bg-sky-accent-soft mb-3'>
                <img
                  src={type.icon}
                  alt={type.title}
                  className='w-6 h-6 object-contain'
                />
              </div>
              <p className='text-[0.7rem] uppercase tracking-[0.22em] text-gray-400 mb-1'>
                Tour style
              </p>
              <p className='text-sm font-semibold text-gray-800'>
                {type.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTourTypes;
