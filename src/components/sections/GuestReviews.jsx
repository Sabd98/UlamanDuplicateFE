import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GuestReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Conny H",
      date: "Apr 2023",
      title: `"Perfect Place To Relax And Heal!"`,
      content:
        "Loved this place so much, I extended and stayed over a week. This place is perfect to relax & heal! The resort is so beautiful, peaceful, quiet and embedded into the nature. The food is delicious and the staff does an excellent service. The healing & wellness options made it special: the spa was relaxing and I did yoga every day...",
    },
    {
      id: 2,
      name: "Janey V",
      date: "Jan 2024",
      title: `“One Of The Most Beautiful Resorts In The World.”`,
      content:
        "Ulaman eco-resort is, without doubt, one of the most beautiful resorts I have stayed at. Just returned from an amazing 4 day stay on my own on a yoga wellness and healing experience. I cannot begin to describe how rested and rejuvenated I feel. Everything at this super beautiful resort..."
    },
    // Add more reviews
  ];

  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
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
              className=" transform -translate-y-1/2 -translate-x-4 shadow-lg rounded-full p-3 "
              onClick={prevReview}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              className="transform -translate-y-1/2 translate-x-4 shadow-lg rounded-full p-3 "
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
                  {reviews[activeIndex].name}
                </h4>
                <p>{reviews[activeIndex].date}</p>
              </div>
              <div>
                <h4 className="text-lg  w-[10rem] font-bold">
                  {reviews[activeIndex].title}
                </h4>
              </div>
              <div>
                <p className=" mb-6 ">{reviews[activeIndex].content}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GuestReviews;
