import { QRCode } from "antd";
import { useEffect, useRef, useState } from "react";

export const LazyImage = ({
  src,
  alt,
  width,
  imageClassName = "",
  height,
  className = "",
  onClick = {},
}) => {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {/* Shimmer Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      )}

      {/* Actual Image */}
      {isVisible &&  (
        <img
          onClick={onClick}
          src={`${src}?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`}
          srcSet={`
          ${src}?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop 400w,
          ${src}?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop 800w,
          ${src}?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop 1200w
        `}
          sizes="(max-width: 768px) 100vw, 800px"
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full ${imageClassName} object-cover transition-all duration-500 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          width={width}
          height={height}
        />
      )}
    
    </div>
  );
};
