import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  MapPin,
  ChevronUp,
  Hotel,
  Heart,
  Ticket,
  Clock,
  Bed,
  Bath,
  Waves,
  Store,
  AirVentIcon,
  Beer,
  Music,
  Disc,
  DollarSign,
  Trash,
  TicketCheck,
  Hourglass,
  CalendarX2,
  CircleAlert,
} from "lucide-react";
import AnimateOnceBox from "../../../../components/common/AnimatedBox";
import { Button } from "@mui/material";
import PreviewSlider from "../../../../components/common/PreviewSlider.jsx";
import { Skeleton, Tooltip } from "antd";
import { Skeleton as MuiSkeleton } from "@mui/material";
import { amenitiesIcons } from "../../../components/common/AmentiesIcon";
import { LazyImage } from "../../../components/common/LazyImage";
import {
  bookedRoomData,
  MyCartRoomData,
  RecentlyViewRoomData,
} from "./SampleBookingData.js";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import numeral from "numeral";
import BookingCardSkeleton from "../../../components/common/AntSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DrawerComponent from "./DrawerComponent.jsx";

dayjs.extend(relativeTime);
const PaymentComponent = () => {
  const [activeTab, setActiveTab] = useState("Booked");
  const tabs = ["Booked", "My cart"];
  const [selectedImage, setSelectedImage] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [myCartData, setMyCartData] = useState([]);
  const [recentlyViewData, setRecentlyViewData] =
    useState(RecentlyViewRoomData);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const handleTabClick = (tab) => setActiveTab(tab);

  const handleShowQr = (id) => {
    setBookingData((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, hideQr: !room.hideQr } : room
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBookingData(bookedRoomData);
      setMyCartData(MyCartRoomData);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const handleLike = (id) => {
    setRecentlyViewData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              totalLiked: item.liked
                ? item.totalLiked - 1
                : item.totalLiked + 1,
            }
          : item
      )
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Booked":
        return (
          <div className="flex-wrap flex gap-3">
            {/* Looping Data */}
            {loading
              ? Array.from({ length: bookedRoomData.length }).map((_, i) => (
                  <BookingCardSkeleton key={i} />
                ))
              : bookingData.map((item) => (
                  <AnimateOnceBox key={item.id}>
                    <motion.div
                      whileHover={{
                        y: -5,
                      }}
                      className="w-full group transition-all duration-300  border  shadow-sm relative grid gap-3 p-2 grid-flow-col grid-cols-3  rounded "
                    >
                      <div className="relative h-full place-content-center">
                        <PreviewSlider
                          setPreview={setSelectedImage}
                          arrayImg={item.image}
                          imageClassName="h-[38vh]"
                        />
                        <span
                          className={`${
                            item.paymentStatus == "paid"
                              ? "bg-green-500/70"
                              : item.paymentStatus == "unpaid"
                              ? "bg-blue-500/70"
                              : item.paymentStatus == "pending"
                              ? "bg-yellow-400/70"
                              : "bg-red-400/80"
                          } absolute lowercase select-none right-2 top-2  py-[3px] text-white  rounded px-2 `}
                        >
                          {item.paymentStatus}
                        </span>
                      </div>
                      <motion.div
                        style={{
                          transition: "transform 0.5s ease",
                        }}
                        className="relative col-span-2 rounded p-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm font-bold text-gray-900/60 mb-2">
                              {item.description}
                            </p>
                          </div>
                          {/* QR-Display */}
                          {item.paymentStatus !== "pending" &&
                            item.paymentStatus !== "expired" && (
                              <div className="text-right flex-wrap justify-center items-center flex w-24 right-0 absolute">
                                <Tooltip
                                  title={`${
                                    !item.hideQr
                                      ? "scan me for checking-in"
                                      : ""
                                  }`}
                                >
                                  <AntDisplayImage
                                    src={item.qr.thumbnail}
                                    className={`${
                                      !item.hideQr ? "" : "blur"
                                    } cursor-pointer  aspect-square w-full`}
                                  />
                                </Tooltip>
                                {item.hideQr && (
                                  <Tooltip
                                    title={
                                      item.paymentStatus === "paid" ? (
                                        <small>
                                          Show this QR to our staff for Check-In
                                        </small>
                                      ) : (
                                        <small>
                                          Scan this QR-code for making payment.
                                        </small>
                                      )
                                    }
                                  >
                                    <Button
                                      onClick={() => handleShowQr(item.id)}
                                      className="!bg-inherit !border-gray-700/20 !relative !px-3 !py-[2px] !mt-4 !text-xs  !text-gray-700 !normal-case "
                                      sx={{
                                        minWidth: 0,
                                        border: "1px solid",
                                        gap: "10px",
                                        padding: 0,
                                      }}
                                    >
                                      <span className="flex items-center">
                                        Show/
                                        <svg
                                          className="w-5 h-5 text-gray-700"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                          />
                                        </svg>
                                      </span>
                                    </Button>
                                  </Tooltip>
                                )}
                                {!item.hideQr && (
                                  <Button
                                    onClick={() => handleShowQr(item.id)}
                                    className="!bg-inherit !border-gray-700/20 !relative !px-3 !py-[2px] !mt-2 !text-xs  !text-gray-700 !normal-case "
                                    sx={{
                                      minWidth: 0,
                                      border: "1px solid",
                                      gap: "10px",
                                      padding: 0,
                                    }}
                                  >
                                    <span className="flex items-center">
                                      Hide/
                                      <svg
                                        className="w-5 h-5 text-gray-700"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                        />
                                        <path
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                      </svg>
                                    </span>
                                  </Button>
                                )}
                              </div>
                            )}
                          {item.paymentStatus === "pending" && (
                            <div className="space-x-2  top-3 right-3 absolute">
                              <lord-icon
                                src="https://cdn.lordicon.com/twpfmtiv.json"
                                trigger="loop"
                                delay="1000"
                                stroke="bold"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                              ></lord-icon>
                            </div>
                          )}
                          {item.paymentStatus === "expired" && (
                            <div className="space-x-2 flex flex-col items-center  top-3 text-white right-3 absolute">
                              <CircleAlert size={45} fill="#f98080" />
                              <span className="text-xs text-gray-700">
                                Payment expired
                              </span>
                            </div>
                          )}
                        </div>
                        <div className=" flex flex-wrap gap-2">
                          {item.amenities.map((amenity, index) => (
                            <div
                              key={amenity}
                              className="flex items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                            >
                              {amenitiesIcons[amenity]}
                              <span className="ml-1 capitalize">{amenity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-gray-600 mb-2 gap-2 flex items-center mt-2 cursor-pointer hover:text-blue-400 transition-all delay-75">
                          <MapPin className="h-4 w-4 mr-1" /> {item.location}
                        </div>
                        <div className="flex-wrap items-center flex gap-2">
                          <Hotel
                            className="h-5 w-5 mr-1"
                            color="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                          />
                          <span className=" rounded-md text-xs text-white bg-green-400 p-1 capitalize">
                            {item.hotelName}
                          </span>
                        </div>
                        <div className="mt-2  flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <p>{item.roomType}</p>
                            <p>Sleeps {item.opacity}</p>
                          </div>
                        </div>

                        {item.paymentStatus == "paid" && (
                          <div className="space-x-2  bottom-3 right-3 absolute">
                            <Button
                              disabled={true}
                              className=" !bg-green-500/50 !text-xs !border-gray-400/10 !text-white !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "1px solid",
                                width: "100px",
                                height: "35px",
                                padding: 0,
                              }}
                            >
                              <TicketCheck size={20} />
                              <span>${numeral(item.price).format("0.0a")}</span>
                            </Button>
                          </div>
                        )}
                        {item.paymentStatus === "unpaid" && (
                          <div className="space-x-2  bottom-3 right-3 absolute">
                            <Button
                              className=" !bg-inherit !text-xs !border-red-400/50 !text-red-500 !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "1px solid",
                                width: "100px",
                                height: "35px",
                                padding: 0,
                              }}
                            >
                              <Trash size={17} />
                              <span>Delete</span>
                            </Button>
                            <Button
                              className=" !text-xs !bg-green-500 !text-white !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "1px solid",
                                width: "100px",
                                height: "35px",
                                padding: 0,
                              }}
                            >
                              <DollarSign size={17} />
                              <span>Pay now</span>
                            </Button>
                          </div>
                        )}
                        {item.paymentStatus === "pending" && (
                          <div className="space-x-2  bottom-3 right-3 absolute">
                            <Button
                              disabled={true}
                              className=" !bg-yellow-500/50  !text-xs !border-gray-400/10 !text-white !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "2px solid",
                                width: "90px",
                                height: "35px",
                                padding: 0,
                              }}
                            >
                              <span>Pending...</span>
                            </Button>
                          </div>
                        )}
                        {item.paymentStatus === "expired" && (
                          <div className="space-x-2  bottom-3 right-3 absolute">
                            <Button
                              className="   !text-xs !text-red-500 !border-red-500/80 !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "1px solid",
                                width: "100px",
                                height: "35px",
                                padding: 0,
                              }}
                            >
                              <Trash size={17} />
                              <span>Delete</span>
                            </Button>
                          </div>
                        )}
                      </motion.div>
                      <span
                        className="absolute
                      -left-[1px]
                      bottom-1/2
                      h-7
                      w-[5px]
                      group-hover:w-[5px]
                      bg-[rgb(255,165,31)] 
                      transition-all
                      duration-500
                      rounded-t
                      -translate-x-1/2
                      group-hover:h-10
                      group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                      origin-bottom"
                      ></span>
                      <span
                        className="
                      absolute
                      -left-[1px]
                      top-1/2
                      h-7
                      w-[5px]
                      group-hover:w-[5px]
                      bg-[rgb(255,165,31)]  // Same exact blue
                      rounded-b
                      transition-all
                      duration-500
                      -translate-x-1/2
                      group-hover:h-10
                      group-hover:bg-[rgb(230,226,37)]  // Same hover color
                      origin-top
                    "
                      ></span>
                    </motion.div>
                  </AnimateOnceBox>
                ))}

            {/* Pop-up image display hug QR */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  {/* Modal content with better image fitting */}
                  <motion.div
                    layoutId={`image-${selectedImage.id}`}
                    className="flex flex-col items-center justify-center max-w-[95vw] max-h-[95vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full h-full flex justify-center">
                      <LazyImage
                        src={selectedImage.fullSize}
                        alt={selectedImage.title}
                        className="overflow-hidden rounded-lg"
                        imageClassName="min-w-[30vw] rounded-md min-h-[30vh] max-h-[90vh] object-cover bg-no-repeat"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "min(100%, 100vw)",
                          maxHeight: "min(100%, 100vh)",
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      case "My cart":
        return (
          <div className="flex-wrap flex gap-3">
            {/* Looping Data */}
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <BookingCardSkeleton key={i} />
                ))
              : myCartData.map((item) => (
                  <AnimateOnceBox key={item.id}>
                    <motion.div
                      whileHover={{
                        y: -5,
                      }}
                      className="w-full  group transition-all duration-300  border  shadow-sm relative grid gap-3 p-2 grid-flow-col grid-cols-3  rounded "
                    >
                      <div className="relative h-full place-content-center">
                        <PreviewSlider
                          setPreview={setSelectedImage}
                          arrayImg={item.image}
                          imageClassName="h-[38vh]"
                        />
                        <span
                          className={`text-red-500 duration-300 transition-all  hover:scale-105 absolute lowercase select-none right-2 top-2  py-[3px]   rounded px-2 `}
                        >
                          <Heart
                            className="transition-all cursor-pointer duration-300 "
                            fill={"rgb(240 82 82 / var(--tw-text-opacity, 1))"}
                          />
                          14.5K
                        </span>
                      </div>
                      <motion.div
                        style={{
                          transition: "transform 0.5s ease",
                        }}
                        className="relative col-span-2 rounded p-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm font-bold text-gray-900/60 mb-2">
                              {item.description}
                            </p>
                          </div>
                          {/* QR-Display */}
                          <div className="text-right flex-wrap justify-center items-center flex w-24 right-0 absolute">
                            <h5 className="font-normal">
                              <Tooltip title={item.price}>
                                <span className="font-bold text-base text-green-500">
                                  ${numeral(item.price).format("0.0a")}
                                </span>
                              </Tooltip>
                              /night
                            </h5>
                          </div>
                        </div>

                        <div className=" flex flex-wrap gap-2">
                          {item.amenities.map((amenity, index) => (
                            <div
                              key={amenity}
                              className="flex items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                            >
                              {amenitiesIcons[amenity]}
                              <span className="ml-1 capitalize">{amenity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-gray-600 mb-2 gap-2 flex items-center mt-2 cursor-pointer hover:text-blue-400 transition-all delay-75">
                          <MapPin className="h-4 w-4 mr-1" /> {item.location}
                        </div>
                        <div className="flex-wrap items-center flex gap-2">
                          <Hotel className="h-5 w-5 mr-1" color="#10b981" />
                          <span className=" rounded-md text-xs text-white bg-emerald-500 p-1 capitalize">
                            {item.hotelName}
                          </span>
                        </div>
                        <div className="mt-2  flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <p>{item.roomType}</p>
                            <p>Sleeps {item.opacity}</p>
                          </div>
                        </div>

                        <div className="space-x-2 flex bottom-3 right-3 absolute">
                          <Button
                            className=" !bg-inherit !text-xs !border-red-400/50 !text-red-500 !normal-case"
                            sx={{
                              minWidth: 0,
                              gap: "10px",
                              border: "1px solid",
                              width: "100px",
                              height: "35px",
                              padding: 0,
                            }}
                          >
                            <Trash size={17} />
                            <span>Remove</span>
                          </Button>
                          <Button
                            className="  !text-xs !bg-blue-500 !text-white !normal-case"
                            sx={{
                              minWidth: 0,
                              gap: "10px",
                              border: "1px solid",
                              width: "100px",
                              height: "35px",
                              padding: 0,
                            }}
                          >
                            <TicketCheck size={17} />
                            <span>Booking</span>
                          </Button>
                        </div>
                      </motion.div>
                      <span
                        className="absolute
                      -left-[1px]
                      bottom-1/2
                      h-7
                      w-[5px]
                      group-hover:w-[5px]
                      bg-[rgb(255,165,31)] 
                      transition-all
                      duration-500
                      rounded-t
                      -translate-x-1/2
                      group-hover:h-10
                      group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                      origin-bottom"
                      ></span>
                      <span
                        className="
                      absolute
                      -left-[1px]
                      top-1/2
                      h-7
                      w-[5px]
                      group-hover:w-[5px]
                      bg-[rgb(255,165,31)]  // Same exact blue
                      rounded-b
                      transition-all
                      duration-500
                      -translate-x-1/2
                      group-hover:h-10
                      group-hover:bg-[rgb(230,226,37)]  // Same hover color
                      origin-top
                    "
                      ></span>
                    </motion.div>
                  </AnimateOnceBox>
                ))}
            {/* Pop-up image display hug QR */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  {/* Modal content with better image fitting */}
                  <motion.div
                    layoutId={`image-${selectedImage.id}`}
                    className="flex flex-col items-center justify-center max-w-[95vw] max-h-[95vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full h-full flex justify-center">
                      <LazyImage
                        src={selectedImage.fullSize}
                        alt={selectedImage.title}
                        className="overflow-hidden rounded-lg"
                        imageClassName="min-w-[30vw] rounded-md min-h-[30vh] max-h-[90vh] object-cover bg-no-repeat"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "min(100%, 100vw)",
                          maxHeight: "min(100%, 100vh)",
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const mainRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;

    const currentScrollY = mainRef.current.scrollTop;
    setScrollY(currentScrollY);
    setIsScroll(() => {
      if (currentScrollY > 50) return true;
      return false;
    });
    setIsScrollingDown(currentScrollY > lastScrollY.current);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 500);
  }, []);

  return (
    <div className="w-full py-24 px-4 overflow-hidden relative">
      {/* HEader */}

      <AnimateOnceBox>
        <div className="max-w-6xl mx-auto">
          {loadingPage ? (
            <div className="mb-5 flex justify-center">
              <Skeleton variant="text" width="45%" height={100} />
            </div>
          ) : (
            <div className="mb-5  flex justify-center">
              <h2 className=" text-gray-500 w-[50%] text-center text-4xl font-bold  ">
                <span className=" font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
                  Creating payment/
                </span>{" "}
                Complete Your Purchase
              </h2>
            </div>
          )}

          <div className=" w-full  border-blue-500/10   justify-end p-1 rounded-t-lg inline-flex">
            {/* Added subtle bg */}
            {tabs.map((tab, index) =>
              loadingPage ? (
                <div className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors">
                  {[...Array(1)].map((_, index) => (
                    <MuiSkeleton
                      key={index}
                      variant="rectangular"
                      width={70}
                      height={40}
                    />
                  ))}
                </div>
              ) : (
                <button
                  key={`${index}-${tab}`}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? "text-blue-500 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabBg" // Use consistent ID for all tabs
                      className="absolute inset-0 border-b-2 border-blue-500 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              )
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="mt-2  border-y shadow-[inset_0_20px_30px_-40px_rgba(0,0,0,0.35),inset_0_-20px_30px_-40px_rgba(0,0,0,0.35)]
 relative p-5 "
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimateOnceBox>

      {/* Label Header */}
      <motion.header
        initial={{
          opacity: 0,
          scaleX: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative place-items-center group my-10  col-span-5 px-10"
      >
        <div className="px-10 mb-1 text-center">
          <h4 className="text-sm font-medium uppercase tracking-wider text-green-500">
            Rooms You've Recently Explored
          </h4>
          <h2 className="text-3xl font-bold text-gray-800">
            Available rooms you recently viewed
          </h2>
          <motion.span
            transition={{
              duration: 0.7,
            }}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            className="text-gray-600 inline-block w-[70%]  text-base"
          >
            Take another look at the rooms you recently viewed. Whether you're
            still deciding or ready to book, your favorites are just a click
            away.
          </motion.span>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto  relative z-10">
        {/* Featured partner spotlight section */}
        <div
          className={`mb-24 transition-all  duration-1000 delay-300 opacity-100 translate-y-0`}
        >
          <div className="mb-5 grid grid-cols-2 ">
            <div className="col-span-1 text-start flex items-center">
              <a href="#" className="underline">
                Showing 10 recently view results
              </a>
            </div>
            <div className="col-span-1  flex  justify-end items-center gap-4">
              <label className="inline-flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Oldest Viewed
                </span>
                <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all  peer-checked:bg-green-300" />
              </label>
              <label className="inline-flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultValue=""
                  className="sr-only peer"
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Verified only
                </span>
                <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all  peer-checked:bg-green-300" />
              </label>
            </div>
          </div>
          {/* Looping Recently View Data */}
          <div className="mb-5  grid grid-cols-2 gap-2">
            {recentlyViewData
              .sort((b, a) =>
                dayjs(a.viewedAt).isBefore(dayjs(b.viewedAt)) ? -1 : 1
              )
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="col-span-2  border rounded-lg p-1 grid grid-cols-3"
                >
                  <div className="col-span-1 relative h-full place-content-center">
                    <PreviewSlider
                      className="h-full"
                      setPreview={setSelectedImage}
                      arrayImg={item.image}
                      imageClassName="h-[45vh]"
                    />
                    <span
                      className={`text-red-500 text-xs flex flex-wrap flex-col justify-center items-center duration-300 transition-all  hover:scale-105 absolute lowercase select-none right-2 top-2  py-[3px]   rounded px-2 `}
                    >
                      <Heart
                        onClick={() => handleLike(item.id)}
                        strokeWidth={1.5}
                        className="transition-all cursor-pointer duration-700 "
                        fill={
                          item.liked
                            ? "rgb(240 82 82 / var(--tw-text-opacity, 1))"
                            : "none"
                        }
                      />
                      {numeral(item.totalLiked).format(
                        item.totalLiked > 1000 ? "0.00a" : "0a"
                      )}
                    </span>
                    {/* <span
                      className={`text-red-500 text-xs flex flex-wrap flex-col justify-center items-center duration-300 transition-all  hover:scale-105 absolute lowercase select-none right-2 top-2  py-[3px]   rounded px-2 `}
                    >
                      
                      <Heart
                        onClick={()=>handleLike(item.id)}
                        strokeWidth={1.5}
                        className="transition-all cursor-pointer duration-300 "
                        fill={item.liked?"rgb(240 82 82 / var(--tw-text-opacity, 1))":"none"}
                      />
                      {numeral(item.totalLiked).format(item.totalLiked>1000?"0.00a":'0a')}
                    </span> */}
                  </div>
                  <div className="col-span-2 place-content-center py-2 px-5 ">
                    <div className="w-full grid grid-cols-2 text-xs ">
                      <div className="col-span-1 flex items-center justify-start">
                        <Clock
                          color="white"
                          size={20}
                          fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                        />
                        <span className="font-bold text-green-400">
                          View in {dayjs().to(dayjs(item.viewedAt))}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center justify-end">
                        <div className="col-span-1  flex items-center justify-start">
                          <Star
                            size={20}
                            color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                            fill="rgb(227 160 8 / var(--tw-bg-opacity, 1)) "
                          />
                          <span className="font-bold">
                            {item.rating}({item.numberRater})
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-500 text-balance flex gap-2">
                      {item.location}~
                    </p>

                    <div className="w-full my-3 grid grid-cols-4 grid-flow-row gap-2">
                      <div className=" flex flex-wrap items-center gap-2 col-span-4">
                        {item.amenities.map((amenity, index) => (
                          <div
                            key={amenity}
                            className="flex items-center h-fit text-sm text-gray-700 bg-slate-100 px-2 py-1 rounded"
                          >
                            {amenitiesIcons[amenity]}
                            <span className="ml-1 capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-green-400 gap-1 font-bold flex items-center">
                      {" "}
                      <Hotel size={20} />
                      <p className="text-white bg-green-400 text-xs px-1 py-[2px] rounded">
                        {item.hotel}
                      </p>
                    </span>

                    <span className=" text-gray-700 gap-1 mt-2 flex items-center">
                      {" "}
                      {item.roomSize}
                    </span>
                    <span className=" text-gray-700 gap-1 mt-2 flex items-center">
                      {" "}
                      Sleeps {item.opacity}
                    </span>
                    <div className="w-full font-bold flex items-center justify-between">
                      <h5 className="">
                        <span className="font-bold text-green-500 text-xl">
                          ${numeral(item.price).format("0.00a")}
                        </span>
                        /per night.
                      </h5>
                      <div className="flex justify-end gap-3 ">
                        <DrawerComponent handleLike={handleLike} item={item} />
                        <Button
                          className=" !bg-blue-500 !border-blue-500 !text-xs !border-gray-400/10 !text-white !normal-case k"
                          sx={{
                            minWidth: 0,
                            gap: "10px",
                            border: "2px solid",
                            width: "100px",
                            height: "38px",
                            padding: 0,
                          }}
                        >
                          <Ticket size={20} />
                          <span>Booking</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Load more results */}
          <div className=" w-full h-[10vh]  border-b  flex items-center justify-center">
            <Button
              className="!bg-gray-700 hover:!opacity-85 group !border-gray-700/20 !relative !px-3 !py-[10px] !text-xs !text-white !normal-case"
              sx={{
                minWidth: 0,
                border: "1px solid",
                borderRadius: 0,
                gap: "10px",
              }}
            >
              <span className="flex items-center">Load more results</span>
              <span className="group-focus:rotate-[6rad]   transition-all duration-200 flex items-center">
                {amenitiesIcons["loader"]}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {isScroll && (
        <Button
          onClick={scrollToTarget}
          sx={{
            border: "1px solid rgb(49 196 141)",
            minWidth: 0, // Removes MUI's default min-width
            width: 55, // 40px (10 = 2.5rem, adjust as needed)
            height: 55, // 40px
            padding: 0, // Removes internal padding
            borderRadius: 100, // Optional: removes rounded corners
          }}
          className="text-green-500 !bottom-5 !right-5 !fixed !bg-green-500/20 hover:!bg-green-500/30 normal-case"
        >
          <ChevronUp className="text-green-500" size={25} />
        </Button>
      )}
    </div>
  );
};

export default PaymentComponent;
