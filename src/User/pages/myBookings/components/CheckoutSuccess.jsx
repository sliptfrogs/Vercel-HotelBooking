import { ShopOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ButtonBase } from "@mui/material";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MailCheck,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="flex  z-30 flex-col items-center justify-center min-h-[40vh]">
      <div className="max-w-md  w-full bg-slate-50/70 backdrop-blur-lg rounded-lg p-6 sm:p-8 text-center relative">
        {/* Content Container */}
        <div className="relative z-10 space-y-2">
          {/* Animation */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 border border-green-500/20 bg-green-500/10 backdrop-blur-md rounded-full shadow-xl">
              <Check className="text-green-500"/>
            </div>
          </div>
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-600 sm:text-lg">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-green-300/20 backdrop-blur-md border border-green-300 p-4 sm:p-5 rounded-lg text-left space-y-3">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-medium text-sm sm:text-base">
                Payment Method: Credit Card
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              A confirmation has been sent to your email address.
            </p>
          </div>

          {/* Action Button */}
          <Link to="/bookings" className="block">
            <ButtonBase
              sx={{ border: "1px solid" }}
              className="!w-full !justify-center !gap-2 !flex !items-center !bg-green-300/20 hover:!bg-green-300/30 !border-green-300 !backdrop-blur-lg !rounded-lg !border !text-green-600 font-medium !py-3 !px-6 !transition-all"
            >
              <span className="text-sm sm:text-base">View Bookings</span>
              <ChevronRight className="w-4 h-4" />
            </ButtonBase>
          </Link>
        </div>

        {/* Background Effect */}
        <div className="absolute inset-0 z-0 rounded-xl bg-white [mask:linear-gradient(white,white),radial-gradient(white,transparent_80%)] [mask-composite:exclude] [background:radial-gradient(#f17eb8,transparent_50%)] animate-pulse"></div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
