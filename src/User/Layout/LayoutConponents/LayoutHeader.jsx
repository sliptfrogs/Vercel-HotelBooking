import { motion, AnimatePresence } from "framer-motion";
import {
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LayoutHeader = ({ onPageChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const urlPath = useLocation();

  // Handle resize events for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Bookings", path: "/bookings" },
    { name: "Destinations", path: "/destinations" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        },
      }}
      className="fixed z-50 p-0 text-gray-100 bg-gray-700/20 backdrop-blur-lg w-full shadow-sm"
    >
      <div className="h-[65px] flex justify-between px-4 md:px-5 w-full bg-inherit items-center">
        {/* Logo with subtle hover animation */}
        <div className="flex items-center">
          <Link to="/" onClick={() => onPageChange("home")}>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon with responsive sizing and subtle glow */}
              <motion.div
                className="flex items-center justify-center"
                whileHover={{ rotate: -5 }}
              >
                <ShoppingOutlined className="text-2xl md:text-2xl p-2 md:p-3 text-blue-400 hover:text-blue-300 transition-colors duration-300" />
              </motion.div>

              {/* Text with responsive sizing and gradient */}
              <motion.span
                className="text-xl md:text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent"
               
              >
                Bookie
              </motion.span>

              {/* Optional badge for special status (remove if not needed) */}
              <motion.span
                className="ml-2 px-2 py-1 text-xs md:text-sm rounded-full bg-purple-500/20 text-purple-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Pro
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Navigation with improved active state */}
        <div className="hidden md:flex items-center justify-center">
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => onPageChange(tab.name)}
                className="relative px-4 py-2 text-sm rounded-lg"
              >
                {urlPath.pathname === tab.path && (
                  <motion.span
                    layoutId="desktop-active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                )}
                <motion.span
                  className={`relative z-10 ${
                    urlPath.pathname === tab.path
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.name}
                </motion.span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Account Section - Visible on all devices */}
        <div className="flex items-center space-x-3">
          <UserAvatar isLoggedIn={isLoggedIn} />

          {/* Mobile Menu Toggle with better feedback */}
          <div className="flex  md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="flex p-3 rounded-full bg-gray-700/10 hover:bg-gray-700/20"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <CloseOutlined className="text-white text-lg" />
              ) : (
                <MenuOutlined className="text-white text-lg" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "100vh",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  duration: 0.2,
                },
              }}
              className="w-full  md:hidden overflow-auto bg-gray-800/95 backdrop-blur-lg absolute top-[65px] left-0 px-4 py-6"
            >
              <div className="flex flex-col space-y-3 px-2 ">
                <h3 className="text-white/70 text-lg">Menu</h3>
                {tabs.map((tab) => (
                  <Link
                    key={`mobile-${tab.path}`}
                    to={tab.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onPageChange(tab.name);
                    }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl flex items-center justify-center ${
                        urlPath.pathname === tab.path
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gray-700/50 hover:bg-gray-700/80"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-white font-medium text-lg">
                        {tab.name}
                      </span>
                    </motion.div>
                  </Link>
                ))}

                {/* Account options in mobile menu */}
                <motion.div
                  className=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2 },
                  }}
                ></motion.div>
              </div>
              <h3 className="text-white/70 text-lg mb-3 px-2">Account</h3>
              {isLoggedIn ? (
                <>
                  <AccountButton label="My Profile" />
                  <AccountButton label="My Orders" />
                  <AccountButton label="Wishlist" />
                  <AccountButton
                    label="Logout"
                    onClick={() => setIsLoggedIn(false)}
                    className="bg-red-500 text-red-400"
                  />
                </>
              ) : (
                <>
                  <AccountButton
                    label="Login"
                    onClick={() => setIsLoggedIn(true)}
                    className="bg-blue-500 text-white"
                  />
                  <AccountButton
                    label={<span className="text-blue-500">Register</span>}
                    className=" text-blue-500 border border-blue-500"
                  />
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Account button component for mobile menu
const AccountButton = ({ label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`w-full p-3 mb-2 rounded-lg text-white flex items-center justify-center ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
  >
    {label}
  </motion.button>
);

// Enhanced UserAvatar with better animations
const UserAvatar = ({ isLoggedIn }) => (
  <Dropdown
    overlayClassName="origin-top-right "
    menu={{
      items: isLoggedIn
        ? [
            { key: "profile", label: "Profile" },
            { key: "orders", label: "My Orders" },
            { key: "wishlist", label: "Wishlist" },
            { type: "divider" },
            {
              key: "logout",
              label: <motion.div whileHover={{ x: 2 }}>Logout</motion.div>,
            },
          ]
        : [
            {
              key: "login",
              label: <motion.div whileHover={{ x: 2 }}>Login</motion.div>,
            },
            {
              key: "register",
              label: <motion.div whileHover={{ x: 2 }}>Register</motion.div>,
            },
          ],
    }}
    trigger={["click"]}
  >
    <Badge dot={isLoggedIn}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
      >
        <Avatar
          shape="circle"
          icon={<UserOutlined />}
          className="flex p-5 rounded-full bg-gray-700/10 hover:bg-gray-700/20"
        />
      </motion.div>
    </Badge>
  </Dropdown>
);

export default LayoutHeader;
