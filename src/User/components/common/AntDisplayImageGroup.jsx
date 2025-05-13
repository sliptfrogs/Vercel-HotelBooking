import React, { useState } from "react";
import { Image } from "antd";
import { LazyImage } from "./LazyImage";

const AntDisplayImageGroup = ({
  ArrayImage = [],
  src = "",
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [scaleStep] = useState(0.5);
  const imageSource =
    src ||
    ArrayImage[0] ||
    "https://cdn3.emoji.gg/emojis/7086-bunny-holding-ears-down-with-hearts.gif";

  return (
    <>
      <LazyImage
        onClick={src && ArrayImage[0] ? () => setVisible(true) : ""}
        src={imageSource}
        className={`h-full bg-red-500 ${
          src && ArrayImage[0]
            ? "cursor-pointer"
            : "cursor-default bg-gradient-to-r  place-content-end from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"
        }  ${className}`}
        imageClassName={`${
          src && ArrayImage[0] ? " !object-cover mix-blend-multiply " : " "
        }  !rounded-md`}
        alt=""
        loading="lazy"
      />
      <Image.PreviewGroup
        items={ArrayImage.length ? ArrayImage : [imageSource]}
        preview={{
          visible,
          scaleStep,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      >
        <Image width={200} style={{ display: "none" }} src={imageSource} />
      </Image.PreviewGroup>
    </>
  );
};

export default AntDisplayImageGroup;
