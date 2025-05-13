import React, { useState } from "react";

import HotelComponent from "./Components/HotelComponent";

const MainHotelPage = () => {
  return (
    <main className="w-full">
      <div className="content relative col-span-5 ">
        <HotelComponent />
      </div>
    </main>
  );
};

export default MainHotelPage;
