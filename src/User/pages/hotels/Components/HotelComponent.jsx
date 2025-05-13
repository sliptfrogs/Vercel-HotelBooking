import { Button } from "@mui/material";
import {
  Bath,
  Bed,
  CalendarSearch,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClockFading,
  Coffee,
  Droplets,
  Dumbbell,
  Filter,
  Map,
  Pin,
  Search,
  Snowflake,
  Star,
  Ticket,
  Tv,
  User,
  Utensils,
  Verified,
  Wifi,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FrmSearchRoom from "../../main/mainComponent/FrmSearchRoom";
import { amenitiesIcons } from "../../../components/common/AmentiesIcon";
import { AnimatePresence, motion } from "framer-motion";
import { AllHotelData, NearestHotelData } from "./SampleData";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import AntDisplayImageGroup from "../../../components/common/AntDisplayImageGroup";
import LayoutFooter from "../../../Layout/LayoutConponents/LayoutFooter";
import AntHotelSkeleton from "../../../components/common/AntHotelSkeleton";
import FilteringSelection from "../../../../User/components/common/FilteringSelection";
import { LoadingOutlined } from "@ant-design/icons";
const HotelComponent = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [allHoteData, setAllHotelData] = useState(AllHotelData);
  const [nearestHotelData, setNearestHotelData] = useState(NearestHotelData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadLoading, setLoadLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");
  const hotelFilterTabs = [
    { name: "All" },
    { name: "Top Rated" },
    { name: "Luxury" },
    { name: "Budget" },
    { name: "Beach Access" },
  ];
  const partners = [
    {
      id: 1,
      name: "Acme Corporation",
      logo: "https://cdn.thebrandingjournal.com/wp-content/uploads/2019/05/chanel_logo_the_branding_journal.jpg",
      description:
        "Global technology solutions provider specializing in cloud infrastructure and AI.",
      category: "Technology",
    },
    {
      id: 2,
      name: "Zenith Media",
      logo: "https://www.logo.wine/a/logo/Puma_(brand)/Puma_(brand)-Logo.wine.svg",
      description:
        "Creative agency delivering award-winning digital experiences and marketing campaigns.",
      category: "Media",
    },
    {
      id: 3,
      name: "Evergreen Solutions",
      logo: "/api/placeholder/200/80",
      description:
        "Sustainable business practices consultancy focused on reducing environmental impact.",
      category: "Sustainability",
    },
    {
      id: 4,
      name: "Nova Finance",
      logo: "/api/placeholder/200/80",
      description:
        "Innovative financial services firm specializing in digital banking and investments.",
      category: "Finance",
    },
    {
      id: 5,
      name: "Pulse Health",
      logo: "/api/placeholder/200/80",
      description:
        "Healthcare technology provider improving patient outcomes through data-driven solutions.",
      category: "Healthcare",
    },
    {
      id: 6,
      name: "Momentum Ventures",
      logo: "/api/placeholder/200/80",
      description:
        "Venture capital firm funding the next generation of tech entrepreneurs.",
      category: "Investment",
    },
  ];

  const handleSubmit = () => {
    setLoadLoading(true);
    setTimeout(() => {
      setLoadLoading(false);
    }, 1500);
  };

  // Set up intersection observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-rotate featured partners
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, partners.length]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return loading ? (
    <AntHotelSkeleton />
  ) : (
    <div className="w-full  py-24 px-4 overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div
          className={`absolute top-20 -left-20 w-64 h-64 rounded-full bg-slate-500/10 blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-60" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-60" : "opacity-0"
          }`}
        ></div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto  relative z-10">
        {/* Featured partner spotlight section */}
        <div
          className={`mb-24 transition-all  duration-1000 delay-300 opacity-100 translate-y-0`}
        >
          {/* Header done responsive */}
          <div className="max-w-6xl mx-auto">
            <div className="relative  w-full h-full z-10 grid grid-cols-1 grid-flow-col lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                className="relative lg:col-span-2 col-span-1  w-full z-10 h-full  rounded-2xl  "
              >
                {/* Animated Grid Background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                                `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Floating 3D Shapes */}
                <motion.div
                  className="absolute top-[20%] sm:top-1/4 left-[15%] sm:left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-400/20 xl:backdrop-blur-lg backdrop-blur-2xl shadow-2xl"
                  animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-[20%] sm:bottom-1/4 right-[15%] sm:right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-purple-500/20 backdrop-blur-lg shadow-2xl"
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-[25%] sm:top-1/3 right-[25%] sm:right-1/3 w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-pink-400/20 backdrop-blur-lg shadow-2xl"
                  animate={{ y: [0, 15, -15, 0], rotate: [0, 180, 360] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                {/* Main Content */}
                <div className="relative  z-10 h-full flex flex-col items-center justify-center  text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className=""
                    viewport={{ once: true }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 border border-blue-500/20 bg-blue-500/10 backdrop-blur-md rounded-full shadow-xl">
                        <CalendarSearch className="w-9 h-9 text-blue-500" />
                      </div>
                    </div>
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-center  relative z-10"
                    >
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
                        <span className="text-blue-500 font-extrabold">
                          Brows,
                        </span>{" "}
                        comfortable hotel.
                      </h1>
                    </motion.div>
                    <div className="my-5  flex-wrap">
                      <FrmSearchRoom
                        title={"Find Available Hotels"}
                        className=" bg-slate-50/50 px-5 "
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`w-full bg-slate-300/10 focus:bg-slate-300/30 ring-gray-500/30 p-2 py-3 pl-10 text-sm  border-none focus:border-0 focus:ring-blue-500/50  rounded-md ring-1 outline-none transition-all`}
              placeholder="Search "
            />
          </div>

          {/* Filter Selection */}
          <div className="relative my-3">
            <FilteringSelection className="bg-slate-300/10 rounded-md border border-gray-500/30" />
          </div>

          {/* Tab Filter */}
          <div className="w-full flex-wrap-reverse gap-2 lg:flex-wrap border-b border-blue-500/30 relative justify-between mr-2 my-2  flex backdrop-blur-sm p-2 ">
            <div className="flex group  relative items-center space-x-2">
              <motion.span
                className="w-3 h-3 bg-blue-500/90 backdrop-blur-sm rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }} // Pulsing effect (scale from 1 to 1.5 and back)
                transition={{
                  duration: 2, // Time it takes to complete the cycle
                  ease: "easeInOut",
                  repeat: Infinity, // Repeat the animation infinitely
                  repeatType: "loop", // Makes the animation loop
                }}
              />
              <h2 className="text-lg font-semibold text-gray-700">
                {activeTab}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center">
              {hotelFilterTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab.name)}
                  className={
                    "relative  px-4 py-2 text-[13px] rounded-lg  font-medium transition-colors"
                  }
                >
                  {activeTab === tab.name && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-blue-500 backdrop-blur-sm   rounded-md"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                  <span
                    className={`relative transition-all duration-150 ${
                      activeTab === tab.name ? "text-white" : "text-gray-600"
                    } z-10`}
                  >
                    {tab.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Left: Search Result Text */}

          {/* Data Display */}
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allHoteData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="w-full  border rounded-lg p-1 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Image Section */}
                <div className=" md:col-span-1 h-48 md:h-full">
                  <AntDisplayImageGroup
                    src={item.images[0]}
                    ArrayImage={item.images}
                  />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 py-2 px-3">
                  {/* Verified and Rating Row */}
                  <div className="w-full grid grid-cols-2 text-xs mb-2">
                    <div className="col-span-1 flex items-center justify-start">
                      <Verified
                        color="white"
                        size={20}
                        fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold text-green-400 ml-1">
                        Verified
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Star
                        size={20}
                        color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                        fill="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold ml-1">
                        {item.rating}({item.numberRater})
                      </span>
                    </div>
                  </div>

                  {/* Title and Location */}
                  <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-balance text-sm sm:text-base">
                    {item.location}
                  </p>
                  <span className="text-green-400 gap-1 font-bold flex items-center text-sm sm:text-base">
                    <Map size={20} /> {item.distance} away.
                  </span>

                  {/* Amenities */}
                  <div className="w-full my-3">
                    <div className="flex flex-wrap lg:justify-start items-center justify-center gap-2">
                      {item.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center text-xs sm:text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                        >
                          {amenitiesIcons[amenity]}
                          <span className="ml-1 capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="font-bold flex flex-wrap w-full  border-t pt-3  lg:border-none lg:pt-0 grid-flow-col lg:flex justify-between  sm:flex-row items-start  gap-3">
                    <h5 className="text-md  w-full lg:w-fit justify-center h-full flex items-center text-center sm:text-base">
                      <span className="font-bold text-green-500">
                        ${item.price}
                      </span>
                      /per night.
                    </h5>
                    <div className="flex flex-wrap lg:w-fit justify-start sm:justify-end gap-2 w-full">
                      <Button
                        className="!bg-inherit !w-full lg:!w-fit lg:!px-3 !text-sm !lg:text-xs !border-gray-400/50 !text-blue-500 !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "1px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Open Map</span>
                      </Button>
                      <Button
                        className="!bg-blue-500 !border-blue-500 lg:!px-3 !w-full lg:!w-fit !text-sm lg:!text-xs !border-gray-400/10 !text-white !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "2px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Browse Room</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load more button */}
          <div className=" w-full  h-[10vh]  border-b  flex items-center justify-center">
            {loadLoading ? (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2  bottom-0 lg:bottom-5  hover:text-gray-500/80 text-gray-500 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <LoadingOutlined size={3} />
                <span className="text-sm font-medium">Processing...</span>
              </motion.div>
            ) : (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2 bottom-0 lg:bottom-5  hover:text-gray-700/80 text-gray-700 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <ChevronDown className="w-5 h-5" />
                <span className="text-sm font-medium">See more</span>
              </motion.div>
            )}
          </div>

          {/* Header done responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center my-4 lg:my-7"
          >
            <div className="text-xs  sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
              <div class="flex items-center space-x-2">
                <Map size={17} />
                <span className="font-medium">Near you.</span>
              </div>
            </div>
            <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
              Continue Exploring
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Keep exploring your favourite.
            </p>
          </motion.div>

          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            {nearestHotelData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="w-full  border rounded-lg p-1 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Image Section */}
                <div className=" md:col-span-1 h-48 md:h-full">
                  <AntDisplayImageGroup
                    src={item.images[0]}
                    ArrayImage={item.images}
                  />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 py-2 px-3">
                  {/* Verified and Rating Row */}
                  <div className="w-full grid grid-cols-2 text-xs mb-2">
                    <div className="col-span-1 flex items-center justify-start">
                      <Verified
                        color="white"
                        size={20}
                        fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold text-green-400 ml-1">
                        Verified
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Star
                        size={20}
                        color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                        fill="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold ml-1">
                        {item.rating}({item.numberRater})
                      </span>
                    </div>
                  </div>

                  {/* Title and Location */}
                  <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-balance text-sm sm:text-base">
                    {item.location}
                  </p>
                  <span className="text-green-400 gap-1 font-bold flex items-center text-sm sm:text-base">
                    <Map size={20} /> {item.distance} away.
                  </span>

                  {/* Amenities */}
                  <div className="w-full my-3">
                    <div className="flex flex-wrap lg:justify-start items-center justify-center gap-2">
                      {item.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center text-xs sm:text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                        >
                          {amenitiesIcons[amenity]}
                          <span className="ml-1 capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="font-bold flex flex-wrap w-full  border-t pt-3  lg:border-none lg:pt-0 grid-flow-col lg:flex justify-between  sm:flex-row items-start  gap-3">
                    <h5 className="text-md  w-full lg:w-fit justify-center h-full flex items-center text-center sm:text-base">
                      <span className="font-bold text-green-500">
                        ${item.price}
                      </span>
                      /per night.
                    </h5>
                    <div className="flex flex-wrap lg:w-fit justify-start sm:justify-end gap-2 w-full">
                      <Button
                        className="!bg-inherit !w-full lg:!w-fit lg:!px-3 !text-sm !lg:text-xs !border-gray-400/50 !text-blue-500 !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "1px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Open Map</span>
                      </Button>
                      <Button
                        className="!bg-blue-500 !border-blue-500 lg:!px-3 !w-full lg:!w-fit !text-sm lg:!text-xs !border-gray-400/10 !text-white !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "2px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Browse Room</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load more button */}
          <div className=" w-full  h-[10vh]  border-b  flex items-center justify-center">
            {loadLoading ? (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2  bottom-0 lg:bottom-5  hover:text-gray-500/80 text-gray-500 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <LoadingOutlined size={3} />
                <span className="text-sm font-medium">Processing...</span>
              </motion.div>
            ) : (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2 bottom-0 lg:bottom-5  hover:text-gray-700/80 text-gray-700 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <ChevronDown className="w-5 h-5" />
                <span className="text-sm font-medium">See more</span>
              </motion.div>
            )}
          </div>

          {/* Header done responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center  my-4 lg:my-7"
          >
            <div className="text-xs  sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
              <div class="flex items-center space-x-2">
                <ChartNoAxesCombined size={17} />
                <span className="font-medium">Popular.</span>
              </div>
            </div>
            <h2 className="text-xl lg:text-2xl flex-wrap text-center md:text-3xl font-bold text-gray-900">
              Top bests hotel in Cambodia
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Keep exploring your favourite.
            </p>
          </motion.div>

          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            {nearestHotelData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="w-full  border rounded-lg p-1 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Image Section */}
                <div className=" md:col-span-1 h-48 md:h-full">
                  <AntDisplayImageGroup
                    src={item.images[0]}
                    ArrayImage={item.images}
                  />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 py-2 px-3">
                  {/* Verified and Rating Row */}
                  <div className="w-full grid grid-cols-2 text-xs mb-2">
                    <div className="col-span-1 flex items-center justify-start">
                      <Verified
                        color="white"
                        size={20}
                        fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold text-green-400 ml-1">
                        Verified
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Star
                        size={20}
                        color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                        fill="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                      />
                      <span className="font-bold ml-1">
                        {item.rating}({item.numberRater})
                      </span>
                    </div>
                  </div>

                  {/* Title and Location */}
                  <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-balance text-sm sm:text-base">
                    {item.location}
                  </p>
                  <span className="text-green-400 gap-1 font-bold flex items-center text-sm sm:text-base">
                    <Map size={20} /> {item.distance} away.
                  </span>

                  {/* Amenities */}
                  <div className="w-full my-3">
                    <div className="flex flex-wrap lg:justify-start items-center justify-center gap-2">
                      {item.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center text-xs sm:text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                        >
                          {amenitiesIcons[amenity]}
                          <span className="ml-1 capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="font-bold flex flex-wrap w-full  border-t pt-3  lg:border-none lg:pt-0 grid-flow-col lg:flex justify-between  sm:flex-row items-start  gap-3">
                    <h5 className="text-md  w-full lg:w-fit justify-center h-full flex items-center text-center sm:text-base">
                      <span className="font-bold text-green-500">
                        ${item.price}
                      </span>
                      /per night.
                    </h5>
                    <div className="flex flex-wrap lg:w-fit justify-start sm:justify-end gap-2 w-full">
                      <Button
                        className="!bg-inherit !w-full lg:!w-fit lg:!px-3 !text-sm !lg:text-xs !border-gray-400/50 !text-blue-500 !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "1px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Open Map</span>
                      </Button>
                      <Button
                        className="!bg-blue-500 !border-blue-500 lg:!px-3 !w-full lg:!w-fit !text-sm lg:!text-xs !border-gray-400/10 !text-white !normal-case"
                        sx={{
                          minWidth: 0,
                          gap: "10px",
                          border: "2px solid",
                          width: "90px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <span>Browse Room</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load more button */}
          <div className=" w-full  h-[10vh]  border-b  flex items-center justify-center">
            {loadLoading ? (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2  bottom-0 lg:bottom-5  hover:text-gray-500/80 text-gray-500 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <LoadingOutlined size={3} />
                <span className="text-sm font-medium">Processing...</span>
              </motion.div>
            ) : (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                onClick={handleSubmit}
                className=" justify-center rounded px-2 bottom-0 lg:bottom-5  hover:text-gray-700/80 text-gray-700 cursor-pointer transform   flex items-center gap-2 text-center"
              >
                <ChevronDown className="w-5 h-5" />
                <span className="text-sm font-medium">See more</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelComponent;
