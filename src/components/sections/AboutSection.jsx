import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import axios from "axios";

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/aboutData.json"); // Path to your JSON file
      setAboutData(response.data.aboutData);
    };

    fetchData();
  }, []);
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === aboutData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? aboutData.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About */}
          <div className="relative h-[500px] w-[30rem] overflow-hidden rounded-tl-xl rounded-br-xl shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0"
              >
                <div
                  className={`shadow-2xl w-full h-full`}
                  style={{
                    backgroundImage: `url(${aboutData[currentIndex]?.image})`,
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
              aria-label="Previous slide"
            >
              <FiArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute  right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
              aria-label="Next slide"
            >
              <FiArrowRight className="text-2xl" />
            </button>

            {/* Indicators */}
            <div className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {aboutData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3  h-3 rounded-full ${
                    currentIndex === index
                      ? "bg-white"
                      : "bg-slate-400/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {aboutData[currentIndex]?.title}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {aboutData[currentIndex]?.description}
            </p>

            <a
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 group"
            >
              ABOUT US
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
