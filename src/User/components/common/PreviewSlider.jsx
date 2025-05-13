import React, { useRef } from "react";
import { Carousel } from "antd";
import { useInView } from "react-intersection-observer";
import AntDisplayImage from "../../../User/components/common/AntDisplayImage";

const PreviewSlider = ({ arrayImg = [], className = "" ,imageClassName=''}) => {
  const carouselRef = useRef();
  const { ref, inView } = useInView({
    triggerOnce: false, // we want continuous observe
    threshold: 0.5, // 50% visible
  });

  return (
    <div className={`h-full ${className}`} ref={ref}>
      <Carousel
        className="h-full w-full "
        swipeToSlide
        pauseOnHover
        draggable
        autoplay={inView} 
        ref={carouselRef}
>
        {arrayImg.map((Item) => (
          <div className="" key={Item.id}>
            <div
              className={`overflow-hidden cursor-grabbing select-none object-center rounded-md  ${imageClassName}`}
            >
              <AntDisplayImage className={imageClassName} src={Item.fullSize}/>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PreviewSlider;
