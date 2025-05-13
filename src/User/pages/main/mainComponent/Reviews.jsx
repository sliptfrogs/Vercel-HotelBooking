import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Star, ChevronDown, User } from "lucide-react";

const Reviews = ({ id, isOpenId, handleIsOpen, data = {} }) => {
  const isOpen = id === isOpenId;
  const ratingPercentage = Math.min(100, Math.max(0, (data.rating / 10) * 100));

  return (
    <motion.div
      className="w-full  divide-y overflow-hidden   transition-shadow"
      initial={false}
      animate={{
        height: isOpen ? "auto" : "64px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="h-16 cursor-pointer flex items-center justify-between px-4"
        onClick={() => handleIsOpen(id)}
      >
        <div className=" flex items-center space-x-3 min-w-0">
          <div className="flex-shrink-0 h-10 w-10 rounded-full  flex items-center justify-center overflow-hidden border border-gray-200">
            {data.authorImage ? (
              <img
                src={data.authorImage}
                alt={data.author}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {data.title}
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-700 ml-1">
                  {data.rating}/10
                </span>
              </div>
              <div className="text-xs text-gray-500">by <span className="text-green-500">{data.author}</span></div>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 rounded-b bg-slate-50 pb-4"
          >
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Stay type:{" "}
                  <span className="ml-1 py-1 px-2 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                    {data.stayType}
                  </span>
                </span>
                {data.date && (
                  <span className="text-xs text-gray-400">
                    {new Date(data.date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {data.content}
              </p>

              <div className="pt-2">
                <RatingProgressBar rating={data.rating} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RatingProgressBar = ({ rating = 0 }) => {
  const percentage = Math.min(100, Math.max(0, (rating / 10) * 100));
  const ratingColor = rating >= 7 ? "green" : rating >= 4 ? "yellow" : "red";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium text-gray-900">
            {rating.toFixed(1)}/10
          </span>
        </div>
        <span className="text-sm font-medium text-gray-500">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${
            ratingColor === "green"
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : ratingColor === "yellow"
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : "bg-gradient-to-r from-red-400 to-red-500"
          }`}
          style={{
            boxShadow: `0 0 6px rgba(${
              ratingColor === "green"
                ? "74, 222, 128"
                : ratingColor === "yellow"
                ? "234, 179, 8"
                : "248, 113, 113"
            }, 0.4)`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span className="text-red-400 px-2 py-[2px] rounded bg-red-200/40">Needs improvement</span>
        <span className="text-green-300 px-2 py-[2px] rounded bg-green-200/40">Exceptional</span>
      </div>
    </div>
  );
};

export default Reviews;