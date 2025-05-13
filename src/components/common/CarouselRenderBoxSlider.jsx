import React, { forwardRef } from "react";
import { Carousel } from "antd";
import { FiStar, FiMapPin, FiHeart } from "react-icons/fi";
import {
  Coffee,
  Droplets,
  Dumbbell,
  Heart,
  Snowflake,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import { motion } from "framer-motion";
const HotelCarouselSlider = forwardRef(({ hotels = [], onHotelClick }, ref) => {
  // Default hotels if none provided
  const defaultHotels = [
    {
      id: 1,
      name: "Luxury Resort & Spa",
      location: "Bali, Indonesia",
      price: 250,
      rating: 4.8,
      image:
        "https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Urban Boutique Hotel",
      location: "New York, USA",
      price: 320,
      rating: 4.5,
      image:
        "https://c4.wallpaperflare.com/wallpaper/451/186/556/best-hotels-booking-pool-vacation-wallpaper-preview.jpg",
      featured: false,
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps",
      price: 180,
      rating: 4.7,
      image:
        "https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg",
      featured: true,
    },
    {
      id: 4,
      name: "Beachfront Villa",
      location: "Maldives",
      price: 420,
      rating: 4.9,
      image:
        "https://4kwallpapers.com/images/wallpapers/burj-al-arab-luxury-hotel-night-cityscape-illustration-dubai-2880x1800-5271.jpg",
      featured: false,
    },
  ];
  const amenities = {
    general: [
      { id: 1, name: "Free WiFi", icon: "wifi", available: false },
      { id: 2, name: "Swimming Pool", icon: "pool", available: true },
      { id: 3, name: "Fitness Center", icon: "gym", available: true },
    ],
  };
  const amenitiesIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
    ac: <Snowflake className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />,
    minibar: <Droplets className="h-4 w-4" />,
    gym: <Dumbbell className="h-4 w-4" />,
    restaurant: <Utensils className="h-4 w-4" />,
    pool: <Waves className="h-4 w-4" />,
  };
  const displayHotels = hotels.length > 0 ? hotels : defaultHotels;

  return (
    <motion.div className=" relative mt-7 rounded-lg ">
      <Carousel
        ref={ref}
        dotPosition="bottom"
        autoplay={false}
        dots={true}
        slidesToShow={3}
        draggable={true}
        infinite={true}
        swipeToSlide={true}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {displayHotels.map((hotel) => (
          <div key={hotel.id} className="px-1">
            <motion.div
              initial={{  y: 20 }}
              whileInView={{  y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className=" border border-gray-200 select-none  rounded-lg p-1 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onHotelClick && onHotelClick(hotel)}
            >
              {/* Hotel Image */}
              <div className="relative rounded-t-lg  overflow-hidden h-48">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full brightness-90 hover:brightness-100 object-cover  transition-all duration-300 hover:scale-105"
                />
                {hotel.featured && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                )}
                <span className="absolute text-red-500 top-1 right-1 transition-all duration-300 hover:scale-105">
                  <Heart
                    strokeWidth={1.5}
                    size={25}
                    className=" transition-all cursor-pointer duration-700 "
                    fill={"rgb(240 82 82 / var(--tw-text-opacity, 1))"}
                  />
                  <p className="">125</p>
                </span>
              </div>

              {/* Hotel Info */}
              <div className="p-4 ">
                <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin className="mr-1" size={14} />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {amenities.general.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center text-sm text-gray-700 bg-slate-100 px-2 py-1 rounded"
                    >
                      {amenitiesIcons[amenity.icon]}
                      <span className="ml-1 text-xs capitalize">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">${hotel.price}</span>
                    <span className="text-gray-500 text-sm"> / night</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>
      <span
        className={`
                w-32 h-4 bg-slate-300/50 rounded absolute bottom-[0.35rem]
                left-1/2 -translate-x-1/2  /* Center horizontally */
                sm:left-[50%]             /* Small screens */
                md:left-[50%]             /* Medium screens */
                lg:left-[50%]             /* Large screens */
                xl:left-[50%]             /* Extra large screens */
              `}
      ></span>
    </motion.div>
  );
});

export default HotelCarouselSlider;
