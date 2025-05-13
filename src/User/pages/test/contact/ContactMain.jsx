import React, { useState, useRef, useEffect } from 'react';
import DevOpsExpertiseCard from './components/ContactComponent';

const FramerStyleGridBackground = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Framer-inspired grid background component
  const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Main grid pattern */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isHovered ? 'opacity-15' : 'opacity-10'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundColor: 'rgba(15, 15, 20, 1)',  // Added base color
          backdropFilter: 'blur(1px)',             // Subtle blur effect
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',  // Subtle border
          boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.03)'  // Inner glow
        }}
      />
      
      {/* Animated dots at intersections */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isHovered ? 'opacity-30' : 'opacity-20'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(100,217,254,0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '12px 12px' // Offset to align with grid intersections
        }}
      />
      
      {/* Subtle moving gradient overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isHovered ? 'opacity-10' : 'opacity-5'
        }`}
        style={{
          background: `
            radial-gradient(circle at 70% 30%, rgba(16,185,129,0.15) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(59,130,246,0.15) 0%, transparent 50%)
          `,
          animation: 'moveGradient 15s ease infinite alternate'
        }}
      />
    </div>
  );

  return (
          <DevOpsExpertiseCard/>
  );
};

export default FramerStyleGridBackground;