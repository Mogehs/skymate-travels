import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import { fetchTopDestinations } from '../services/packageService';
import {
  pkg1,
  pkg2,
  pkg3,
  pkg4,
  pkg5,
  pkg6,
  pkg7,
  pkg8,
  vector,
  location,
} from '../assets/index.js';

// Fallback static data in case Firebase data is not available
const fallbackPackages = [
  {
    title: 'Santorini Escape',
    price: 'Rs 250000',
    duration: '5 Days',
    rating: 4.92,
    country: 'Thailand',
    imageUrl: pkg1,
    description:
      'Experience tropical beaches, vibrant nightlife, and exotic Thai culture.',
  },
  {
    title: 'Dubai Luxury Tour',
    price: 'Rs 180000',
    duration: '4 Days',
    rating: 4.0,
    country: 'Baku',
    imageUrl: pkg2,
    description:
      "Explore Baku's rich history, luxury shopping, and modern skyline.",
  },
  {
    title: 'Bali Serenity',
    price: 'Rs 98500',
    duration: '6 Nights/7 Days',
    rating: 4.92,
    country: 'London',
    imageUrl: pkg7,
    description:
      'Visit iconic landmarks, museums, and enjoy high-street shopping in London.',
  },
  {
    title: 'Paris Romance',
    price: 'Call Now',
    duration: '4 Days',
    rating: 5.0,
    country: 'USA',
    imageUrl: pkg3,
    description:
      'Quick and hassle-free e-visa processing for multiple destinations.',
  },
  {
    title: 'Maldives Getaway',
    price: 'Rs 25000',
    duration: '30/60 Days',
    rating: 4.98,
    country: 'USA',
    imageUrl: pkg4,
    description:
      'Comprehensive support for your U.S. tourist and business visa needs.',
  },
  {
    title: 'Swiss Alps Retreat',
    price: 'Price Varies',
    duration: '5 Days',
    rating: 4.92,
    country: 'Dubai',
    imageUrl: pkg5,
    description:
      'Get Dubai visit visas for short or long-term travel, stress-free.',
  },
  {
    title: 'Culpa est similique',
    price: 'Rs 25000',
    duration: '7 Days',
    rating: 4.92,
    country: 'EU',
    imageUrl: pkg6,
    description:
      'Assistance with Schengen visas for smooth entry into European countries.',
  },
  {
    title: 'Culpa est similique',
    price: 'Rs 25000',
    duration: '3 Days',
    rating: 4.92,
    country: 'UK',
    imageUrl: pkg8,
    description:
      'Expert guidance on UK tourist, student, or business visa applications.',
  },
];

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
          console.log(
            '❌ [TOP DESTINATIONS] No Firebase data found, using fallback packages'
          );
          console.log(
            '📋 [TOP DESTINATIONS] Fallback data count:',
            fallbackPackages.length
          );
          setPackages(fallbackPackages);
        }
      } catch (err) {
        console.error('🚨 [TOP DESTINATIONS] Error loading packages:', err);
        setError(err.message);
        setPackages(fallbackPackages); // Use fallback data on error
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
          Top Package <span className='text-[#EB662B]'>Destinations</span>
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

  return (
    <section id='top-package' className='px-6 lg:px-20 py-10 bg-white font-dm'>
      <h2 className='text-2xl sm:text-3xl font-semibold mb-10 text-gray-800'>
        Top Package <span className='text-[#EB662B]'>Destinations</span>
      </h2>

      {error && (
        <div className='mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded'>
          <p>Unable to load packages from server. Showing cached data.</p>
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
