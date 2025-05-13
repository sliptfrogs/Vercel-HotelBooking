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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import numeral from "numeral";
import { amenitiesIcons } from "../../../components/common/AmentiesIcon";
import dayjs from "dayjs";
import PreviewSlider from "../../../../components/common/PreviewSlider";
import LazyMap from "../../../components/common/LazyMap";
import { Link } from "react-router-dom";
const DrawerMap = ({ item = {}, handleLike }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <MuiButton
        onClick={showLoading}
        className=" !bg-inherit !text-xs !border-gray-400/50 !text-blue-500 !normal-case k"
        sx={{
          minWidth: 0,
          gap: "10px",
          border: "1px solid",
          width: "100px",
          height: "38px",
          padding: 0,
        }}
      >
        <Map size={20}/>
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
          <div className="">
            Hotel:{" "}
            <span className="text-green-500 font-bold"> {item.hotel}</span>,
            Room:<span className="text-green-500  font-bold"> {item.name}</span>
          </div>
        }
        placement="bottom"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <MuiButton
              onClick={() => setOpen(false)}
              className=" !bg-inherit !text-xs !border-red-400/50 !text-red-500 !normal-case k"
              sx={{
                minWidth: 0,
                gap: "10px",
                border: "1px solid",
                width: "90px",
                height: "35px",
                padding: 0,
              }}
            >
              <X size={15} />
              <span>Close</span>
            </MuiButton>
            <Link to="https://www.google.com/maps/place/Angkor+Wat/@13.412469,103.866986,16z/data=!4m6!3m5!1s0x3110168aea9a272d:0x3eaba81157b0418d!8m2!3d13.4124693!4d103.8669857!16zL20vMDE5eGZs?hl=en&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D">
              <MuiButton
                className=" !bg-blue-500 !text-xs !border-gray-400/10 !text-white !normal-case"
                sx={{
                  minWidth: 0,
                  gap: "10px",
                  border: "2px solid",
                  width: "120px",
                  height: "35px",
                  padding: 0,
                }}
              >
                <Map size={15} />
                <span>Google map</span>
              </MuiButton>
            </Link>
          </Space>
        }
      >
        <div className="mb-5  grid grid-cols-2 gap-2">
          <motion.div
            key={item.id}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="col-span-2 relative h-fit border rounded-lg p-1 grid grid-cols-3"
          >
            <div className="col-span-1 relative h-full place-content-center">
              <PreviewSlider
                className="h-full"
                // setPreview={setSelectedImage}
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
                  {item?.amenities?.map((amenity, index) => (
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
                  <MuiButton
                    className=" !bg-blue-500 !text-xs !border-gray-400/10 !text-white !normal-case"
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
                  </MuiButton>
                </div>
              </div>
            </div>
            <svg className="size-8 z-20 flex justify-center items-center text-purple-600 aspect-square rounded  absolute right-1/2 bottom-0 animate-bounce">
              <ChevronDown size={25} />
            </svg>
          </motion.div>
          <motion.div
            key={item.id}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="col-span-2 border rounded-lg overflow-hidden p-1 grid grid-cols-3"
          >
            <LazyMap
              containerClassName="w-screen"
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
