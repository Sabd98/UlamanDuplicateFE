import { useState, useRef } from "react";
import { motion, AnimatePresence, vh } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const SpecialPackages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const packages = [
    {
      id: 1,
      title: "The Lovers Getaway",
      description:
        "Romantic escape for couples with private dinners and spa treatments",
      price: 1890000,
      image: "/package_section_1_1.avif",
    },
    {
      id: 2,
      title: "The wonders of wellness",
      description: "Holistic healing program with yoga, meditation, and detox",
      price: 2100000,
      image: "/package_section_1_2.avif",
    },
    {
      id: 3,
      title: "The Avatar Experience",
      description: "Immersive nature adventure inspired by the Avatar universe",
      price: 2450000,
      image: "/package_section_1_3.avif",
    },
    {
      id: 4,
      title: "The Ultimate Honeymoon",
      description:
        "Luxurious honeymoon package with private villa and excursions",
      price: 3200000,
      image: "/package_section_1_2.avif",
    },
    {
      id: 5,
      title: "The Avatar Experience",
      description: "Immersive nature adventure inspired by the Avatar universe",
      price: 2450000,
      image: "/package_section_1_3.avif",
    },
  ];

  const   handleCardChange = (direction) => {
    setActiveIndex((prev) => {
      let nextIndex;
      if (direction === "next") {
        nextIndex = prev < packages.length - 1 ? prev + 1 : prev;
      } else {
        nextIndex = prev > 0 ? prev - 1 : prev;
      }

      if (containerRef.current && nextIndex !== prev) {
        const card = containerRef.current.children[nextIndex];
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }

      return nextIndex;
    });
  };
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Book one of our special packages for a getaway you'll never forget.
        </h2>

        <div className="relative ml-36 mt-16">
          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                className="flex-shrink-0  w-full md:w-1/4 lg:w-1/3 px-4 snap-start"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 50) handleSwipe("right");
                  if (info.offset.x < -50) handleSwipe("left");
                }}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden  group">
                  {/* Package Image */}
                  <div className="h-80 overflow-hidden rounded-t-2xl">
                    <Image
                      src={pkg.image}
                      alt="Ulaman Resort Logo"
                      width={405}
                      height={400}
                    />
                  </div>

                  {/* Package Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-sm bg-gray-100 px-3 py-1 rounded-full relative group overflow-hidden transition-all duration-300 hover:bg-gray-200">
                        <span className="relative inline-block">
                          DISCOVER
                          {/* Animated underline */}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-current transition-all duration-800 opacity-100 group-hover:opacity-0 group-hover:translate-x-1"></span>{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <button
              className={`absolute -left-16 top-1/3 transform -translate-y-1/2 -translate-x-4 border shadow-lg rounded-lg p-3 hover:bg-gray-100 ${
                activeIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => handleCardChange("prev")}
              disabled={activeIndex === 0}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              className={`absolute -left-24 top-2/3 transform -translate-y-1/2 translate-x-4 border shadow-lg rounded-lg p-3 hover:bg-gray-100 ${
                activeIndex === packages.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleCardChange("next")}
              disabled={activeIndex === packages.length - 1}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
          {/* Navigation Arrows
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
            onClick={prevPackage}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
            onClick={nextPackage}
          >
            <FiChevronRight className="text-xl" />
          </button> */}
        </div>

      </div>
    </div>
  );
};

export default SpecialPackages;
