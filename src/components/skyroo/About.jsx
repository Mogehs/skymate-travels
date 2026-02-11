import React from 'react';
import Achievements from './Achievements';
import { travelConceptWorldwide } from '../../assets/skyroo/index.js';

const AboutUs = () => {
  return (
    <>
      <section
        id='about'
        className='flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-20 gap-10 bg-white font-dm'
      >
        {/* Left Text Section */}
        <div className='lg:w-1/2 text-center lg:text-left'>
          <h3 className='text-sm text-sky-accent tracking-widest uppercase mb-3'>
            About Us
          </h3>

          <h2 className='text-3xl lg:text-4xl font-bold mb-4 text-black font-sansita'>
            Who We Are
          </h2>
          <p className='text-gray-700 text-base lg:text-lg mb-8 leading-relaxed'>
            We are a passionate team of travel experts dedicated to turning
            every journey into a lifetime memory. From exotic escapes to city
            breaks, we offer curated travel experiences that are seamless, safe,
            and unforgettable.
          </p>

          <h2 className='text-3xl lg:text-4xl font-bold mb-4 text-black font-sansita'>
            Our Mission
          </h2>
          <p className='text-gray-700 text-base lg:text-lg leading-relaxed'>
            To make world-class travel accessible, effortless, and exceptional
            with personalized service, unbeatable value, and complete peace of
            mind at every step.
          </p>
        </div>

        {/* Right Image Section */}
        <div className='lg:w-1/2 flex justify-center'>
          <img
            src={travelConceptWorldwide} // Replace with your actual path
            alt='World Landmarks'
            className='w-full max-w-md sm:max-w-lg lg:max-w-full object-contain'
          />
        </div>
      </section>
      <hr className='opacity-[20%] w-[90%] mx-auto' />
      <Achievements />
    </>
  );
};

export default AboutUs;
