import React from "react";
import { Avatar, Card } from "antd";
import * as motion from "motion/react-client";

const { Meta } = Card;
const ProductBenefits = ({
  src = "",
  className = "",
  description = "...",
  title = "...",
}) => {
  return (
    <Card
      className={className}
      classNames={{
        actions: "custom-actions", // Custom class for the actions container
      }}
      style={{
        width: 250,
        backgroundColor: "inherit",
        backdropFilter: "initial",
      }}
      cover={
        <>
          <motion.div  whileFocus={{scale:1.2}}>
            <svg
              className="w-6  hover:text-red-500 text-white h-6 m-1 p-1 cursor-pointer z-10 absolute bg-gray-400 rounded-lg bg-opacity-25  dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                className=""
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </motion.div>
          <motion.div
            className={`h-52 w-full bg-no-repeat bg-center bg-cover `}
            style={{ backgroundImage: `url(${src})` }}
            // whileHover={{ scale: 1.1 }} // Zoom on hover
          >
            {/* Any content you want inside */}
          </motion.div>
        </>
      }
    >
      <Meta
        title={
          <>
            <h1 className="truncate-1-lines">{title}</h1>
          </>
        }
        description={
          <>
            <p className="truncate-3-lines">{description}</p>
          </>
        }
      />
    </Card>
  );
};
export default ProductBenefits;
