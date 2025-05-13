import React, { useState } from "react";
import { Image } from "antd";
import { LazyImage } from "./LazyImage";

const AntDisplayImage = ({ src = "",className="",imageClassName="" }) => {
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  return (
    <>
      <LazyImage
        onClick={() => setVisible(true)}
        src={src}
        className={`h-full cursor-pointer ${className}`}
        imageClassName={`!h-full !w-full !object-cover !rounded-md ${imageClassName}`}
        alt=""
        loading="lazy"
      />
      <Image
        width={200}
        style={{ display: "none" }}
        src={src}
        preview={{
          visible,
          scaleStep,
          src, // ✅ fix here
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export default AntDisplayImage;
