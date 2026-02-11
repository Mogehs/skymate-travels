import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Loader as LoaderIcon,
  ChevronLeft,
  ChevronRight,
  Film,
} from "lucide-react";
import {
  highlight,
  video1,
  video2,
  oneVid,
  twoVid,
} from "../../assets/safar-air/index.js";
import { fetchDestinationHighlightsContent } from "../../services/packageService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loader from "../common/Loader";

const fallbackHighlights = [
  {
    type: "description",
    title: "Discover The World's Most Breathtaking Places",
    description:
      "Experience the magic of travel through our premium video highlights. From the majestic mountains to pristine beaches, we bring you a glimpse of the world's most iconic destinations in stunning detail.",
    background: highlight,
  },
  {
    type: "video",
    thumbnail: video1,
    videoUrl: oneVid,
  },
  {
    type: "video",
    thumbnail: video2,
    videoUrl: twoVid,
  },
];

const VideoPlayer = ({ videoUrl, thumbnail, index, isPlaying, onPlay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsLoading(true);
      onPlay(index);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[32rem] md:h-[36rem] lg:h-[40rem] border-4 border-blue-200 hover:border-[#F59E0B] transition-all duration-500">
      {isPlaying ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/90 to-[#3B82F6]/90 flex items-center justify-center z-10 backdrop-blur-sm">
              <div className="text-center text-white">
                <LoaderIcon size={56} className="animate-spin mx-auto mb-4" />
                <p className="text-lg font-bold">Loading Premium Video...</p>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            preload="metadata"
            className="w-full h-full object-cover rounded-3xl"
            onLoadedData={() => setIsLoading(false)}
            autoPlay
          />
        </>
      ) : (
        <div
          className="relative cursor-pointer group w-full h-full"
          onClick={handlePlay}
        >
          <img
            src={thumbnail || highlight}
            alt="Video Thumbnail"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 rounded-3xl"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 rounded-3xl"></div>

          {/* Play button with premium styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-full animate-ping opacity-20"></div>

              {/* Main play button */}
              <div className="relative p-8 bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] rounded-full group-hover:scale-110 transition-all duration-500 shadow-2xl border-4 border-white/30">
                <Play size={56} className="text-white" fill="white" />
              </div>
            </div>
          </div>

          {/* Overlay text */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <p className="text-white font-bold text-xl mb-2">
                Watch Destination Highlight
              </p>
              <p className="text-white/80 text-sm">
                Experience the beauty in stunning quality
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DestinationHighlights = () => {
  const [highlights, setHighlights] = useState(fallbackHighlights);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    // Set a timeout to stop loading after 2 seconds regardless
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    (async () => {
      try {
        const data = await fetchDestinationHighlightsContent();
        if (data.length > 0) setHighlights(data);
      } catch (error) {
        console.error("Error fetching destination highlights:", error);
        // Keep fallback data
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-blue-50/50 via-white to-amber-50/30 font-inter">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4">
          <Film className="text-[#1E40AF] w-4 h-4" />
          <span className="text-sm text-[#1E40AF] font-semibold tracking-wide uppercase">
            Visual Journey
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 font-playfair">
          Destination{" "}
          <span className="bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent">
            Highlights
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Experience the beauty of travel through our curated video collection
        </p>
      </div>

      {loading ? (
        <Loader message="Loading Destination Highlights..." />
      ) : (
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[]}
            navigation={false}
            onSwiper={setSwiperInstance}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
            }}
          >
            {highlights.map((item, index) =>
              item.type === "description" ? (
                <SwiperSlide key={index}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[28rem] md:h-[32rem] lg:h-[34rem] border-4 border-blue-100">
                    <img
                      src={item.background}
                      alt={item.title}
                      className="w-full h-full object-cover  min-h-[28rem] md:min-h-[32rem] lg:min-h-[34rem] "
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/90 to-[#3B82F6]/80 p-10 flex flex-col justify-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/95 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide key={index}>
                  <VideoPlayer
                    videoUrl={item.videoUrl}
                    thumbnail={item.thumbnail}
                    index={index}
                    isPlaying={playingIndex === index}
                    onPlay={setPlayingIndex}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#3B82F6] hover:text-white transition-all duration-300 border-2 border-blue-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default DestinationHighlights;
