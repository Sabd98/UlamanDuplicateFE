import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

const HalfRoundReveal = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });

    // Scale from 0 to 3 to ensure it covers the entire viewport
    const circleScale = useTransform(scrollYProgress, [0, 1], [0, 4]);
    const smoothScale = useSpring(circleScale, {
      damping: 20,
      stiffness: 100,
      mass: 0.5,
    });

  return (
    <div
      ref={sectionRef}
      className="relative py-10 overflow-hidden min-h-[100rem]"
    >
      {/* Content - stays fixed and visible */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-xl min-h-5xl mx-auto text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
            Experience a blend of nature, comfort and luxury like never before.
          </h2>
          <button className="px-8 py-4 relative group overflow-hidden transition-colors rounded-full text-xl">
            BOOK YOUR STAY
            <span className="absolute left-0 bottom-0 w-full h-px bg-current transition-all duration-800 opacity-100 group-hover:opacity-0 group-hover:translate-x-1"></span>
          </button>
        </div>
      </div>

      {/* Fixed expanding circle at bottom center */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom"
        style={{
          width: "100vw",
          height: "100vw",
          scale: smoothScale,
          backgroundImage: "url('/roundopen_bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          zIndex: 10,
          bottom: "-50vh",
        }}
      />
    </div>
  );
};

export default HalfRoundReveal;
