// LazyMap.jsx
import React, { useState, useEffect, useRef } from 'react';

const LazyMap = ({ src,containerClassName="",className="" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  return (
    <div ref={mapRef} className={containerClassName} style={{ minHeight: '450px' }}>
      {isVisible && (
        <iframe
          src={src}
          className={className}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hotel Location Map"
        />
      )}
    </div>
  );
};

export default LazyMap;