import React, { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reviews from "./Reviews";
import AnimatedBox from "../../../../components/common/AnimatedBox";
import AnimatedText from "../../../../components/common/TextInitialize";
import { Link } from "react-router-dom";
const LazyMap = React.lazy(() => import("../../../components/common/LazyMap"));
import { amenitiesIcons } from "../../../store/hotelStore";
import {
  Clock,
  CreditCard,
  Droplets,
  Hotel,
  ListChecks,
  MapPin,
  Star,
} from "lucide-react";
import RoomRendering from "./RoomRendering";
import { LazyImage } from "../../../components/common/LazyImage";

const HotelListCard = ({ hotel }) => {
  const [activeTab, setActiveTab] = useState("Rooms");
  const tabs = ["Rooms", "Reviews", "Details & Map", "Policies"];
  const [isOpen, setIsOpen] = useState(null);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleIsReviewOpen = (openId) => {
    if (openId === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(openId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Rooms":
        return (
          <div className="space-y-4">
            {hotel.sections.rooms.map((room) => (
              <RoomRendering room={room} key={room.id} />
            ))}
          </div>
        );
      case "Reviews":
        return (
          <div className="w-full overflow-y-auto bg-white p-4 rounded-lg max-h-[60vh]">
            {hotel.sections.reviews.map((review, index) => (
              <Reviews
                key={`${review.id}-${index}`}
                id={review.id}
                data={review}
                isOpenId={isOpen}
                handleIsOpen={handleIsReviewOpen}
              />
            ))}
          </div>
        );
      case "Details & Map":
        return (
          <div className="bg-white rounded-lg p-4 md:p-6 overflow-hidden ">
            <h3 className="text-lg font-bold mb-4">Details & Map</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Hotel className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">{hotel.name}</p>
                  <p className="text-gray-600">
                    {hotel.policies.checkIn} / {hotel.policies.checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div className="w-full">
                  <p className="font-medium">{hotel.location}</p>
                  {/* Map Section */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="col-span-1 min-h-[40vh] border rounded-lg p-1"
                  >
                    <LazyMap
                      containerClassName="w-full"
                      className="w-full"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.9976164977274!2d103.86441077374005!3d13.412474505061937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110168aea9a272d:0x3eaba81157b0418d!2sAngkor%20Wat!5e0!3m2!1sen!2skh!4v1743744702998!5m2!1sen!2skh"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="flex items-start">
                <ListChecks className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Amenities</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hotel.amenities.general
                      .filter((item) => item.available)
                      .map((amenity) => (
                        <div
                          key={`${amenity.id}-${amenity}`}
                          className="flex items-center text-sm text-gray-600 bg-slate-100 px-2 py-1 rounded"
                        >
                          {amenitiesIcons[amenity.icon]}
                          <span className="ml-1 capitalize">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Policies":
        return (
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4">Policies</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Check-in/Check-out</p>
                  <p className="text-gray-600">
                    {hotel.policies.checkIn} / {hotel.policies.checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-gray-600">{hotel.policies.cancellation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Droplets className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Pet Policy</p>
                  <p className="text-gray-600">{hotel.policies.pets}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div className="w-full mb-8 p-3 border rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Hotel Image */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-lg overflow-hidden w-full md:w-1/3 aspect-video md:aspect-[3/4]"
        >
          <LazyImage
            key={hotel.id}
            src={hotel.image}
            className="w-full h-full object-cover transition-all duration-300"
          />
          {hotel.available ? (
            <div className="absolute top-3 right-3 bg-green-500/10 border rounded-md cursor-default border-green-500 px-3 py-1 text-green-500 text-sm">
              Available
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-yellow-500/10 border rounded-md cursor-default border-yellow-300 px-3 py-1 text-yellow-300 text-sm">
              Maintenance
            </div>
          )}
        </motion.div>

        {/* Hotel Content */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-2/3"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
              <div className="text-gray-600 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{hotel.location}</span>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded self-start md:self-auto">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
              <span className="mx-1 text-gray-400">|</span>
              <span className="text-sm text-gray-600">
                {hotel.reviews} reviews
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4">
            <div className="relative overflow-x-auto">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={`${hotel.id}-${tab}`}
                    onClick={() => handleTabClick(tab)}
                    className={`relative z-10 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "text-blue-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId={`activeTabBg-${hotel.id}`}
                        className="absolute inset-0 border-b border-blue-500 z-0"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-3 "
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(HotelListCard);
