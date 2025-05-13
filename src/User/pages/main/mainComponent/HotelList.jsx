import React, { useMemo } from "react";
import HotelListCard from "./HotelListCard";
import { hotelsData } from "../../../store/hotelData";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HotelRoomCard = () => {
  // Memoize the hotel list rendering
  const hotelList = useMemo(
    () =>
      hotelsData.map((hotel) => <HotelListCard key={hotel.id} hotel={hotel} />),
    [hotelsData]
  );

  return (
    <div className="flex relative items-center flex-col md:flex-row gap-8">
      {/* Hotels List */}
      <div className="w-full">
        {hotelList} {/* Fixed: Removed incorrect component syntax */}
        <div className=" w-full   flex items-center justify-center">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="justify-center rounded px-2 bottom-0 lg:bottom-5  hover:text-gray-700/80 text-gray-700 cursor-pointer transform   flex items-center gap-2 text-center"
          >
            <ChevronDown className="w-5 h-5" />
            <span className="text-sm font-medium">See more</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HotelRoomCard);
