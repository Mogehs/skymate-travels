import React, { useState, useEffect } from "react";
import {
  dest1,
  dest2,
  dest3,
  dest4,
  dest5,
  dest6,
} from "../../assets/skyroo/index.js";
import { MapPin, Calendar, Star } from "lucide-react";
import { fetchDestinationsMonthContent } from "../../services/packageService";

const fallbackDestinations = {
  London: [
    {
      image: dest1,
      title: "Big Ben & Westminster",
      description:
        "Iconic clock tower and parliamentary buildings along the River Thames",
      rating: 4.8,
      bestTime: "March - May",
      category: "Historical",
    },
    {
      image: dest2,
      title: "Tower Bridge",
      description: "Victorian bridge with stunning views of London skyline",
      rating: 4.6,
      bestTime: "June - August",
      category: "Architecture",
    },
    {
      image: dest3,
      title: "Buckingham Palace",
      description: "Official residence of the British monarch",
      rating: 4.7,
      bestTime: "July - September",
      category: "Royal",
    },
    {
      image: dest4,
      title: "London Eye",
      description: "Giant observation wheel offering panoramic city views",
      rating: 4.5,
      bestTime: "April - October",
      category: "Entertainment",
    },
    {
      image: dest5,
      title: "Hyde Park",
      description: "One of London's largest parks with beautiful gardens",
      rating: 4.4,
      bestTime: "May - September",
      category: "Nature",
    },
    {
      image: dest6,
      title: "Covent Garden",
      description: "Famous market area with street performers and shops",
      rating: 4.3,
      bestTime: "Year-round",
      category: "Shopping",
    },
  ],
  Bangkok: [
    {
      image: dest1,
      title: "Grand Palace",
      description: "Stunning royal residence with intricate Thai architecture",
      rating: 4.9,
      bestTime: "November - February",
      category: "Cultural",
    },
    {
      image: dest2,
      title: "Wat Phra Kaew",
      description: "Temple of the Emerald Buddha, Thailand's most sacred site",
      rating: 4.8,
      bestTime: "November - February",
      category: "Religious",
    },
    {
      image: dest3,
      title: "Chao Phraya River",
      description: "Lifeblood of Bangkok with floating markets and temples",
      rating: 4.6,
      bestTime: "November - March",
      category: "Nature",
    },
    {
      image: dest4,
      title: "Chatuchak Market",
      description: "World's largest weekend market with 15,000+ stalls",
      rating: 4.5,
      bestTime: "Weekends",
      category: "Shopping",
    },
    {
      image: dest5,
      title: "Khao San Road",
      description: "Famous backpacker street with vibrant nightlife",
      rating: 4.4,
      bestTime: "Evening",
      category: "Entertainment",
    },
    {
      image: dest6,
      title: "Lumphini Park",
      description: "Bangkok's largest park with lakes and gardens",
      rating: 4.3,
      bestTime: "Early morning",
      category: "Nature",
    },
  ],
  England: [
    {
      image: dest1,
      title: "Stonehenge",
      description: "Ancient stone circle with mysterious origins",
      rating: 4.7,
      bestTime: "June - August",
      category: "Historical",
    },
    {
      image: dest2,
      title: "Lake District",
      description: "Beautiful national park with mountains and lakes",
      rating: 4.8,
      bestTime: "May - September",
      category: "Nature",
    },
    {
      image: dest3,
      title: "Cotswolds",
      description: "Picturesque villages with honey-colored stone houses",
      rating: 4.6,
      bestTime: "April - October",
      category: "Scenic",
    },
    {
      image: dest4,
      title: "York Minster",
      description: "Magnificent Gothic cathedral in historic York",
      rating: 4.7,
      bestTime: "March - November",
      category: "Religious",
    },
    {
      image: dest5,
      title: "Cornwall Coast",
      description: "Dramatic coastline with sandy beaches and cliffs",
      rating: 4.5,
      bestTime: "June - September",
      category: "Coastal",
    },
    {
      image: dest6,
      title: "Peak District",
      description: "Rolling hills and valleys perfect for hiking",
      rating: 4.4,
      bestTime: "April - October",
      category: "Outdoor",
    },
  ],
  Singapore: [
    {
      image: dest1,
      title: "Marina Bay Sands",
      description: "Iconic hotel with infinity pool and city views",
      rating: 4.8,
      bestTime: "February - April",
      category: "Luxury",
    },
    {
      image: dest2,
      title: "Gardens by the Bay",
      description: "Spectacular nature park with giant domes",
      rating: 4.9,
      bestTime: "February - April",
      category: "Nature",
    },
    {
      image: dest3,
      title: "Sentosa Island",
      description: "Entertainment island with beaches and attractions",
      rating: 4.7,
      bestTime: "February - April",
      category: "Entertainment",
    },
    {
      image: dest4,
      title: "Chinatown",
      description: "Vibrant cultural district with temples and markets",
      rating: 4.6,
      bestTime: "Year-round",
      category: "Cultural",
    },
    {
      image: dest5,
      title: "Orchard Road",
      description: "Famous shopping street with luxury boutiques",
      rating: 4.5,
      bestTime: "Year-round",
      category: "Shopping",
    },
    {
      image: dest6,
      title: "Singapore Zoo",
      description: "World-class zoo with open-concept exhibits",
      rating: 4.4,
      bestTime: "February - April",
      category: "Family",
    },
  ],
  Italy: [
    {
      image: dest1,
      title: "Colosseum",
      description: "Ancient amphitheater symbol of Roman Empire",
      rating: 4.9,
      bestTime: "March - May",
      category: "Historical",
    },
    {
      image: dest2,
      title: "Venice Canals",
      description: "Romantic city built on water with gondola rides",
      rating: 4.8,
      bestTime: "April - June",
      category: "Romantic",
    },
    {
      image: dest3,
      title: "Florence Cathedral",
      description: "Renaissance masterpiece with stunning architecture",
      rating: 4.7,
      bestTime: "March - May",
      category: "Cultural",
    },
    {
      image: dest4,
      title: "Amalfi Coast",
      description: "Dramatic coastline with colorful villages",
      rating: 4.8,
      bestTime: "April - October",
      category: "Scenic",
    },
    {
      image: dest5,
      title: "Tuscany",
      description: "Rolling hills with vineyards and olive groves",
      rating: 4.6,
      bestTime: "May - September",
      category: "Countryside",
    },
    {
      image: dest6,
      title: "Pompeii",
      description: "Ancient city preserved by volcanic eruption",
      rating: 4.5,
      bestTime: "March - May",
      category: "Archaeological",
    },
  ],
};

const Destinations = () => {
  const [activeTab, setActiveTab] = useState("London");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [data, setData] = useState(fallbackDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await fetchDestinationsMonthContent();
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
        setActiveTab(Object.keys(grouped)[0] || "Featured");
      }
      setLoading(false);
    })();
  }, []);

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
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-sky-accent mb-2">
            Seasonal highlights
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-sansita mb-6">
            Destinations Of <span className="text-sky-accent">The Month</span>
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
                  : "text-gray-600 border-gray-200 hover:border-sky-accent hover:text-gray-900 bg-white"
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
                  : "bg-gray-100 text-gray-600 border border-gray-200 hover:border-sky-accent hover:text-gray-900"
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
