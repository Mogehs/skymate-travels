import React from 'react';
import { map } from '../../assets/skyroo/index.js';

const Map = () => {
  return (
    <section>
      <div className='bg-[#f9fafa] rounded-xl px-6 pt-12 text-center'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
          Explore Destinations Across the Map
        </h3>
        <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
          Discover top travel spots around the world — your next adventure is
          just a click away.
        </p>
        <img
          src={map}
          alt='World map with destinations'
          className='mx-auto w-full max-w-4xl object-contain'
        />
      </div>
    </section>
  );
};

export default Map;
