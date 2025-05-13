import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FrmBookings from '../../pages/booking/component/FrmBookings'
const ModalDialog2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, rotateY: 140, scale: 0.8 }, // Start with a half-flipped state
    visible: { opacity: 1, rotateY: 0, scale: 1.1 },  // Flip to the front view
    exit: { opacity: 0, rotateY: 140, scale: 0.8 },  // Flip backward to the hidden state
  };
  

  // Variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="relative bg-black flex justify-center">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Booking
      </button>

      {/* AnimatePresence ensures smooth entry/exit animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)} // Close modal when backdrop is clicked
            />

            {/* Modal */}
            <motion.div
              className="fixed z-50 top-1/4  transform -translate-x-1/2 translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "backInOut",
              }}
              style={{ perspective: "100px" }} // Adds depth for the 3D flip effect
            >
              <h2 className="text-2xl font-bold mb-4">Bookie Booking</h2>
              <FrmBookings/>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModalDialog2;
