import React from 'react';
import Achievements from './Achievements';
import { travelConceptWorldwide } from '../../assets/safar-air/index.js';
import { Target, Users, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <>
      <section
        id='about'
        className='flex flex-col lg:flex-row items-center justify-between px-6 py-16 lg:px-20 gap-12 bg-gradient-to-br from-white via-blue-50/30 to-white font-inter'
      >
        {/* Left Text Section */}
        <div className='lg:w-1/2 text-center lg:text-left'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4'>
            <Users className='text-[#1E40AF] w-4 h-4' />
            <span className='text-sm text-[#1E40AF] font-semibold tracking-wide uppercase'>
              About Us
            </span>
          </div>

          <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-[#1E3A8A] font-playfair'>
            Who We Are
          </h2>
          <p className='text-gray-700 text-base lg:text-lg mb-10 leading-relaxed'>
            Safar Air International is a premier travel company dedicated to
            crafting exceptional journeys around the globe. With a passion for
            excellence and attention to detail, we transform ordinary trips into
            extraordinary experiences that create lasting memories.
          </p>

          <div className='flex items-start gap-4 mb-8'>
            <div className='p-3 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl'>
              <Target className='text-white w-6 h-6' />
            </div>
            <div>
              <h3 className='text-2xl lg:text-3xl font-bold mb-3 text-[#1E3A8A] font-playfair'>
                Our Mission
              </h3>
              <p className='text-gray-700 text-base lg:text-lg leading-relaxed'>
                To deliver world-class travel experiences through personalized
                service, innovative solutions, and unwavering commitment to
                customer satisfaction. We believe every journey should be
                seamless, enriching, and unforgettable.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className='lg:w-1/2 flex justify-center relative'>
          <div className='absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-[#3B82F6]/20 to-[#F59E0B]/20 rounded-full blur-3xl'></div>
          <img
            src={travelConceptWorldwide}
            alt='World Landmarks'
            className='relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-full object-contain drop-shadow-2xl'
          />
        </div>
      </section>
      <hr className='opacity-20 w-[90%] mx-auto border-blue-200' />
      <Achievements />
    </>
  );
};

export default AboutUs;

