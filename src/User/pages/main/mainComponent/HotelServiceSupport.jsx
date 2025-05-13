import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HotelServiceSupport = () => {
  // High-quality 4K images that match each category
  const image = {
    diningSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    serviceFacilitiesSrc: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    conferencesMeetingSrc: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    weddingHallSrc: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  };

  return (
    <>
      {/* Dining Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 lg:h-full md:col-span-1 lg:col-span-3 lg:row-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <Link to="/blog/hotel-dining-experience">
          <img
            srcSet={`
              ${image.diningSrc}&w=400 400w,
              ${image.diningSrc}&w=800 800w,
              ${image.diningSrc}&w=1200 1200w
            `}
            sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
            loading="lazy"
            alt="Luxury hotel dining area with elegant table setting"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div className="absolute inset-0 top-0 bg-black group-hover:bg-opacity-20 bg-opacity-30 flex items-end pb-6 md:pb-10 justify-center">
            <span className="text-white relative text-2xl md:text-3xl font-mono">
              Dining
            </span>
          </motion.div>
          <span className="absolute inset-0 m-auto hidden group-hover:flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </Link>
      </motion.div>

      {/* Services & Facilities Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 lg:h-full md:col-span-1 lg:col-span-3 lg:row-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <Link to="/blog/premium-hotel-services">
          <img
            srcSet={`
              ${image.serviceFacilitiesSrc}&w=400 400w,
              ${image.serviceFacilitiesSrc}&w=800 800w,
              ${image.serviceFacilitiesSrc}&w=1200 1200w
            `}
            sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
            loading="lazy"
            alt="Hotel staff providing premium services to guests"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div className="absolute inset-0 top-0 bg-black group-hover:bg-opacity-20 bg-opacity-30 flex items-end pb-6 md:pb-10 justify-center">
            <span className="text-white relative text-xl md:text-2xl lg:text-3xl font-mono text-center">
              Service & Facilities
            </span>
          </motion.div>
          <span className="absolute inset-0 m-auto hidden group-hover:flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </Link>
      </motion.div>

      {/* Conferences & Meeting Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 lg:h-full md:col-span-1 lg:col-span-3 lg:row-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <Link to="/blog/business-events">
          <img
            srcSet={`
              ${image.conferencesMeetingSrc}&w=400 400w,
              ${image.conferencesMeetingSrc}&w=800 800w,
              ${image.conferencesMeetingSrc}&w=1200 1200w
            `}
            sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
            loading="lazy"
            alt="Modern conference room with professional setup"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div className="absolute inset-0 top-0 bg-black group-hover:bg-opacity-20 bg-opacity-30 flex items-end pb-6 md:pb-10 justify-center">
            <span className="text-white relative text-lg md:text-xl lg:text-2xl font-mono text-center">
              Conferences & Meeting
            </span>
          </motion.div>
          <span className="absolute inset-0 m-auto hidden group-hover:flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </Link>
      </motion.div>

      {/* Wedding Hall Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 lg:h-full md:col-span-1 lg:col-span-3 lg:row-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <Link to="/blog/wedding-venues">
          <img
            srcSet={`
              ${image.weddingHallSrc}&w=400 400w,
              ${image.weddingHallSrc}&w=800 800w,
              ${image.weddingHallSrc}&w=1200 1200w
            `}
            sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
            loading="lazy"
            alt="Elegant wedding hall with beautiful decorations"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div className="absolute inset-0 top-0 bg-black group-hover:bg-opacity-20 bg-opacity-30 flex items-end pb-6 md:pb-10 justify-center">
            <span className="text-white relative text-lg md:text-xl lg:text-2xl font-mono">
              Wedding Hall
            </span>
          </motion.div>
          <span className="absolute inset-0 m-auto hidden group-hover:flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </Link>
      </motion.div>
    </>
  );
};

export default HotelServiceSupport;