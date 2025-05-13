import React from "react";
import { Carousel } from "antd";
import * as motion from "motion/react-client";
import ProductBenefits from "./CardProductBenefits";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79"
};
const CarouselProductBenefits = () => (
  <>
    <Carousel arrows autoplay  className="flex px-5  pb-5">
      <div>
        <h3 style={contentStyle} className="p-2">
          <div className="flex  justify-center gap-2">
            <ProductBenefits
              title="Skin Health"
              description="Complete Skin Care Routine for Sensitive Skin"
              src="https://n.nordstrommedia.com/it/4d26899e-670a-4427-96ff-eb3da4f91aba.jpeg?h=600&w=750"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
              title="Reduced Signs Of Aging"
              description="EVER Skincare - Clean Skincare For Women in their 30s and Beyond"
              src="https://sparrowmd.ca/wp-content/uploads/2024/01/sparrow-md-signs-of-facial-aging.png"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
              title="Be Green Bath and Body"
              description="Clean Beauty Organic Skin Care Gift Set – Be Green Bath and Body, LLC"
              src="https://begreenbathandbody.com/cdn/shop/files/Clean_Beauty_Holiday_Gift_Set.png?v=1729703715"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
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
            <ProductBenefits
              title="Skin Health"
              description="Complete Skin Care Routine for Sensitive Skin"
              src="https://n.nordstrommedia.com/it/4d26899e-670a-4427-96ff-eb3da4f91aba.jpeg?h=600&w=750"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
              title="Reduced Signs Of Aging"
              description="EVER Skincare - Clean Skincare For Women in their 30s and Beyond"
              src="https://sparrowmd.ca/wp-content/uploads/2024/01/sparrow-md-signs-of-facial-aging.png"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
              title="Be Green Bath and Body"
              description="Clean Beauty Organic Skin Care Gift Set – Be Green Bath and Body, LLC"
              src="https://begreenbathandbody.com/cdn/shop/files/Clean_Beauty_Holiday_Gift_Set.png?v=1729703715"
              className="p-[1px] !bg-opacity-30 !backdrop-blur-sm !bg-gray-200   "
            />
            <ProductBenefits
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
export default CarouselProductBenefits;
