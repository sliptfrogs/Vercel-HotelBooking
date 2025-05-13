import React from "react";
import MultipleSelect from "../../../../components/common/MultipleSelect";

const FilterTurnOffTurnOn = () => {
  return (
    <div>
      {/* Filter- Done Responsive */}
      <div className="grid mb-2 place-content-center place-items-center grid-cols-1  gap-4 items-center px-4">
        {/* Right: Filter Controls */}
        <div className="flex w-full items-center justify-center sm:justify-center md:justify-end  px-2 py-1 gap-3 ">
          {/* Map View Toggle */}
          <label className="inline-flex gap-2 items-center cursor-pointer">
            <input type="checkbox" defaultValue="" className="sr-only peer" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Map view
            </span>
            <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-300" />
          </label>
          {/* Verified Only Toggle */}
          <label className="inline-flex gap-2 items-center cursor-pointer">
            <input type="checkbox" defaultValue="" className="sr-only peer" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Verified only
            </span>
            <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-300" />
          </label>
        </div>
        {/* Dropdown with Responsive Width */}
        <div className="w-full ">
          <MultipleSelect MAX_SELECTION={7} />
        </div>
        {/* Left: Search Result Text */}
        <div className="text-start">
          <div className="text-sm text-gray-800/70">
            Showing{" "}
            <span className="text-blue-500 underline font-bold">267</span>{" "}
            search results
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTurnOffTurnOn;
