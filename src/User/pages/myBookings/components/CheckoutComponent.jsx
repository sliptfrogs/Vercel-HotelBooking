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
  CheckCheck,
  ChevronRight,
  ChevronLeft,
  CircleCheck,
  ClockFading,
} from "lucide-react";
import AnimateOnceBox from "../../../../components/common/AnimatedBox";
import { Button } from "@mui/material";
import PreviewSlider from "../../../../components/common/PreviewSlider";
import { Card, Divider, Empty, Skeleton, Space, Tooltip } from "antd";
import { amenitiesIcons } from "../../../components/common/AmentiesIcon";
import {
  RecentlyViewRoomData,
} from "./SampleBookingData";
import numeral from "numeral";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DrawerComponent from "./DrawerMapComponent";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { decodeHash } from "../../../../Services/password/passwordGenerator.js";
import { ShoppingCartCheckout } from "@mui/icons-material";
import CheckoutFrmComponent from "./CheckoutFrmComponent";
import Stepper from "../../../components/common/Stepper";
import BookingCardSkeleton from "../../../components/common/AntSkeleton";
import CheckoutStep from "./CheckoutStep";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutConfirm from "./CheckoutConfirm";
import CheckoutSuccess from "./CheckoutSuccess";

dayjs.extend(relativeTime);
const MakeBookingComponent = () => {
  const [activeTabStep, setActiveTabStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [bookingSummary, setBookingSummary] = useState([]);
  const [giftCode, setGifCode] = useState({
    discountApply: false,
    subtotal: null,
    discount: null,
    serviceFee: null,
    shipping: null,
    tax: null,
    total: null,
    code: null,
    discountPercent: null,
    image: "",
  });
  const { bid } = useParams();
  const targetToTop = useRef(null);

  useEffect(() => {
    setBookingId(decodeHash(bid));
  }, [bid]);

  useEffect(() => {
    if (targetToTop.current) {
      targetToTop.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // or 'center', 'nearest'
      });
    }
    setLoading(true);
    setTimeout(() => {
      setBookingData(RecentlyViewRoomData);
      setLoading(false);
    }, 700);
  }, [activeTabStep]);

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
            {/* <Heart fill="#e74694" size={20} className="text-pink-500"/>
             */}
            <Link to={"/bookings"}>
              <lord-icon
                src="https://cdn.lordicon.com/pmawqxvu.json"
                trigger="loop"
                colors="primary:#e83a30,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30"
                style={{
                  width: 30,
                  height: 30,
                }}
              ></lord-icon>
            </Link>
            <div className="text-sm flex gap-2 items-center font-bold lowercase text-white">
              <span>cart added.</span>
              <span className="animate-ping text-white font-bold">+1</span>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-auto text-white hover:opacity-85"
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

  const steps = [
    {
      id: 1,
      title: "Review",
      status:
        activeTabStep === 1 ? "process" : activeTabStep > 1 ? "finish" : "wait",
      icon: (
        <svg
          className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Checkout",
      status:
        activeTabStep === 2 ? "process" : activeTabStep > 2 ? "finish" : "wait",
      icon: (
        <svg
          className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Payment",
      status:
        activeTabStep === 3 ? "process" : activeTabStep > 3 ? "finish" : "wait",
      icon: <DollarSign size={14} />,
    },
    {
      id: 4,
      title: "Confirm",
      status:
        activeTabStep === 4 ? "process" : activeTabStep > 4 ? "finish" : "wait",
      icon: <ClockFading size={14} />,
    },
  ];
  const tabRender = () => {
    switch (activeTabStep) {
      case 1: {
        return (
          <div className="mb-5 grid  grid-cols-1  gap-2">
            {bookingData
              .filter((element) => element.id == bookingId)
              .sort((b, a) =>
                dayjs(a.viewedAt).isBefore(dayjs(b.viewedAt)) ? -1 : 1
              )
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  className="col-span-1 transition-all duration-500 relative group border border-gray-500/20 rounded-lg p-2 grid grid-cols-1 lg:grid-cols-5"
                >
                  {/* Image section - full width on mobile, 2 cols on desktop */}
                  <div className="lg:col-span-2 overflow-hidden relative h-full place-content-center">
                    <PreviewSlider
                      className="lg:hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300"
                      setPreview={setSelectedImage}
                      arrayImg={item.image}
                      imageClassName="h-[40vh] lg:h-[55vh]"
                    />
                    <span
                      className={`text-red-500 text-xs flex flex-wrap flex-col justify-center items-center duration-300 transition-all hover:scale-105 absolute lowercase select-none right-2 top-2 py-[3px] rounded px-2`}
                    >
                      <Heart
                        onClick={() => handleLike(item.id)}
                        strokeWidth={1.5}
                        className="transition-all cursor-pointer duration-700"
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
                    <span className="absolute top-1/2 left-1/2 h-3 w-3 bg-white/50 animate-ping pointer-events-none rounded-full" />
                  </div>

                  {/* Content section - full width on mobile, 3 cols on desktop */}
                  <div className="lg:col-span-3 place-content-center py-2 px-2 lg:px-5">
                    {/* Verified and Rating row */}
                    <div className="w-full grid grid-cols-1 text-xs mb-2">
                      <div className="col-span-1 flex items-center justify-between">
                        <div className="col-span-1 flex items-center justify-start">
                          <Verified
                            color="white"
                            size={20}
                            fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                          />
                          <span className="font-bold text-xs text-green-400 ml-1">
                            Verified
                          </span>
                        </div>
                        <div className="col-span-1 gap-1 flex items-center justify-start">
                          <Star
                            size={20}
                            color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                            fill="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                          />
                          <span className="font-bold text-sm text-gray-700">
                            {item.rating}({item.numberRater})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title and description */}
                    <div className="pl-1 lg:pl-3 border-l-2">
                      <h3 className="text-lg lg:text-xl border-gray-300/50 font-bold">
                        {item.name}
                      </h3>
                      <p className="text-gray-700/70 text-balance line-clamp-2 text-sm lg:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Location info */}
                    <div className="mt-2 space-y-1">
                      <span className="text-gray-500 text-balance flex gap-2 items-center text-sm lg:text-base">
                        <MapPin color="#76a9fa" size={16} />
                        {item.location}~
                      </span>
                      <span className="text-green-400 gap-1 font-bold flex items-center text-sm lg:text-base">
                        <Map size={16} /> {item.distance} away.
                      </span>
                    </div>

                    {/* Amenities - adjusted for mobile */}
                    <div className="w-full my-2 lg:my-3">
                      <div className="flex flex-wrap items-center gap-1 lg:gap-2">
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

                    {/* Hotel and room info */}
                    <div className="mt-2 space-y-1 text-sm lg:text-base">
                      <span className="text-green-400 gap-1 font-bold flex items-center">
                        <Hotel size={16} />
                        <p className="text-white bg-green-400 text-xs px-1 py-[2px] rounded">
                          {item.hotel}
                        </p>
                      </span>
                      <span className="text-gray-700 gap-1 flex items-center">
                        {item.roomSize}
                      </span>
                      <span className="text-gray-700 gap-1 flex items-center">
                        Sleeps {item.opacity}
                      </span>
                    </div>

                    {/* Price and buttons */}
                    <div className="w-full font-bold flex items-center justify-between mt-3">
                      <h5 className="text-sm lg:text-base">
                        <span className="font-bold text-green-500 text-lg lg:text-xl">
                          ${numeral(item.price).format("0.00a")}
                        </span>
                        /per night
                      </h5>
                      <div className="flex justify-end gap-2 lg:gap-3">
                        <DrawerComponent
                          className={`${
                            loading
                              ? "!bg-opacity-40 !text-gray-400 !cursor-not-allowed"
                              : ""
                          }`}
                          handleLike={handleLike}
                          item={item}
                          nextPage={nextPageLoading}
                          getPropLoading={loading}
                        />
                        <Button
                          onClick={!loading && nextPageLoading}
                          className="!bg-blue-500 hover:!opacity-85 !text-xs !border-gray-400/10 !text-white !normal-case"
                          sx={{
                            minWidth: 0,
                            gap: "6px",
                            border: "1px solid",
                            width: "90px",
                            height: "30px",
                            padding: 0,
                            fontSize: "0.7rem",
                            "@media (min-width: 1024px)": {
                              width: "110px",
                              height: "38px",
                              gap: "10px",
                              fontSize: "0.75rem",
                            },
                          }}
                        >
                          {loading ? (
                            <span>Processing...</span>
                          ) : (
                            <>
                              <ShoppingCartCheckout fontSize="small" />
                              <span>Checkout</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative side elements */}
                  <span
                    className="absolute
                    hidden
                    lg:block
                    -left-[1px]
                    bottom-1/2
                    h-5 lg:h-7
                    w-[4px] lg:w-[5px]
                    group-hover:w-[4px] lg:group-hover:w-[5px]
                    bg-[rgb(255,165,31)] 
                    transition-all
                    duration-500
                    rounded-t
                    -translate-x-1/2
                    group-hover:h-8 lg:group-hover:h-10
                    group-hover:bg-[#e6e225]
                    origin-bottom"
                  ></span>
                  <span
                    className="absolute
                    hidden
                    lg:block
                    -left-[1px]
                    top-1/2
                    h-5 lg:h-7
                    w-[4px] lg:w-[5px]
                    group-hover:w-[4px] lg:group-hover:w-[5px]
                    bg-[rgb(255,165,31)]
                    rounded-b
                    transition-all
                    duration-500
                    -translate-x-1/2
                    group-hover:h-8 lg:group-hover:h-10
                    group-hover:bg-[rgb(230,226,37)]
                    origin-top"
                  ></span>
                </motion.div>
              ))}
          </div>
        );
      }
      case 2: {
        return (
          <CheckoutStep
            handlePrev={() => setActiveTabStep((item) => item - 1)}
            handleNext={() => setActiveTabStep((item) => item + 1)}
            activeTab={activeTabStep}
            cartItems={bookingSummary}
            handleCartItems={setBookingData}
            hanleGiftDiscount={setGifCode}
            gift={giftCode}
          />
        );
      }
      case 3: {
        return (
          <CheckoutPayment
            handlePrev={() => setActiveTabStep((item) => item - 1)}
            handleNext={() => setActiveTabStep((item) => item + 1)}
            cartItems={bookingSummary}
            handleCartItems={setBookingData}
            gift={giftCode}
          />
        );
      }
      case 4: {
        return (
          <CheckoutConfirm
            handleFinish={() => setActiveTabStep((item) => item + 1)}
          />
        );
      }
      case 5:{
        return (
          <CheckoutSuccess />
        )
      }
    }
  };

  const nextPageLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTabStep((item) => item + 1);
    }, 1000);
  };

  useEffect(() => {
    setBookingSummary([
      {
        id: 1,
        name: "Deluxe Room",
        description: "King bed, ocean view",
        price: 299,
        quantity: 2,
        isDiscount: false,
        discountPrice: null,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 2,
        name: "Breakfast Buffet",
        description: "Daily breakfast for two",
        price: 49,
        quantity: 1,
        isDiscount: false,
        discountPrice: null,
        image:
          "https://wallpaperswide.com/download/hotel_room_2-wallpaper-3840x2400.jpg",
      },
    ]);
    setTimeout(() => {
      setLoadingPage(false);
    }, 500);
  }, []);

  return loadingPage ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto ">
      {/* Customer Information Skeleton */}
      <Card
        title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
        style={{ marginBottom: 24 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Skeleton.Input
            active
            block
            style={{ height: 40, marginBottom: 16 }}
          />
          <Skeleton.Input
            active
            block
            style={{ height: 40, marginBottom: 16 }}
          />
          <Skeleton.Input active block style={{ height: 40 }} />
        </Space>
      </Card>

      {/* Booking Summary Skeleton */}
      <Card
        title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
      >
        <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
          <Skeleton.Input active size="small" style={{ width: 120 }} />
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
          <Skeleton.Input active size="small" style={{ width: 80 }} />
          <Skeleton.Input active size="small" style={{ width: 70 }} />
        </Space>

        <Divider style={{ margin: "12px 0" }} />

        <Space direction="vertical" style={{ width: "100%" }}>
          <Skeleton.Input active size="small" style={{ width: 120 }} />
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
          <Skeleton.Input active size="small" style={{ width: 80 }} />
          <Skeleton.Input active size="small" style={{ width: 70 }} />
        </Space>
      </Card>
    </div>
  ) : (
    <div
      ref={targetToTop}
      className="w-full  pt-20 px-4 overflow-hidden relative"
    >
      <div>
        <AnimateOnceBox>
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
                        <svg
                          className="w-12 h-12 text-purple-500"
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
                            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                          />
                        </svg>
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
                          Checkout/
                        </span>{" "}
                        Complete Your Purchase
                      </h1>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stepper */}
          {activeTabStep >= 1  && (
            <div className="col-span-2  divide-x px-2  grid grid-cols-2">
              {/* Shipping Information */}
              <div className="col-span-2 flex justify-center p-7">
                <Stepper items={steps} />
              </div>
            </div>
          )}
        </AnimateOnceBox>

        <div className="max-w-6xl mx-auto  relative z-10">
          {/* Featured partner spotlight section */}
          <div
            className={`mb-24 transition-all  duration-1000 delay-300 opacity-100 translate-y-0`}
          >
            <div className="flex gap-2 justify-start mb-2">
              {activeTabStep === 1 && (
                <Link to={"/bookings"}>
                  <button
                    onClick={() => setActiveTabStep((prev) => prev - 1)}
                    className="flex  items-center gap-1 !bg-inherit  !text-sm  !text-gray-700 !normal-case"
                  >
                    <ChevronLeft size={25} />
                    <span>Back to Cart</span>
                  </button>
                </Link>
              )}
            </div>
            {/* Looping Recently View Data */}
            {tabRender()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeBookingComponent;
