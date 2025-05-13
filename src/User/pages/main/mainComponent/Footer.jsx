import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Home,
  Bed,
  Utensils,
  HeartPulse,
  Gift,
} from "lucide-react";

const HotelBookingFooter = () => {
  return (
    <footer className="bg-white text-black p-4 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xl font-bold mb-2">Shopee</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              Hotels
            </a>
            <a href="#" className="hover:text-gray-300">
              Bookings
            </a>
            <a href="#" className="hover:text-gray-300">
              Dictionaries
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
            <a href="#" className="hover:text-gray-300">
              Login
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} Shopee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HotelBookingFooter;
