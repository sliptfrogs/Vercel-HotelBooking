import React from "react";
import { Outlet } from "react-router-dom";
const MyBooking = () => {
  return (
    <main className="w-full">
      <div className="content relative col-span-5 ">
       <Outlet/>
      </div>
    </main>
  );
};

export default MyBooking;
