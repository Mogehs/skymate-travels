import React, { useState, useEffect } from "react";
import {
  dest1,
  dest2,
  dest3,
  dest4,
  dest5,
  dest6,
} from "../../assets/fly-smart/index.js";
import { MapPin, Calendar, Star } from "lucide-react";
import { fetchDestinationsMonthContent } from "../../services/packageService";



const Destinations = () => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await fetchDestinationsMonthContent('skyroo');
      if (items.length) {
        // Group by city title if provided; fallback to 'Featured'
        const grouped = {};
        items.forEach((d) => {
          const city = d.city || "Featured";
          if (!grouped[city]) grouped[city] = [];
          grouped[city].push({
            image: d.background,
            title: d.title,
            description: d.description,
            rating: Number(d.rating || 4.6),
            bestTime: d.bestTime || "Year-round",
            category: d.category || "Highlight",
          });
        });
        setData(grouped);
        setActiveTab(Object.keys(grouped)[0] || "");
      } else {
        setData({});
        setActiveTab("");
      }
      setLoading(false);
    })();
  }, []);

  if (!loading && Object.keys(data).length === 0) return null;

  // Get unique categories for the selected city
  const categories = [
    "All",
    ...new Set((data[activeTab] || []).map((dest) => dest.category)),
  ];

  // Filter destinations based on selected category
  useEffect(() => {
    const source = data[activeTab] || [];
    if (selectedCategory === "All") {
      setFilteredDestinations(source);
    } else {
      setFilteredDestinations(
        source.filter((dest) => dest.category === selectedCategory),
      );
    }
  }, [activeTab, selectedCategory, data]);

  // Reset category filter when city changes
  useEffect(() => {
    setSelectedCategory("All");
  }, [activeTab]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-dm max-w-[1280px] mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 sm:px-10 py-10">
        <div className="text-center mb-10">
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-fly-accent mb-2">
            Seasonal highlights
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-sansita mb-6">
            Destinations Of <span className="text-fly-accent">The Month</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most captivating destinations and hidden gems around
            the world.
          </p>
        </div>

        {/* City Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(data).map((city) => (
            <button
              key={city}
              onClick={() => setActiveTab(city)}
              className={`px-6 py-3 border rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === city
                  ? "gradient-sky-primary text-slate-900 border-transparent shadow-lg shadow-[#0ba2e022]"
                  : "text-gray-600 border-gray-200 hover:border-fly-accent hover:text-gray-900 bg-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "gradient-sky-primary text-slate-900 shadow-md shadow-[#0ba2e022]"
                  : "bg-gray-100 text-gray-600 border border-gray-200 hover:border-fly-accent hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredDestinations.map((dest, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Hover Overlay with Information */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 gradient-sky-primary text-slate-900 text-xs font-medium rounded-full shadow-lg">
                    {dest.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-gray-800">
                      {dest.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-white">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {dest.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Best Time to Visit */}
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Best: {dest.bestTime}</span>
                  </div>
                </div>
              </div>

              {/* Fallback Info (visible when not hovering) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm line-clamp-1">
                  {dest.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-600 text-lg">
              No destinations found for the selected category.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 px-6 py-2 gradient-sky-primary text-slate-900 rounded-full transition-all duration-300 shadow-lg shadow-[#0ba2e022] hover:translate-y-[-2px]"
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
