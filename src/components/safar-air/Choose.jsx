import React from 'react';
import {
  glob,
  coin,
  time,
  date,
  group84,
  beautifulCollageTravel,
} from '../../assets/safar-air/index.js';
import { Shield, Award, Clock, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trusted By Thousands Of Travelers',
    desc: 'Proven Reliability With Happy Travelers Worldwide.',
    gradient: 'from-[#1E40AF] to-[#3B82F6]',
  },
  {
    icon: Award,
    title: 'Exclusive Deals & Best Price Guarantee',
    desc: 'Top Offers With Prices You Won\'t Find Elsewhere.',
    gradient: 'from-[#3B82F6] to-[#60A5FA]',
  },
  {
    icon: Clock,
    title: '24/7 Personal Travel Concierge',
    desc: 'Support Anytime, Anywhere — Always On.',
    gradient: 'from-[#60A5FA] to-[#93C5FD]',
  },
  {
    icon: CreditCard,
    title: 'One-Click Secure Booking',
    desc: 'Fast, Safe, And Hassle-Free Reservations.',
    gradient: 'from-[#F59E0B] to-[#FCD34D]',
  },
];

const WhyChooseUs = () => {
  return (
    <section className='relative py-16 px-6 lg:px-20 bg-gradient-to-br from-white via-blue-50/40 to-amber-50/30 overflow-hidden font-inter'>
      {/* Background decorative elements */}
      <div className='absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-[#F59E0B]/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-[#1E40AF]/10 to-[#3B82F6]/10 rounded-full blur-3xl'></div>

      <div className='relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12'>
        {/* Left image section */}
        <div className='w-full lg:w-1/2 flex justify-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-[#1E40AF]/20 to-[#F59E0B]/20 rounded-3xl blur-xl'></div>
            <img
              src={beautifulCollageTravel}
              alt='Travel Suitcase'
              className='relative z-10 max-w-xs md:max-w-sm drop-shadow-2xl'
            />
          </div>
        </div>

        {/* Right content */}
        <div className='w-full lg:w-1/2 space-y-6'>
          <div className='mb-8'>
            <h2 className='text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair'>
              Why Choose Us
            </h2>
            <p className='text-gray-600 text-lg'>
              Experience the difference with Safar Air International
            </p>
          </div>
          
          <div className='space-y-6'>
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className='group flex items-start gap-5 cursor-pointer hover:scale-105 sm:w-[95%] rounded-2xl transition-all duration-300 p-6 bg-white shadow-lg hover:shadow-2xl border border-blue-100/50'
                >
                  <div className={`p-4 bg-gradient-to-br ${item.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-lg text-[#1E3A8A] mb-2 group-hover:text-[#1E40AF] transition-colors'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-gray-600 leading-relaxed'>{item.desc}</p>
                  </div>
                  <div className={`w-1 h-full bg-gradient-to-b ${item.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

