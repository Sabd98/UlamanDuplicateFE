import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useFetch } from "../../../hooks/useFetch";

const InteractiveCardCarousel = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [carouselStates, setCarouselStates] = useState({});
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const apiUrl = "/api/villasData.json";
  const { fetchedData,error } = useFetch(apiUrl);
  const villas = fetchedData?.villas;

  
  // Initialize carousel states
  useEffect(() => {
    const initialState = {};
    villas?.forEach((villa) => {
      initialState[villa.id] = 0;
    });
    setCarouselStates(initialState);
  }, [villas]);

  const handleCardChange = (direction) => {
    setActiveCard((prev) => {
      let nextIndex;
      if (direction === "next") {
        nextIndex = prev < villas?.length - 1 ? prev + 1 : prev;
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

  const handleImageChange = (villaId, direction) => {
    setCarouselStates((prev) => {
      const currentIndex = prev[villaId] || 0;
      const imagesCount = villas?.find((v) => v.id === villaId).images.length;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % imagesCount
          : (currentIndex - 1 + imagesCount) % imagesCount;

      return { ...prev, [villaId]: newIndex };
    });
  };

  const handleSwipe = (direction) => {
    if (direction === "left") handleCardChange("prev");
    if (direction === "right") handleCardChange("next");
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) handleCardChange("next");
    else if (diff < -50) handleCardChange("prev");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          Discover cozy elegance, where tranquility meets Bali's serene beauty.
        </h2>
        <div className="relative ml-28 mt-16">
          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {villas?.map((villa, index) => (
              <div
                key={villa.id}
                className="flex-shrink-0 w-full md:w-3/5 lg:w-2/5 px-4 snap-start"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden  group">
                  <div className="relative h-80 overflow-hidden rounded-t-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={carouselStates[villa.id]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 50) handleSwipe("right");
                          if (info.offset.x < -50) handleSwipe("left");
                        }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        {/* Fixed image rendering */}
                        <img
                          src={villa.images[carouselStates[villa.id]]}
                          alt={`${villa.title} - Image ${
                            carouselStates[villa.id] + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Dot indicators - fixed variable name */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {villa.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarouselStates((prev) => ({
                              ...prev,
                              [villa.id]: imgIndex,
                            }));
                          }}
                          className={`w-2 h-2 rounded-full ${
                            carouselStates[villa.id] === imgIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                          aria-label={`Go to image ${imgIndex + 1}`}
                        />
                      ))}
                    </div>

                    {/* Image navigation buttons */}
                    <button
                      className="absolute  left-2 top-11/12 transform -translate-y-1/2 bg-gray-400/40 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange(villa.id, "prev");
                      }}
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      className="absolute right-2 top-11/12 transform -translate-y-1/2 bg-gray-400/40 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange(villa.id, "next");
                      }}
                    >
                      <FiChevronRight />
                    </button>
                  </div>

                  {/* Villa Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2">{villa.title}</h3>
                    <p className="text-gray-600 mb-4">{villa.description}</p>
                    <div className="flex justify-between items-center">
                      {/* <span className="text-lg font-semibold">
                        IDR {villa.price.toLocaleString()}
                      </span> */}
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
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="space-y-4">
            <button
              className={`absolute -left-16 top-1/3 transform -translate-y-1/2 -translate-x-4 border shadow-lg rounded-lg p-3 hover:bg-gray-100 ${
                activeCard === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => handleCardChange("prev")}
              disabled={activeCard === 0}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              className={`absolute -left-24 top-2/3 transform -translate-y-1/2 translate-x-4 border shadow-lg rounded-lg p-3 hover:bg-gray-100 ${
                activeCard === villas?.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleCardChange("next")}
              disabled={activeCard === villas?.length - 1}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCardCarousel;
