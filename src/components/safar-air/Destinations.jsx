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

const fallbackDestinations = {
  Dubai: [
    {
      image: dest1,
      title: "Burj Khalifa",
      description: "World's tallest building with breathtaking views",
      rating: 4.9,
      bestTime: "November - March",
      category: "Iconic",
    },
    {
      image: dest2,
      title: "Dubai Mall",
      description: "Luxury shopping and entertainment destination",
      rating: 4.8,
      bestTime: "Year-round",
      category: "Shopping",
    },
    {
      image: dest3,
      title: "Palm Jumeirah",
      description: "Artificial archipelago with luxury resorts",
      rating: 4.7,
      bestTime: "October - April",
      category: "Beach",
    },
    {
      image: dest4,
      title: "Desert Safari",
      description: "Thrilling desert adventure experience",
      rating: 4.8,
      bestTime: "October - March",
      category: "Adventure",
    },
    {
      image: dest5,
      title: "Dubai Marina",
      description: "Stunning waterfront with dining and entertainment",
      rating: 4.6,
      bestTime: "November - April",
      category: "Lifestyle",
    },
    {
      image: dest6,
      title: "Gold Souk",
      description: "Traditional market with exquisite jewelry",
      rating: 4.5,
      bestTime: "Year-round",
      category: "Cultural",
    },
  ],
  Tokyo: [
    {
      image: dest1,
      title: "Tokyo Tower",
      description: "Iconic landmark with panoramic city views",
      rating: 4.7,
      bestTime: "March - May",
      category: "Landmark",
    },
    {
      image: dest2,
      title: "Shibuya Crossing",
      description: "World's busiest pedestrian crossing",
      rating: 4.6,
      bestTime: "Year-round",
      category: "Urban",
    },
    {
      image: dest3,
      title: "Senso-ji Temple",
      description: "Ancient Buddhist temple in Asakusa",
      rating: 4.8,
      bestTime: "March - November",
      category: "Cultural",
    },
  ],
};

const Destinations = () => {
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [destinationsData, setDestinationsData] =
    useState(fallbackDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchDestinationsMonthContent();
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
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        // Keep fallback data
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
