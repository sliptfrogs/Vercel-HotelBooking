import { Tooltip } from "antd";
import React, { useState, useEffect, useCallback } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the function to prevent recreating it on every render
  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 200);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]); // Add toggleVisibility to dependencies

  return (
    <div
      className={`fixed bottom-5 right-5 transition-opacity duration-300 ${
        isVisible ? "opacity-70" : "opacity-0 pointer-events-none"
      }`}
    >
      <Tooltip title="Scroll to top" placement="left">
        <button
          className="bg-gray-700 border border-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform"
          onClick={scrollToTop}
          style={{
            fontSize: "20px",
          }}
        >
          ↑
        </button>
      </Tooltip>
    </div>
  );
};

export default ScrollToTop;