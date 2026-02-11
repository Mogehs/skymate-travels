import React, { useState, useRef, useEffect } from 'react';
import { Play, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { highlight, video1, video2, oneVid, twoVid } from '../../assets/skyroo/index.js';
import { fetchDestinationHighlightsContent } from '../../services/packageService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const fallbackHighlights = [
  {
    type: 'description',
    title: "Discover The World's Most Breathtaking Places",
    description:
      'Experience the magic of travel through our hand-picked video highlights. From the timeless streets of Europe to the sun-kissed beaches of Asia, we bring you a glimpse of the world’s most iconic destinations — in motion.',
    background: highlight,
  },
  {
    type: 'video',
    thumbnail: video1,
    videoUrl: oneVid,
  },
  {
    type: 'video',
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

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setIsLoading(false);
    }
  }, [isPlaying]);

  return (
    <div className='relative overflow-hidden rounded-2xl shadow-md h-[28rem] md:h-[32rem] lg:h-[34rem]'>
      {isPlaying ? (
        <>
          {isLoading && (
            <div className='absolute inset-0 bg-black/60 flex items-center justify-center z-10'>
              <div className='text-center text-white'>
                <Loader size={40} className='animate-spin mx-auto mb-2' />
                <p className='text-sm'>Loading video...</p>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            preload='metadata'
            className='w-full h-full object-cover rounded-2xl'
            onLoadedData={handleLoadedData}
            onCanPlay={handleCanPlay}
            onLoadStart={() => setIsLoading(true)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          />
        </>
      ) : (
        <div
          className='relative cursor-pointer group w-full h-full'
          onClick={handlePlay}
        >
          <img
            src={thumbnail || highlight}
            alt='Video Thumbnail'
            className='w-full h-full object-cover transform transition-transform rounded-2xl'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
            <Play
              size={40}
              className='text-white group-hover:scale-110 transition-transform'
            />
          </div>
          {!thumbnail && (
            <div className='absolute inset-0 bg-gradient-to-br from-gray-300/40 to-gray-500/40' />
          )}
        </div>
      )}
    </div>
  );
};

const DestinationHighlights = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDestinationHighlightsContent();
      if (data.length) {
        setItems(
          data.map((d) => ({
            type: d.type || 'description',
            title: d.title,
            description: d.description,
            background: d.background,
            videoUrl: d.videoUrl,
            thumbnail: d.thumbnail || d.background,
          }))
        );
      } else {
        setItems(fallbackHighlights);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className='px-4 md:px-8 lg:px-20 py-12 bg-white font-dm max-w-[1536px] mx-auto'>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left'>
        Destination <span className='text-sky-accent'>Highlights</span>
      </h2>

      <div className='relative'>
        {/* Nav Buttons (centered vertically on sides) */}
        <div className='absolute top-1/2 -translate-y-1/2 left-[-24px] md:left-[-32px] z-10'>
          <button
            className='text-neutral-700 hover:text-sky-accent transition-colors p-1'
            ref={prevRef}
            aria-label='Previous'
          >
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className='absolute top-1/2 -translate-y-1/2 right-[-24px] md:right-[-32px] z-10'>
          <button
            className='text-neutral-700 hover:text-sky-accent transition-colors p-1'
            ref={nextRef}
            aria-label='Next'
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop
          centeredSlides
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1.05, spaceBetween: 20 },
            768: { slidesPerView: 1.8, spaceBetween: 24 },
            1024: { slidesPerView: 2.4, spaceBetween: 28 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className='pb-6'
        >
          {(loading ? fallbackHighlights : items).map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === 'description' ? (
                <div
                  className='rounded-2xl p-4 text-white shadow-md flex flex-col justify-between h-[28rem] md:h-[32rem] lg:h-[34rem]'
                  style={{
                    backgroundImage: `url(${item.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='bg-white/10 bg-opacity-80 p-4 rounded-xl backdrop-blur-md h-full flex flex-col justify-center'>
                    <h3 className='text-lg md:text-xl font-bold mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-sm md:text-base leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <VideoPlayer
                  videoUrl={item.videoUrl}
                  thumbnail={item.thumbnail}
                  index={index}
                  isPlaying={playingIndex === index}
                  onPlay={setPlayingIndex}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DestinationHighlights;
