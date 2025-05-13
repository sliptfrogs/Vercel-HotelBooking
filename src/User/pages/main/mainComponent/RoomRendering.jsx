import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { amenitiesIcons } from "../../../store/hotelStore";
import PreviewSlider from "../../../../components/common/PreviewSlider";
import { Search, Ticket } from "lucide-react";
import { Button } from "@mui/material";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import { LazyImage } from "../../../components/common/LazyImage";
const RoomRendering = ({ room }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div
      key={room.id}
      className=" gap-2 group relative shadow p-3 rounded-xl w-full grid grid-flow-row lg:grid-flow-col grid-cols-4"
    >
      <div className="col-span-4 mb-3 lg:mb-0 lg:col-span-1 overflow-hidden relative h-full place-content-center">
        <LazyImage
          src={room.image}
          className="w-full h-[25vh] lg:h-[35vh] rounded object-cover transition-all duration-300"
        />
      </div>

      <motion.div
        style={{
          objectFit: "cover",
          transition: "transform 0.5s ease",
        }}
        className="col-span-4 p-3 lg:place-content-center bg-slate-50 rounded-lg "
      >
        <div className=" flex justify-between items-start">
          <div>
            <h4 className="font-bold text-gray-900">{room.type}</h4>
            <p className="text-sm text-gray-600 mt-1">{room.description}</p>
          </div>
          <div className="text-right absolute top-5 right-5">
            <p className=" text-green-500 lg:text-xl  font-extrabold">
              ${room.price}
              <span className="text-sm font-normal text-white lg:text-gray-500">
                {" "}
                / night
              </span>
            </p>
            <p className="text-xs text-white">+ taxes & fees</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center text-sm text-gray-700 bg-slate-200 px-2 py-1 rounded"
            >
              {amenitiesIcons[amenity]}
              <span className="ml-1 capitalize">{amenity}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>
              {room.size} • {room.beds}
            </p>
            <p>Sleeps {room.capacity}</p>
          </div>
        </div>
        <Link to={`/hotels`}>
          <Button
            className="!w-full !my-2 lg:!px-2 lg:!w-fit !bg-blue-500 !border-blue-500 lg:!h-[37px] !text-sm lg:!text-xs  !text-white !normal-case"
            sx={{
              minWidth: 0,
              gap: "10px",
              border: "1px solid",
              height: "45px",
              padding: 0,
            }}
          >
            <Ticket size={23} />
            <span>Booking Now</span>
          </Button>
        </Link>
      </motion.div>
      {/* Top line - grows upward */}
      <span
        className="
                    hidden
                    lg:block
                    absolute
                    left-0
                    bottom-1/2
                    h-5
                    w-[7px]
                    bg-[rgb(255,165,31)]  // Consistent blue
                    transition-all
                    duration-500
                    rounded-t
                    -translate-x-1/2
                    group-hover:h-8
                    group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                    origin-bottom
                  "
      ></span>
      {/* Bottom line - grows downward */}
      <span
        className="
        hidden
        lg:block
                    absolute
                    left-0
                    top-1/2
                    h-5
                    w-[7px]
                    bg-[rgb(255,165,31)]  // Same exact blue
                    rounded-b
                    transition-all
                    duration-500
                    -translate-x-1/2
                    group-hover:h-8
                    group-hover:bg-[rgb(230,226,37)]  // Same hover color
                    origin-top
                  "
      ></span>
    </div>
  );
};

export default RoomRendering;
