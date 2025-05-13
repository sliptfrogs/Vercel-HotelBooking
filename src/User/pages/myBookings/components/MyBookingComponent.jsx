import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Droplets,
  Tv,
  Utensils,
  Snowflake,
  Dumbbell,
  ChevronUp,
  Hotel,
  Heart,
  Text,
  Ticket,
  Check,
  Verified,
  Map,
  Pin,
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
  X,
  QrCode,
  Calendar,
  ShoppingCart,
  ClockFading,
  Search,
} from "lucide-react";
import AnimateOnceBox from "../../../../components/common/AnimatedBox";
import { Button } from "@mui/material";
import PreviewSlider from "../../../../User/components/common/PreviewSlider";
import { Empty, Skeleton, Tooltip } from "antd";
import { Skeleton as MuiSkeleton } from "@mui/material";
import { amenitiesIcons } from "../../../components/common/AmentiesIcon";
import { LazyImage } from "../../../components/common/LazyImage";
import MultipleSelect from "../../../../User/components/common/MultipleSelect";
import {
  bookedRoomData,
  MyCartRoomData,
  RecentlyViewRoomData,
} from "./SampleBookingData";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import numeral from "numeral";
import BookingCardSkeleton from "../../../components/common/AntSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DrawerComponent from "./DrawerMapComponent";
import { ConfirmModal } from "./Confirm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  decodeHash,
  hashParam,
} from "../../../../Services/password/passwordGenerator.js";
import AndDisplayQR from "../../../components/common/AndDisplayQR";
import AntBookingSkeleton from "../../../components/common/AntBookingSkeleton";

dayjs.extend(relativeTime);
const MyBookingComponent = () => {
  const [activeTab, setActiveTab] = useState("Booked");
  const tabs = ["Booked", "My cart"];
  const [selectedImage, setSelectedImage] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const handleShowQr = (id) => {
    setBookingData((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, hideQr: !room.hideQr } : room
      )
    );
  };

  useEffect(() => {
    setBookingData(RecentlyViewRoomData);
  }, []);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup function to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const handleLike = (id) => {
    const getLiked = bookingData.filter((item) => item.id == id);

    if (!getLiked[0].liked) {
      toast.custom(
        (t) => (
          <motion.div
            initial={{
              x: 100,
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }} // Ensures animation plays only once
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              bounce: 0.5,
              duration: 0.5,
            }}
            className="!bg-gray-800/50 border-r-4 border-green-400 flex items-center gap-2 !backdrop-blur-sm !backdrop: !text-white !text-xs !px-4 !py-1 rounded-l-lg !rounded-y-lg !shadow-lg "
          >
            <lord-icon
              src="https://cdn.lordicon.com/pmawqxvu.json"
              trigger="loop"
              colors="primary:#e83a30,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30"
              style={{
                width: 30,
                height: 30,
              }}
            ></lord-icon>
            <div className="text-sm flex gap-2 items-center font-bold lowercase text-white">
              <span>cart added.</span>
              <span className="animate-ping text-white font-bold">+1</span>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-auto text-white hover:text-red-500 hover:opacity-85"
            >
              <X />
            </button>
          </motion.div>
        ),
        {
          duration: 2000,
          position: "bottom-right",
        }
      );
    }
    setBookingData((prevData) =>
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
        return loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))
        ) : (
          <div className="flex-wrap flex p-2 gap-4">
            {/* Looping Data */}
            {bookingData
              .filter((element) => element.isCheckedout)
              .map((item) => (
                <AnimateOnceBox key={item.id}>
                  <motion.div
                    whileHover={{
                      y: -1,
                    }}
                    className="w-full p-2  lg:p-1 group  transition-all duration-300  border border-teal-500/10 shadow-lg relative grid lg:grid-flow-col gap-3 lg:grid-cols-3 rounded-xl  "
                  >
                    <div className="relative col-span-2 lg:col-span-1 h-full overflow-hidden  place-content-center">
                      <PreviewSlider
                        setPreview={setSelectedImage}
                        arrayImg={item.image}
                        className="hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300"
                        imageClassName="h-[30vh] xl:h-[47vh]"
                      />
                      <span
                        className={`${
                          item.paymentStatus == "paid"
                            ? "border-green-500   text-green-400"
                            : item.paymentStatus == "unpaid"
                            ? "border-blue-500 text-blue-500"
                            : item.paymentStatus == "pending"
                            ? "border-yellow-300 text-yellow-300"
                            : "border-red-400 text-red-400"
                        } absolute border lowercase select-none bg-white/20 backdrop-blur-sm left-2 top-2  py-[1px]   rounded px-2 `}
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
                          <div className="col-span-1 flex gap-1 items-center justify-start">
                            <Calendar
                              color="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                              size={20}
                            />
                            <span className="font-bold text-xs text-green-400">
                              Booking made in{" "}
                              {dayjs().to(dayjs(item.checkoutAt))}
                            </span>
                          </div>
                          <div className="w-[70%]  my-1">
                            <h3 className="text-xl lg:flex  gap-2 font-bold  text-gray-900">
                              {item.name}
                              <span className="bg-green-100 hidden  lg:flex items-center  text-green-700 text-sm font-medium px-2 py-1 rounded-full">
                                ${numeral(item.price).format("0.00a")}/night
                              </span>
                            </h3>
                            <p className="text-gray-700/70  text-balance line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {/* QR-Display */}
                        {item.paymentStatus !== "pending" &&
                          item.paymentStatus !== "expired" && (
                            <div className="text-right flex-wrap justify-center items-center flex w-24 right-0 absolute">
                              <Tooltip
                                title={`${
                                  !item.hideQr ? "scan me for checking-in" : ""
                                }`}
                              >
                                <AndDisplayQR
                                  className={`${
                                    !item.hideQr ? "" : "blur"
                                  } cursor-pointer mr-2 aspect-square w-full`}
                                  src={item.paymentUrl}
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
                                    className="!bg-inherit !outline-gray-700/20 !relative !px-3 !py-[2px] !mt-4 !text-xs  !text-gray-700 !normal-case "
                                    sx={{
                                      minWidth: 0,
                                      outline: "1px solid",
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
                                  className="!bg-inherit !outline-gray-700/20 !relative !px-3 !py-[2px] !mt-2 !text-xs  !text-gray-700 !normal-case "
                                  sx={{
                                    minWidth: 0,
                                    outline: "1px solid",
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

                      <div className="text-gray-600 mb-2 gap-2 flex items-center mt-2 cursor-pointer hover:text-blue-400 transition-all delay-75">
                        <MapPin className="h-4 w-4 mr-1" /> {item.location}
                      </div>
                      <div className="flex-wrap items-center flex gap-2">
                        <Hotel
                          className="h-5 w-5 mr-1"
                          color="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                        />
                        <span className=" rounded-md text-xs text-white bg-green-400 p-1 capitalize">
                          {item.hotel}
                        </span>
                      </div>
                      <div className="my-2 flex flex-wrap gap-2">
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

                      <div className="mt-2  flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p>{item.roomSize}</p>
                          <p>Sleeps {item.opacity}</p>
                        </div>
                      </div>
                      <div className="w-full  pt-4 lg:pt-0 border-t  lg:border-hidden grid place-content-center grid-flow-row place-items-center grid-cols-1 gap-2 lg:flex   lg:justify-end font-bold ">
                        {item.paymentStatus == "paid" && (
                          <div className="flex w-full  justify-end gap-3 ">
                            <Button
                              disabled={true}
                              className=" !bg-green-500/50 !w-full lg:!w-fit !px-2 !text-xs !border-gray-400/10 !text-white !normal-case"
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
                          <div className="col-span-1 w-full grid grid-cols-1 lg:flex justify-end gap-2 ">
                            <Button
                              className=" !bg-inherit !w-full !px-2 lg:!w-fit !text-xs !border-red-400/50 !text-red-500 !normal-case"
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
                              className="!w-full !px-2 lg:!w-fit !text-xs !bg-green-500 !text-white !normal-case"
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
                          <div className="flex w-full justify-end gap-3 ">
                            <Button
                              disabled={true}
                              className=" !bg-yellow-500/50 !w-full !px-2 lg:!w-fit !text-xs !border-gray-400/10 !text-white !normal-case"
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
                          <div className="flex justify-end gap-3 ">
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
                      </div>
                    </motion.div>
                    <span
                      className="absolute
                        hidden 
                        xl:block
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
                        hidden 
                        xl:block
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
        return loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))
        ) : (
          <div className="flex-wrap flex p-2 gap-4">
            {/* Looping Data */}
            {bookingData
              .filter((element) => element.liked)
              .map((item) => (
                <AnimateOnceBox key={item.id}>
                  {
                    <motion.div className="w-full p-2 lg:p-1 group transition-all duration-300  border border-teal-500/10 shadow-lg relative grid lg:grid-flow-col gap-3 lg:grid-cols-3 rounded ">
                      <div className="relative  col-span-2 lg:col-span-1 h-full overflow-hidden  place-content-center">
                        <PreviewSlider
                          setPreview={setSelectedImage}
                          arrayImg={item.image}
                          className="lg:hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300"
                          imageClassName="h-[30vh] xl:h-[43vh] lg:h-[43vh]"
                        />
                        {item.isCheckedout && (
                          <span
                            className={`${
                              item.paymentStatus == "paid"
                                ? "border-green-500   text-green-400"
                                : item.paymentStatus == "unpaid"
                                ? "border-blue-500 text-blue-500"
                                : item.paymentStatus == "pending"
                                ? "border-yellow-300 text-yellow-300"
                                : "border-red-400 text-red-400"
                            } absolute border lowercase select-none bg-white/20 backdrop-blur-sm left-2 top-2  py-[1px]   rounded px-2 `}
                          >
                            {item.paymentStatus}
                          </span>
                        )}
                      </div>
                      <motion.div
                        style={{
                          transition: "transform 0.5s ease",
                        }}
                        className="relative col-span-2 rounded p-3"
                      >
                        <div className="relative ">
                          <span
                            className="absolute
                            hidden 
                            lg:block
                        -left-[1px]
                        bottom-1/2
                        h-5
                        w-[3px]
                        bg-[rgb(255,165,31)] 
                        transition-all
                        duration-500
                        rounded-t
                        -translate-x-1/2
                        group-hover:h-7
                        group-hover:bg-[rgb(230,226,37)]  
                        origin-bottom"
                          ></span>
                          <span
                            className="
                            hidden 
                            lg:block
                        absolute
                        -left-[1px]
                        top-1/2
                        h-5
                        w-[3px]
                        bg-[rgb(255,165,31)]  // Same exact blue
                        rounded-b
                        transition-all
                        duration-500
                        -translate-x-1/2
                        group-hover:h-7
                        group-hover:bg-[rgb(230,226,37)]  // Same hover color
                        origin-top
                      "
                          ></span>
                          <div className="col-span-1  flex items-center justify-between">
                            <h3 className="text-xl  lg:pl-3 font-bold text-gray-900">
                              {item.name}
                            </h3>
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
                          <div className="flex justify-between items-start">
                            <p className="text-gray-700/70 w-[80%]  lg:pl-3  text-balance line-clamp-1">
                              {item.description}
                            </p>
                            {/* QR-Display */}
                          </div>
                        </div>

                        <div className="my-2 justify-center lg:justify-start flex flex-wrap gap-2">
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
                          <span className=" rounded-md text-xs text-green-500  p-1 capitalize">
                            {item.hotel}
                          </span>
                        </div>
                        <div className="mt-2  flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <p>{item.roomSize}</p>
                            <p>Sleeps {item.opacity}</p>
                          </div>
                        </div>
                        <div className="w-full   place-content-center grid-flow-row place-items-center gap-2 lg:flex   lg:justify-between font-bold ">
                          <h5 className="flex justify-center lg:justify-start flex-wrap">
                            <span className="font-bold text-green-500 text-xl">
                              ${numeral(item.price).format("0.00a")}
                            </span>
                            /per night.
                          </h5>
                          <div className="flex   flex-wrap w-full justify-end gap-3 ">
                            <Button
                              onClick={() =>
                                ConfirmModal.staticConfirm({
                                  title: (
                                    <div>
                                      Do you want to{" "}
                                      <span className="text-red-500">
                                        Remove
                                      </span>{" "}
                                      this liked room from cart?
                                    </div>
                                  ),
                                  description: (
                                    <span className="text-gray-500">
                                      This action will permanently room the room
                                      from your saved items, and you'll need to
                                      like it again if you change your mind.
                                    </span>
                                  ),
                                  action: () => handleLike(item.id),
                                  successText: "Room's removed from cart!",
                                })
                              }
                              className="lg:!w-fit lg:!px-3 !bg-inherit !w-full  !text-xs !border-red-400/50 !text-red-500 !normal-case"
                              sx={{
                                minWidth: 0,
                                gap: "10px",
                                border: "1px solid",
                                width: "100px",
                                height: "40px",
                                padding: 0,
                              }}
                            >
                              <Trash size={17} />
                              <span>Remove</span>
                            </Button>

                            {!item.isCheckedout && (
                              <Link
                                to={`/bookings/${hashParam(item.id)}`}
                                className="w-full lg:!w-fit"
                              >
                                <Button
                                  className="!w-full lg:!w-fit !px-3 !bg-blue-500 !text-xs !border-gray-400/50 !text-white !normal-case k"
                                  sx={{
                                    minWidth: 0,
                                    gap: "10px",
                                    border: "1px solid",
                                    width: "100px",
                                    height: "40px",
                                    padding: 0,
                                  }}
                                >
                                  <Ticket size={20} />
                                  <span>Booking</span>
                                </Button>
                              </Link>
                            )}

                            {item.isCheckedout && (
                              <>
                                {item.paymentStatus == "paid" && (
                                  <Button
                                    disabled={true}
                                    className="!w-full lg:!w-fit lg:!px-3 !bg-green-500/50 !text-xs !border-gray-400/10 !text-white !normal-case"
                                    sx={{
                                      minWidth: 0,
                                      gap: "10px",
                                      border: "1px solid",
                                      width: "100px",
                                      height: "40px",
                                      padding: 0,
                                    }}
                                  >
                                    <TicketCheck size={20} />
                                    <span>
                                      ${numeral(item.price).format("0.0a")}
                                    </span>
                                  </Button>
                                )}
                                {item.paymentStatus === "unpaid" && (
                                  <>
                                    <Button
                                      className="!w-full lg:!w-fit lg:!px-3 !bg-inherit !text-xs !border-red-400/50 !text-red-500 !normal-case"
                                      sx={{
                                        minWidth: 0,
                                        gap: "10px",
                                        border: "1px solid",
                                        width: "100px",
                                        height: "40px",
                                        padding: 0,
                                      }}
                                    >
                                      <Trash size={17} />
                                      <span>Delete</span>
                                    </Button>
                                    <Button
                                      className="!w-full lg:!w-fit lg:!px-3 !text-xs !bg-green-500 !text-white !normal-case"
                                      sx={{
                                        minWidth: 0,
                                        gap: "10px",
                                        border: "1px solid",
                                        width: "100px",
                                        height: "40px",
                                        padding: 0,
                                      }}
                                    >
                                      <DollarSign size={17} />
                                      <span>Pay now</span>
                                    </Button>
                                  </>
                                )}
                                {item.paymentStatus === "pending" && (
                                  <Button
                                    disabled={true}
                                    className="!w-full lg:!w-fit lg:!px-3 !bg-yellow-500/50  !text-xs !border-gray-400/10 !text-white !normal-case"
                                    sx={{
                                      minWidth: 0,
                                      gap: "10px",
                                      border: "2px solid",
                                      width: "90px",
                                      height: "40px",
                                      padding: 0,
                                    }}
                                  >
                                    <span>Pending...</span>
                                  </Button>
                                )}
                                {item.paymentStatus === "expired" && (
                                  <Button
                                    className=" !w-full lg:!w-fit lg:!px-3  !text-xs !text-red-500 !border-red-500/80 !normal-case"
                                    sx={{
                                      minWidth: 0,
                                      gap: "10px",
                                      border: "1px solid",
                                      width: "100px",
                                      height: "40px",
                                      padding: 0,
                                    }}
                                  >
                                    <Trash size={17} />
                                    <span>Delete</span>
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  }
                </AnimateOnceBox>
              ))}
            {isEmpty(bookingData.filter((element) => element.liked)) && (
              <div className="w-full  flex items-center justify-center  ">
                <Empty
                  description={
                    <span className="text-gray-400">Your cart is empty.</span>
                  }
                  className=" text-gray-300"
                />
              </div>
            )}
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

  return loadingPage ? (
    <AntBookingSkeleton />
  ) : (
    <div className="w-full py-24 px-4 overflow-hidden relative">
      {/* HEader */}
      <AnimateOnceBox>
        <div className="max-w-6xl mx-auto">
          {/* section Header */}
          <div className="max-w-6xl  mx-auto">
            <div className="relative w-full h-full z-10 grid grid-cols-1 grid-flow-col lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                className="relative lg:col-span-2 col-span-1  w-full z-10 h-full  rounded-2xl overflow-hidden "
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
                <div className="relative  z-10 h-full flex flex-col items-center justify-center p-5 xl:p-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-md"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 border border-purple-500/20 bg-purple-500/10 backdrop-blur-md rounded-full shadow-xl">
                        <Ticket className="w-9 h-9 text-purple-500" />
                      </div>
                    </div>
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-center relative z-10"
                    >
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
                        <span className="text-purple-500 font-extrabold">
                          Easy,
                        </span>{" "}
                        Secure Reservations
                      </h1>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className=" w-full  border-blue-500/10   justify-between p-1 rounded-t-lg inline-flex">
            <div className=" flex gap-2 items-center">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }} // Pulsing effect (scale from 1 to 1.5 and back)
                transition={{
                  duration: 2, // Time it takes to complete the cycle
                  ease: "easeInOut",
                  repeat: Infinity, // Repeat the animation infinitely
                  repeatType: "loop", // Makes the animation loop
                }}
                className="h-4 rounded-full aspect-square bg-gradient-to-r from-blue-500 to-purple-500 border"
              ></motion.div>
              <h2 className="text-lg font-semibold">{activeTab}</h2>
            </div>
            {/* Added subtle bg */}
            <motion.div className="flex">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative   px-4 py-2 text-[13px] rounded-lg ${
                    tab == activeTab ? "text-slate-50" : "text-slate-500"
                  } font-medium`}
                >
                  {tab === activeTab && (
                    <motion.button
                      layoutId={`booking-Tab`}
                      className="absolute  inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </motion.div>
          </div>

          <div
            className="mt-2  border-y shadow-[inset_0_20px_30px_-40px_rgba(0,0,0,0.35),inset_0_-20px_30px_-40px_rgba(0,0,0,0.35)]
 relative "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab} // ensure re-animation on tab change
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </AnimateOnceBox>

      {/* Header done responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center my-10"
      >
        <div className="text-xs sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
          <div class="flex items-center space-x-2">
            <ClockFading size={17} />
            <span className="font-medium">Just watched.</span>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Continue Exploring
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Keep exploring your favourite.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto  relative z-10">
        {/* Featured partner spotlight section */}
        <div
          className={`transition-all  duration-1000 delay-300 opacity-100 translate-y-0`}
        >
          
          {/* Looping Recently View Data */}
          <div className="mb-5 px-2 grid grid-cols-2 gap-3">
            {bookingData
              .sort((b, a) =>
                dayjs(a.viewedAt).isBefore(dayjs(b.viewedAt)) ? -1 : 1
              )
              .map((item, index) => (
                <AnimateOnceBox className="col-span-2 shadow-md bg-white/40 relative group border rounded-lg p-2 grid grid-cols-3">
                  <div className="col-span-3 mb-3 lg:mb-0 lg:col-span-1 overflow-hidden relative h-full place-content-center">
                    <PreviewSlider
                      className="lg:hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300"
                      setPreview={setSelectedImage}
                      arrayImg={item.image}
                      imageClassName="h-[25vh] xl:h-[40vh]"
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
                  </div>
                  <div className="col-span-3 backdrop-blur-sm lg:bg-inherit bg-gray-300/10 border-t lg:border-none lg:col-span-2  place-content-center py-2 px-5 ">
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

                    <div className="w-full  lg:border-none py-1 my-1 grid grid-cols-4 grid-flow-row gap-2">
                      <div className=" flex flex-wrap justify-center lg:justify-start items-center gap-2 col-span-4">
                        {item.amenities.map((amenity, index) => (
                          <div
                            key={amenity}
                            className="flex items-center h-fit text-xs lg:text-sm text-gray-700 bg-slate-100 px-2 py-1 rounded"
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

                    <span className=" text-gray-700 gap-1 mt-2 lg:mt-1 flex items-center">
                      {" "}
                      {item.roomSize}
                    </span>
                    <span className=" text-gray-700 gap-1 mt-2 lg:mt-0 flex items-center">
                      {" "}
                      Sleeps {item.opacity}
                    </span>
                    <div className="w-full place-content-center font-bold grid grid-cols-2">
                      <h5 className="col-span-2 flex items-end justify-start py-1 lg:col-span-1">
                        <span className="font-bold text-green-500 text-xl">
                          ${numeral(item.price).format("0.00a")}
                        </span>
                        /per night.
                      </h5>
                      <div className="flex flex-wrap lg:place-content-end pt-3 lg:pt-0 border-t lg:border-none items-center lg:col-span-1 justify-center gap-1 lg:gap-3 col-span-2">
                        <DrawerComponent
                          className="!w-full !h-[40px] lg:!w-fit !px-2"
                          handleLike={handleLike}
                          item={item}
                        />

                        <Link
                          to={`/bookings/${hashParam(item.id)}`}
                          className="w-full lg:w-fit"
                        >
                          <Button
                            className=" !bg-blue-500 !border-blue-500 !px-2 !w-full lg:!h-[37px] !text-xs  !text-white !normal-case"
                            sx={{
                              minWidth: 0,
                              gap: "10px",
                              border: "1px solid",
                              width: "100px",
                              height: "40px",
                              padding: 0,
                            }}
                          >
                            <Ticket size={20} />
                            <span>Booking</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <span
                    className="
                            hidden
                            lg:block
                        absolute
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
                        group-hover:bg-[rgb(230,226,37)] 
                        origin-bottom"
                  ></span>
                  <span
                    className="
                     hidden
                            lg:block
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
                </AnimateOnceBox>
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

export default MyBookingComponent;
