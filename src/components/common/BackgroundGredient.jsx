import React from 'react';

const TechBackground = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-xl overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(to right, #ffffff 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Animated dots (optional) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300"></div>
      </div>
      
      {/* Container for your content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TechBackground;