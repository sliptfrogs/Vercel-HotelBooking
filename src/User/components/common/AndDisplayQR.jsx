import { ShoppingCartCheckout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Image, QRCode, Modal, Skeleton } from "antd";
import { CopyClipboard } from "flowbite";
import { ClipboardWithIcon } from "flowbite-react";
import { QrCode, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AndDisplayQR = ({ src = "", className = "" }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className={className}>
      {loading ? (
        <div className="relative h-full place-content-center">
          <Skeleton.Image
            className="overflow-hidden cursor-grabbing select-none object-center rounded-md h-[38vh]"
            style={{ width: 100, height: 100 }}
            active
          />
        </div>
      ) : (
        <QRCode
          onClick={() => setVisible(true)}
          className={className}
          size={100}
          style={{ cursor: "pointer" }}
          errorLevel="H"
          value={src}
          iconSize={25}
          icon={
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      )}

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={400}
        centered
        closeIcon={<X color="white" />}
        // Outer modal container
        className="bg-gray-700/10 backdrop-blur-lg overflow-hidden rounded-lg"
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <h3 className="text-white text-xl">Scan QR</h3>
          <QRCode
            value={src}
            size={200}
            errorLevel="H"
            style={{
              padding: "8px",
              backgroundColor: "white",
            }}
          />

          <div className="grid w-full max-w-64">
            <div className="relative">
              <input
                id="npm-install"
                type="text"
                className="col-span-6  truncate w-[100%] max-w-[100%] rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                value={src}
                disabled
                readOnly
              />
              <ClipboardWithIcon
                className="bg-gray-600/10 backdrop-blur-sm hover:bg-gray-600/10 hover:!backdrop-blur-xl text-gray-500"
                valueToCopy={src}
              />
            </div>
          </div>
          <Link to={src}>
            <Button
              className=" !bg-blue-500 hover:!opacity-85 !text-xs !border-gray-400/10 !text-white !normal-case k"
              sx={{
                minWidth: 0,
                gap: "10px",
                border: "1px solid",
                width: "110px",
                height: "38px",
                padding: 0,
              }}
            >
              <QrCode fontSize="medium" />
              <span>Open</span>
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
export default AndDisplayQR;
