import React, { useState, useRef, useEffect } from "react";
import {
  Check,
  ChevronDown,
  X,
  Search,
  BaggageClaim,
  List,
} from "lucide-react";

const FilteringSelection = ({
  className = "",
  selectedOptions: initialSelectedOptions = [],
  onSelectionChange,
  defaultData = {
    Amenities: [
      { value: "wifi", label: "Free WiFi" },
      { value: "pool", label: "Swimming Pool" },
      { value: "gym", label: "Fitness Center" },
      { value: "spa", label: "Spa" },
      { value: "parking", label: "Parking" },
      { value: "restaurant", label: "Restaurant" },
      { value: "bar", label: "Bar" },
      { value: "breakfast", label: "Free Breakfast" },
    ],
    "Star Rating": [
      { value: "1", label: "★☆☆☆☆ (1 Star)" },
      { value: "2", label: "★★☆☆☆ (2 Stars)" },
      { value: "3", label: "★★★☆☆ (3 Stars)" },
      { value: "4", label: "★★★★☆ (4 Stars)" },
      { value: "5", label: "★★★★★ (5 Stars)" },
    ],
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);


  // Flatten all options for search
  const allOptions = Object.values(defaultData).flat();

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedOptions);
    }
  }, [selectedOptions, onSelectionChange]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const removeOption = (e, value) => {
    e.stopPropagation();
    setSelectedOptions((prev) => prev.filter((item) => item !== value));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedOptions([]);
  };

  const handleKeyDown = (e, value) => {
    if (e.key === "Enter" || e.key === " ") {
      handleOptionClick(value);
      e.preventDefault();
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown();
      e.preventDefault();
    } else if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  // Add CSS for hiding scrollbar
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`w-full my-1 ${className}`}>
      <div className="relative" ref={dropdownRef}>
        {/* Select Box */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={handleSelectKeyDown}
          className={`flex min-h-10 items-center justify-between rounded ${
            selectedOptions.length === 0 && "px-3"
          } px-1 pr-3 py-1 shadow-sm transition-all duration-200 cursor-pointer`}
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length === 0 && (
              <span className="text-gray-500 flex items-center gap-2">
                <List size={18} />
                Filter by amenities
              </span>
            )}
            {selectedOptions.map((value) => {
              const option = allOptions.find((opt) => opt.value === value);
              return option ? (
                <div
                  key={value}
                  className="flex items-center gap-1 rounded bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 transition-all hover:bg-blue-200 group"
                >
                  {option.label}
                  <button
                    onClick={(e) => removeOption(e, value)}
                    className="ml-1 rounded-full p-1 text-blue-600/70 group-hover:text-red-500 transition-colors"
                    aria-label={`Remove ${option.label}`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <div className="flex items-center gap-2">
            {selectedOptions.length > 0 && (
              <button
                onClick={clearAll}
                className="mr-1 rounded-full p-1 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700"
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute mt-1 z-50 w-full rounded-lg bg-white shadow-lg border border-gray-300 overflow-hidden transition-all duration-200 animate-in fade-in-0 zoom-in-95 origin-top">
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search hotel filters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300"
                />
              </div>
            </div>

            <div
              className="max-h-60 overflow-y-auto scrollbar-hide"
              role="listbox"
            >
              {searchQuery ? (
                filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={selectedOptions.includes(option.value)}
                      tabIndex={0}
                      onClick={() => handleOptionClick(option.value)}
                      onKeyDown={(e) => handleKeyDown(e, option.value)}
                      className={`flex cursor-pointer items-center justify-between px-4 py-2.5 transition-colors ${
                        selectedOptions.includes(option.value)
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{option.label}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
                          selectedOptions.includes(option.value)
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300"
                        }`}
                      >
                        {selectedOptions.includes(option.value) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No matching filters found
                  </div>
                )
              ) : (
                Object.entries(defaultData).map(([category, options]) => (
                  <div key={category}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 bg-gray-100">
                      {category}
                    </div>
                    {options.map((option) => (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={selectedOptions.includes(option.value)}
                        tabIndex={0}
                        onClick={() => handleOptionClick(option.value)}
                        onKeyDown={(e) => handleKeyDown(e, option.value)}
                        className={`flex cursor-pointer items-center justify-between px-4 py-2 transition-colors ${
                          selectedOptions.includes(option.value)
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{option.label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
                            selectedOptions.includes(option.value)
                              ? "bg-blue-500 text-white"
                              : "border border-gray-300"
                          }`}
                        >
                          {selectedOptions.includes(option.value) && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteringSelection;
