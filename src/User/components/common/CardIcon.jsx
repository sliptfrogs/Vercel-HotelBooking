import { Card } from 'antd';
import React from 'react';
import * as motion from "motion/react-client";
import Meta from 'antd/es/card/Meta';
const CardIcon = ({title="",src="",description=""}) => {
    return (
        <Card
      className="border-none !bg-gray-400 !bg-opacity-20"
      classNames={{
        actions: "custom-actions", // Custom class for the actions container
      }}
      style={{
        backgroundColor: "inherit",
        backdropFilter: "initial",
      }}
      cover={
              <>
                <motion.div
                  className={`h-52 w-full bg-no-repeat bg-center bg-cover bg-[url('${(src)}')]`}
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
            <h1 className="truncate-1-lines">{(title)}</h1>
          </>
        }
        description={
          <>
            <p className="truncate-3-lines">{(description)}</p>
          </>
        }
      />
    </Card>
    );
}

export default CardIcon;
