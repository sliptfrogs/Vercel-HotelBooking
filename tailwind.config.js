/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    // Add node_modules flowbite if needed
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      // Blur effects
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
      },

      // Animation enhancements
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      // Extended transition properties
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
        position: "top, right, bottom, left",
        "transform-opacity": "transform, opacity",
      },

      // Background utilities
      backgroundSize: {
        "200%": "200% 100%",
        "300%": "300% 100%",
      },

      // Additional customizations
      boxShadow: {
        soft: "0 4px 14px 0 rgba(0, 0, 0, 0.08)",
        hard: "0 4px 24px 0 rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    flowbite.plugin(),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // If you need animations:
    require("tailwindcss-animated"),
  ],
};
