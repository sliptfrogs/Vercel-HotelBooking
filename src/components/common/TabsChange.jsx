import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TabsChange = ({ hotelId, onTabChange, initialTab = "Home" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = ["Rooms", "Reviews", "Details", "Policies"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <>
    <div className="relative   p-1 rounded-lg inline-flex">
      {tabs.map((tab) => (
        <button
          key={`${hotelId}-${tab}`}
          onClick={() => handleTabClick(tab)}
          className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab
              ? "text-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId={`activeTabBg-${hotelId}`}
              className="absolute inset-0 border-b border-red-500 z-0"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="mt-6 p-4 flex flex-col border border-gray-200 rounded-lg"
        >
          {activeTab === "Home" && <p>Home content with smooth transition</p>}
          {activeTab === "React" && <p>React content with smooth transition</p>}
          {activeTab === "Vue" && <p>Vue content with smooth transition</p>}
          {activeTab === "Svelte" && (
            <p>Svelte content with smooth transition</p>
          )}
        </motion.div>
      </AnimatePresence> */}
    </>
  );
};

export default TabsChange;
