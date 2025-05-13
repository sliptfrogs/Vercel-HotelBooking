import { LoadingOutlined } from "@ant-design/icons";
import { DollarSign } from "lucide-react";
import React from "react";

const Stepper = ({ items = [], action }) => {
  return (
      <ol className=" flex justify-center w-full min-w-fit items-center text-gray-500 dark:text-gray-400">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`relative flex flex-col items-center text-center ${
              index !== 0 ? "md:ms-12 ms-8" : ""
            }`}
            aria-current={item.status === "process" ? "step" : undefined}
          >
            {/* Step indicator */}
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-900 z-10 transition-colors duration-300 ${
                item.status === "finish"
                  ? "bg-green-200 dark:bg-green-900"
                  : item.status === "process"
                  ? "bg-blue-100 dark:bg-blue-900 animate-pulse"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              aria-hidden="true"
            >
              {item.status === "finish" && (
                <svg
                  className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              )}
              {item.status === "process" && (
                <LoadingOutlined className="text-blue-500 dark:text-blue-400" />
              )}
              {item.status === "wait" && (
                <span className="text-gray-500 dark:text-gray-400">
                  {item.icon}
                </span>
              )}
            </span>

            {/* Step title */}
            <h3
              className={`mt-2 text-xs md:text-sm font-medium leading-tight ${
                item.status === "process"
                  ? "text-blue-600 dark:text-blue-400"
                  : item.status === "finish"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {item.title}
            </h3>

            {/* Optional step description */}
            {item.description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-[100px] truncate">
                {item.description}
              </p>
            )}

            {/* Connector line - only between steps */}
            {index !== items.length - 1 && (
              <div
                className={`absolute top-4 left-full w-8 md:w-12 h-[1px] ${
                  item.status === "finish"
                    ? "bg-green-300 dark:bg-green-700"
                    : "bg-gray-300 dark:bg-gray-600"
                } z-0`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
  );
};

export default Stepper;