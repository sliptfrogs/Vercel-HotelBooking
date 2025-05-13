import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CreditCard,
  Truck,
  Home,
  ShoppingBag,
  ChevronRight,
  Check,
  ArrowLeft,
  Shield,
  Clock,
  Info,
  Gift,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  User,
  Mail,
  Phone,
} from "lucide-react";

const EnhancedCheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  const formRef = useRef(null);

  // Validation schemas for each step
  const step1Schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Address is required"),
    }),
    city: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("City is required"),
    }),
    postalCode: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Postal code is required"),
    }),
    country: Yup.string().when("deliveryMethod", {
      is: "delivery",
      then: Yup.string().required("Country is required"),
    }),
  });

  const step2Schema = Yup.object().shape({
    cardNumber: Yup.string().when("paymentMethod", {
      is: "card",
      then: Yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Invalid card number")
        .transform((value) => value.replace(/\s/g, "")),
    }),
    cardName: Yup.string().when("paymentMethod", {
      is: "card",
      then: Yup.string().required("Name on card is required"),
    }),
    expiryDate: Yup.string().when("paymentMethod", {
      is: "card",
      then: Yup.string()
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)"),
    }),
    cvv: Yup.string().when("paymentMethod", {
      is: "card",
      then: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "Invalid CVV"),
    }),
  });

  // Formik initialization
  const formik = useFormik({
    // initialValues: {
    //   fullName: "",
    //   email: "",
    //   phone: "",
    //   address: "",
    //   city: "",
    //   postalCode: "",
    //   country: "United States",
    //   discountCode: "",
    //   saveInfo: true,
    //   cardNumber: "",
    //   cardName: "",
    //   expiryDate: "",
    //   cvv: "",
    //   deliveryMethod: "delivery",
    //   paymentMethod: "card",
    // },
    validationSchema: step1Schema, // Initial schema for step 1
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
      discountCode: "",
      saveInfo: true,
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      deliveryMethod: "delivery",
      paymentMethod: "card",
    },
  })

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  // Update validation schema when step changes
  useEffect(() => {
    // if (activeStep === 1) {
    //   formik.setValidationSchema(step1Schema);
    // } else if (activeStep === 2) {
    //   formik.setValidationSchema(step2Schema);
    // }
  }, [activeStep]);

  const cartItems = [
    {
      name: "DueComfort Sofa Premium",
      price: 1299.99,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JeLflKzHbiITr2iiqql3VwQYGB70Py5SkQ&s",
      description: "Modern design, premium fabric",
    },
    {
      name: "IronOne Desk",
      price: 499.99,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_640.jpg",
      description: "Sturdy metal frame, oak top",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = deliveryMethod === "delivery" ? 29.99 : 0;
  const tax = subtotal * 0.07;
  const discountValue = discountApplied ? discountAmount : 0;
  const total = subtotal + shipping + tax - discountValue;

  const handleApplyDiscount = () => {
    if (!formik.values.discountCode.trim()) {
      setDiscountMessage("Please enter a discount code");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Simulate discount code validation
      if (formik.values.discountCode.toLowerCase() === "welcome10") {
        const discount = subtotal * 0.1;
        setDiscountApplied(true);
        setDiscountAmount(discount);
        setDiscountMessage("Discount applied successfully!");
      } else {
        setDiscountMessage("Invalid discount code");
        setDiscountApplied(false);
        setDiscountAmount(0);
      }
      setLoading(false);
    }, 600);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();

      formik.setFieldValue(name, formattedValue.substring(0, 19)); // limit to 16 digits + 3 spaces
    }
    // Format expiry date
    else if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
      }

      formik.setFieldValue(name, formatted);
    }
    // Handle checkbox
    else if (type === "checkbox") {
      formik.setFieldValue(name, checked);
    }
    // Handle normal inputs
    else {
      formik.handleChange(e);
    }
  };

  const handleNextStep = async () => {
    const isValid = await formik.validateForm();

    if (Object.keys(isValid).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setActiveStep((prev) => prev + 1);
        setLoading(false);
      }, 600);
    } else {
      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector(
          '[name="' + Object.keys(isValid)[0] + '"]'
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstErrorField.focus();
        }
      }, 100);
    }
  };

  const handlePreviousStep = () => {
    setLoading(true);
    setTimeout(() => {
      setActiveStep((prev) => prev - 1);
      setLoading(false);
    }, 400);
  };

  // Skeleton loading component
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-t-xl">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeStep >= 1
                ? "bg-white text-blue-600"
                : "bg-blue-400 text-white"
            }`}
          >
            {activeStep > 1 ? <Check size={22} /> : "1"}
          </div>
          <span className="mt-2 text-white text-sm font-medium">
            Information
          </span>
        </div>

        <div className="flex-1 h-1 mx-4 bg-blue-300 relative">
          <div
            className={`h-full transition-all duration-500 ${
              activeStep > 1 ? "bg-white" : "bg-transparent"
            }`}
            style={{ width: activeStep > 1 ? "100%" : "0%" }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeStep >= 2
                ? "bg-white text-blue-600"
                : "bg-blue-400 text-white"
            }`}
          >
            {activeStep > 2 ? <Check size={22} /> : "2"}
          </div>
          <span className="mt-2 text-white text-sm font-medium">Payment</span>
        </div>

        <div className="flex-1 h-1 mx-4 bg-blue-300 relative">
          <div
            className={`h-full transition-all duration-500 ${
              activeStep > 2 ? "bg-white" : "bg-transparent"
            }`}
            style={{ width: activeStep > 2 ? "100%" : "0%" }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeStep >= 3
                ? "bg-white text-blue-600"
                : "bg-blue-400 text-white"
            }`}
          >
            {activeStep > 3 ? <Check size={22} /> : "3"}
          </div>
          <span className="mt-2 text-white text-sm font-medium">
            Confirmation
          </span>
        </div>
      </div>
    </div>
  );

  // Mobile order summary toggle
  const MobileOrderSummary = () => (
    <div className="lg:hidden border rounded-lg mb-6">
      <button
        className="w-full p-4 flex items-center justify-between bg-gray-50 rounded-lg"
        onClick={() => setShowOrderSummary(!showOrderSummary)}
      >
        <div className="flex items-center">
          <ShoppingBag size={20} className="mr-2 text-gray-600" />
          <span className="font-medium">Order Summary</span>
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {cartItems.length} items
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-blue-700 mr-2">
            ${total.toFixed(2)}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              showOrderSummary ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {showOrderSummary && (
        <div className="p-4 border-t">
          <CartSummary />
        </div>
      )}
    </div>
  );

  // Cart summary component
  const CartSummary = ({ isSticky = false }) => (
    <div
      className={`bg-gray-50 p-6 rounded-xl ${
        isSticky ? "lg:sticky lg:top-6" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <ShoppingBag size={20} className="mr-2" />
        Order Summary
      </h2>

      {loading ? (
        <div className="space-y-4 mb-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex gap-4 pb-4 border-b border-gray-200"
            >
              <Skeleton className="w-20 h-20" />
              <div className="flex-1">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 pb-4 border-b border-gray-200 group hover:bg-gray-100 rounded-lg transition-all p-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md shadow-sm transition-transform group-hover:scale-105"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Gift
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                name="discountCode"
                value={formik.values.discountCode}
                onChange={formik.handleChange}
                placeholder="Discount code"
                disabled={loading || discountApplied}
                className="flex-1 p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full"
              />
            </div>
            <button
              className={`px-4 py-3 rounded-lg transition-colors ${
                discountApplied
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } disabled:opacity-50`}
              disabled={loading || discountApplied}
              onClick={handleApplyDiscount}
            >
              {discountApplied ? <Check size={16} /> : "Apply"}
            </button>
          </div>
          {discountMessage && (
            <p
              className={`text-sm ${
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

      {loading ? (
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discountApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discountValue.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span
              className={shipping === 0 ? "text-green-600 font-medium" : ""}
            >
              {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-700">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3 text-sm mb-4">
        <Shield size={18} className="text-blue-600 mt-0.5" />
        <p className="text-blue-800">
          Your payment is secure and encrypted. We never store your credit card
          details.
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start space-x-3 text-sm">
        <Truck size={18} className="text-green-600 mt-0.5" />
        <div>
          <p className="text-green-800 font-medium">Fast Shipping</p>
          <p className="text-green-800">
            {deliveryMethod === "delivery"
              ? "Estimated delivery in 3-5 business days"
              : "Ready for pickup in 24 hours"}
          </p>
        </div>
      </div>
    </div>
  );

  // Customer information step
  const CustomerInformationStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <User size={20} className="mr-2" />
        Customer Information
      </h2>

      {loading ? (
        <div className="space-y-6">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
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
                className={`w-full p-3 pl-10 border ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your full name"
              />
            </div>
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
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
                className={`w-full p-3 pl-10 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your email address"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 pl-10 border ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your phone number"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </>
      )}

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Truck size={20} className="mr-2" />
          Delivery Method
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`
                flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all
                ${
                  deliveryMethod === "delivery"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
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
              <Truck
                size={28}
                className={`mb-2 ${
                  deliveryMethod === "delivery"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span className="font-medium">Home Delivery</span>
              <span className="text-sm text-gray-500">
                $29.99 - 3-5 business days
              </span>
            </label>

            <label
              className={`
                flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all
                ${
                  deliveryMethod === "pickup"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
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
              <Home
                size={28}
                className={`mb-2 ${
                  deliveryMethod === "pickup"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span className="font-medium">Store Pickup</span>
              <span className="text-sm text-gray-500">
                Free - Ready in 24 hours
              </span>
            </label>
          </div>
        )}
      </div>

      {deliveryMethod === "delivery" && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6 animate-fadeIn">
          <h3 className="font-medium text-blue-800 flex items-center">
            <Home size={16} className="mr-2" />
            Shipping Address
          </h3>

          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border ${
                    formik.touched.address && formik.errors.address
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Enter your address"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-3 border ${
                      formik.touched.city && formik.errors.city
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="City"
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-3 border ${
                      formik.touched.postalCode && formik.errors.postalCode
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="Postal code"
                  />
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.postalCode}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-3 border ${
                      formik.touched.country && formik.errors.country
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.country}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="saveInfo"
          name="saveInfo"
          checked={formik.values.saveInfo}
          onChange={formik.handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
          Save this information for next time
        </label>
      </div>
    </div>
  );

  // Payment step
  const PaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <CreditCard size={20} className="mr-2" />
        Payment Method
      </h2>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label
              className={`
                flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all
                ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => {
                  setPaymentMethod("card");
                  formik.setFieldValue("paymentMethod", "card");
                }}
                className="sr-only"
              />
              <CreditCard
                size={28}
                className={`mb-2 ${
                  paymentMethod === "card" ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="font-medium">Credit Card</span>
            </label>

            <label
              className={`
                flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all
                ${
                  paymentMethod === "paypal"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => {
                  setPaymentMethod("paypal");
                  formik.setFieldValue("paymentMethod", "paypal");
                }}
                className="sr-only"
              />
              <div className="mb-2 text-lg font-bold text-blue-600">PayPal</div>
              <span className="font-medium">PayPal</span>
            </label>

            <label
              className={`
                flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all
                ${
                  paymentMethod === "applepay"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="applepay"
                checked={paymentMethod === "applepay"}
                onChange={() => {
                  setPaymentMethod("applepay");
                  formik.setFieldValue("paymentMethod", "applepay");
                }}
                className="sr-only"
              />
              <div className="mb-2 text-lg font-bold">Apple Pay</div>
              <span className="font-medium">Apple Pay</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4 animate-fadeIn">
              <h3 className="font-medium text-blue-800 flex items-center">
                <CreditCard size={16} className="mr-2" />
                Card Details
              </h3>

              <div className="space-y-1">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={handleInputChange}
                  onBlur={formik.handleBlur}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-3 border ${
                    formik.touched.cardNumber && formik.errors.cardNumber
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  maxLength={19}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formik.values.cardName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="John Doe"
                  className={`w-full p-3 border ${
                    formik.touched.cardName && formik.errors.cardName
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
                {formik.touched.cardName && formik.errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cardName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formik.values.expiryDate}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    placeholder="MM/YY"
                    className={`w-full p-3 border ${
                      formik.touched.expiryDate && formik.errors.expiryDate
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    maxLength={5}
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.expiryDate}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="123"
                    className={`w-full p-3 border ${
                      formik.touched.cvv && formik.errors.cvv
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    maxLength={4}
                  />
                  {formik.touched.cvv && formik.errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {paymentMethod !== "card" && (
            <div className="mt-4 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
              <p>
                You'll be redirected to complete your payment after reviewing
                your order.
              </p>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start space-x-3 text-sm mt-6">
            <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
            <p className="text-yellow-800">
              For demo purposes only. No actual payment will be processed.
            </p>
          </div>
        </>
      )}
    </div>
  );

  // Order confirmation step
  const ConfirmationStep = () => (
    <div className="text-center py-8">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-12 w-48 mt-4" />
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase.
          </p>
          <p className="text-gray-500 mb-6">
            Your order #{orderNumber} has been placed and is being processed.
          </p>

          <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Order number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Email:</span>
              <span>{formik.values.email}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Payment method:</span>
              <span>
                {paymentMethod === "card"
                  ? "Credit Card"
                  : paymentMethod === "paypal"
                  ? "PayPal"
                  : "Apple Pay"}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery method:</span>
              <span>
                {deliveryMethod === "delivery"
                  ? "Home Delivery"
                  : "Store Pickup"}
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              Track Order
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <ProgressIndicator />

      <div className="p-6">
        <MobileOrderSummary />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div>
            {activeStep === 1 && <CustomerInformationStep />}
            {activeStep === 2 && <PaymentStep />}
            {activeStep === 3 && <ConfirmationStep />}

            {activeStep < 3 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {activeStep > 1 ? (
                  <button
                    onClick={handlePreviousStep}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={loading}
                  >
                    <ArrowLeft size={18} className="mr-1" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={
                    activeStep === 2 ? formik.handleSubmit : handleNextStep
                  }
                  className={`px-6 py-3 ${
                    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded-lg transition-colors flex items-center disabled:opacity-50`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Processing</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : activeStep === 1 ? (
                    <>
                      <span>Continue to Payment</span>
                      <ChevronRight size={18} className="ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Complete Order</span>
                      <ChevronRight size={18} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary (desktop) */}
          <div className="hidden lg:block">
            <CartSummary isSticky={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCheckoutForm;
