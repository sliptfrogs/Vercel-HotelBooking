import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cable, ChevronLeft, ChevronRight, Search, Shrimp } from "lucide-react";
import { Button } from "@mui/material";
import { LazyImage } from "../../components/common/LazyImage";
import { Empty, Skeleton } from "antd";
import MultipleSelect from "../../components/common/MultipleSelect";
import AntDisplayImage from "../../../User/components/common/AntDisplayImage";
import FilteringSelection from "../../components/common/FilteringSelection";

const ImageModalGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const images = [
    {
      id: 1,
      title: "Angkor Wat",
      subtitle: "Ancient Temple Complex",
      description:
        "The largest religious monument in the world, built in the 12th century as a Hindu temple and later transformed into a Buddhist site. A UNESCO World Heritage Site and symbol of Cambodia.",
      thumbnail:
        "https://www.shutterstock.com/image-photo/unidentified-young-couple-green-traditional-600nw-2483977741.jpg",
      fullSize:
        "https://www.shutterstock.com/image-photo/unidentified-young-couple-green-traditional-600nw-2483977741.jpg",
      category: "Temple",
    },
    {
      id: 2,
      title: "Siem Reap",
      subtitle: "Cultural Gateway",
      description:
        "The vibrant town serving as the base for exploring Angkor temples, known for its night markets, Cambodian circus performances, and French colonial architecture.",
      thumbnail:
        "https://www.asiakingtravel.com/images/thumbs/2024/02/9116/pub-street-siem-reap-banner_1900x700xcrop.webp",
      fullSize:
        "https://www.asiakingtravel.com/images/thumbs/2024/02/9116/pub-street-siem-reap-banner_1900x700xcrop.webp",
      category: "Cultural Hub",
    },
    {
      id: 3,
      title: "Phnom Penh",
      subtitle: "Capital City",
      description:
        "Cambodia's bustling capital where modernity meets history, featuring royal palaces, the haunting Tuol Sleng Museum, and lively riverside promenades.",
      thumbnail:
        "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&h=400&fit=crop",
      fullSize:
        "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=3840&h=2160&fit=crop",
      category: "Modern City",
    },
    {
      id: 4,
      title: "Sihanoukville Beaches",
      subtitle: "Tropical Coastline",
      description:
        "Once a quiet fishing village, now known for its white-sand beaches and gateway to paradise islands like Koh Rong with bioluminescent plankton.",
      thumbnail:
        "https://t3.ftcdn.net/jpg/12/49/32/20/360_F_1249322075_gSQ9VsZd52Mel2LXeU662hqKg4KzGzbd.jpg",
      fullSize:
        "https://t3.ftcdn.net/jpg/12/49/32/20/360_F_1249322075_gSQ9VsZd52Mel2LXeU662hqKg4KzGzbd.jpg",
      category: "Beach Resort",
    },
    {
      id: 5,
      title: "Battambang",
      subtitle: "Colonial Charm",
      description:
        "Cambodia's best-preserved colonial town, famous for its bamboo train, French-era buildings, and nearby Phnom Sampeau's bat caves.",
      thumbnail:
        "https://c1.wallpaperflare.com/preview/204/297/178/cambodia-asia-boat-trip-according-to-battambang.jpg",
      fullSize:
        "https://c1.wallpaperflare.com/preview/204/297/178/cambodia-asia-boat-trip-according-to-battambang.jpg",
      category: "Historical Town",
    },
    {
      id: 6,
      title: "Koh Rong",
      subtitle: "Island Paradise",
      description:
        "A stunning tropical island known for its crystal-clear waters, white sandy beaches, and vibrant marine life.",
      thumbnail:
        "https://images.pexels.com/photos/12001665/pexels-photo-12001665.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      fullSize:
        "https://images.pexels.com/photos/12001665/pexels-photo-12001665.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      category: "Island Getaway",
    },
    {
      id: 7,
      title: "Tonle Sap Lake",
      subtitle: "Freshwater Wonder",
      description:
        "Southeast Asia's largest freshwater lake, known for its floating villages, diverse wildlife, and seasonal changes.",
      thumbnail:
        "https://c1.wallpaperflare.com/preview/767/970/442/sunset-tonle-sap-lake-water.jpg",
      fullSize:
        "https://c1.wallpaperflare.com/preview/767/970/442/sunset-tonle-sap-lake-water.jpg",
      category: "Temple",
    },
    {
      id: 8,
      title: "Bokor Mountain",
      subtitle: "Mountain Adventure",
      description:
        "A scenic mountain known for its cool weather, stunning views, and abandoned French colonial buildings.",
      thumbnail:
        "https://t4.ftcdn.net/jpg/04/74/81/81/360_F_474818116_eeabJSkwctYyXTLg2PHpWQLMVwTIOFlC.jpg",
      fullSize:
        "https://t4.ftcdn.net/jpg/04/74/81/81/360_F_474818116_eeabJSkwctYyXTLg2PHpWQLMVwTIOFlC.jpg",
      category: "Temple",
    },
    {
      id: 9,
      title: "Preah Vihear Temple",
      subtitle: "Ancient Khmer Architecture",
      description:
        "An ancient Hindu temple located on a 525-meter mountain, offering breathtaking views of the Cambodian plains.",
      thumbnail:
        "https://i.pinimg.com/736x/5e/01/b5/5e01b588678c51c3c8e4f011723ea6bc.jpg",
      fullSize:
        "https://i.pinimg.com/736x/5e/01/b5/5e01b588678c51c3c8e4f011723ea6bc.jpg",
      category: "Temple",
    },
    {
      id: 10,
      title: "Kampot",
      subtitle: "Pepper Town",
      description:
        "A charming town known for its pepper plantations, salt fields, and stunning views of the Bokor Mountains.",
      thumbnail:
        "https://img.freepik.com/premium-photo/giant-seahorse-kampot-cambodia-amazing_720542-135.jpg",
      fullSize:
        "https://img.freepik.com/premium-photo/giant-seahorse-kampot-cambodia-amazing_720542-135.jpg",
      category: "Temple",
    },
  ];
  const cambodiaDestinations = [
    {
      id: 1,
      name: "Angkor Wat",
      location: "Siem Reap",
      category: "Historical Temple",
      description:
        "The world's largest religious structure, originally built as a Hindu temple in the 12th century and later transformed into a Buddhist complex. A UNESCO World Heritage Site and the pride of Cambodia.",
      image:
        "https://www.shutterstock.com/image-photo/unidentified-young-couple-green-traditional-600nw-2483977741.jpg", // High-res by Bjørn Christian Tørrissen (CC BY-SA 4.0)
      bestTimeToVisit: "November - February (Cool, dry season)",
      highlights: [
        "Sunrise over the main temple",
        "Intricate bas-reliefs depicting Hindu epics",
        "Jungle-covered Ta Prohm temple",
        "The smiling faces of Bayon temple",
      ],
    },
    {
      id: 2,
      name: "Siem Reap",
      location: "Northwestern Cambodia",
      category: "Cultural Hub",
      description:
        "The vibrant gateway city to Angkor, blending ancient Khmer culture with modern amenities, known for its lively markets, art scene, and nightlife.",
      image:
        "https://visitlocaltravel.com/blog/wp-content/uploads/2023/12/Siem-Reap-Pub-Street.png", // CC BY 2.0 by Adam Jones
      bestTimeToVisit: "November - March",
      highlights: [
        "Pub Street nightlife",
        "Phare Cambodian Circus",
        "Artisans Angkor workshops",
        "Floating villages on Tonlé Sap",
      ],
    },
    {
      id: 3,
      name: "Phnom Penh",
      location: "Southern Cambodia",
      category: "Capital City",
      description:
        "Cambodia's bustling capital where the Mekong and Tonlé Sap rivers meet, offering a mix of colonial architecture, royal grandeur, and sobering historical sites.",
      image:
        "https://www.geckoroutes.com/wp-content/uploads/2020/06/phnom-penh-cambodia.jpg", // CC BY-SA 3.0 by Jakub Hałun
      bestTimeToVisit: "December - January",
      highlights: [
        "Royal Palace and Silver Pagoda",
        "National Museum of Cambodia",
        "Tuol Sleng Genocide Museum",
        "Riverside dining and sunset cruises",
      ],
    },
    {
      id: 4,
      name: "Sihanoukville",
      location: "Southern Coast",
      category: "Beach Destination",
      description:
        "Cambodia's premier beach town with palm-fringed shores and access to pristine islands, though undergoing rapid development.",
      image:
        "https://champameuanglao.com/wp-content/uploads/2023/08/1-Koh-Song-Saa-copy.jpg", // CC BY 2.0 by Michael Coghlan
      bestTimeToVisit: "November - April",
      highlights: [
        "Serenity Beach on Koh Rong",
        "Snorkeling at Koh Rong Samloem",
        "Ream National Park mangroves",
        "Fresh seafood at Otres Market",
      ],
    },
    {
      id: 5,
      name: "Battambang",
      location: "Northwestern Cambodia",
      category: "Cultural City",
      description:
        "Cambodia's best-preserved colonial town, known for its French architecture, bamboo railway, and thriving arts scene.",
      image:
        "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/a_statue_of_lok_ta_dambang_kronhung_at_his_namesake_roundabout_on_national_road_5_in_battambang_town._yousos_apdoulrashim.jpg", // CC BY-SA 3.0 by Kounosu
      bestTimeToVisit: "November - February",
      highlights: [
        "Ride the famous bamboo train",
        "Phare Ponleu Selpak circus school",
        "Bat caves at Phnom Sampeau",
        "Colonial-era shophouses",
      ],
    },
    {
      id: 6,
      name: "Koh Ker",
      location: "Preah Vihear Province",
      category: "Archaeological Site",
      description:
        "The remote 10th-century capital of the Khmer Empire featuring a unique seven-tiered pyramid temple surrounded by jungle.",
      image:
        "https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/an_aerial_view_of_the_10th_century_koh_ker_temple_complex_in_preah_vihear_province._unesco.jpg", // CC BY 2.0 by Kyle Taylor
      bestTimeToVisit: "November - April (Dry season)",
      highlights: [
        "Prasat Thom pyramid temple",
        "Ancient lingas in Prang temple",
        "Remote jungle setting",
        "Fewer crowds than Angkor",
      ],
    },
    {
      id: 7,
      name: "Kratie",
      location: "Mekong River",
      category: "Eco-Tourism",
      description:
        "A tranquil riverside town famous for its endangered Irrawaddy dolphins and beautiful Mekong sunsets.",
      image:
        "https://media.gadventures.com/media-server/dynamic/blogs/posts/becki-enright/2017/06/kratieburn2.jpg", // CC BY 2.0 by Stefan Fussan
      bestTimeToVisit: "December - May",
      highlights: [
        "Irrawaddy dolphin spotting",
        "Cycling on Koh Trong island",
        "French colonial architecture",
        "Mekong River sunset cruises",
      ],
    },
    {
      id: 8,
      name: "Kampot",
      location: "Southern Cambodia",
      category: "Riverside Town",
      description:
        "A charming riverside town famous for its pepper plantations, laid-back vibe, and French colonial ruins.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/c2/90/72/caption.jpg?w=300&h=300&s=1", // CC BY-SA 4.0 by B20180
      bestTimeToVisit: "November - March",
      highlights: [
        "Kampot pepper plantations",
        "Bokor Mountain day trip",
        "Riverfront dining",
        "Kayaking on the Kampot River",
      ],
    },
  ];

  const destinationFilterOptions = {
    "Temples & Religious Sites": [
      { value: "siem-reap", label: "Angkor Wat (Siem Reap)" },
      { value: "siem-reap", label: "Bayon Temple (Siem Reap)" },
      { value: "siem-reap", label: "Ta Prohm (Siem Reap)" },
      { value: "banteay-meanchey", label: "Banteay Chhmar (Banteay Meanchey)" },
      { value: "phnom-penh", label: "Wat Phnom (Phnom Penh)" },
      { value: "preah-vihear", label: "Preah Vihear Temple (Preah Vihear)" },
    ],
    "Beaches & Islands": [
      { value: "preah-sihanouk", label: "Otres Beach (Sihanoukville)" },
      { value: "preah-sihanouk", label: "Sokha Beach (Sihanoukville)" },
      { value: "preah-sihanouk", label: "Koh Rong Island (Sihanoukville)" },
      { value: "preah-sihanouk", label: "Koh Rong Samloem (Sihanoukville)" },
      { value: "kep", label: "Kep Beach (Kep)" },
      { value: "koh-kong", label: "Koh Kong Island (Koh Kong)" },
    ],
    "Historical & Cultural Sites": [
      { value: "phnom-penh", label: "Royal Palace (Phnom Penh)" },
      { value: "phnom-penh", label: "Tuol Sleng Genocide Museum (Phnom Penh)" },
      { value: "kandal", label: "Phnom Chisor Temple (Kandal)" },
      {
        value: "battambang",
        label: "Battambang Colonial Architecture (Battambang)",
      },
      { value: "kampong-thom", label: "Sambor Prei Kuk (Kampong Thom)" },
    ],
    "Nature & Wildlife": [
      { value: "rattanakiri", label: "Virachey National Park (Ratanakiri)" },
      { value: "mondulkiri", label: "Elephant Valley Project (Mondulkiri)" },
      { value: "kratie", label: "Irrawaddy Dolphins (Kratie)" },
      { value: "koh-kong", label: "Cardamom Mountains (Koh Kong)" },
      { value: "preah-vihear", label: "Prey Lang Forest (Preah Vihear)" },
    ],
    "Cities & Urban Experiences": [
      { value: "phnom-penh", label: "Phnom Penh (Capital City)" },
      { value: "siem-reap", label: "Siem Reap (Temple Town)" },
      { value: "battambang", label: "Battambang (Cultural Hub)" },
      { value: "kampot", label: "Kampot (Riverside Charm)" },
      { value: "kep", label: "Kep (Seaside Retreat)" },
    ],
  };

  const loadingSample = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const [activeTab, setActiveTab] = useState("All");
  const hotelFilterTabs = [
    { name: "All" },
    { name: "Modern City" },
    { name: "Temple" },
    { name: "Island" },
    { name: "History" },
    { name: "Beach" },
  ];

  // selected REft
  const selectedRef = useRef(null);
  const scrollToSelectedImage = () => {
    selectedRef.current.scrollIntoView({
      top: 0,
      behavior: "smooth",
    });
  };

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [selectedImage]);
  // Auto-rotate featured cambodiaDestinations
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      console.log("is visible");

      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % cambodiaDestinations.length);
      setIsVisible(false);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, isHovering, cambodiaDestinations.length]);

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % cambodiaDestinations.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) =>
        (prev - 1 + cambodiaDestinations.length) % cambodiaDestinations.length
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

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

  return (
    <main className="w-full min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto sm:py-20 py-12 md:py-20">
        {/* Enhanced Slider Section Done responsive*/}
        <div
          ref={sectionRef}
          className="w-full py-10 sm:py-5 px-4 overflow-hidden relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="rounded-3xl inset-0 z-10 overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20">
              <div className="p-4  relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
                  <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/5 rounded-full blur-3xl animate-float animation-delay-4000"></div>
                </div>

                <div className="w-full  flex items-center justify-center sm:p-4">
                  <div className="flex flex-col-reverse lg:flex-row w-full max-w-7xl gap-6 sm:gap-8 md:gap-12 items-center justify-between relative z-10">
                    {/* Content Section - Now comes after image in DOM but appears below on mobile due to flex-col-reverse */}
                    <div className="w-full  h-full  lg:w-1/2 space-y-6 sm:space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden lg:block xl:block 2xl:block"
                      >
                        <span className="text-xs sm:text-sm font-medium text-blue-500 bg-blue-50 px-2 sm:px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
                          Featured Partners
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                          <span className="text-purple-600 font-extrabold">
                            Discover,
                          </span>
                          <span>
                            {" "}
                            Top {cambodiaDestinations.length + 1} Destinations
                            in Cambodia
                          </span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-3">
                          We collaborate with the best in the business to
                          deliver exceptional results.
                        </p>
                      </motion.div>

                      <div className="relative min-h-[8rem]  lg:min-h-32 sm:min-h-32 md:min-h-32 ">
                        <AnimatePresence custom={direction} initial={false}>
                          <motion.div
                            key={activeIndex}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              x: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              },
                              opacity: { duration: 0.6 },
                              scale: { duration: 0.5 },
                            }}
                            className="absolute  inset-0"
                            custom={direction}
                          >
                            <div className="w-full   flex flex-col items-start justify-center h-full ">
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                {cambodiaDestinations[activeIndex].name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                                {cambodiaDestinations[activeIndex].description}
                              </p>
                              <span className="inline-block mt-2 sm:mt-4 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-500/10 text-blue-500 border border-blue-500/50">
                                {cambodiaDestinations[activeIndex].category}
                              </span>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Navigation Controls */}
                      <motion.div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="flex flex-col sm:flex-row justify-between  items-center gap-4 sm:gap-6"
                      >
                        <div className="flex gap-2 order-2 sm:order-1">
                          {cambodiaDestinations.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!loading) {
                                  setDirection(idx > activeIndex ? 1 : -1);
                                  setActiveIndex(idx);
                                }
                              }}
                              className={`rounded-full transition-all duration-300 ${
                                idx === activeIndex
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6 sm:w-8 h-2 sm:h-3"
                                  : "bg-gray-300 hover:bg-gradient-to-r from-blue-500 to-purple-500 w-2 sm:w-3 h-2 sm:h-3"
                              }`}
                              aria-label={`Show partner ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <div className="flex  items-center gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-normal">
                          <motion.button
                            onClick={!loading && goToPrev}
                            className="aspect-square select-none h-8 sm:h-10 rounded-full flex justify-center items-center cursor-pointer"
                            whileHover={loading ? { scale: 1 } : { scale: 1.1 }}
                            whileTap={
                              loading ? { scale: 0.95 } : { scale: 0.95 }
                            }
                          >
                            <ChevronLeft
                              className={
                                loading
                                  ? "text-purple-500/50 cursor-not-allowed"
                                  : "text-purple-500"
                              }
                              size={32}
                            />
                          </motion.button>

                          <Button
                            onClick={!loading && loadingSample}
                            className="hover:!opacity-85 !rounded-full !text-xs !border-purple-500 !text-purple-500 !normal-case"
                            sx={{
                              minWidth: 0,
                              gap: "8px",
                              border: "1px solid",
                              width: "80px",
                              height: "32px",
                              padding: 0,
                              fontSize: "0.75rem",
                            }}
                          >
                            {loading ? (
                              <span>In view...</span>
                            ) : (
                              <span>View</span>
                            )}
                          </Button>

                          <motion.button
                            onClick={!loading && goToNext}
                            className="aspect-square select-none h-8 sm:h-10 rounded-full flex justify-center items-center cursor-pointer"
                            whileHover={loading ? { scale: 1 } : { scale: 1.1 }}
                            whileTap={
                              loading ? { scale: 0.95 } : { scale: 0.95 }
                            }
                          >
                            <ChevronRight
                              className={
                                loading
                                  ? "text-purple-500/50 cursor-not-allowed"
                                  : "text-purple-500"
                              }
                              size={32}
                            />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>

                    {/* Image Section - Now comes first in DOM but appears above on mobile due to flex-col-reverse */}
                    <div className="w-full  sm:w-full  md:w-full lg:w-1/2 h-full flex items-center justify-center lg:justify-center  sm:mb-0">
                      <div className="relative  w-full sm:max-w-xl  h-full aspect-video group">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-float blur-xl"></div>

                        <div className="relative shadow-lg sm:shadow-xl w-full h-full rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center">
                          <AnimatePresence custom={direction} initial={false}>
                            <motion.div
                              key={activeIndex}
                              custom={direction}
                              variants={variants}
                              onMouseEnter={() => setIsHovering(true)}
                              onMouseLeave={() => setIsHovering(false)}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                x: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.3 },
                              }}
                              className="absolute inset-0 group"
                            >
                              <LazyImage
                                src={cambodiaDestinations[activeIndex].image}
                                alt={`${cambodiaDestinations[activeIndex].name} logo`}
                                className="w-full h-full object-cover brightness-100 hover:brightness-105 transition-all duration-300"
                              />
                              <motion.span
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ originX: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                className="px-[3px] sm:px-[4px] text-[10px] sm:text-xs py-[1px] sm:py-[2px] border border-purple-500/30 bg-purple-500/10 backdrop-blur-md rounded-full text-purple-500 absolute right-2 top-2"
                              >
                                {cambodiaDestinations[activeIndex].name}
                              </motion.span>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header done responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full inline-block mb-1">
            Our Work
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Modern City
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our portfolio of stunning projects and creative solutions.
          </p>
        </motion.div>

        {/* Search Box */}
        <div className="relative px-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`w-full bg-slate-300/10 focus:bg-slate-300/30 ring-gray-500/30 p-2 py-3 pl-10 text-sm  border-none focus:border-0 focus:ring-blue-500/50  rounded-md ring-1 outline-none transition-all`}
            placeholder="Search "
          />
        </div>

        {/* Filter Selection */}
        <div className="relative my-3 px-2">
          <FilteringSelection
            defaultData={destinationFilterOptions}
            className="bg-slate-300/10 rounded-md border border-gray-500/30"
          />
        </div>

        {/* Tab Filter */}
        <div className="w-full px-2 flex-wrap-reverse gap-2 lg:flex-wrap border-b border-blue-500/30 relative justify-between mr-2 my-2  flex backdrop-blur-sm p-2 ">
          <div className="flex group  relative items-center space-x-2">
            <motion.span
              className="w-3 h-3 bg-blue-500/90 backdrop-blur-sm rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1] }} // Pulsing effect (scale from 1 to 1.5 and back)
              transition={{
                duration: 2, // Time it takes to complete the cycle
                ease: "easeInOut",
                repeat: Infinity, // Repeat the animation infinitely
                repeatType: "loop", // Makes the animation loop
              }}
            />
            <h2 className="text-lg font-semibold text-gray-700">{activeTab}</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {hotelFilterTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab.name)}
                className={
                  "relative  px-4 py-2 text-[13px] rounded-lg  font-medium transition-colors"
                }
              >
                {activeTab === tab.name && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-blue-500 backdrop-blur-sm   rounded-md"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  />
                )}
                <span
                  className={`relative transition-all duration-150 ${
                    activeTab === tab.name ? "text-white" : "text-gray-600"
                  } z-10`}
                >
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Gallery Section- Done Responsive */}
        <div className="w-full px-4  relative">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="rounded-2xl inset-0 z-10 overflow-hidden ">
              <div className="p-3 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 border border-emerald-400/20 overflow-hidden">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-float"></div>
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
                  <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
                  <div className="absolute top-1/2 left-2/3 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/30 rounded-full blur-3xl animate-float animation-delay-4000"></div>
                  <div className="absolute top-1/2 right-3/4 w-64 sm:w-96 h-96 sm:h-96 bg-emerald-500/30 rounded-full blur-3xl animate-float animation-delay-4000"></div>
                </div>

                {/* Main Grid Section */}
                <div className=" flex items-center justify-center">
                  <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12 items-center justify-between relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                      {images.map((image, index) => (
                        <motion.div
                          key={image.id}
                          onClick={() => setSelectedImage(image)} // Keep the click handler
                          className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]" // Added aspect ratio
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: true, amount: 0.2 }}
                          variants={cardVariants}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            delay: index * 0.1,
                          }}
                        >
                          {/* Laptop-Overlay Info - Keep all your overlay content */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 sm:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                            <div>
                              <h3 className="text-white font-bold text-xl">
                                {image.title}
                              </h3>
                              {image.subtitle && (
                                <p className="text-white/80 text-sm mt-1">
                                  {image.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Hover Overlay - Keep this effect */}
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-0"></div>

                          {/* Image Thumbnail - Now with constrained aspect ratio */}
                          <div className="relative w-full h-full">
                            <LazyImage
                              src={image.thumbnail}
                              alt={image.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Search Icon - Keep this interactive element */}
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-purple-50/10 border border-purple-500/50 text-center backdrop-blur-lg p-2 rounded-full shadow-md">
                              <Search
                                size={15}
                                color="rgb(144 97 249 / var(--tw-text-opacity, 1))"
                              />
                            </div>
                          </div>

                          {/* Category Tag - Keep this animated element */}
                          <motion.span
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ originX: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="px-[7px] text-sm py-[5px] bg-white/20 rounded-full text-blue-500 absolute left-2 top-2"
                          >
                            {image.category}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modal- done responsive*/}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0  z-50  backdrop-blur-xl flex items-center justify-center p-2 "
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="relative  mt-24 z-20 overflow-y-scroll gap-2 w-full p-3   shadow-teal-500/20 ring-2 ring-blue-500/30 min-h-[40vh] max-h-[80vh]  max-w-6xl overflow-auto md:overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-white/5 backdrop-blur-md border border-white/20 flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2  right-2 sm:top-4 sm:right-4 p-1 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:h-6 sm:w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Left: Image Preview */}
                {loading ? (
                  <div className="border h-[75vh] backdrop-blur-sm border-teal-300/30 rounded-lg overflow-hidden">
                    <Skeleton.Image
                      className="  select-none rounded-md lg:w-[10vw]"
                      style={{ height: "75vh", width: "47.5vw" }}
                      active
                    />
                  </div>
                ) : (
                  <>
                    <div
                      ref={selectedRef}
                      className="w-full md:flex grid-cols-2 grid grid-flow-col  place-content-center place-items-center lg:rounded lg:overflow-hidden md:h-[75vh] md:flex-col md:items-center md:justify-center  h-48 sm:h-full  items-center justify-center p-2 sm:p-5 border bg-teal-300/10 border-teal-300/30 rounded-lg md:w-1/2 gap-1 z-20"
                    >
                      <div className="relative w-full  h-full overflow-hidden col-span-2  lg:h-[40vh] object-cover md:object-contain bg-center rounded">
                        <AntDisplayImage
                          className="  !bg-inherit"
                          src={selectedImage.fullSize}
                        />
                        <div className="absolute pointer-events-none animate-ping rounded-full top-1/2 left-1/2 w-5 h-5 bg-white"></div>
                      </div>

                      <div className="  md:mt-3 hidden md:block sm:rounded-2xl w-full p-3 sm:p-5 transform transition-all duration-500  ">
                        <div className="flex  items-center gap-2 sm:gap-3">
                          <span className="p-2  sm:p-3 bg-teal-600/20 rounded-lg sm:rounded-xl">
                            <Shrimp size={16} sm:size={20} color="#7edce2" />
                          </span>
                          <h2 className="text-lg md:text-white/70 sm:text-2xl  font-bold text-gray-800">
                            {selectedImage.title}
                          </h2>
                        </div>
                        {selectedImage.subtitle && (
                          <p className="text-white/70 text-sm sm:text-base mt-1">
                            {selectedImage.subtitle}
                          </p>
                        )}
                        {selectedImage.description && (
                          <p className="text-white/60 text-xs sm:text-sm mt-2 sm:mt-3">
                            {selectedImage.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Right: Info and Related */}
                <div
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  className="w-full md:h-[75vh] md:overflow-y-scroll h-full  border-teal-300/30 items-center justify-start z-20 flex flex-col gap-2 p-2 sm:p-5 border rounded-lg md:w-1/2"
                >
                  {loading ? (
                    <div className="rounded-xl md:hidden sm:rounded-2xl w-full  transform transition-all duration-500 border bg-gray-800/30 backdrop-blur border-teal-500/30 shadow-lg shadow-teal-900/20">
                      <Skeleton
                        active
                        className="mt-2 sm:mt-4"
                        title={false}
                        paragraph={{ rows: 4 }}
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl md:hidden  sm:rounded-2xl w-full p-3 sm:p-5 transform transition-all duration-500 border bg-gray-800/30 backdrop-blur border-teal-500/30 shadow-lg shadow-teal-900/20">
                      <div className="flex  items-center gap-2 sm:gap-3">
                        <span className="p-2 sm:p-3 bg-teal-900/50 rounded-lg sm:rounded-xl">
                          <Shrimp size={16} sm:size={20} color="#7edce2" />
                        </span>
                        <h2 className="text-lg sm:text-2xl font-bold text-white">
                          {selectedImage.title}
                        </h2>
                      </div>
                      {selectedImage.subtitle && (
                        <p className="text-white/70 text-sm sm:text-base mt-1">
                          {selectedImage.subtitle}
                        </p>
                      )}
                      {selectedImage.description && (
                        <p className="text-white/60 text-xs sm:text-sm mt-2 sm:mt-3">
                          {selectedImage.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Related Images */}
                  <div
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="rounded-xl md:bg-teal-300/10 p-3 md:p-5 w-full transform transition-all duration-500 border bg-gray-800/30 backdrop-blur border-teal-500/30 shadow-lg shadow-teal-900/20"
                  >
                    {/* Header Section */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <span className="p-2 md:p-3 bg-teal-900/50 rounded-lg md:rounded-xl">
                        <Cable
                          className="w-3 h-3 md:w-4 md:h-4"
                          color="#7edce2"
                        />
                      </span>
                      <h2 className="text-xs md:text-sm font-bold text-white">
                        Related Destinations
                      </h2>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1   gap-2 md:gap-3 mt-3 md:mt-4">
                      {(() => {
                        const filteredImages = images.filter(
                          (item) =>
                            item.category === selectedImage.category &&
                            item.id !== selectedImage.id
                        );

                        return filteredImages.length > 0 ? (
                          filteredImages.map((element, index) => (
                            <motion.div
                              key={element.id}
                              onClick={() => {
                                if (
                                  !loading &&
                                  element.id !== selectedImage.id
                                ) {
                                  setSelectedImage(element);
                                  scrollToSelectedImage();
                                }
                              }}
                              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
                              initial="offscreen"
                              whileInView="onscreen"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={cardVariants}
                              transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                                delay: index * 0.1,
                              }}
                            >
                              {/* Overlay Info - Responsive text sizes */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 md:p-4 lg:p-6">
                                <div>
                                  <h3 className="text-white font-bold text-sm md:text-base lg:text-xl">
                                    {element.title}
                                  </h3>
                                  {element.subtitle && (
                                    <p className="text-white/80 text-xs md:text-sm mt-1">
                                      {element.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-0"></div>

                              {/* Image Thumbnail */}
                              <div className="relative w-full h-full">
                                <LazyImage
                                  src={element.thumbnail}
                                  alt={element.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>

                              {/* Category Tag - Responsive sizing */}
                              {element.category && (
                                <motion.span
                                  initial={{ opacity: 0, scaleX: 0 }}
                                  whileInView={{ opacity: 1, scaleX: 1 }}
                                  transition={{ duration: 0.5 }}
                                  style={{ originX: 1 }}
                                  viewport={{ once: true, amount: 0.5 }}
                                  className="px-1.5 md:px-2 text-xs md:text-sm py-1 md:py-1.5 bg-white/20 rounded-full text-blue-300 absolute left-2 top-2"
                                >
                                  {element.category}
                                </motion.span>
                              )}
                            </motion.div>
                          ))
                        ) : (
                          <div className="w-full  flex items-center justify-center  ">
                            <Empty
                              description={
                                <span className="text-gray-400">
                                  No related destination found.
                                </span>
                              }
                              className=" text-gray-300"
                            />
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Grid Overlay (optional visual effect) */}
              </motion.div>
              <div
                className="absolute h-full inset-0 transition-all duration-1000 opacity-20"
                style={{
                  backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
                  backgroundSize: "40px 40px",
                  backgroundColor: "rgba(10, 5, 20, 0.9)",
                  boxShadow: "inset 0 0 20px rgba(0, 200, 255, 0.3)",
                  textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
};

export default ImageModalGallery;
