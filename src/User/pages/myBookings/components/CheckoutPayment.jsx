import {
  AlertCircle,
  Calendar,
  CarTaxiFront,
  CarTaxiFrontIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  CreditCard,
  Gift,
  Home,
  Hotel,
  Lock,
  Mail,
  Menu,
  Phone,
  Shield,
  ShoppingBag,
  Ticket,
  Truck,
  User,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import { Button, ButtonBase } from "@mui/material";
import { Card, Divider, Skeleton, Space } from "antd";

const CheckoutPayment = ({
  handleNext,
  handlePrev,
  cartItems,
  handleCartItems,
  gift,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState("");

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = deliveryMethod === "delivery" ? 29.99 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  // Validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Address is required for delivery"),
    }),
    city: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("City is required for delivery"),
    }),
    postalCode: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Postal code is required for delivery"),
    }),
    country: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Country is required for delivery"),
    }),
    specialRequests: Yup.string(),
    saveInfo: Yup.boolean(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
      deliveryMethod: "delivery",
      specialRequests: "",
      saveInfo: false,
      discountCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", values);
        // Handle successful submission (redirect, show success message, etc.)
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const nextPageLoading = () => {
    setLoadingNextPage(true);
    setTimeout(() => {
      setLoadingNextPage(false);
      handleNext();
    }, 1000);
  };
  const coupon = {
    id: "CPN2025SAVE10",
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    minimumPurchase: 50,
    isActive: true,
    message: "Coupon applied successfully!",
    expiryDate: "2025-12-31",
  };

  return loading ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto ">
      {/* Customer Information Skeleton */}
      <Card
        title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
        style={{ marginBottom: 24 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Skeleton.Input
            active
            block
            style={{ height: 40, marginBottom: 16 }}
          />
          <Skeleton.Input
            active
            block
            style={{ height: 40, marginBottom: 16 }}
          />
          <Skeleton.Input active block style={{ height: 40 }} />
        </Space>
      </Card>

      {/* Booking Summary Skeleton */}
      <Card
        title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
      >
        <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
          <Skeleton.Input active size="small" style={{ width: 120 }} />
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
          <Skeleton.Input active size="small" style={{ width: 80 }} />
          <Skeleton.Input active size="small" style={{ width: 70 }} />
        </Space>

        <Divider style={{ margin: "12px 0" }} />

        <Space direction="vertical" style={{ width: "100%" }}>
          <Skeleton.Input active size="small" style={{ width: 120 }} />
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
          <Skeleton.Input active size="small" style={{ width: 80 }} />
          <Skeleton.Input active size="small" style={{ width: 70 }} />
        </Space>
      </Card>
    </div>
  ) : (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1  gap-8 max-w-6xl mx-auto "
    >
      {/* Payment Form - Responsive Layout */}
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Payment Method */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Method
          </h2>

          {/* Payment Options */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
            {/* Credit Card Option - Selected */}
            <button
              type="button"
              className="flex flex-col items-center p-3 sm:p-4 border rounded-lg sm:rounded-xl border-blue-500 bg-blue-50 ring-2 ring-blue-300"
            >
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 mb-1 sm:mb-2 text-blue-600" />
              <span className="font-medium text-sm sm:text-base">
                Credit Card
              </span>
            </button>

            {/* PayPal Option */}
            <button
              type="button"
              className="flex flex-col items-center p-3 sm:p-4 border rounded-lg sm:rounded-xl border-gray-300 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            >
              <div className="mb-1 sm:mb-2 text-base sm:text-lg font-bold text-blue-600">
                PayPal
              </div>
              <span className="font-medium text-sm sm:text-base">PayPal</span>
            </button>

            {/* Apple Pay Option */}
            <button
              type="button"
              className="flex flex-col items-center p-3 sm:p-4 border rounded-lg sm:rounded-xl border-gray-300 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            >
              <div className="mb-1 sm:mb-2 text-base sm:text-lg font-bold">
                Apple Pay
              </div>
              <span className="font-medium text-sm sm:text-base">
                Apple Pay
              </span>
            </button>
          </div>

          {/* Card Details Section */}
          <div className="space-y-4 p-4 sm:p-5 bg-blue-50 rounded-lg border border-blue-100 mt-4">
            <h3 className="font-medium text-blue-800 flex items-center text-sm sm:text-base">
              <CreditCard className="w-4 h-4 mr-2" />
              Card Details
            </h3>

            {/* Card Number Input */}
            <div className="relative overflow-hidden group mb-3 sm:mb-4">
              <div className="relative z-10">
                <CreditCard className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white p-2 sm:p-3 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg transition-all"
                  readOnly
                />
              </div>
              <span className="absolute left-0 bottom-0 h-full w-full transition-all duration-300 rounded-lg bg-blue-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0"></span>
            </div>

            {/* Name on Card Input */}
            <div className="relative overflow-hidden group mb-3 sm:mb-4">
              <div className="relative z-10">
                <User className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  className="w-full bg-white p-2 sm:p-3 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg transition-all"
                  readOnly
                />
              </div>
              <span className="absolute left-0 bottom-0 h-full w-full transition-all duration-300 rounded-lg bg-blue-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0"></span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Expiry Date Input */}
              <div className="relative overflow-hidden group mb-3 sm:mb-4">
                <div className="relative z-10">
                  <Calendar className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    className="w-full bg-white p-2 sm:p-3 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg transition-all"
                    readOnly
                  />
                </div>
                <span className="absolute left-0 bottom-0 h-full w-full transition-all duration-300 rounded-lg bg-blue-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0"></span>
              </div>

              {/* CVV Input */}
              <div className="relative overflow-hidden group mb-3 sm:mb-4">
                <div className="relative z-10">
                  <Lock className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    className="w-full bg-white p-2 sm:p-3 pl-10 text-sm sm:text-base border border-gray-300 rounded-lg transition-all"
                    readOnly
                  />
                </div>
                <span className="absolute left-0 bottom-0 h-full w-full transition-all duration-300 rounded-lg bg-blue-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0"></span>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-100 flex items-start gap-3 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800">
              For demo purposes only. No actual payment will be processed.
            </p>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="relative overflow-hidden">
          <div className="bg-gray-400/10 relative z-10 backdrop-blur-xl px-4 sm:px-6 pt-4 sm:pt-6 pb-3 h-fit rounded-xl lg:sticky lg:top-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <Ticket size={20} className="mr-2" />
              Booking Summary
            </h2>

            <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 border-b">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid relative grid-cols-5 place-content-center gap-3 sm:gap-4 w-full items-center group transition-all"
                >
                  {/* Animation */}
                  <span className="z-0 absolute left-0 bottom-0 h-full w-0 transition-all duration-500 rounded-lg group-hover:w-full bg-gray-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom"></span>

                  {/* Image */}
                  <div className="h-[15vh] sm:h-[20vh] rounded-lg col-span-2 overflow-hidden">
                    <AntDisplayImage
                      className="h-[15vh] sm:h-[20vh] hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300 object-cover"
                      src={item.image}
                    />
                  </div>

                  {/* Details */}
                  <div className="col-span-3 z-10 pr-3 sm:pr-5 flex items-start flex-col justify-center">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-gray-900 transition-all duration-300">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 group-hover:text-gray-600 transition-all duration-300 text-xs sm:text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-all duration-300 text-xs sm:text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-right text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-all duration-300 mt-1 sm:mt-2">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 sm:mb-6">
              {gift.discountApply && (
                <div className="space-y-2">
                  <div className="flex flex-col items-center space-x-2">
                    <div className="flex flex-col items-center overflow-hidden group flex-1">
                      <div className="flex border-b flex-col items-center justify-center">
                        <div className="flex mt-3 sm:mt-5 items-center gap-2">
                          <span className="text-sm sm:text-base">COUPON:</span>
                          <p className="px-2 py-[2px] text-xs sm:text-sm rounded bg-green-300/20 border text-green-400 border-green-400">
                            {gift.code}
                          </p>
                        </div>
                        <AntDisplayImage
                          className="h-[12vh] sm:h-[15vh] !bg-inherit"
                          src={gift.image}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!gift.discountApply && (
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-medium" : ""
                    }
                  >
                    {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-3 sm:pt-4 border-t border-gray-200 text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-700">
                    $
                    {discountApplied
                      ? (total * 0.9).toFixed(2)
                      : total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            {gift.discountApply && (
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${gift.subtotal}</span>
                </div>
                <div className="flex justify-between text-red-600 text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span>-${gift.discount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-medium" : ""
                    }
                  >
                    {shipping > 0 ? `$${gift.serviceFee}` : "Free"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span>${gift.tax}</span>
                </div>

                <div className="flex justify-between pt-3 sm:pt-4 border-t border-gray-200 text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-500">$ {gift.total}</span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100 flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm mt-4 sm:mt-6">
              <Shield size={16} className="text-blue-600 mt-0.5" />
              <p className="text-blue-800">
                Your payment is secure and encrypted. We never store your credit
                card details.
              </p>
            </div>

            <div className="bg-green-50 mb-2 p-3 sm:p-4 rounded-lg border border-green-100 flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm mt-3 sm:mt-4">
              <Truck size={16} className="text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Fast Confirmation</p>
                <p className="text-green-800">
                  {deliveryMethod === "delivery"
                    ? "Booking confirmation within 1 hour"
                    : "Instant booking confirmation"}
                </p>
              </div>
            </div>

            <div className="w-full flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-medium transition-colors">
              <button
                type="submit"
                onClick={handlePrev}
                disabled={loadingNextPage}
                className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-opacity-80 rounded-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
              <Button
                type="submit"
                onClick={!loadingNextPage && nextPageLoading}
                className="!bg-green-400 !flex !items-center !justify-center !rounded hover:!opacity-85 !text-xs sm:!text-sm !border-gray-400/10 !text-white !normal-case"
                sx={{
                  minWidth: 0,
                  gap: "8px",
                  border: "1px solid",
                  width: "100px",
                  height: "34px",
                  padding: 0,
                  "@media (min-width: 640px)": {
                    width: "110px",
                    height: "38px",
                    gap: "10px",
                  },
                }}
              >
                {loadingNextPage ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Confirm</span>
                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Absolute box */}
          <div className="absolute inset-0 -z-0 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white [mask:linear-gradient(white,white),radial-gradient(white,transparent_80%)] [mask-composite:exclude] [background:radial-gradient(#f17eb8,transparent_50%)] animate-pulse"/>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPayment;
