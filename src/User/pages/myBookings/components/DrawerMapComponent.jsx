import React from "react";
import { Button, Drawer, Space } from "antd";
import { Button as MuiButton } from "@mui/material";
import {
  Clock,
  Expand,
  Heart,
  Hotel,
  Star,
  X,
  ArrowDown,
  Map,
  ChevronDown,
  DollarSign,
  Ticket,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import numeral from "numeral";
import { amenitiesIcons } from "../../../../User/components/common/AmentiesIcon";
import dayjs from "dayjs";
import PreviewSlider from "../../../../components/common/PreviewSlider";
import LazyMap from "../../../components/common/LazyMap";
import { Link } from "react-router-dom";
import { ShoppingCartCheckout } from "@mui/icons-material";

const DrawerMap = ({ item = {}, handleLike, className = "",nextPage,getPropLoading=false }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <MuiButton
        onClick={showLoading}
        className={`${className} !bg-inherit !text-xs !border-gray-400/50 !text-blue-500 !normal-case`}
        sx={{
          minWidth: 0,
          gap: "6px",
          border: "1px solid",
          width: "90px",
          height: "32px",
          padding: 0,
          "@media (min-width: 1024px)": {
            width: "100px",
            height: "38px",
            gap: "10px",
          },
        }}
      >
        <Map size={16} className="lg:size-5" />
        <span>Open Map</span>
      </MuiButton>

      <Drawer
        bodyStyle={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
          overflowY: "auto",
        }}
        closable={false}
        destroyOnClose
        title={
          <div className="text-sm lg:text-base">
            Hotel:{" "}
            <span className="text-green-500 font-bold">{item.hotel}</span>,
            Room: <span className="text-green-500 font-bold">{item.name}</span>
          </div>
        }
        placement="bottom"
        height="90vh"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        extra={
          <Space className="flex items-center">
            <MuiButton
              onClick={() => setOpen(false)}
              className="!bg-inherit !text-xs !border-red-400/50 !text-red-500 !normal-case"
              sx={{
                minWidth: 0,
                gap: "6px",
                border: "1px solid",
                width: "80px",
                height: "30px",
                padding: 0,
                "@media (min-width: 1024px)": {
                  width: "90px",
                  height: "35px",
                  gap: "10px",
                },
              }}
            >
              <X size={14} className="lg:size-[15px]" />
              <span>Close</span>
            </MuiButton>
            <Link to="https://www.google.com/maps/place/Angkor+Wat/@13.412469,103.866986,16z/data=!4m6!3m5!1s0x3110168aea9a272d:0x3eaba81157b0418d!8m2!3d13.4124693!4d103.8669857!16zL20vMDE5eGZs?hl=en&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D">
              <MuiButton
                className="!bg-blue-500 !text-xs !border-gray-400/10 !text-white !normal-case"
                sx={{
                  minWidth: 0,
                  gap: "6px",
                  border: "1px solid",
                  width: "100px",
                  height: "30px",
                  padding: 0,
                  "@media (min-width: 1024px)": {
                    width: "120px",
                    height: "35px",
                    gap: "10px",
                    border: "2px solid",
                  },
                }}
              >
                <Map size={14} className="lg:size-[15px]" />
                <span>Google map</span>
              </MuiButton>
            </Link>
          </Space>
        }
      >
        <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Room Info Card */}
          <motion.div
            key={item.id}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-1 relative h-fit border rounded-lg p-1 grid grid-cols-1 lg:grid-cols-3"
          >
            {/* Image Section */}
            <div className="lg:col-span-1 relative h-full place-content-center">
              <PreviewSlider
                className="h-full"
                arrayImg={item.image}
                imageClassName="h-[30vh] sm:h-[35vh] lg:h-[45vh]"
              />
              <span
                className={`text-red-500 text-xs flex flex-col justify-center items-center duration-300 transition-all hover:scale-105 absolute lowercase select-none right-2 top-2 py-[3px] rounded px-2`}
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
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 place-content-center py-2 px-3 lg:px-5">
              <div className="w-full grid grid-cols-2 text-xs mb-2">
                <div className="col-span-1 flex items-center justify-start">
                  <Clock
                    color="white"
                    size={16}
                    className="lg:size-5"
                    fill="rgb(49 196 141 / var(--tw-bg-opacity, 1))"
                  />
                  <span className="font-bold text-green-400 ml-1">
                    View in {dayjs().to(dayjs(item.viewedAt))}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="lg:size-5"
                      color="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                      fill="rgb(227 160 8 / var(--tw-bg-opacity, 1))"
                    />
                    <span className="font-bold ml-1">
                      {item.rating}({item.numberRater})
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg lg:text-xl font-bold">{item.name}</h3>
              <p className="text-gray-500 text-balance flex gap-2 items-center mt-1">
                <MapPin size={16} className="lg:size-5" />
                {item.location}~
              </p>

              {/* Amenities */}
              <div className="w-full my-2 lg:my-3">
                <div className="flex flex-wrap items-center gap-1 lg:gap-2">
                  {item?.amenities?.map((amenity, index) => (
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

              {/* Hotel and Room Info */}
              <div className="space-y-1 text-sm lg:text-base">
                <span className="text-green-400 gap-1 font-bold flex items-center">
                  <Hotel size={16} className="lg:size-5" />
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

              {/* Price and Booking */}
              <div className="w-full font-bold flex items-center justify-between mt-3">
                <h5 className="text-sm lg:text-base">
                  <span className="font-bold text-green-500 text-lg lg:text-xl">
                    ${numeral(item.price).format("0.00a")}
                  </span>
                  /per night
                </h5>
                <div className="flex justify-end">
                  <MuiButton
                    onClick={!getPropLoading && nextPage}
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
                    {getPropLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <ShoppingCartCheckout fontSize="small" />
                        <span>Checkout</span>
                      </>
                    )}
                  </MuiButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            key={item.id}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-1 min-h-[40vh] border rounded-lg p-1"
          >
            <LazyMap
              containerClassName="w-full"
              className="w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.9976164977274!2d103.86441077374005!3d13.412474505061937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110168aea9a272d:0x3eaba81157b0418d!2sAngkor%20Wat!5e0!3m2!1sen!2skh!4v1743744702998!5m2!1sen!2skh"
            />
          </motion.div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerMap;
