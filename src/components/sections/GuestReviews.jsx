import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useFetch } from "../../../hooks/useFetch";

const GuestReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const apiUrl = "/api/reviews.json";
  const { fetchedData, error } = useFetch(apiUrl);
  const reviews = fetchedData?.reviews;
 
  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews?.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews?.length - 1 : prev - 1));
  };

  // Auto-rotate reviews
  useEffect(() => {
    timerRef.current = setInterval(nextReview, 8000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="py-10 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              What Our Guests
            </h2>
            <h3 className="text-2xl md:text-3xl font-light">
              Have To Say About Us
            </h3>
          </div>

          <div>
            <button
              className="border shadow-lg rounded-lg p-3 hover:bg-gray-100  transform -translate-y-1/2 -translate-x-4"
              onClick={prevReview}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              className="border shadow-lg rounded-lg p-3 hover:bg-gray-100 transform -translate-y-1/2 translate-x-4  "
              onClick={nextReview}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="max-w-xl text-sm mb-4 flex space-x-4">
          <div className=" font-bold">5.0 ★/ 202 Tripadvisor Reviews</div>
          <div className="font-bold">4.8 ★ / 592 Google Reviews</div>
        </div>
        <hr className="px-4 text-black" />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className=" p-6 md:px-12"
          >
            <div className="flex text-[#617262]  gap-x-16 w-6xl justify-between mb-3">
              <div>
                <h4 className="text-xl w-[10rem] font-bold">
                  {reviews?.[activeIndex]?.name}
                </h4>
                <p>{reviews?.[activeIndex]?.date}</p>
              </div>
              <div>
                <h4 className="text-lg  w-[10rem] font-bold">
                  {reviews?.[activeIndex]?.title}
                </h4>
              </div>
              <div>
                <p className=" mb-6 ">{reviews?.[activeIndex]?.content}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GuestReviews;
