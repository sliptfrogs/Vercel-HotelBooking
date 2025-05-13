import "../../../src/index.css";
import '../style/UserApp.css'
// import Button from
import React, { useEffect, useRef, useState } from "react";
import LayoutHeader from "./LayoutConponents/LayoutHeader";
import LayoutBody from "./LayoutConponents/LayoutBody";
import { Toaster } from "react-hot-toast";
import { Heart } from "lucide-react";

const UserMainLayout = () => {
  const [activePage, setActivePage] = useState("home");
  const targetRef = useRef(null);

  // Prop event into header component
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  // Scroll into top when mount page tab change
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [activePage]);

  return (
    <div
      ref={targetRef}
      className={`w-[100vw] Hide-Scrollbar h-[100vh]  relative`}
    >
      <Toaster
        toastOptions={{
          className:
            "!bg-gray-800/50 !backdrop-blur-sm !backdrop: !text-white !text-xs !px-4 !py-3 !rounded-lg !shadow-lg",
        }}
        position="top-center"
        reverseOrder={true}
      />
      {/* Header layout */}
      <LayoutHeader onPageChange={handlePageChange} activePage={activePage} />
      {/* Body Layout */}
      <LayoutBody  />
      {/* <LayoutFooter/> */}
      {/* Footer */}
    </div>
  );
};

export default UserMainLayout;
