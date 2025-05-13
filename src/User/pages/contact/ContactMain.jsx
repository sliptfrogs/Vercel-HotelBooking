import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  SendHorizonal,
  SendHorizonalIcon,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@mui/material";
import { LoadingOutlined } from "@ant-design/icons";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Email",
      content: "contact@cambodiatours.com",
      action: "mailto:contact@cambodiatours.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-green-500" />,
      title: "Phone",
      content: "+855 23 456 789",
      action: "tel:+85523456789",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: "Location",
      content: "Street 21, Phnom Penh, Cambodia",
      action: "https://maps.google.com/?q=Phnom+Penh+Cambodia",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Open Hours",
      content: "Mon-Fri: 9AM - 5PM",
      action: null,
    },
  ];

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.5,
      },
    },
  };

  const faqData = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. For certain tours, we can also arrange for cash payments at our office.",
    },
    {
      question: "How far in advance should I book my tour?",
      answer:
        "We recommend booking at least 3-4 weeks in advance during peak season (November-February) and 2 weeks during off-peak season to ensure availability.",
    },
    {
      question: "Do you offer custom tour packages?",
      answer:
        "Yes! We specialize in creating custom itineraries tailored to your interests, timeframe, and budget. Contact us with your requirements and we'll design the perfect trip.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "Cancellations made 30+ days before departure receive a full refund minus deposit. 15-29 days: 50% refund. Less than 15 days: no refund. We recommend travel insurance for unexpected circumstances.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-xl mx-auto sm:py-20 py-12 md:py-20 px-4">
        {/* Hero Section */}
        <div
          ref={sectionRef}
          className="w-full sm:py-5 overflow-hidden relative"
        >
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="rounded-3xl  mt-10 lg:mt-0 border border-pink-500/5 inset-0 z-10 overflow-hidden bg-white/10 backdrop-blur-2xl  ">
              <div className=" lg:p-10 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                  {/* <div className="absolute bottom-1/2 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div> */}
                </div>

                {/* Contact Form and Map Section */}
                <div className="relative w-full h-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Right Column - Visual Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                    className="relative z-10 h-full  rounded-2xl overflow-hidden "
                  >
                    {/* Animated Grid Background */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Floating 3D Shapes */}
                    <motion.div
                      className="absolute top-[20%] sm:top-1/4 left-[15%] sm:left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-400/20 xl:backdrop-blur-lg backdrop-blur-2xl shadow-2xl"
                      animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-[20%] sm:bottom-1/4 right-[15%] sm:right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-purple-500/20 backdrop-blur-lg shadow-2xl"
                      animate={{
                        y: [0, 20, 0],
                        x: [0, -15, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                    <motion.div
                      className="absolute top-[25%] sm:top-1/3 right-[25%] sm:right-1/3 w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-pink-400/20 backdrop-blur-lg shadow-2xl"
                      animate={{ y: [0, 15, -15, 0], rotate: [0, 180, 360] }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                    />

                    {/* Main Content */}
                    <div className="relative gray-300/20 lg:backdrop-blur-2xl z-10 h-full flex flex-col items-center justify-center p-5 xl:p-10 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="max-w-md"
                      >
                        <div className="mb-6 flex justify-center">
                          <div className="p-4 border border-purple-500/20 bg-purple-500/10 backdrop-blur-md rounded-full shadow-xl">
                            <svg
                              className="w-12 h-12 text-purple-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* Header */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                          className="text-center relative z-10"
                        >
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
                            <span className="text-purple-500 font-extrabold">
                              Contact/
                            </span>{" "}
                            We're here to help.
                          </h1>
                        </motion.div>
                        <ul className="space-y-4 text-left max-w-xs mx-auto">
                          {[
                            "40% faster delivery cycles",
                            "Smooth cross-team collaboration",
                            "Automated daily task handling",
                          ].map((point, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="flex-shrink-0 w-5 h-5 text-green-400 mt-0.5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-black/90">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className=" overflow-hidden relative p-6 md:p-8 "
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative z-20 "
                    >
                      {submitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 text-center"
                        >
                          <p className="font-medium">
                            Thank you for your message!
                          </p>
                          <p className="text-sm mt-1">
                            We'll respond to you shortly.
                          </p>
                        </motion.div>
                      ) : (
                        <div ref={formRef} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 outline-none py-2 border-none ring-1  bg-slate-50/10 rounded  transition-colors"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 outline-none py-2 border-none ring-1  bg-slate-50/10 rounded  transition-colors"
                                placeholder="e.g. example@gmail.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Phone (Optional)
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 outline-none py-2 border-none ring-1  bg-slate-50/10 rounded  transition-colors"
                                placeholder="+1 54 5 44 5 "
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Subject
                              </label>
                              <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 outline-none py-2 border-none ring-1  bg-slate-50/10 rounded  transition-colors"
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Your Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={5}
                              className="w-full px-4 outline-none py-2 border-none ring-1  bg-slate-50/10 rounded  transition-colors"
                              placeholder="Tell us what you need help with..."
                            ></textarea>
                          </div>
                          <div>
                            <Button
                              onClick={handleSubmit}
                              disabled={loading}
                              className={`!w-full !flex !items-center !justify-center !bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !py-2 !px-4 !rounded !normal-case !transition-colors ${
                                loading ? "!opacity-70 !cursor-not-allowed" : ""
                              }`}
                              sx={{
                                minWidth: 0,
                                border: "1px solid",
                                gap: "10px",
                              }}
                            >
                              {loading ? (
                                <span className="flex items-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Send className="mr-2 h-5 w-5" />
                                  Send Message
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Section pattern background */}
                <div
                  className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                        radial-gradient(circle at center, 
                          rgba(0, 0, 0, 0.3) 1px, 
                          transparent 1.5px
                        )
                      `,
                    backgroundSize: "16px 16px",
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="rounded-3xl my-7 border border-pink-500/5 inset-0 z-10 overflow-hidden bg-white/10 backdrop-blur-2xl  ">
              <div className="px-5 py-7 lg:py-16 lg:px-10 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                {/* Content */}
                <div className="relative  z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="border border-purple-300/20 bg-purple-300/5 rounded-xl p-6  flex flex-col items-center text-center cursor-pointer"
                      onClick={() =>
                        info.action && window.open(info.action, "_blank")
                      }
                    >
                      <div className="p-3 text-center bg-gray-500/5 border border-gray-500/10  rounded-full mb-4">
                        {info.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.content}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Load more button */}
                {loading ? (
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    onClick={handleSubmit}
                    className="absolute gap-4 p-1 justify-center rounded px-2 text-3xl bottom-0 lg:bottom-5  hover:text-purple-500/80 text-purple-500 cursor-pointer left-1/2 transform -translate-x-1/2  flex items-center text-center"
                  >
                    <LoadingOutlined size={3} />
                    <span className="text-lg font-medium">Processing...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    onClick={handleSubmit}
                    className="absolute  justify-center rounded px-2 text-3xl bottom-0 lg:bottom-5  hover:text-purple-500/80 text-purple-500 cursor-pointer left-1/2 transform -translate-x-1/2  flex items-center gap-2 text-center"
                  >
                    <ChevronDown className="w-8 h-8" />
                    <span className="text-lg font-medium">See more</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="rounded-3xl border border-pink-500/5 inset-0 z-10 overflow-hidden bg-white/10 backdrop-blur-2xl  ">
              <div className="px-5 py-7 lg:py-16 lg:px-10 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Floating 3D Shapes */}
                <motion.div
                  className="absolute top-[20%] sm:top-1/4 left-[15%] sm:left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-400/20 xl:backdrop-blur-lg backdrop-blur-2xl shadow-2xl"
                  animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-[20%] sm:bottom-1/4 right-[15%] sm:right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-purple-500/20 backdrop-blur-lg shadow-2xl"
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-[25%] sm:top-1/3 right-[25%] sm:right-1/3 w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-pink-400/20 backdrop-blur-lg shadow-2xl"
                  animate={{ y: [0, 15, -15, 0], rotate: [0, 180, 360] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative z-10 lg:mt-0"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 border border-purple-500/20 bg-purple-500/10 backdrop-blur-md rounded-full shadow-xl">
                      <svg
                        className="w-12 h-12 text-purple-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center  mb-10 relative z-10"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
                      <span className="text-purple-500 font-extrabold">
                        Frequently,
                      </span>{" "}
                      Asked Questions
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Find quick answers to common questions about our tours and
                      services
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqData.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10  lg:backdrop-blur-lg p-6 rounded-xl shadow-sm lg:border-none border border-blue-100"
                      >
                        <h3 className="font-semibold flex items-center gap-3 text-center lg:text-start text-lg mb-2">
                          <ChevronRight className="hidden lg:block" />
                          {faq.question}
                        </h3>

                        <span className="text-center lg:hidden flex justify-center items-center">
                          <ChevronDown className="" />
                        </span>

                        <p className="text-gray-600  text-center lg:text-start">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-10">
                    <p className="text-gray-600">
                      Still have questions?{" "}
                      <button className="text-blue-600 hover:underline font-medium">
                        View all FAQs
                      </button>{" "}
                      or{" "}
                      <button className="text-blue-600 hover:underline font-medium">
                        contact our support team
                      </button>
                      .
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
