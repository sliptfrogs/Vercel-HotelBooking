import React from "react";
import { Skeleton, Button, Tag } from "antd";

const BookingCardSkeleton = () => {
  return (
    <div className="w-full group transition-all duration-300  border  shadow-sm relative grid gap-3 p-2 grid-flow-col grid-cols-3  rounded">
      {/* Image Section Skeleton */}
      <div className="relative h-full place-content-center">
        <Skeleton.Image className="overflow-hidden cursor-grabbing select-none object-center rounded-md h-[38vh]" style={{ width: 340, height: 220 }} active />
      </div>

      {/* Info Section Skeleton */}
      <div className="relative col-span-2 rounded p-3">
        <div>
          <Skeleton active title={false} paragraph={{ rows: 1, width: "40%" }} />
          <Skeleton active className="mt-3" title={false} paragraph={{ rows: 2 }} />

          <div className="flex gap-2 mt-2">
            <Skeleton.Button active size="small" shape="round" />
            <Skeleton.Button active size="small" shape="round" />
            <Skeleton.Button active size="small" shape="round" />
          </div>

          <div className="mt-2">
            <Skeleton.Input active size="small" style={{ width: 150 }} />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Skeleton.Input active size="small" style={{ width: 80 }} />
          <div className="flex gap-2">
            <Skeleton.Button active size="small" shape="default" style={{ width: 70 }} />
            <Skeleton.Button active size="small" shape="default" style={{ width: 80 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
