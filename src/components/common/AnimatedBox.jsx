import { animate } from "motion";
import { useEffect, useRef } from "react";

export default function AnimateOnceBox({ 
  children, 
  className = "",
  animation = {
    opacity: [0, 1],
    y: [20, 0],
    scale: [0.95, 1]
  },
  springConfig = {
    type: "spring",
    duration: 0.8,
    bounce: 0.2
  }
}) {
  const boxRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            animate(
              boxRef.current,
              animation,
              springConfig
            );
            
            // Clean up observer after animation
            observer.unobserve(boxRef.current);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px" // Trigger slightly before element hits viewport
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={`box ${className}`}
      style={{ opacity: 0 }} // Initial hidden state
    >
      {children}
    </div>
  );
}