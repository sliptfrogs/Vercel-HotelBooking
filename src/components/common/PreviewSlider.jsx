import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '100%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};
const PreviewSlider = ({arrayImg=[],className=""}) => (
  <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
    {
      arrayImg.map((Item,index)=>(
        <div
        key={`${Item}-${index}`}
        >
          <h3 style={contentStyle} className='h-full'>
            <img
                  className={`w-full h-full ${className}  col-span-1  rounded-md object-cover bg-no-repeat`}
                  src={
                    "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
                  }
                  alt=""
                  loading="lazy"
                />
          </h3>
        </div>
      ))
    }
  </Carousel>
);
export default PreviewSlider;