import React from "react";
import { Skeleton } from "@mui/material"; // Or use your own Tailwind-based skeleton styles
import { Skeleton as AntSkeleton } from 'antd';


const AntHotelSkeleton = () => {
  return (
    <div className="w-full py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24">
          <div className="mb-5 flex justify-center">
            <AntSkeleton  />
          </div>

          <div className="mb-5 flex justify-center">
            <Skeleton variant="rectangular" width="65%" height={60} />
          </div>

          <div className="mb-5 grid grid-cols-2">
            <Skeleton variant="text" width="40%" height={30} />
            <div className="flex justify-end gap-4">
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={100}
                  height={40}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="col-span-1 border rounded-lg p-3 grid grid-cols-3 gap-2"
              >
                {/* Image */}
                <AntSkeleton.Image
                    style={{ width: 170, height: 200 }} active
                  className="col-span-1 rounded"
                />

                {/* Content */}
                <div className="col-span-2 space-y-2">
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="text" width="70%" height={25} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />

                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={80}
                        height={25}
                        className="rounded"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <Skeleton variant="text" width="30%" height={25} />
                    <div className="flex gap-2">
                      <Skeleton variant="rectangular" width={90} height={38} />
                      <Skeleton variant="rectangular" width={90} height={38} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntHotelSkeleton;
