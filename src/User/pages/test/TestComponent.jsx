import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const WarpOverlay = ({ intensity = 0.1 }) => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        setSize({
            width: ref.current?.clientWidth || 0,
            height: ref.current?.clientHeight || 0,
        });
    }, [ref]);

    const [selectedEmails, setSelectedEmails] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const deform = useMotionValue(0);
    const rotateX = useTransform(() => deform.get() * -5);
    const skewY = useTransform(() => deform.get() * -1.5);
    const scaleY = useTransform(() => 1 + deform.get() * intensity);
    const scaleX = useTransform(() => 1 - deform.get() * intensity * 0.6);

    const handleDeleteClick = () => {
        if (selectedEmails.length === 0) return;

        setIsDeleteModalOpen(true);

        animate([
            [deform, 1, { duration: 0.3, ease: [0.65, 0, 0.35, 1] }],
            [deform, 0, { duration: 1.5, ease: [0.22, 1, 0.36, 1] }],
        ]);
    };

    const handleCheckboxChange = (index) => {
        setSelectedEmails((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const closeModal = () => setIsDeleteModalOpen(false);

    return (
        <div className="  w-full pt-36 flex items-center justify-center bg-gray-100 p-5">
            {/* iPhone Mockup Container */}
            <div className="relative w-[375px] h-[650px] bg-gray-900 rounded-[45px] shadow-[0_0_0_14px_#121212,0_0_0_17px_#232323,0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* iPhone Screen */}
                <div className="relative w-full h-full bg-[#0b1011] rounded-[35px] overflow-hidden flex flex-col">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-[20px] z-[2000]"></div>
                    
                    {/* Status Bar */}
                    <div className="h-[30px]  px-5 flex justify-between items-center text-white font-semibold text-sm pt-4">
                        <div>9:41</div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 overflow-hidden mt-2.5" ref={ref}>
                        <motion.div
                            className="h-full bg-[#0b1011] text-[#f5f5f5]"
                            style={{
                                rotateX,
                                skewY,
                                scaleY,
                                scaleX,
                                originX: 0.5,
                                originY: 0,
                                transformPerspective: 500,
                                willChange: "transform",
                            }}
                        >
                            {/* Email App Header */}
                            <header className="flex justify-between items-center py-[26px] px-5 pb-4 border-b border-[#1d2628]">
                                <h1 className="text-2xl font-normal">Inbox</h1>
                                <motion.button
                                    className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
                                    onClick={handleDeleteClick}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={selectedEmails.length === 0}
                                    aria-label="Delete"
                                >
                                    <DeleteIcon />
                                </motion.button>
                            </header>

                            {/* Email List */}
                            <div className="h-[calc(100%-80px)] overflow-y-auto">
                                {fakeEmails.map((email, index) => (
                                    <div key={index} className="flex items-center p-4 px-5 border-b border-[#1d2628] gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium mb-2">{email.subject}</h3>
                                            <p className="text-sm opacity-70 line-clamp-2">{email.preview}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedEmails.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Delete Modal */}
                    <AnimatePresence>
                        {isDeleteModalOpen && (
                            <ImmersiveOverlay
                                close={closeModal}
                                itemCount={selectedEmails.length}
                                size={size}
                            />
                        )}
                    </AnimatePresence>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-1 bg-white/20 rounded-[3px] z-[2000]"></div>
                </div>
            </div>
        </div>
    );
};

const GradientOverlay = ({ size }) => {
    const breathe = useMotionValue(0);

    useEffect(() => {
        async function playBreathingAnimation() {
            await animate(breathe, 1, {
                duration: 0.5,
                delay: 0.35,
                ease: [0, 0.55, 0.45, 1],
            });

            animate(breathe, [null, 0.7, 1], {
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            });
        }

        playBreathingAnimation();

        return () => {
            breathe.stop();
        };
    }, []);

    const enterDuration = 0.75;
    const exitDuration = 0.5;
    const expandingCircleRadius = size.width / 3;

    return (
        <div className="absolute inset-0 z-[1001]">
            {/* Expanding Circle */}
            <motion.div
                className="absolute rounded-full bg-[rgb(233,167,160)] blur-[15px]"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                    scale: 10,
                    opacity: 0.2,
                    backgroundColor: "rgb(246, 63, 42)",
                    transition: {
                        duration: enterDuration,
                        opacity: { duration: enterDuration, ease: "easeInOut" },
                    },
                }}
                exit={{
                    scale: 0,
                    opacity: 1,
                    backgroundColor: "rgb(233, 167, 160)",
                    transition: { duration: exitDuration },
                }}
                style={{
                    left: `calc(50% - ${expandingCircleRadius / 2}px)`,
                    top: "100%",
                    width: expandingCircleRadius,
                    height: expandingCircleRadius,
                    originX: 0.5,
                    originY: 1,
                }}
            />

            {/* Gradient Circles */}
            <motion.div
                className="absolute rounded-full blur-[100px] bg-[rgb(246,63,42,0.9)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9, transition: { duration: enterDuration } }}
                exit={{ opacity: 0, transition: { duration: exitDuration } }}
                style={{
                    scale: breathe,
                    width: size.width * 2,
                    height: size.width * 2,
                    top: -size.width,
                    left: -size.width,
                }}
            />

            <motion.div
                className="absolute rounded-full blur-[100px] bg-[rgb(243,92,76,0.9)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9, transition: { duration: enterDuration } }}
                exit={{ opacity: 0, transition: { duration: exitDuration } }}
                style={{
                    scale: breathe,
                    width: size.width * 2,
                    height: size.width * 2,
                    top: size.height - size.width,
                    left: 0,
                }}
            />
        </div>
    );
};

const ImmersiveOverlay = ({ close, itemCount, size }) => {
    const transition = { duration: 0.35, ease: [0.59, 0, 0.35, 1] };

    const enteringState = {
        rotateX: 0,
        skewY: 0,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        transition: { ...transition, y: { type: "spring", duration: 0.7, bounce: 0.2 } },
    };

    const exitingState = {
        rotateX: -5,
        skewY: -1.5,
        scaleY: 2,
        scaleX: 0.4,
        y: 100,
    };

    return (
        <div className="absolute inset-0 overflow-hidden" onClick={close}>
            <GradientOverlay size={size} />
            
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-[1001] bg-[rgba(246,63,42,0.2)] backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
            >
                <motion.div
                    className="w-[75%] flex flex-col items-center gap-8"
                    onClick={(e) => e.stopPropagation()}
                    initial={exitingState}
                    animate={enteringState}
                    exit={exitingState}
                    transition={transition}
                    style={{
                        transformPerspective: 1000,
                        originX: 0.5,
                        originY: 0,
                    }}
                >
                    <header className="flex flex-col items-center gap-1">
                        <h2 className="text-xl text-white">{itemCount} {itemCount === 1 ? "item" : "items"}</h2>
                        <p className="text-[#f5f5f5] text-center">
                            Are you sure you want to delete these entries? You can't undo this action.
                        </p>
                    </header>
                    
                    <div className="flex flex-col items-center gap-2.5">
                        <button 
                            onClick={close} 
                            className="bg-white text-[#0f1115] rounded-[20px] px-5 py-2 text-base"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={close} 
                            className="text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const DeleteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
);

const fakeEmails = [
    {
        subject: "Weekly team update",
        preview: "Hi team, Just a quick update on our progress this week. We've made significant strides in the new project and...",
    },
    {
        subject: "Your subscription confirmation",
        preview: "Thank you for subscribing to our newsletter! You'll now receive updates about our latest products and exclusive offers...",
    },
    {
        subject: "Invoice #1234 for April",
        preview: "Your monthly invoice is now available. Please find attached the detailed breakdown of your subscription charges for...",
    },
    {
        subject: "Security alert: New login",
        preview: "We detected a new sign-in to your account from a new device or location. If this was you, you can safely ignore this...",
    },
    {
        subject: "Upcoming maintenance notice",
        preview: "Please be advised that our platform will undergo scheduled maintenance this weekend. During this time, services may be...",
    },
];

export default WarpOverlay;