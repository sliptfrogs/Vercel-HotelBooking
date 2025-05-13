import React from "react";
import { Carousel } from "antd";
import * as motion from "motion/react-client";
import CardOrder from "./CardProduct";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79"
};
const CarouselProduct = () => (
  <>
    <Carousel arrows autoplay className="flex  pb-5">
      <div>
        <h3 style={contentStyle} className="p-2">
          <div className="flex  justify-center gap-2">
            <CardOrder
              price="17.00"
              discountPrice="15.00"
              title="Chemist at Play"
              description="10% Vitamin C Face Serum for Glowing & Bright Skin- Chemist At Play – Innovist
Brand: Chemist at Play"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDiVJ3js-G9Ssz49XjIQv2x65zAlOfSnEPA&s"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="45.00"
              discountPrice="30.00"
              title="EVER Skincare"
              description="EVER Skincare - Clean Skincare For Women in their 30s and Beyond"
              src="https://www.ever.com/cdn/shop/files/EVER_-_Website_169_Images_1_5adb96d6-f597-4b26-a53d-34f146be4c61.png?v=1717187309&width=1920"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="60.00"
              discountPrice="50.00"
              title="Be Green Bath and Body"
              description="Clean Beauty Organic Skin Care Gift Set – Be Green Bath and Body, LLC"
              src="https://begreenbathandbody.com/cdn/shop/files/Clean_Beauty_Holiday_Gift_Set.png?v=1729703715"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
          </div>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle} className="p-2">
          <div className="flex  justify-center gap-2">
            <CardOrder
              price="17.00"
              discountPrice="15.00"
              title="Chemist at Play"
              description="10% Vitamin C Face Serum for Glowing & Bright Skin- Chemist At Play – Innovist
Brand: Chemist at Play"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDiVJ3js-G9Ssz49XjIQv2x65zAlOfSnEPA&s"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="45.00"
              discountPrice="30.00"
              title="EVER Skincare"
              description="EVER Skincare - Clean Skincare For Women in their 30s and Beyond"
              src="https://www.ever.com/cdn/shop/files/EVER_-_Website_169_Images_1_5adb96d6-f597-4b26-a53d-34f146be4c61.png?v=1717187309&width=1920"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="60.00"
              discountPrice="50.00"
              title="Be Green Bath and Body"
              description="Clean Beauty Organic Skin Care Gift Set – Be Green Bath and Body, LLC"
              src="https://begreenbathandbody.com/cdn/shop/files/Clean_Beauty_Holiday_Gift_Set.png?v=1729703715"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
          </div>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle} className="p-2">
          <div className="flex  justify-center gap-2">
            <CardOrder
              price="17.00"
              discountPrice="15.00"
              title="Chemist at Play"
              description="10% Vitamin C Face Serum for Glowing & Bright Skin- Chemist At Play – Innovist
Brand: Chemist at Play"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDiVJ3js-G9Ssz49XjIQv2x65zAlOfSnEPA&s"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="45.00"
              discountPrice="30.00"
              title="EVER Skincare"
              description="EVER Skincare - Clean Skincare For Women in their 30s and Beyond"
              src="https://www.ever.com/cdn/shop/files/EVER_-_Website_169_Images_1_5adb96d6-f597-4b26-a53d-34f146be4c61.png?v=1717187309&width=1920"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <CardOrder
              price="60.00"
              discountPrice="50.00"
              title="Be Green Bath and Body"
              description="Clean Beauty Organic Skin Care Gift Set – Be Green Bath and Body, LLC"
              src="https://begreenbathandbody.com/cdn/shop/files/Clean_Beauty_Holiday_Gift_Set.png?v=1729703715"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
          </div>
        </h3>
      </div>
    </Carousel>
  </>
);
export default CarouselProduct;
