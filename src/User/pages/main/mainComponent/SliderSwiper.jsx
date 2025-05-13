import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ChevronLeft, ChevronRight, Star, Clock, Bookmark } from "lucide-react";

// Memoize the slide data to prevent unnecessary re-renders
// const slides = [
//   {
//     id: 1,
//     title: "Facebook",
//     description: "Connect with friends and family around the world",
//     img: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
//     color: "from-blue-600/90 to-blue-800/20",
//     icon: "📱",
//     rating: 4.2,
//     badge: "Popular",
//   },
//   {
//     id: 2,
//     title: "Shopee Client",
//     description:
//       "Your favorite online shopping destination with millions of products",
//     img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D",
//     color: "from-orange-500/90 to-orange-700/20",
//     icon: "🛍️",
//     rating: 4.8,
//     badge: "New",
//   },
//   {
//     id: 3,
//     title: "Shopee Admin",
//     description: "Powerful tools to manage your online store efficiently",
//     img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
//     color: "from-red-500/90 to-red-700/20",
//     icon: "⚙️",
//     rating: 4.5,
//     badge: "Pro",
//   },
//   {
//     id: 4,
//     title: "Chart.js",
//     description:
//       "Beautiful, responsive charts for your data visualization needs",
//     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMGFuYWx5dGljc3xlbnwwfHwwfHx8MA%3D%3D",
//     color: "from-green-500/90 to-green-700/20",
//     icon: "📊",
//     rating: 4.7,
//     badge: "Featured",
//   },
//   {
//     id: 5,
//     title: "YouTube",
//     description: "Watch, create, and share videos with the world",
//     img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
//     color: "from-red-600/90 to-red-800/20",
//     icon: "🎥",
//     rating: 4.6,
//     badge: "Trending",
//   },
// ];

const slides = [
  {
    id: 1,
    title: "Luxury Beach Resort",
    description: "Experience paradise with private beach access and ocean-view suites",
    img: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
    color: "from-blue-600/90 to-blue-800/20",
    icon: "🏖️",
    rating: 4.8,
    badge: "Popular",
    location: "Maldives",
    price: "$450/night",
    amenities: ["Private beach", "Spa", "Infinity pool"]
  },
  {
    id: 2,
    title: "Mountain Retreat Lodge",
    description: "Cozy cabins with breathtaking mountain views and hiking trails",
    img: "https://wallpapercave.com/wp/wp12549190.jpg",
    color: "from-green-500/90 to-green-700/20",
    icon: "⛰️",
    rating: 4.6,
    badge: "Eco-Friendly",
    location: "Swiss Alps",
    price: "$320/night",
    amenities: ["Fireplace", "Hot tub", "Guided tours"]
  },
  {
    id: 3,
    title: "Urban Luxury Hotel",
    description: "Modern sophistication in the heart of the city with rooftop bar",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJiYW4lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
    color: "from-purple-500/90 to-purple-700/20",
    icon: "🏙️",
    rating: 4.7,
    badge: "Business",
    location: "New York",
    price: "$380/night",
    amenities: ["Rooftop pool", "24/7 concierge", "Fitness center"]
  },
  {
    id: 4,
    title: "Boutique Wine Country Inn",
    description: "Charming vineyard accommodations with wine tasting experiences",
    img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2luZXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
    color: "from-red-500/90 to-red-700/20",
    icon: "🍷",
    rating: 4.9,
    badge: "Romantic",
    location: "Napa Valley",
    price: "$410/night",
    amenities: ["Vineyard tours", "Wine cellar", "Gourmet restaurant"]
  },
  {
    id: 5,
    title: "Safari Wilderness Camp",
    description: "Luxury tented camp with wildlife viewing and guided safaris",
    img: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwY2FtcHxlbnwwfHwwfHx8MA%3D%3D",
    color: "from-yellow-600/90 to-yellow-800/20",
    icon: "🦁",
    rating: 4.7,
    badge: "Adventure",
    location: "Serengeti",
    price: "$520/night",
    amenities: ["Game drives", "Bush dinners", "Star gazing"]
  }
];

const MaterialYouSlider = () => {
  const [slidesPerView, setSlidesPerView] = useState(2.3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef(null);
  const resizeTimeout = useRef(null);

  // Memoize the badge styles
  const getBadgeStyle = useCallback((badge) => {
    const styles = {
      New: "bg-green-500 text-white",
      Popular: "bg-blue-500 text-white",
      Pro: "bg-purple-500 text-white",
      Featured: "bg-yellow-500 text-black",
      Trending: "bg-red-500 text-white",
      "Top Rated": "bg-pink-500 text-white",
      "AI Powered": "bg-indigo-500 text-white",
      Updated: "bg-cyan-500 text-white",
      Useful: "bg-amber-500 text-white",
    };

    return styles[badge] || "bg-gray-500 text-white";
  }, []);

  // Optimized resize handler for laptops
  const handleResize = useCallback(() => {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }

    resizeTimeout.current = setTimeout(() => {
      if (window.innerWidth < 640) {
        // Mobile
        setSlidesPerView(1.1);
      } else if (window.innerWidth < 768) {
        // Small tablets
        setSlidesPerView(1.3);
      } else if (window.innerWidth < 1024) {
        // Tablets
        setSlidesPerView(1.6);
      } else if (window.innerWidth < 1280) {
        // Small laptops
        setSlidesPerView(2.0);
      } else if (window.innerWidth < 1536) {
        // Standard laptops
        setSlidesPerView(2.3);
      } else {
        // Large screens
        setSlidesPerView(2.5);
      }
    }, 100);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [handleResize]);

  const handlePrev = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  const renderSlide = useCallback(
    (slide, index) => (
      <SwiperSlide key={slide.id} className="h-full !overflow-visible">
        <div
          className={`relative h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-500 
        ${
          activeIndex === index
            ? "scale-100 shadow-2xl z-20"
            : "scale-95 opacity-80"
        }`}
        >
          {/* Glass blur effect on top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent lg:backdrop-blur-0 backdrop-blur-sm z-20" />

          {/* Background image with stronger overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${slide.color} via-transparent to-transparent opacity-70 z-20 transition-opacity duration-500`}
          />

          {/* Icon Badge */}
          <div className="absolute top-5 left-5 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md z-30 border border-white/30 shadow-lg">
            <span className="text-2xl">{slide.icon}</span>
          </div>

          {/* Status Badge */}
          <div
            className={`absolute top-5 right-5 ${getBadgeStyle(
              slide.badge
            )} px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-30 shadow-md flex items-center gap-1`}
          >
            {slide.badge === "New" && <Clock className="w-3 h-3" />}
            {slide.badge === "Popular" && <Star className="w-3 h-3" />}
            {slide.badge === "Featured" && <Star className="w-3 h-3" />}
            <span>{slide.badge}</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform transition-all duration-500 translate-y-0">
            {/* Dark overlay for better text contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-[-1]"></div>

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-md">
                {slide.title}
              </h3>
              <div className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white text-sm font-bold">
                  {slide.rating}
                </span>
              </div>
            </div>

            <p className="text-white text-sm md:text-base font-medium mb-4 drop-shadow-md">
              {slide.description}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 md:px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg flex-grow text-center">
                View Details
              </button>
              <button className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-white/30 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-colors shadow-lg">
                <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Border highlight */}
          <div className="absolute inset-0 border-2 border-white/0 hover:border-white/30 rounded-2xl transition-all duration-300 z-20 pointer-events-none" />

          {/* Card glow effect on active */}
          {activeIndex === index && (
            <div className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-tr from-white/5 via-white/0 to-white/5 z-0" />
          )}
        </div>
      </SwiperSlide>
    ),
    [activeIndex, getBadgeStyle]
  );

  return (
    <div className="max-h-screen w-full  from-gray-50 to-gray-100 text-gray-900 flex items-center justify-center ">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="relative group "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Swiper
            ref={swiperRef}
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              EffectCoverflow,
              FreeMode,
            ]}
            spaceBetween={30}
            slidesPerView={slidesPerView}
            centeredSlides={true}
            loop={true}
            speed={600}
            grabCursor={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 1.1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            freeMode={{
              enabled: true,
              sticky: true,
              momentumRatio: 0.25,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} bg-gray-800/80" style="width: 8px; height: 8px; margin: 0 4px; transition: all 0.3s;"></span>`;
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="material-you-slider !overflow-visible h-[380px] md:h-[400px] rounded-2xl py-6 md:py-8"
          >
            {slides.map((slide, index) => renderSlide(slide, index))}
          </Swiper>

          {/* Custom navigation buttons */}
          <button
            onClick={handlePrev}
            className={`absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 z-40 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/30 border border-white/20 shadow-lg  ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft
              className="w-4 h-4 md:w-5 md:h-5 text-white"
              strokeWidth={2.5}
            />
          </button>
          <button
            onClick={handleNext}
            className={`absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 z-40 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/30 border border-white/20 shadow-lg ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight
              className="w-4 h-4 md:w-5 md:h-5 text-white"
              strokeWidth={2.5}
            />
          </button>

          {/* Pagination container with extra styling */}
          <div className="absolute -bottom-10 left-0 right-0 z-30">
            <div className="swiper-pagination !bottom-0 !top-auto flex justify-center items-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MaterialYouSlider);
