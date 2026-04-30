import React, { useState, useEffect } from "react";
import {
  dest1,
  dest2,
  dest3,
  dest4,
  dest5,
  dest6,
} from "../../assets/safar-air/index.js";
import { MapPin, Calendar, Star, Navigation2 } from "lucide-react";
import { fetchDestinationsMonthContent } from "../../services/packageService";
import Loader from "../common/Loader";



const Destinations = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [destinationsData, setDestinationsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchDestinationsMonthContent('safar-air');
        if (Array.isArray(data) && data.length > 0) {
          const transformedData = {};
          data.forEach((doc) => {
            if (doc.items && Array.isArray(doc.items)) {
              transformedData[doc.id] = doc.items;
            }
          });

          if (Object.keys(transformedData).length > 0) {
            setDestinationsData(transformedData);
            setSelectedCity(Object.keys(transformedData)[0]);
          }
        } else {
          setDestinationsData({});
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinationsData({});
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();

    return () => clearTimeout(loadingTimeout);
  }, []);

  const cities = Object.keys(destinationsData);
  const rawDestinations = destinationsData[selectedCity];
  const destinations = Array.isArray(rawDestinations) ? rawDestinations : [];

  if (!loading && cities.length === 0) return null;

  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-white to-blue-50/30 font-inter">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4">
          <Navigation2 className="text-[#1E40AF] w-4 h-4" />
          <span className="text-sm text-[#1E40AF] font-semibold tracking-wide uppercase">
            Explore
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair">
          Top{" "}
          <span className="bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent">
            Destinations
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Discover amazing places around the world
        </p>

        {/* City Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCity === city
                  ? "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-2 border-blue-100 hover:border-blue-300 hover:scale-105"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader message="Loading Destinations..." />
      ) : (
        <>
          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1E40AF]">
                    {dest.category}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                    <span className="text-sm font-bold text-gray-800">
                      {dest.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1E3A8A] mb-3 font-playfair group-hover:text-[#1E40AF] transition-colors">
                    {dest.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-blue-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#1E40AF]" />
                      <span className="text-xs font-medium">
                        {dest.bestTime}
                      </span>
                    </div>
                    <MapPin className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Destinations;
