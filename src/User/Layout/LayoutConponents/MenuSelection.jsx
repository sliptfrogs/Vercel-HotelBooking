import { react } from "react";
const SelectRoom = ({
  typeSelection = {
    isSelectGuests: false,
    isSelectRoom: false,
    isSelectCheckInDate: false,
    isSelectCheckOutDate: false,
  },
  className = "",
  icon = null,
  title = "",
  defaultSelection = "",
  defaultValue = [],
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelection);
  const [isOpen, setIsOpen] = useState(false);
  const [dateSelected,setDateSelected] = useState();

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  // Get the label for the selected option
  const getSelectedLabel = () => {
    if (!selectedOption) return defaultSelection;
    const selected = defaultValue.find((opt) => opt.value === selectedOption);
    return selected ? selected.label : defaultSelection;
  };

  return (
    <div className="relative w-full">
      {/* Select Trigger Button */}
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-600">{icon}</span>}
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">{title}</span>
            <span className="text-sm text-gray-600">{getSelectedLabel()}</span>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto py-1">
            {defaultValue.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors duration-150 ${
                  option.value === selectedOption
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRoom;
