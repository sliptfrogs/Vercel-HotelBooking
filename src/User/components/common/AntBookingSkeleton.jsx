import React from "react";
import { Skeleton } from "@mui/material"; // Or use your own Tailwind-based skeleton styles
import { Skeleton as AntSkeleton } from "antd";
import BookingCardSkeleton from "./AntSkeleton";

const AntBookingSkeleton = () => {
  return (
    <div className="w-full py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24">
          <div className="mb-5 flex justify-center">
            <div className="text-center w-[70%]">
              <AntSkeleton paragraph active title />
            </div>
          </div>

          <div className="mb-5 grid ">
            <div className=" flex justify-end gap-4">
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={100}
                  height={35}
                />
              ))}
            </div>
          </div>
          <div className="grid  gap-7">
            {Array.from({ length: 4 }).map((_, i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntBookingSkeleton;
