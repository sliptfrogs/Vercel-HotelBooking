import { useState } from "react";

const SelectRoom = ({
  typeSelection = {
    isSelectGuests: false,
    isSelectRoom: false,
    isSelectCheckInDate: false,
    isSelectCheckOutDate: false,
  },
  className = "",
  containerClassName = "",
  icon = null,
  title = "",
  defaultSelection = "Select...",
  defaultValue = [],
  onSelectionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelection);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onSelectionChange) onSelectionChange(value);
  };

  const getSelectedLabel = () => {
    if (!selectedOption) return defaultSelection;
    const selected = defaultValue.find((opt) => opt.value === selectedOption);
    return selected ? selected.label : defaultSelection;
  };

  const handleKeyDown = (e, value) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (value) {
        handleOptionSelect(value);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${containerClassName}`}>
      {/* Select Trigger Button */}
      <button
        type="button"
        className={`flex gap-2 items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all duration-200 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={title}
      >
        <div className="flex items-center  w-full pr-5 gap-3">
          {icon && (
            <span className="text-blue-600 bg-blue-500/10  p-3 rounded-full">
              {icon}
            </span>
          )}
          <div className="flex w-full flex-col items-center">
            {title && (
              <span className="text-[16px] font-bold text-gray-600">{title}</span>
            )}
            <span className="text-[14px] text-gray-600">{getSelectedLabel()}</span>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 border border-gray-200 rounded-lg shadow-lg bg-white"
          role="listbox"
        >
          <div className="overflow-y-auto max-h-60 py-1">
            {defaultValue.length > 0 ? (
              defaultValue.map((option) => (
                <button
                  key={option.value}
                  role="option"
                  aria-selected={option.value === selectedOption}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors duration-150 ${
                    option.value === selectedOption
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                  onKeyDown={(e) => handleKeyDown(e, option.value)}
                  tabIndex={0}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRoom;
