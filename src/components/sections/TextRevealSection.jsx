import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const TextRevealSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const text =
    "Nested among the rice fields and coconut trees of Tabanan, Ulaman is only 20 minutes away from the vibrant town of Canggu.";
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative h-[20rem] transition-colors duration-1000`}
    >
      <div className="mx-auto px-4 h-full flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <motion.div
            className="flex flex-wrap justify-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                className={`mr-2 mb-2 text-2xl md:text-3xl ${
                  isVisible ? "text-brand" : "text-amber-200"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.05,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextRevealSection;
