import React from 'react';
import { Trophy, Award, Clock } from 'lucide-react';

const Achievements = () => {
  const stats = [
    {
      value: '20+K',
      label: 'Successful Journeys Delivered',
      icon: Trophy,
      gradient: 'from-[#1E40AF] to-[#3B82F6]',
    },
    {
      value: '15+',
      label: 'Prestigious Travel Awards Won',
      icon: Award,
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      value: '15+',
      label: 'Years Of Industry Excellence',
      icon: Clock,
      gradient: 'from-[#F59E0B] to-[#FCD34D]',
    },
  ];

  return (
    <section className='px-6 py-16 lg:px-20 bg-gradient-to-br from-white to-blue-50/30'>
      <div className='flex flex-col lg:flex-row lg:items-center gap-10 font-inter'>
        {/* Left Heading */}
        <div className='lg:w-1/3 text-center lg:text-left'>
          <h2 className='text-4xl lg:text-5xl font-bold text-[#1E3A8A] leading-snug font-playfair mb-4'>
            Our
            <br />
            <span className='bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent'>
              Achievements
            </span>
          </h2>
          <p className='text-gray-600 text-lg mt-4'>
            Excellence in every journey
          </p>
        </div>

        {/* Right Stats */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-6 lg:gap-8 justify-center lg:w-2/3'>
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className='group bg-white border-2 border-blue-100 shadow-lg hover:shadow-2xl cursor-pointer hover:border-blue-300 transition-all duration-300 rounded-2xl px-6 py-8 text-center w-full sm:w-[220px] flex flex-col items-center hover:scale-105'
              >
                <div className={`p-4 mb-4 bg-gradient-to-br ${item.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className='w-7 h-7 text-white' />
                </div>
                <h3 className={`text-3xl font-extrabold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-3`}>
                  {item.value}
                </h3>
                <p className='text-sm text-gray-700 leading-snug font-medium'>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

