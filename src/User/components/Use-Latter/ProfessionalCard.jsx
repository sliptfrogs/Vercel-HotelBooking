import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfessionalRGBCard = ({ room, handleBookNow, amenitiesIcons }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getColorScheme = (roomType) => {
    const schemes = {
      'standard': {primary: 'from-blue-500 to-cyan-400', text: 'text-blue-600', border: 'border-blue-200'},
      'deluxe': {primary: 'from-purple-500 to-pink-400', text: 'text-purple-600', border: 'border-purple-200'},
      'suite': {primary: 'from-amber-500 to-red-400', text: 'text-amber-600', border: 'border-amber-200'},
      'executive': {primary: 'from-emerald-500 to-teal-400', text: 'text-emerald-600', border: 'border-emerald-200'},
      'penthouse': {primary: 'from-rose-500 to-red-400', text: 'text-rose-600', border: 'border-rose-200'}
    };
    
    return schemes[roomType.toLowerCase()] || schemes.standard;
  };
  
  const colors = getColorScheme(room.type.split(' ')[0].toLowerCase());
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative 
        border
        ${colors.border}
        rounded-lg 
        p-6
        bg-white
        shadow-sm
        transition-all 
        duration-300
        overflow-visible
        hover:shadow-lg
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced right side indicator bars */}
      <div className="absolute top-0 right-0 h-full w-1.5 overflow-hidden rounded-r-lg">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-b ${colors.primary}`}
          initial={{ y: '-50%' }}
          animate={{
            y: isHovered ? ['-50%', '0%'] : ['0%', '-50%'],
            height: isHovered ? '100%' : '50%'
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-t ${colors.primary}`}
          initial={{ y: '150%' }}
          animate={{
            y: isHovered ? ['150%', '100%'] : ['100%', '150%'],
            height: isHovered ? '100%' : '50%'
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </div>

      {/* Subtle RGB gradient overlay */}
      <div className={`
        absolute top-0 left-0 w-full h-full 
        bg-gradient-to-tr from-transparent via-white to-transparent
        opacity-0 transition-opacity duration-700 ease-in-out
        ${isHovered ? 'opacity-10' : ''}
      `}></div>
      
      {/* Premium indicator when applicable */}
      {room.premium && (
        <div className="absolute -top-3 -right-3 w-24 h-24 overflow-hidden">
          <div className={`
            absolute transform rotate-45 
            bg-gradient-to-r ${colors.primary} 
            text-white text-xs font-bold py-1 
            right-[-40px] top-[32px] w-[170px] text-center shadow-md
          `}>
            PREMIUM
          </div>
        </div>
      )}
      
      {/* Room Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className={`font-bold text-xl ${colors.text}`}>
            {room.type}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {room.description}
          </p>
        </div>
        <div className="text-right">
          <div className="flex flex-col items-end">
            <p className="font-bold text-2xl text-gray-800">
              ${room.price}
            </p>
            <p className="text-xs text-gray-500">per night + taxes</p>
          </div>
        </div>
      </div>
      
      {/* Room Details */}
      <div className="flex items-center text-sm mb-6 gap-6">
        <div className="flex items-center gap-1 text-gray-700">
          <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 3h20v10H2V3z M4 13h16v8H4v-8z"/>
          </svg>
          <span>{room.beds}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
          </svg>
          <span>{room.size}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span>Sleeps {room.capacity}</span>
        </div>
      </div>
      
      {/* Amenities section */}
      <div className="mb-6">
        <h5 className={`text-xs font-semibold uppercase ${colors.text} mb-2`}>Amenities</h5>
        <div className="flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <motion.div
              key={amenity}
              className={`
                flex items-center text-xs text-gray-700 
                bg-gray-50 px-3 py-1.5 rounded-full
                border border-gray-100
                transition-colors duration-300
              `}
              whileHover={{
                backgroundColor: "#f9fafb",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {amenitiesIcons[amenity]}
              <span className="ml-1.5 capitalize">{amenity}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom action area */}
      <div className="mt-auto">
        <motion.button
          className={`
            w-full py-2.5 px-4 rounded-lg
            font-medium text-white
            bg-gradient-to-r ${colors.primary}
            transition-all duration-300
            shadow-sm
            hover:shadow-md
          `}
          onClick={() => handleBookNow(room)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfessionalRGBCard;