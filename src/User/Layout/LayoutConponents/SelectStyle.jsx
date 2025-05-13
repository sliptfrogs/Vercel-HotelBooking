import React, { useState } from 'react';

const StylishDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions = [
    { value: 'En', label: 'En' },
    { value: 'ខ្មែរ ', label: 'ខ្មែរ' },
  ];

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <div className="space-y-2 relative">
        {/* <label className="block text-sm font-medium text-gray-700">
          User Menu
        </label>
         */}
        {/* Custom Select Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            rounded-lg 
            focus:outline-none
            focus:ring-0
            transition-all 
            duration-300 
            ease-in-out
            gap-2
            border-none
            px-4 
            py-2
            text-left
            text-gray-200 
            font-semibold
            flex
            justify-between
            items-center
          "
        >
          {selectedOption ? menuOptions.find(opt => opt.value === selectedOption)?.label : "En"}
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="
            absolute 
            z-10 
            w-full 
            mt-1 
            bg-white
            text-gray-950
            rounded-lg 
            border
            border-gray-200
            overflow-hidden
          ">
            {menuOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className="
                  w-full 
                  text-left
                  hover:bg-indigo-50 
                  focus:bg-indigo-100 
                  focus:text-indigo-900
                  focus:outline-none
                  cursor-pointer 
                  transition-colors 
                  duration-200 
                  ease-in-out
                  px-4 
                  py-2
                "
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        
        {/* {selectedOption && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedOption}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default StylishDropdown;