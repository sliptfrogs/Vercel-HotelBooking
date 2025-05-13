import React, { useState, useRef, useEffect, useMemo } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MultipleSelect = ({ MAX_SELECTION = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const options = [
    { value: "Temple", label: "Temple" },
    { value: "Modern City", label: "Modern City" },
    { value: "Beachfront", label: "Beachfront" },
    { value: "Countryside", label: "Countryside" },
    { value: "Mountain View", label: "Mountain View" },
    { value: "Historic Town", label: "Historic Town" },
    { value: "Luxury Villa", label: "Luxury Villa" },
    { value: "Eco Lodge", label: "Eco Lodge" },
    { value: "Urban Loft", label: "Urban Loft" },
    { value: "Desert Retreat", label: "Desert Retreat" },
  ];

  const optionMap = useMemo(() => {
    const map = new Map();
    options.forEach((opt) => map.set(opt.value, opt.label));
    return map;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter((v) => v !== value);
      } else {
        if (MAX_SELECTION && prev.length >= MAX_SELECTION) return prev;
        return [...prev, value];
      }
    });
  };

  const removeOption = (e, value) => {
    e.stopPropagation();
    setSelectedOptions((prev) => prev.filter((v) => v !== value));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedOptions([]);
  };

  return (
    <div className="w-full">
      <div className="relative" ref={dropdownRef}>
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-multiselectable="true"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          className="flex min-h-[42px] flex-wrap items-center justify-between gap-2 rounded-md border border-gray-300/50 bg-white px-3 py-2 shadow-sm transition-all hover:border-gray-400 cursor-pointer"
        >
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {selectedOptions.length === 0 ? (
              <span className="text-gray-500 text-sm">Select Categories</span>
            ) : (
              selectedOptions.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-1 rounded bg-blue-100 text-blue-700 border border-blue-300 px-2 py-[2px] text-sm font-medium"
                >
                  {optionMap.get(value)}
                  <button
                    onClick={(e) => removeOption(e, value)}
                    className="ml-1 p-[0.3rem] rounded-full bg-blue-200 hover:bg-blue-300"
                    aria-label={`Remove ${optionMap.get(value)}`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedOptions.length > 0 && (
              <button
                onClick={clearAll}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Clear all selected options"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute z-40 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md max-h-64 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#888 transparent",
                overflowY: "auto",
              }}
            >
              {options.map((option) => {
                const isSelected = selectedOptions.includes(option.value);
                const isDisabled =
                  MAX_SELECTION &&
                  selectedOptions.length >= MAX_SELECTION &&
                  !isSelected;
                return (
                  <div
                    
                    key={option.value}
                    onClick={() =>
                      !isDisabled && handleOptionClick(option.value)
                    }
                    className={`flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? "bg-blue-100 text-blue-700 font-medium cursor-pointer"
                        : `text-gray-700 hover:bg-gray-100 ${
                            isDisabled
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer"
                          }`
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultipleSelect;
