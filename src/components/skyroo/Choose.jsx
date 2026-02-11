import React from 'react';
import {
  glob,
  coin,
  time,
  date,
  group84,
  beautifulCollageTravel,
} from '../../assets/skyroo/index.js';

const features = [
  {
    icon: glob,
    title: 'Trusted By Thousands Of Travelers',
    desc: 'Proven Reliability With Happy Travelers Worldwide.',
  },
  {
    icon: coin,
    title: 'Exclusive Deals & Best Price Guarantee',
    desc: 'Top Offers With Prices You Won’t Find Elsewhere.',
  },
  {
    icon: time,
    title: '24/7 Personal Travel Concierge',
    desc: 'Support Anytime, Anywhere — Always On.',
  },
  {
    icon: date,
    title: 'One-Click Secure Booking',
    desc: 'Fast, Safe, And Hassle-Free Reservations.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className='py-16 px-4 lg:px-6 font-dm'>
      <div className='max-w-[1280px] mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative'>
        {/* Background floating icons */}
        <img
          src={group84}
          alt='plane'
          className='absolute -left-6 top-10 w-10 opacity-20 z-0 hidden sm:block'
        />
        <img
          src={group84}
          alt='plane'
          className='absolute -right-4 bottom-10 w-12 opacity-20 z-0 hidden sm:block'
        />

        <div className='relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-10 py-10'>
          {/* Left suitcase image */}
          <div className='w-full lg:w-1/2 flex justify-center'>
            <div className='rounded-3xl bg-slate-50 border border-slate-200 shadow-inner p-5 max-w-sm w-full'>
              <img
                src={beautifulCollageTravel}
                alt='Suitcase'
                className='w-full h-full object-contain'
              />
            </div>
          </div>

          {/* Right content */}
          <div className='w-full lg:w-1/2 space-y-5'>
            <p className='text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent'>
              Why travelers stay with Skyroo
            </p>
            <h2 className='text-3xl font-semibold text-gray-900'>
              A single desk for flights, visas and follow‑through
            </h2>
            <p className='text-sm text-gray-600 max-w-md'>
              From the first route sketch to real‑time disruption support, our
              team acts as your mission control for every sector you fly.
            </p>

            <div className='space-y-4 mt-4'>
              {features.map((item, index) => (
                <div
                  key={index}
                  className='flex items-start gap-4 cursor-pointer rounded-2xl border border-gray-200/80 bg-slate-50 hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 px-4 py-3 sm:w-[88%]'
                >
                  <div className='flex items-center justify-center w-10 h-10 rounded-full bg-sky-accent-soft flex-shrink-0'>
                    <img src={item.icon} alt='icon' className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm text-gray-900'>
                      {item.title}
                    </h3>
                    <p className='text-xs text-gray-600 mt-1'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
