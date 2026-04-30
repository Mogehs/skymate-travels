import React, { useState, useEffect } from "react";
import { dest1, dest2, dest3, dest4, dest5, dest6 } from "../assets/index.js";
import { MapPin, Calendar, Star } from "lucide-react";
import { fetchDestinationsMonthContent } from "../services/packageService";



const Destinations = ({ brand = 'skymate' }) => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const theme = {
    skymate: {
      accent: "text-[#EB662B]",
      bg: "from-gray-50 to-orange-50",
      btnActive: "bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white border-transparent",
      btnInactive: "text-gray-700 border-gray-300 hover:border-[#EB662B]",
      badge: "bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white",
      btnCategory: "bg-[#EB662B] text-white",
      btnCategoryInactive: "hover:border-[#EB662B] hover:text-[#EB662B]"
    },
    skyroo: {
      accent: "text-[#0ea5e9]",
      bg: "from-gray-50 to-sky-50",
      btnActive: "bg-gradient-to-r from-[#38bdf8] to-[#0f82d8] text-white border-transparent shadow-lg",
      btnInactive: "text-gray-600 border-gray-200 hover:border-[#0ea5e9] hover:text-gray-900 bg-white",
      badge: "bg-gradient-to-r from-[#38bdf8] to-[#0f82d8] text-white",
      btnCategory: "bg-[#0ea5e9] text-white shadow-md",
      btnCategoryInactive: "bg-gray-100 text-gray-600 border border-gray-200 hover:border-[#0ea5e9] hover:text-gray-900"
    },
    'safar-air': {
      accent: "text-[#1E40AF]",
      bg: "from-gray-50 to-blue-50",
      btnActive: "bg-[#1E40AF] text-white border-transparent shadow-lg",
      btnInactive: "text-gray-700 border-gray-300 hover:border-[#1E40AF]",
      badge: "bg-[#1E40AF] text-white",
      btnCategory: "bg-[#1E40AF] text-white",
      btnCategoryInactive: "hover:border-[#1E40AF] hover:text-[#1E40AF]"
    }
  }[brand] || {
    accent: "text-[#EB662B]",
    bg: "from-gray-50 to-orange-50",
    btnActive: "bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white border-transparent",
    btnInactive: "text-gray-700 border-gray-300 hover:border-[#EB662B]",
    badge: "bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white",
    btnCategory: "bg-[#EB662B] text-white",
    btnCategoryInactive: "hover:border-[#EB662B] hover:text-[#EB662B]"
  };

  useEffect(() => {
    (async () => {
      const items = await fetchDestinationsMonthContent(brand);
      if (items.length) {
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
  }, [brand]);

  const categories = [
    "All",
    ...new Set((data[activeTab] || []).map((dest) => dest.category)),
  ];

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

  useEffect(() => {
    setSelectedCategory("All");
  }, [activeTab]);

  return (
    <section className={`py-16 font-dm mb-20 bg-gradient-to-br ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Destinations Of <span className={theme.accent}>The Month</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most captivating destinations and hidden gems around
            the world
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading Destinations...</div>
        ) : Object.keys(data).length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500">No destinations of the month available for {brand === 'skymate' ? 'Skymate' : brand === 'skyroo' ? 'Skyroo' : 'Safar Air'}.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {Object.keys(data).map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveTab(city)}
                  className={`px-6 py-3 border-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === city ? theme.btnActive : theme.btnInactive
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    selectedCategory === category ? theme.btnCategory : theme.btnCategoryInactive + " bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 ${theme.badge} text-xs font-medium rounded-full shadow-lg`}>
                        {dest.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-800">
                          {dest.rating}
                        </span>
                      </div>
                    </div>

                    <div className="text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {dest.title}
                      </h3>
                      <p className="text-sm text-gray-200 mb-3 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Best: {dest.bestTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm line-clamp-1">
                      {dest.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  No destinations found for the selected category.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`mt-4 px-6 py-2 ${theme.btnActive} rounded-lg transition-all duration-300`}
                >
                  Show All
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Destinations;
