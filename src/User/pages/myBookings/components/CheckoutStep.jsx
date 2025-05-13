import {
  AlertCircle,
  CarTaxiFront,
  CarTaxiFrontIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  Gift,
  Home,
  Hotel,
  Mail,
  Menu,
  Phone,
  Shield,
  ShoppingBag,
  Ticket,
  TicketCheck,
  Truck,
  User,
  X,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import AntDisplayImage from "../../../components/common/AntDisplayImage";
import { Button, ButtonBase } from "@mui/material";
import { Card, Divider, Skeleton, Space } from "antd";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ShoppingCartCheckout } from "@mui/icons-material";
const CheckoutStep = ({
  handleNext,
  handlePrev,
  activeTab,
  cartItems,
  handleCartItems,
  hanleGiftDiscount,
  gift,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [discountMessage, setDiscountMessage] = useState("");
  const couponData = [
    {
      id: "CPN2025SAVE10",
      code: "SAVE10",
      discountType: "percentage",
      discountValue: 10,
      minimumPurchase: 50,
      isActive: true,
      message: "Coupon applied successfully!",
      expiryDate: "2025-12-31",
      image: "https://gallery.yopriceville.com/downloadfullsize/send/9172",
    },
    {
      id: "CPN2025FLAT5",
      code: "FLAT5",
      discountType: "flat",
      discountValue: 5,
      minimumPurchase: 20,
      isActive: true,
      message: "Coupon applied successfully!",
      expiryDate: "2025-11-30",
      image:
        "https://www.pngplay.com/wp-content/uploads/6/Coupon-Icon-Background-PNG-Image.png",
    },
    {
      id: "CPN2024EXPIRED",
      code: "OLD50",
      discountType: "percentage",
      discountValue: 50,
      minimumPurchase: 100,
      isActive: false,
      message: "This coupon has expired.",
      expiryDate: "2024-12-31",
      image: "https://gallery.yopriceville.com/downloadfullsize/send/9173",
    },
    {
      id: "CPN2025INVALID",
      code: "FAKECOUPON",
      discountType: "flat",
      discountValue: 20,
      minimumPurchase: 75,
      isActive: false,
      message: "Invalid coupon code.",
      expiryDate: "2025-06-30",
      image:
        "https://png.pngtree.com/png-vector/20230130/ourmid/pngtree-discount-coupon-ready-to-use-png-image_6575537.png",
    },
  ];

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
    deliveryMethod: Yup.string().required("Delivery method is required"), // Add this line
    address: Yup.string().when("deliveryMethod", {
      is: (value) => value === "delivery", // More explicit check
      then: Yup.string().required("Address is required for delivery"),
      otherwise: Yup.string().notRequired(),
    }),
    city: Yup.string().when("deliveryMethod", {
      is: (value) => value === "delivery",
      then: Yup.string().required("City is required for delivery"),
      otherwise: Yup.string().notRequired(),
    }),
    postalCode: Yup.string().when("deliveryMethod", {
      is: (value) => value === "delivery",
      then: Yup.string().required("Postal code is required for delivery"),
      otherwise: Yup.string().notRequired(),
    }),
    country: Yup.string().when("deliveryMethod", {
      is: (value) => value === "delivery",
      then: Yup.string().required("Country is required for delivery"),
      otherwise: Yup.string().notRequired(),
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
      deliveryMethod: "", // Must include this
      address: "",
      city: "",
      postalCode: "",
      country: "",
      specialRequests: "",
      saveInfo: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle submission
    },
  });

  const handleApplyDiscount = () => {
    const couponInput = formik.values.discountCode;
    const findCoupon = couponData.find((c) => c.code === couponInput);
    if (findCoupon) {
      setLoadingCoupon(true);
      setTimeout(() => {
        setLoadingCoupon(false);
        setDiscountApplied(true);
        hanleGiftDiscount({
          discountApply: true,
          subtotal: subtotal.toFixed(2),
          discount: (subtotal * (findCoupon.discountValue / 100)).toFixed(2),
          shipping,
          serviceFee: shipping.toFixed(2),
          tax: tax.toFixed(2),
          total: (total * 0.9).toFixed(2),
          code: formik.values.discountCode,
          discountPercent: 10,
          image: findCoupon.image,
        });
        setDiscountMessage("Discount applied successfully!");

        toast.custom(
          (t) => (
            <motion.div
              initial={{
                x: 100,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                x: 100,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                bounce: 0.5,
                duration: 0.5,
              }}
              className="bg-gray-800/50 border-r-4 border-green-400 flex items-center gap-2 backdrop-blur-sm text-white text-xs px-4 py-1 rounded-l-lg rounded-r-lg shadow-lg"
            >
              <div className="h-12 w-12">
                <DotLottieReact
                  src="https://lottie.host/c0aed802-8ec9-49a9-9652-fa852c31afec/3hlRCaceCP.lottie"
                  loop
                  autoplay
                />
              </div>

              <div className="text-sm flex gap-2 items-center font-bold lowercase">
                <span>Coupon successfully applied.</span>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-4 text-white hover:text-red-500 transition-colors"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </motion.div>
          ),
          {
            duration: 3000,
            position: "bottom-right",
          }
        );
      }, 1000);
    } else {
      setDiscountApplied(false);
      hanleGiftDiscount({
        discountApply: false,
        subtotal: subtotal.toFixed(2),
        discount: (subtotal * 0.1).toFixed(2),
        serviceFee: shipping.toFixed(2),
        shipping,
        tax: tax.toFixed(2),
        total: (total * 0.9).toFixed(2),
        code: "",
      });
      setDiscountMessage("Invalid discount code");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    hanleGiftDiscount((prevState) => {
      // Safely handle null/undefined values (fallback to 0)
      const subtotal = Number(prevState.subtotal) || 0;
      const shippingValue = Number(shipping) || 0;
      const tax = Number(prevState.tax) || 0;

      return {
        ...prevState,
        serviceFee: shippingValue.toFixed(2), // Ensure shipping is a number
        shipping: shippingValue,
        total: (subtotal + shippingValue + tax).toFixed(2),
      };
    });
  }, [deliveryMethod, shipping]); // Add `shipping` to dependencies!

  const nextPageLoading = () => {
    setLoadingNextPage(true);
    setTimeout(() => {
      setLoadingNextPage(false);
      handleNext();
    }, 1000);
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
      {/* Left Column - Customer Information */}
      {activeTab === 2 && (
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Header */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <User size={20} className="mr-2" />
              Customer Information
            </h2>
            {/* Left Column - Form Inputs */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative overflow-hidden group">
                  <div className="relative z-10">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-inherit p-3 pl-10 text-sm md:text-base border ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      } transition-all`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <span
                    className={`absolute left-0 bottom-0 h-full transition-all duration-500 rounded-md ${
                      formik.values.fullName
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    } ${
                      formik.touched.fullName && formik.errors.fullName
                        ? "bg-red-400/20"
                        : "bg-blue-400/20"
                    } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                  ></span>
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative overflow-hidden group">
                  <div className="relative z-10">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-inherit p-3 pl-10 text-sm md:text-base border ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-gray-300"
                      } transition-all`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <span
                    className={`absolute left-0 bottom-0 h-full transition-all duration-500 ${
                      formik.values.email ? "w-full" : "w-0 group-hover:w-full"
                    } ${
                      formik.touched.email && formik.errors.email
                        ? "bg-red-400/20"
                        : "bg-blue-400/20"
                    } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                  ></span>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative overflow-hidden group mb-4">
                  <div className="relative z-10">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formik.values.phone || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-slate-50/40 p-3 pl-10 text-sm md:text-base border ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-gray-300"
                      } transition-all`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <span
                    className={`absolute left-0 bottom-0 h-full transition-all duration-300 rounded-md ${
                      formik.values.phone ? "w-full" : "w-0 group-hover:w-full"
                    } ${
                      formik.touched.phone && formik.errors.phone
                        ? "bg-red-400/30"
                        : "bg-blue-400/20"
                    } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                  ></span>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="mt-1 text-xs md:text-sm text-red-600">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Transportation Options */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <CornerDownRight size={18} className="mr-2" />
                  Transportation options
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <ButtonBase
                    sx={{ border: "1px solid" }}
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`!flex !flex-col !items-center !p-3 md:!p-4 !rounded-lg md:!rounded-xl !cursor-pointer !transition-all ${
                      deliveryMethod === "delivery"
                        ? "!border-blue-500 !bg-blue-50"
                        : "!border-gray-300 hover:!border-blue-300 hover:!bg-blue-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === "delivery"}
                      onChange={() => {
                        setDeliveryMethod("delivery");
                        formik.setFieldValue("deliveryMethod", "delivery");
                      }}
                      className="sr-only"
                    />
                    <CarTaxiFrontIcon
                      size={24}
                      className={`mb-1 md:mb-2 ${
                        deliveryMethod === "delivery"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium text-sm md:text-base">
                      Hotel Pickup
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      $29.99 - 3-5 business days
                    </span>
                  </ButtonBase>

                  <ButtonBase
                    sx={{ border: "1px solid" }}
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`!flex !flex-col !items-center !p-3 md:!p-4 !rounded-lg md:!rounded-xl !cursor-pointer !transition-all ${
                      deliveryMethod === "pickup"
                        ? "!border-blue-500 !bg-blue-50"
                        : "!border-gray-300 hover:!border-blue-300 hover:!bg-blue-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => {
                        setDeliveryMethod("pickup");
                        formik.setFieldValue("deliveryMethod", "pickup");
                      }}
                      className="sr-only"
                    />
                    <Hotel
                      size={24}
                      className={`mb-1 md:mb-2 ${
                        deliveryMethod === "pickup"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium text-sm md:text-base">
                      Self Check-In
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      Free - Ready in 24 hours
                    </span>
                  </ButtonBase>
                </div>
              </div>

              {/* Shipping Address (conditional) */}
              {deliveryMethod === "delivery" && (
                <div className="bg-gray-400/10 outline-white space-y-4 p-4 rounded-lg border border-blue-100 mt-6">
                  <h3 className="font-medium text-blue-800 flex items-center text-sm md:text-base">
                    <Home size={16} className="mr-2" />
                    Shipping Address
                  </h3>

                  <div className="space-y-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative overflow-hidden group mb-4">
                      <div className="relative z-10">
                        <input
                          type="text"
                          disabled={loading}
                          id="address"
                          name="address"
                          value={formik.values.address || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full bg-slate-50/40 p-3 text-sm md:text-base border ${
                            formik.touched.address && formik.errors.address
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border-gray-300"
                          } transition-all`}
                          placeholder="Enter your address"
                        />
                      </div>
                      <span
                        className={`absolute left-0 bottom-0 h-full transition-all duration-300 rounded-md ${
                          formik.values.address
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        } ${
                          formik.touched.address && formik.errors.address
                            ? "bg-red-400/30"
                            : "bg-blue-400/20"
                        } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                      ></span>
                      {formik.touched.address && formik.errors.address && (
                        <div className="mt-1 text-xs md:text-sm text-red-600">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative overflow-hidden group mb-4">
                        <div className="relative z-10">
                          <input
                            type="text"
                            disabled={loading}
                            id="city"
                            name="city"
                            value={formik.values.city || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-slate-50/40 p-3 text-sm md:text-base border ${
                              formik.touched.city && formik.errors.city
                                ? "border-red-500 ring-1 ring-red-500"
                                : "border-gray-300"
                            } transition-all`}
                            placeholder="City"
                          />
                        </div>
                        <span
                          className={`absolute left-0 bottom-0 h-full transition-all duration-300 rounded-md ${
                            formik.values.city
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          } ${
                            formik.touched.city && formik.errors.city
                              ? "bg-red-400/30"
                              : "bg-blue-400/20"
                          } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                        ></span>
                        {formik.touched.city && formik.errors.city && (
                          <div className="mt-1 text-xs md:text-sm text-red-600">
                            {formik.errors.city}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <div className="relative overflow-hidden group mb-4">
                        <div className="relative z-10">
                          <input
                            type="text"
                            disabled={loading}
                            id="postalCode"
                            name="postalCode"
                            value={formik.values.postalCode || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-slate-50/40 p-3 text-sm md:text-base border ${
                              formik.touched.postalCode &&
                              formik.errors.postalCode
                                ? "border-red-500 ring-1 ring-red-500"
                                : "border-gray-300"
                            } transition-all`}
                            placeholder="Postal code"
                          />
                        </div>
                        <span
                          className={`absolute left-0 bottom-0 h-full transition-all duration-300 rounded-md ${
                            formik.values.postalCode
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          } ${
                            formik.touched.postalCode &&
                            formik.errors.postalCode
                              ? "bg-red-400/30"
                              : "bg-blue-400/20"
                          } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                        ></span>
                        {formik.touched.postalCode &&
                          formik.errors.postalCode && (
                            <div className="mt-1 text-xs md:text-sm text-red-600">
                              {formik.errors.postalCode}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative overflow-hidden group">
                        <div className="relative z-10">
                          <select
                            id="country"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-slate-50/40 p-3 text-sm md:text-base ${
                              formik.touched.country && formik.errors.country
                                ? "border-red-500"
                                : "border-gray-300"
                            } transition-all`}
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                          </select>
                          {formik.touched.country && formik.errors.country && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                              {formik.errors.country}
                            </p>
                          )}
                        </div>
                        <span className="absolute left-0 bottom-0 h-full w-0 transition-all duration-500 rounded-md group-hover:w-full bg-blue-400/20 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Requests */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formik.values.specialRequests}
                    onChange={formik.handleChange}
                    rows={3}
                    className="w-full min-h-[10vh] p-3 border-none bg-slate-200 placeholder:text-gray-400 transition-all text-sm md:text-base"
                    placeholder="Any special requests for your stay?"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formik.values.saveInfo}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 text-xs md:text-sm text-gray-700"
                  >
                    Save this information for next time
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Booking Summary */}
          <div className="relative overflow-hidden">
            <div className="bg-gray-400/10 relative z-10 backdrop-blur-xl px-4 sm:px-6 pt-4 sm:pt-6 pb-3 h-fit rounded-xl lg:sticky lg:top-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <Ticket size={20} className="mr-2" />
                Booking Summary
              </h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid relative grid-cols-5 place-content-center gap-3 md:gap-4 w-full items-center group transition-all"
                  >
                    <span className="z-0 absolute left-0 bottom-0 h-full w-0 transition-all duration-500 rounded-lg group-hover:w-full bg-blue-400/10 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom"></span>

                    <div className="h-[15vh] md:h-[20vh] rounded-lg col-span-2 overflow-hidden">
                      <AntDisplayImage
                        className="h-[15vh] md:h-[20vh] hover:scale-105 brightness-60 hover:brightness-110 transition-all duration-300 object-cover"
                        src={item.image}
                      />
                    </div>

                    <div className="col-span-3 z-10 pr-3 md:pr-5 flex items-start flex-col justify-center">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-gray-900 transition-all duration-300">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 group-hover:text-gray-600 transition-all duration-300 text-xs md:text-sm line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-gray-600 group-hover:text-gray-700 transition-all duration-300 text-xs md:text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-right text-xs md:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-all duration-300 mt-1 md:mt-2">
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4 md:mb-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative overflow-hidden group flex-1">
                      <div className="relative flex items-center z-10">
                        {gift.discountApply ? (
                          <TicketCheck
                            size={18}
                            className="absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2"
                          />
                        ) : (
                          <Ticket
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          />
                        )}
                        <input
                          type="text"
                          name="discountCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={loading || gift.discountApply}
                          className={`w-full text-xs md:text-sm bg-slate-50/40 p-2 md:p-3 pl-8 md:pl-10 ${
                            gift.discountApply
                              ? "border-none bg-green-300/20"
                              : "border-gray-300 border"
                          } transition-all`}
                          placeholder={
                            gift.discountApply
                              ? `Your Coupon Code: ${gift.code}`
                              : "Enter your Coupon here"
                          }
                        />
                      </div>

                      {!gift.discountApply && (
                        <span
                          className={`absolute left-0 bottom-0 h-full transition-all duration-300 rounded-lg ${
                            formik.values.discountCode
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          } ${
                            formik.touched.discountCode &&
                            formik.errors.discountCode
                              ? "bg-red-400/30"
                              : "bg-blue-400/20"
                          } [mask-image:linear-gradient(to_right,black_70%,transparent_100%)] origin-bottom z-0`}
                        ></span>
                      )}

                      {formik.touched.discountCode &&
                        formik.errors.discountCode && (
                          <div className="mt-1 text-xs md:text-sm text-red-600">
                            {formik.errors.discountCode}
                          </div>
                        )}
                    </div>
                    <button
                      type="button"
                      className={`p-2 md:p-3 px-3 md:px-5 rounded transition-colors text-xs md:text-sm ${
                        gift.discountApply
                          ? "bg-green-200 text-green-500"
                          : "bg-gray-300/50 text-gray-800 hover:bg-gray-300"
                      } disabled:opacity-50`}
                      disabled={loading || gift.discountApply}
                      onClick={handleApplyDiscount}
                    >
                      {gift.discountApply ? <Check size={18} /> : "Apply"}
                    </button>
                  </div>
                  {/* Demo Notice */}
                  <div className="bg-yellow-50/50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3 text-sm mt-6">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-800">
                      For demo purposes only. Enter SAVE10 into coupon input for
                      getting demo success coupon.
                    </p>
                  </div>
                  {loadingCoupon && (
                    <Card
                      className="w-full bg-inherit border-gray-200"
                      bodyStyle={{
                        padding: 8,
                        height: "15vh",
                        display: "flex",
                      }}
                    >
                      <Skeleton.Input
                        active
                        size="large"
                        block
                        className="w-full"
                        style={{
                          height: "100%",
                          borderRadius: "inherit",
                          minWidth: "100%",
                        }}
                      />
                    </Card>
                  )}
                  {gift.discountApply && (
                    <motion.div>
                      <AntDisplayImage
                        className="!h-fit !bg-inherit"
                        src={gift.image}
                      />
                    </motion.div>
                  )}
                  {discountMessage && (
                    <p
                      className={`text-xs md:text-sm ${
                        discountApplied ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {discountMessage}
                    </p>
                  )}
                  {discountApplied && (
                    <p className="text-xs text-gray-600">
                      10% discount applied to your order
                    </p>
                  )}
                </div>
              </div>

              {!gift.discountApply && (
                <div className="space-y-2 mb-4 md:mb-6">
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

                  <div className="flex justify-between pt-3 border-t border-gray-200 text-base md:text-lg font-bold">
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
                <div className="space-y-2 mb-4 md:mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${gift.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-red-600 text-sm">
                    <p className="text-gray-600">
                      Discount(
                      <span className="text-green-600">
                        {gift.discountPercent}%
                      </span>
                      )
                    </p>
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

                  <div className="flex justify-between pt-3 border-t border-gray-200 text-base md:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-500">$ {gift.total}</span>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100 flex items-start space-x-2 md:space-x-3 text-xs md:text-sm mt-4 md:mt-6">
                <Shield size={16} className="text-blue-600 mt-0.5" />
                <p className="text-blue-800">
                  Your payment is secure and encrypted. We never store your
                  credit card details.
                </p>
              </div>

              <div className="bg-green-50 mb-2 p-3 md:p-4 rounded-lg border border-green-100 flex items-start space-x-2 md:space-x-3 text-xs md:text-sm mt-3 md:mt-4">
                <Truck size={16} className="text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">
                    Fast Confirmation
                  </p>
                  <p className="text-green-800">
                    {deliveryMethod === "delivery"
                      ? "Booking confirmation within 1 hour"
                      : "Instant booking confirmation"}
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center justify-between text-white py-2 md:py-3 px-3 md:px-4 rounded-sm font-medium transition-colors">
                <button
                  onClick={handlePrev}
                  disabled={loadingNextPage}
                  className={`flex items-center gap-1 md:gap-2 text-gray-700 hover:text-opacity-80 rounded-sm font-medium !transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm`}
                >
                  <ChevronLeft fontSize="small" />
                  <span>Back</span>
                </button>

                <Button
                  onClick={!loadingNextPage && nextPageLoading}
                  className="!bg-blue-500 hover:!opacity-85 !text-xs !border-gray-400/10 !text-white !normal-case"
                  sx={{
                    minWidth: 0,
                    gap: "8px",
                    border: "1px solid",
                    width: "100px",
                    height: "34px",
                    padding: 0,
                    "@media (min-width: 768px)": {
                      width: "110px",
                      height: "38px",
                      gap: "10px",
                    },
                  }}
                >
                  {loadingNextPage ? (
                    <span className="text-xs md:text-sm">Processing...</span>
                  ) : (
                    <>
                      <span className="text-xs md:text-sm">Payment</span>
                      <ChevronRight fontSize="small" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Absolute box */}
            <div className="absolute inset-0 -z-0 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white [mask:linear-gradient(white,white),radial-gradient(white,transparent_80%)] [mask-composite:exclude] [background:radial-gradient(#f17eb8,transparent_50%)] animate-pulse" />
          </div>
        </div>
      )}
    </form>
  );
};

export default CheckoutStep;
