import { contact } from '../../assets/skyroo/index.js';

import React, { useState } from 'react';

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    fetch('https://formsubmit.co/ajax/skyroointernational@gmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Your message has been sent successfully!',
        });
        e.target.reset();
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: '',
          });
        }, 5000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Something went wrong. Please try again.',
        });
      });
  };

  return (
    <section
      id='contact'
      className='px-4 md:px-6 lg:px-20 py-16 bg-white rounded-3xl shadow-sm border border-gray-100 mt-8'
    >
      <h2 className='text-4xl md:text-5xl font-semibold text-gray-900 mb-8 font-dm'>
        Let's <span className='text-sky-accent'>Talk!</span>
      </h2>
      <div className='mb-4 text-lg text-gray-700'>
        <strong>Phone:</strong>{' '}
        <a href='tel:+923006501006' className='text-sky-accent hover:underline'>
          +92 300 6501006
        </a>
      </div>
      <div className='w-full mx-auto flex flex-col lg:flex-row items-center gap-10'>
        {/* Image Section */}
        <div className='w-full lg:w-1/2 relative'>
          <div className='bg-[#FFF1EB] rounded-[40px] p-4 flex items-center justify-center h-[23rem] sm:h-[30rem] w-[16rem] mr-20'></div>
          <img
            src={contact}
            alt='Traveler'
            className='max-w-full h-[20rem] sm:h-[32rem] absolute top-5 object-cover'
          />
        </div>

        {/* Form Section */}
        <div className='w-full lg:w-1/2'>
          <h2 className='text-2xl md:text-3xl font-bold mb-2 text-gray-900'>
            Have a Question?{' '}
            <span className='text-sky-accent'>Let’s Talk Travel</span>
          </h2>
          <p className='text-gray-600 mb-6'>
            Share your routes, dates or cabin preferences and our mission desk
            will respond with a tailored plan.
          </p>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {formStatus.submitted && (
              <div
                className={`submit-status ${
                  formStatus.success ? 'success' : 'error'
                } mb-2`}
                style={{
                  color: formStatus.success ? 'green' : 'red',
                  fontWeight: 500,
                }}
              >
                {formStatus.message}
              </div>
            )}
            {/* FormSubmit honeypot field to prevent spam */}
            <input type='text' name='_honey' style={{ display: 'none' }} />

            {/* Disable captcha */}
            <input type='hidden' name='_captcha' value='false' />

            {/* Form subject */}
            <input
              type='hidden'
              name='_subject'
              value='New Contact Form Inquiry'
            />

            {/* Redirect URL after submission - comment out if not needed */}
            {/* <input type="hidden" name="_next" value="https://your-website.com/thank-you" /> */}

            {/* Time */}
            <input
              type='hidden'
              name='time'
              value={new Date().toLocaleString()}
            />

            <input
              type='text'
              name='name'
              placeholder='Name *'
              required
              className='w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[rgba(11,162,224,0.6)]'
            />
            <input
              type='email'
              name='email'
              placeholder='Email *'
              required
              className='w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[rgba(11,162,224,0.6)]'
            />
            <input
              type='text'
              name='phone'
              placeholder='Phone No'
              className='w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[rgba(11,162,224,0.6)]'
            />
            <textarea
              name='message'
              placeholder='Message'
              rows={4}
              className='w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[rgba(11,162,224,0.6)]'
            ></textarea>
            <button
              type='submit'
              className='w-full bg-sky-accent hover:bg-sky-accent/80 text-white py-3 rounded-md font-semibold transition cursor-pointer'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SEND'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
