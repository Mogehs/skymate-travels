import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // import Autoplay module
import "swiper/css";
import "swiper/css/pagination";
import { user1, user2, user3, commsVector } from "../assets/index.js";
import { fetchTestimonialsContent } from "../services/packageService";

const fallbackTestimonials = [
  {
    name: "John Doe",
    image: user1,
    rating: 5,
    location: "New York",
    message:
      "Praesent non enim sed velit malesuada consectetur id a justo. Fusce quis eros sit amet enim laoreet dignissim.",
  },
  {
    name: "Jane Smith",
    image: user2,
    rating: 5,
    location: "London",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
  },
  {
    name: "Emily Johnson",
    image: user3,
    rating: 4,
    location: "Paris",
    message:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
  },
  {
    name: "Michael Brown",
    image: user1,
    rating: 5,
    location: "Berlin",
    message:
      "Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in.",
  },
  {
    name: "Sarah Lee",
    image: user2,
    rating: 5,
    location: "Tokyo",
    message:
      "Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Maecenas sed diam eget risus.",
  },
];

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchTestimonialsContent();
      if (data.length) {
        setItems(
          data.map((t) => ({
            id: t.id,
            name: t.name,
            image: t.imageUrl || user1,
            rating: Number(t.rating) || 5,
            location: t.location || "Traveler",
            message: t.message || "",
          })),
        );
      } else {
        setItems(fallbackTestimonials);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <section
      className="py-16 font-dm overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-[#EB662B]">Customers Say</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of travelers choose Skymate for their
            journeys
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="pb-8"
        >
          {(loading ? fallbackTestimonials : items).map(
            (testimonial, index) => (
              <SwiperSlide key={testimonial.id || index}>
                <div className="testimonial-card bg-white shadow-lg hover:shadow-xl p-6 my-2 w-full max-w-sm mx-auto transition-all duration-300 cursor-grab active:cursor-grabbing h-fit rounded-2xl border border-gray-100 overflow-hidden group hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#EB662B]/20 group-hover:border-[#EB662B]/40 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#EB662B] to-[#DD5471] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">★</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[#EB662B]">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {testimonial.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-[#EB662B] to-[#DD5471] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                      {testimonial.location}
                    </span>
                    <div className="text-[#EB662B] opacity-60 group-hover:opacity-100 transition-opacity duration-300 pr-1">
                      <img
                        src={commsVector}
                        alt=""
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
