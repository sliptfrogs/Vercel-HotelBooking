import { CalendarMinus, CalendarPlus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const CustomDateRangePicker = ({
  setFieldValue,
  minDate,
  maxDate,
  initialStartDate = null,
  initialEndDate = null,
  disablePastDates = true,
  name,
}) => {
  // State for selected dates and UI state
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectingMode, setSelectingMode] = useState("start"); // "start" or "end"
  const [hoverDate, setHoverDate] = useState(null);

  // Refs for DOM elements
  const calendarRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  // Format date for display (e.g., "May 15, 2025")
  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Format date for input value (e.g., "2025-05-15")
  const formatInputDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Parse a string input date value to Date object
  const parseInputDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  // Handle day selection
  const handleDayClick = (day) => {
    const dayDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day
    );

    if (selectingMode === "start") {
      // If selecting start date
      setStartDate(dayDate);

      // If end date exists and is before new start date, clear it
      if (endDate && dayDate > endDate) {
        setEndDate(null);
      }

      setSelectingMode("end");

      // On mobile, focus the end input
      if (window.innerWidth < 768) {
        setTimeout(() => {
          endInputRef.current?.focus();
        }, 50);
      }
    } else {
      // If selecting end date
      // Ensure end date is not before start date
      if (startDate && dayDate < startDate) {
        setStartDate(dayDate);
        setEndDate(startDate);
      } else {
        setEndDate(dayDate);
      }

      // If complete range selected, hide calendar on mobile
      if (window.innerWidth < 768) {
        setShowCalendar(false);
      }

      setSelectingMode("start");
    }
  };

  // Check if a date is disabled (past date, before min date, after max date)
  const isDateDisabled = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (disablePastDates && date < currentDate) {
      return true;
    }

    if (minDate && date < new Date(minDate)) {
      return true;
    }

    if (maxDate && date > new Date(maxDate)) {
      return true;
    }

    return false;
  };

  // Check if a date is in the selected range
  const isInRange = (day) => {
    if (!startDate || !endDate) return false;

    const date = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day
    );

    return date >= startDate && date <= endDate;
  };

  // Check if a date is being hovered in "end" select mode
  const isInHoverRange = (day) => {
    if (selectingMode !== "end" || !startDate || !hoverDate) return false;

    const date = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day
    );

    return date >= startDate && date <= hoverDate;
  };

  // Generate days for the current month view
  const generateDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Previous month's last day
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month's days to fill first week
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDay - firstDay + i + 1;
      days.push({
        day,
        currentMonth: false,
        date: new Date(year, month - 1, day),
      });
    }

    // Current month's days
    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        currentMonth: true,
        isToday: isToday(i),
        isStart: startDate && isSameDay(date, startDate),
        isEnd: endDate && isSameDay(date, endDate),
        inRange: isInRange(i),
        inHoverRange: isInHoverRange(i),
        disabled: isDateDisabled(date),
        date,
      });
    }

    // Next month's days to fill last week
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  // Check if a day is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      calendarMonth.getMonth() === today.getMonth() &&
      calendarMonth.getFullYear() === today.getFullYear()
    );
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
    );
  };

  // Format month for display (e.g., "May 2025")
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Handle start date input change
  const handleStartDateChange = (e) => {
    const date = parseInputDate(e.target.value);
    if (date) {
      setStartDate(date);
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));

      // If end date exists and is before new start date, clear it
      if (endDate && date > endDate) {
        setEndDate(null);
      }

      // Auto-switch to end date selection after valid start date
      setSelectingMode("end");
      if (window.innerWidth < 768) {
        setTimeout(() => {
          endInputRef.current?.focus();
        }, 50);
      }
    }
  };

  // Handle end date input change
  const handleEndDateChange = (e) => {
    const date = parseInputDate(e.target.value);
    if (date) {
      // If start date doesn't exist yet, set both
      if (!startDate) {
        setStartDate(date);
        setEndDate(date);
      }
      // If end date is before start date, swap them
      else if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }

      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      setSelectingMode("start");
    }
  };

  // Handle date input focus
  const handleInputFocus = (type) => {
    setSelectingMode(type);
    setShowCalendar(true);

    // Initialize calendar to appropriate month
    if (type === "start" && startDate) {
      setCalendarMonth(
        new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      );
    } else if (type === "end" && endDate) {
      setCalendarMonth(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
    } else if (startDate) {
      setCalendarMonth(
        new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      );
    } else {
      // Default to current month if no dates selected
      setCalendarMonth(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      );
    }
  };

  // Handle mouse hover over day
  const handleDayHover = (day) => {
    if (selectingMode === "end" && startDate) {
      const date = new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth(),
        day
      );
      setHoverDate(date);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !startInputRef.current.contains(event.target) &&
        !endInputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notify parent component when dates change

  useEffect(() => {
    setFieldValue(name, [{ startDate, endDate }]);
  }, [startDate, endDate]);

  // Initialize calendar to current month on first render
  useEffect(() => {
    // If initialStartDate provided, set calendar to that month
    if (initialStartDate) {
      const date = new Date(initialStartDate);
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }, [initialStartDate]);

  // Day of week headers
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-full flex-col w-full">
      {/* Input Fields */}
      <div className="flex flex-col  h-full md:flex-row gap-3 md:gap-4">
        {/* Check-in Field */}
        <div className="flex-1   relative">
          <div
            className={`border pl-5 h-full lg:flex lg:flex-col lg:items-center lg:pl-14 rounded-lg p-2 relative cursor-pointer transition-all 
              ${startDate ? "shadow-sm bg-white" : "bg-gray-50"} 
              ${
                selectingMode === "start" && showCalendar
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            onClick={() => handleInputFocus("start")}
          >
            <label className="block text-[16px]  font-bold text-gray-600 mb-1">
              Check-in
            </label>
            <div className="flex  items-center ">
              <div className="flex-grow">
                <input
                  ref={startInputRef}
                  type="date"
                  value={formatInputDate(startDate)}
                  onChange={handleStartDateChange}
                  onFocus={() => handleInputFocus("start")}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Check-in date"
                />
                <span
                  className={`block text-[14px] transition-colors ${
                    startDate ? "text-gray-800 font-medium" : "text-gray-500"
                  }`}
                >
                  {startDate ? formatDate(startDate) : "Select date"}
                </span>
              </div>
            </div>
          </div>
          <span className="min-w-5 min-h-5 text-blue-600 bg-blue-500/10  p-3 rounded-full absolute top-1/2 left-[42px] -translate-x-1/2 -translate-y-1/2">
            <CalendarPlus />
          </span>
        </div>

        {/* Check-out Field */}
        <div className="flex-1 relative">
          <div
            className={`border pl-5 h-full lg:flex lg:flex-col lg:items-center lg:pl-14 rounded-lg p-2 relative cursor-pointer transition-all 
              ${endDate ? "shadow-sm bg-white" : "bg-gray-50"} 
              ${
                selectingMode === "end" && showCalendar
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            onClick={() => handleInputFocus("end")}
          >
            <label className="block text-[16px]  font-bold text-gray-600 mb-1">
              Check-out
            </label>
            <div className="flex items-center">
              <div className="flex-grow">
                <input
                  ref={endInputRef}
                  type="date"
                  value={formatInputDate(endDate)}
                  onChange={handleEndDateChange}
                  onFocus={() => handleInputFocus("end")}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Check-out date"
                />
                <span
                  className={`block text-[14px] transition-colors ${
                    endDate ? "text-gray-800 font-medium" : "text-gray-500"
                  }`}
                >
                  {endDate ? formatDate(endDate) : "Select date"}
                </span>
              </div>
            </div>
          </div>

          <span className="min-w-5 min-h-5 text-blue-600 bg-blue-500/10  p-3 rounded-full absolute top-1/2 left-[42px] -translate-x-1/2 -translate-y-1/2">
            <CalendarMinus />
            {/* className="text-blue-600 bg-blue-500/10  p-3 rounded-full" */}
          </span>
        </div>
      </div>

      {/* Duration Display */}
      {/* {startDate && endDate && (
        <div className="mt-1 text-xs text-blue-600 font-medium">
          {(() => {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            dayCount(diffDays);
            return `${diffDays} ${diffDays === 1 ? "night" : "nights"}`;
          })()}
        </div>
      )} */}

      {/* Calendar Popover */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="origin-top absolute z-10 mt-2 md:mt-1 left-0 right-0 md:w-auto bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fade-in transition-all"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Previous month"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <h3 className="text-base font-medium text-gray-800">
              {formatMonth(calendarMonth)}
            </h3>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Next month"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 pb-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateDays().map((dayObj, index) => (
              <div
                key={index}
                className={`
                  relative text-center py-2 text-sm rounded-md transition-all
                  ${dayObj.currentMonth ? "hover:bg-gray-100" : "text-gray-400"}
                  ${
                    dayObj.disabled
                      ? "text-gray-300 cursor-not-allowed hover:bg-transparent"
                      : "cursor-pointer"
                  }
                  ${dayObj.isToday ? "font-semibold" : ""}
                  ${
                    dayObj.isStart
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : ""
                  }
                  ${
                    dayObj.isEnd
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : ""
                  }
                  ${dayObj.inRange ? "bg-blue-50 text-blue-800" : ""}
                  ${
                    dayObj.inHoverRange && !dayObj.isStart && !dayObj.isEnd
                      ? "bg-gray-100"
                      : ""
                  }
                `}
                onClick={() =>
                  !dayObj.disabled &&
                  dayObj.currentMonth &&
                  handleDayClick(dayObj.day)
                }
                onMouseEnter={() => handleDayHover(dayObj.day)}
                aria-label={dayObj.date.toLocaleDateString()}
                aria-disabled={dayObj.disabled}
                role="button"
              >
                {dayObj.day}

                {/* Start and End indicators */}
                {dayObj.isStart && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white">
                    in
                  </span>
                )}
                {dayObj.isEnd && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white">
                    out
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Instruction text */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            {selectingMode === "start"
              ? "Select check-in date"
              : "Select check-out date"}
          </div>

          {/* Apply button (mobile) */}
          <div className="mt-4 md:hidden">
            <button
              type="button"
              className={`w-full py-2 rounded-lg text-center font-medium transition-colors ${
                startDate && endDate
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!startDate || !endDate}
              onClick={() => setShowCalendar(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomDateRangePicker;
