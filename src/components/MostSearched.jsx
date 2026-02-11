import React, { useState, useEffect } from "react";
import { fetchMostSearched } from "../services/packageService";
import { manila, dubai, france, himalya } from "../assets/index.js";
import { Carousel, Card } from "./ui/apple-cards-carousel.jsx";

// Fallback static data in case Firebase data is not available
const fallbackCities = [
  {
    name: "Manila",
    imageUrl: manila,
    rating: 5.0,
    reviews: 35,
    price: "$150",
  },
  {
    name: "Dubai",
    imageUrl: dubai,
    rating: 5.0,
    reviews: 35,
    price: "$150",
  },
  {
    name: "France",
    imageUrl: france,
    rating: 5.0,
    reviews: 35,
    price: "$150",
  },
  {
    name: "Himalaya",
    imageUrl: himalya,
    rating: 5.0,
    reviews: 35,
    price: "$150",
  },
];

const CityCardContent = ({ city, openGlobalModal }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 font-dm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-sansita font-bold text-neutral-800 dark:text-neutral-100">
            {city.name}
          </h3>
          <p className="text-neutral-500 text-lg mt-1 font-medium">
            Starting from{" "}
            <span className="text-[#EB662B] font-bold">{city.price}</span>
          </p>
        </div>
        <div className="bg-white/80 dark:bg-neutral-700/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-1.5 border border-black/5 shadow-sm">
          <span className="text-orange-500 font-bold">★</span>
          <span className="text-neutral-800 dark:text-neutral-100 font-bold">
            {city.rating}
          </span>
          <span className="text-neutral-400 text-sm">
            ({city.reviews} reviews)
          </span>
        </div>
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
        Embark on an extraordinary journey to {city.name}. Our carefully curated
        travel packages combine local expertise with luxury and comfort,
        ensuring you experience the true essence of this magnificent
        destination.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => openGlobalModal(city.name)}
          className="px-10 py-4 bg-[#EB662B] text-white rounded-xl font-bold hover:bg-[#d05a26] transition-all transform active:scale-95 shadow-lg shadow-orange-950/20 text-lg"
        >
          Book Your Experience
        </button>
      </div>
    </div>
  );
};

export default function MostSearched({ openGlobalModal }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        const data = await fetchMostSearched();

        if (data && data.length > 0) {
          const mappedData = data.map((city) => ({
            name: city.title || city.name,
            imageUrl: city.imageUrl,
            rating: city.rating ? parseFloat(city.rating) : 5.0,
            reviews: city.reviews || 35,
            price: city.price,
          }));
          setCities(mappedData);
        } else {
          setCities(fallbackCities);
        }
      } catch (err) {
        console.error("Error loading packages:", err);
        setError(err.message);
        setCities(fallbackCities);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  const cards = cities.map((city, index) => (
    <Card
      key={index}
      card={{
        category: "Most Searched",
        title: city.name,
        src: city.imageUrl,
        cta: (
          <div className="w-full flex flex-col gap-3 mt-auto">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                  Starting from
                </span>
                <span className="text-2xl font-bold text-[#EB662B]">
                  {city.price}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-orange-400 text-sm">★</span>
                <span className="text-white text-xs font-bold">
                  {city.rating}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openGlobalModal(city.name);
              }}
              className="w-full py-3 bg-[#EB662B] text-white rounded-xl font-bold hover:bg-[#ff7a3d] transition-all transform active:scale-95 shadow-lg shadow-orange-950/40 text-sm pointer-events-auto"
            >
              Book Now
            </button>
          </div>
        ),
        content: (
          <CityCardContent city={city} openGlobalModal={openGlobalModal} />
        ),
      }}
      index={index}
    />
  ));

  if (loading) {
    return (
      <section className="py-20 bg-white font-dm px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg mb-10"></div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] h-[500px] bg-gray-200 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white font-dm">
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <h2 className="text-3xl md:text-5xl font-sansita font-bold text-gray-800 leading-tight">
          The Most Searched For{" "}
          <span className="text-[#EB662B] block sm:inline">
            Cities Skymate Travels
          </span>
        </h2>
        <p className="text-gray-500 mt-4 text-lg max-w-2xl">
          Discover the top-trending destinations chosen by our travelers. Click
          on a card to explore details and book your next trip.
        </p>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl flex items-center gap-2">
            <span className="font-bold">Note:</span>
            <span>
              Unable to load live data. Showing our standard top destinations.
            </span>
          </div>
        </div>
      )}

      <div className="w-full">
        <Carousel items={cards} />
      </div>
    </section>
  );
}
