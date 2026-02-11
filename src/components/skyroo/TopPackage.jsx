import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import { fetchTopDestinations } from '../../services/packageService';
import { vector, location } from '../../assets/skyroo/index.js';

const renderPackageCard = (pkg, index, openBookingForm) => (
  <div
    key={index}
    className='bg-[#F6F6F6] overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    onClick={() => openBookingForm(pkg.title || pkg.name)}
  >
    <img
      src={pkg.imageUrl || pkg.image}
      alt={pkg.title || pkg.name}
      className='w-full h-50 object-cover'
    />
    <div className='p-4 space-y-1'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>{pkg.title || pkg.name}</h3>
        <div className='flex items-center gap-1 text-sm text-gray-600'>
          <span className='material-icons text-yellow-500 text-base'>
            <img src={vector} alt='star' className='h-3' />
          </span>
          {pkg.rating &&
          (typeof pkg.rating === 'number' || !isNaN(parseFloat(pkg.rating)))
            ? parseFloat(pkg.rating).toFixed(2)
            : '5.00'}
        </div>
      </div>
      <p className='text-sm text-gray-500 line-clamp-2'>{pkg.description}</p>
      <div className='flex justify-between items-center pt-3 text-sm text-gray-600 border-t border-dashed border-gray-400'>
        <span className='font-bold text-black'>{pkg.price}</span>
        <span>{pkg.duration}</span>
        <span className='flex items-center gap-1'>
          <span className='material-icons text-base'>
            <img src={location} alt='location' className='w-4' />
          </span>
          {pkg.country}
        </span>
      </div>
    </div>
  </div>
);

export default function TopPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        console.log('🔍 [TOP DESTINATIONS] Starting to fetch data...');
        const data = await fetchTopDestinations();

        console.log('📊 [TOP DESTINATIONS] Raw Firebase data:', data);
        console.log(
          '📊 [TOP DESTINATIONS] Data count:',
          data ? data.length : 0
        );

        if (data && data.length > 0) {
          console.log('✅ [TOP DESTINATIONS] Using Firebase data');
          console.log('📋 [TOP DESTINATIONS] Sample item structure:', data[0]);
          const mappedData = data.map((pkg, index) => {
            console.log(
              `📦 [TOP DESTINATIONS] Mapping package ${index + 1}:`,
              pkg
            );
            return {
              title: pkg.title || pkg.name || 'Untitled',
              price: pkg.price || 'Price Varies',
              duration: pkg.duration || pkg.days || '',
              rating:
                pkg.rating && !isNaN(parseFloat(pkg.rating))
                  ? parseFloat(pkg.rating)
                  : undefined,
              country: pkg.country || '',
              imageUrl: pkg.imageUrl || pkg.image,
              description: pkg.description || '',
            };
          });
          console.log('✅ [TOP DESTINATIONS] Final mapped data:', mappedData);
          setPackages(mappedData);
        } else {
          throw new Error('No top destination packages found');
        }
      } catch (err) {
        console.error('🚨 [TOP DESTINATIONS] Error loading packages:', err);
        setError(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
        console.log('✅ [TOP DESTINATIONS] Loading completed');
      }
    };

    loadPackages();
  }, []);

  const openBookingForm = (packageTitle) => {
    setSelectedPackage(packageTitle);
    setIsBookingOpen(true);
  };

  if (loading) {
    return (
      <section
        id='top-package'
        className='px-6 lg:px-20 py-10 bg-white font-dm'
      >
        <h2 className='text-2xl sm:text-3xl font-semibold mb-10 text-gray-800'>
          Top Package <span className='text-sky-accent'>Destinations</span>
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
          {[...Array(8)].map((_, index) => (
            <div key={index} className='bg-[#F6F6F6] animate-pulse'>
              <div className='h-50 bg-gray-300'></div>
              <div className='p-4 space-y-2'>
                <div className='h-4 bg-gray-300 rounded'></div>
                <div className='h-3 bg-gray-300 rounded w-3/4'></div>
                <div className='h-3 bg-gray-300 rounded w-1/2'></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!packages.length) {
    return (
      <section id='top-package' className='px-6 lg:px-20 py-10 bg-white font-dm'>
        <h2 className='text-2xl sm:text-3xl font-semibold mb-10 text-gray-800'>
          Top Package <span className='text-sky-accent'>Destinations</span>
        </h2>
        <div className='text-center text-gray-500'>
          No top destination packages are available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section id='top-package' className='px-6 lg:px-20 py-10 bg-white font-dm'>
      <h2 className='text-2xl sm:text-3xl font-semibold mb-10 text-gray-800'>
        Top Package <span className='text-sky-accent'>Destinations</span>
      </h2>

      {error && (
        <div className='mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded'>
          <p>Unable to load packages from server.</p>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
        {packages.map((pkg, index) =>
          renderPackageCard(pkg, index, openBookingForm)
        )}
      </div>

      {/* Booking Form Modal */}
      {isBookingOpen && (
        <BookingForm
          onClose={() => setIsBookingOpen(false)}
          packageName={selectedPackage}
        />
      )}
    </section>
  );
}
