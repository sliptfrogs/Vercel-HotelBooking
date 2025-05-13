import React, { useCallback, useEffect, useRef, useState } from "react";
import FrmSearchRoom from "./mainComponent/FrmSearchRoom";
import HotelList from "./mainComponent/HotelList";
import "../../style/UserApp.css";
import SplitText from "../../components/common/SplitText";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import SortHotelCard from "./mainComponent/SortHotelCard";
import {
  BadgeCheck,
  CalendarSearch,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  ConciergeBell,
  Earth,
  Ellipsis,
  Eye,
  GalleryThumbnailsIcon,
  Globe,
  Heart,
  Hotel,
  Map,
  MapPin,
  MapPinHouse,
  ShoppingBag,
  Star,
  Ticket,
  Tv,
  User,
  Wifi,
  X,
} from "lucide-react";
import CarouselRenderBoxSlider from "../../../components/common/CarouselRenderBoxSlider";
import { Link } from "react-router-dom";
import {
  offeredDataStore,
  popularDestinationData,
} from "../../store/hotelData";
import { throttle } from "lodash-es";
import MarketplacePartners from "./mainComponent/Platform";
import { LazyImage } from "../../components/common/LazyImage";
import HotelBookingFooter from "./mainComponent/Footer";
import HotelPartners from "./mainComponent/Partner";
import AntHotelSkeleton from "../../components/common/AntHotelSkeleton";
import MaterialYouSlider from "./mainComponent/SliderSwiper";
import AnimateOnceBox from "../../../components/common/AnimatedBox";
import PreviewSlider from "../../../components/common/PreviewSlider";
import { RecentlyViewRoomData } from "../myBookings/components/SampleBookingData";
import dayjs from "dayjs";
import numeral from "numeral";
import { amenitiesIcons } from "../../components/common/AmentiesIcon";
import DrawerComponent from "./mainComponent/DrawerMapComponent";
import toast from "react-hot-toast";
import HotelServiceSupport from "./mainComponent/HotelServiceSupport";
import { hashParam } from "../../../Services/password/passwordGenerator.js";
import { LoadingOutlined } from "@ant-design/icons";
const MainHomePage = () => {
  const targetRefTop = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [offeredData, setOfferedData] = useState([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [loadIncrease, setLoadIncrease] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setOfferedData(
        RecentlyViewRoomData.filter(
          (item) => item.roomStatus === "Available" && item.isDiscount
        ).slice(0, loadIncrease)
      );
    }, 500);
  }, []);

  const handleLike = (id) => {
    const getLiked = offeredData.filter((item) => item.id == id);

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
    setOfferedData((prevData) =>
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

  // Load more data
  const handleSubmit = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setOfferedData(
        RecentlyViewRoomData.filter(
          (item) => item.roomStatus === "Available" && item.isDiscount
        ).slice(
          0,
          setLoadIncrease((prev) => prev + 4)
        )
      );
      setLoadMoreLoading(false);
    }, 1500);
  };

  return (
    <>
      {/*ref={mainRef}*/}
      {loading ? (
        <AntHotelSkeleton />
      ) : (
        <main className="w-full">
          <div ref={targetRefTop} className="content relative col-span-5 ">
            {/* Image display */}
            <div className="relative  col-span-5  h-[100vh] bg-[url('/home-page.jpg')] bg-center bg-no-repeat bg-cover">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-400/5 to-gray-700/40"></div>

              <div
                className="relative px-5 grid grid-flow-row  top-[50vh] left-1/2 z-20 rounded-md 
                    transform -translate-x-1/2 -translate-y-1/2"
              >
                {/* Form Checkin */}
                <div className="relative pt-5 z-10 h-full flex flex-wrap flex-col items-center justify-center  text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    className=""
                  >
                    {/* Test Display */}
                    <div className=" flex-col text-center font-extrabold px-4  text-blue-200 flex justify-center items-center">
                      <header className="">
                        <SplitText
                          Text="Find Your Perfect Stay."
                          className="text-3xl"
                        />
                        <SplitText
                          className="text-sm"
                          Text="Discover and book hotels with the best amenities"
                        />
                      </header>
                    </div>
                    <div className="flex-wrap">
                      <FrmSearchRoom className="bg-white/30 border-white/30 px-5" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Arrow  */}
              <div className="absolute bottom-0 lg:bottom-4 left-0 right-0 flex justify-center items-center">
                <div className="flex flex-col text-white items-center  px-4 py-2 ">
                  <span className="text-sm font-medium">Scroll for more</span>
                  <ChevronDown className="h-5 w-5 mt-1 animate-bounce" />
                </div>
              </div>
            </div>
            <div className="w-full px-4 overflow-hidden relative">
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
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  Discover Popular Stays — Swipe Your Way to the Perfect Spot
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Find family-friendly resorts, luxury getaways, beachfront
                  escapes, and more — just swipe to explore your perfect stay.
                </p>
              </motion.div>

              {/* Card Slider */}
              <div className=" col-span-5  my-3 ">
                <MaterialYouSlider />
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
                    <ConciergeBell size={17} />
                    <span className="font-medium">Our Services.</span>
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  Unmatched Comfort, Unforgettable Service.
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-wrap">
                  Escape to a place where unmatched comfort meets unforgettable
                  service — every detail designed to make your stay effortlessly
                  perfect.
                </p>
              </motion.div>

              {/* Services of hotel */}
              <div className="h-auto lg:h-[110vh] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 lg:grid-rows-4 gap-4 p-4 lg:px-20">
                {/* Large vertical card - Rooms (col-span-3 row-span-4) */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative h-64 md:h-80 lg:h-full md:col-span-2 lg:col-span-3 lg:row-span-4 rounded-3xl overflow-hidden cursor-pointer group"
                >
                  <Link to={`/destinations/?status=`}>
                    <img
                      srcSet="
          https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?cs=srgb&dl=pexels-jvdm-1457842.jpg&fm=jpg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop 400w,
          https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?cs=srgb&dl=pexels-jvdm-1457842.jpg&fm=jpg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop 800w,
          https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?cs=srgb&dl=pexels-jvdm-1457842.jpg&fm=jpg?auto=compress&cs=tinysrgb&w=1200&h=1800&fit=crop 1200w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                      loading="lazy"
                      alt="Hotel rooms"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div className="absolute inset-0 top-0 bg-black group-hover:bg-opacity-10 bg-opacity-30 flex items-end pb-6 md:pb-10 justify-center">
                      <span className="text-white relative text-2xl md:text-3xl font-mono">
                        Rooms
                      </span>
                    </motion.div>
                    <span className="absolute inset-0 m-auto hidden group-hover:flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  </Link>
                </motion.div>

                {/* Grid of smaller cards (col-span-3 row-span-2 each) */}

                <HotelServiceSupport />
              </div>

              {/* Header done responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center my-4 lg:my-5"
              >
                <div className="text-xs  sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
                  <div class="flex items-center space-x-2">
                    <Earth size={17} />
                    <span className="font-medium">Destination</span>
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  Destinations That Inspire
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-wrap">
                  Discover places where memories are made and stories begin.
                </p>
              </motion.div>

              {/* Button see more navigate to full page of Destinaion  */}
              <div className="text-center mt-4 lg:px-20 flex justify-end lg:mt-7">
                <button className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium group">
                  <span>See More</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Destination blog */}
              <div className="  col-span-5 lg:px-20">
                <div className="grid relative border-y py-6 my-2 grid-cols-2 md:grid-cols-4 gap-4">
                  {popularDestinationData.map((destination, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      key={destination.id}
                      className="relative  rounded-lg overflow-hidden h-24 cursor-pointer group"
                    >
                      <Link to={`/destinations/?status=${destination.name}`}>
                        <LazyImage
                          alt="Restaurant interior"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={destination.image}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {destination.name}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Special Offers blog */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center my-4 lg:my-7"
              >
                <div className="text-xs  sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
                  <div class="flex items-center space-x-2">
                    <BadgeCheck size={17} />
                    <span className="font-medium">Offered</span>
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  Exclusive Amenities
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-wrap">
                  DisFrom luxury comforts to thoughtful touches, enjoy perks
                  reserved just for you.
                </p>
              </motion.div>

              {/* see more offered blog navigate to full page of offered blog */}
              <div className="text-center mt-4 lg:px-20 flex justify-end lg:mt-7">
                <button className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium group">
                  <span>See More</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Offered-blog */}
              <div className="mb-5 mt-2 lg:px-20 grid grid-cols-2 gap-3">
                {offeredData.map((item, index) => (
                  <AnimateOnceBox className="col-span-2 shadow-md bg-white/40 relative group border rounded-lg p-2 grid grid-cols-3">
                    <div className="col-span-3 mb-3 lg:mb-0 lg:col-span-1 overflow-hidden relative h-full place-content-center">
                      <PreviewSlider
                        className="lg:hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300"
                        setPreview={setSelectedImage}
                        arrayImg={item.image}
                        imageClassName="h-[25vh] xl:h-[40vh]"
                      />
                      <span
                        className={` text-red-500 text-xs flex flex-wrap flex-col justify-center items-center duration-300 transition-all z-30 hover:scale-105 absolute lowercase select-none right-2 top-2  py-[3px]   rounded px-2 `}
                      >
                        <Heart
                          onClick={() => handleLike(item.id)}
                          strokeWidth={1.5}
                          className="transition-all  cursor-pointer duration-700 "
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

                      {/* Badges */}
                      <div className="absolute w-[70%]  flex flex-wrap gap-1 z-30 top-2 left-2 right-2">
                        <span className="text-xs py-1 px-2 rounded-full bg-green-500/20 border border-green-500 text-green-500 backdrop-blur-sm">
                          {item.roomStatus}
                        </span>
                        <span className="text-xs py-1 px-2 rounded-full bg-red-500/20 border border-red-500 text-red-500 backdrop-blur-sm">
                          {item.discount}% off
                        </span>
                        <span className="text-xs py-1 px-2 rounded-full bg-yellow-500/20 border border-yellow-400 text-yellow-400 backdrop-blur-sm">
                          Ends in 5 days
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 backdrop-blur-sm lg:bg-inherit bg-gray-300/10 border-t lg:border-none lg:col-span-2  place-content-center py-2 px-5 ">
                      <div className="relative lg:border-l">
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
                      <p className="text-gray-500 items-center text-balance flex gap-2">
                        <MapPin size={15} /> {item.location}~
                      </p>

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
                      <div className="w-full place-content-center font-bold grid grid-cols-2">
                        <h5 className="col-span-2 flex items-end justify-start py-1 lg:col-span-1">
                          <span className="font-bold line-through text-red-500 text-xl">
                            ${numeral(item.price).format("0.00a")}
                          </span>
                          <span className="font-bold  text-green-500 text-xl">
                            $
                            {numeral(
                              item.price - (item.price * item.discount) / 100
                            ).format("0.00a")}
                          </span>
                          /per night.
                        </h5>
                        <div className="flex flex-wrap lg:place-content-end pt-3 lg:pt-0 border-t lg:border-none items-center lg:col-span-1 justify-center gap-2 col-span-2">
                          <DrawerComponent
                            className="!w-full lg:!w-fit lg:!px-2"
                            handleLike={handleLike}
                            item={item}
                          />

                          <Link
                            to={`/bookings/${hashParam(item.id)}`}
                            className="w-full lg:w-fit"
                          >
                            <Button
                              className="!w-full !px-2 !bg-blue-500 !text-xs !border-gray-400/50 !text-white !normal-case k"
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

                          {/*                           
                          <Button
                            className="!w-full lg:!px-2 lg:!w-fit !bg-blue-500 !border-blue-500 lg:!h-[37px] !text-xs  !text-white !normal-case"
                            sx={{
                              minWidth: 0,
                              gap: "10px",
                              border: "1px solid",
                              height: "40px",
                              padding: 0,
                            }}
                          >
                            <Ticket size={20} />
                            <span>Booking</span>
                          </Button> */}
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

              {/* Load more Button of Offerred Blog */}
              <div className=" w-full   flex items-center justify-center">
                {loadMoreLoading ? (
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

              {/* Hotel blog */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center  my-2 lg:my-5"
              >
                <div className="text-xs  sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block  mb-1">
                  <div class="flex items-center space-x-2">
                    <Hotel size={17} />
                    <span className="font-medium">Hotels</span>
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  Exclusive Amenities
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-wrap">
                  DisFrom luxury comforts to thoughtful touches, enjoy perks
                  reserved just for you.
                </p>
              </motion.div>

              {/* Button see more navigate to full page of HOtel  */}
              <div className="text-center mt-4 lg:px-20 flex justify-end lg:mt-7">
                <button className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium group">
                  <span>See More</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Hotel Rendering blog */}
              <motion.div className="content  relative  lg:px-20 col-span-5 ">
                <HotelList />
              </motion.div>

              {/* Platform Display */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                viewport={{ once: true }}
                className="content relative lg:px-20 col-span-5 "
              >
                <MarketplacePartners />
              </motion.div>

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
                    <ConciergeBell size={17} />
                    <span className="font-medium">Our Services.</span>
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-purple-500">Why</span> Choose us
                </h2>
                <p className="text-gray-500 lg:text-base max-w-2xl mx-auto text-wrap">
                  At Bookie Booking, we go beyond reservations — we partner with
                  top services to elevate every guest’s stay.
                </p>
              </motion.div>

              {/* Blog Icon Service */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                viewport={{ once: true }}
                className="content lg:px-20 relative mt-5  col-span-5 "
              >
                <HotelPartners />
              </motion.div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default MainHomePage;
