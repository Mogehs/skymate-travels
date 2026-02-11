import React from 'react';
import { CalendarDays, MapPin, X, Users, MessageSquare } from 'lucide-react';
import { sendBookingEmail } from '../../utils/sendEmail';

const BookingForm = ({
  onClose,
  packageName = 'Check Our Curated Package Or Just Start The Conversation',
}) => {
  const handleSubmit = (e) => {
    sendBookingEmail(e);
    if (onClose) onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        transform: 'none',
      }}
    >
      <div
        className='bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide'
        style={{
          position: 'relative',
          transform: 'none',
        }}
      >
        {/* Modal Header */}
        <div className='gradient-sky-secondary rounded-t-xl p-6 border-b border-white/10 flex justify-between items-center sticky top-0 z-10 text-white'>
          <div>
            <h3 className='text-2xl font-[var(--font-heading)] font-bold'>
              Book Your Dream Vacation
            </h3>
            <p className='text-sm text-white/70 font-dm'>
              Fill in the details below and we'll get back to you
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-white/70 hover:text-white transition-colors'
          >
            <X size={24} />
          </button>
        </div>
        {/* Modal Body */}
        <div className='p-6'>
          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {/* FormSubmit honeypot field to prevent spam */}
            <input type='text' name='_honey' style={{ display: 'none' }} />
            {/* Disable captcha */}
            <input type='hidden' name='_captcha' value='false' />
            {/* Form subject */}
            <input type='hidden' name='_subject' value='New Booking Request' />
            {/* Time */}
            <input
              type='hidden'
              name='submission_time'
              value={new Date().toLocaleString()}
            />
            {/* Name */}
            <div className='flex flex-col'>
              <label
                htmlFor='name'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Full Name *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  placeholder='Your full name'
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Email */}
            <div className='flex flex-col'>
              <label
                htmlFor='email'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Email
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Your email address'
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Phone */}
            <div className='flex flex-col'>
              <label
                htmlFor='phone'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Phone Number *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  required
                  placeholder='Your phone number'
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Destination */}
            <div className='flex flex-col'>
              <label
                htmlFor='destination'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Destination *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <MapPin size={16} className='text-gray-400' />
                <input
                  type='text'
                  id='destination'
                  name='destination'
                  required
                  placeholder='Where do you want to go?'
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Departure Date */}
            <div className='flex flex-col'>
              <label
                htmlFor='departure'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Departure Date *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <CalendarDays size={16} className='text-gray-400' />
                <input
                  type='date'
                  id='departure'
                  name='departure'
                  required
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Arrival Date */}
            <div className='flex flex-col'>
              <label
                htmlFor='arrival'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Return Date *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <CalendarDays size={16} className='text-gray-400' />
                <input
                  type='date'
                  id='arrival'
                  name='arrival'
                  required
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>
            {/* Number of Adults */}
            <div className='flex flex-col'>
              <label
                htmlFor='adults'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Number of Adults *
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <Users size={16} className='text-gray-400' />
                <input
                  type='number'
                  id='adults'
                  name='adults'
                  min='1'
                  required
                  placeholder='Number of adults'
                  className='w-full outline-none text-sm'
                />
              </div>
            </div>{' '}
            {/* Selected Package - Hidden Input */}
            <input type='hidden' name='package' value={packageName} />
            {/* Selected Package - Display */}
            <div className='flex flex-col md:col-span-2 mb-2'>
              <label className='text-sm font-semibold mb-1 font-dm'>
                Selected Package
              </label>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-gray-50'>
                <p className='text-sm text-gray-700'>{packageName}</p>
              </div>
            </div>
            {/* Message */}
            <div className='flex flex-col md:col-span-2'>
              <label
                htmlFor='message'
                className='text-sm font-semibold mb-1 font-dm'
              >
                Message *
              </label>
              <div className='flex items-start gap-2 border border-gray-300 rounded-md px-4 py-2 focus-within:border-sky-accent focus-within:ring-1 focus-within:ring-[rgba(11,162,224,0.6)]'>
                <MessageSquare size={16} className='text-gray-400 mt-1' />
                <textarea
                  id='message'
                  name='message'
                  required
                  placeholder='Tell us more about your travel plans...'
                  rows='4'
                  className='w-full outline-none text-sm resize-none'
                ></textarea>
              </div>
            </div>
            {/* Submit Button */}
            <div className='md:col-span-2 mt-4 flex justify-end'>
              <button
                type='submit'
                className='gradient-sky-primary text-slate-900 px-8 py-3 rounded-full text-base font-semibold shadow-lg shadow-[#0ba2e022] hover:translate-y-[-2px] transition'
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
