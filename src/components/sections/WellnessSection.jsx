import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

const WellnessSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation values for left and right illustrations
  const leftTranslateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "-70%"]
  );
  const rightTranslateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "70%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  // Rotation animations
  const leftRotate = useTransform(scrollYProgress, [0, 0.5], [0, -10]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Scale animations
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div
      ref={sectionRef}
      className="relative pt-10 overflow-hidden min-h-screen bg-gradient-to-b"
    >
      {/* Left Illustration */}
      <motion.div
        className="absolute left-[30%] w-[25%] max-w-md h-[70vh] origin-bottom-left"
        style={{
          x: leftTranslateX,
          rotate: leftRotate,
          scale: scaleDown,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10 rounded-xl" />
          <Image
            src="/ZlQ_cik0V36pXpWM_ulaman-eco-resort.jpg"
            alt="Ulaman Eco Resort surrounded by nature"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
        </div>
      </motion.div>

      {/* Right Illustration */}
      <motion.div
        className="absolute right-[30%] w-[25%] max-w-md h-[70vh] origin-bottom-right"
        style={{
          x: rightTranslateX,
          rotate: rightRotate,
          scale: scaleDown,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent z-10 rounded-xl" />
          <Image
            src="/ZiPZhfPdc1huKp0x_eco-retreat.jpg"
            alt="Peaceful eco retreat meditation space"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-serif mb-6">
            Discover your path to wellness and growth.
          </h2>

          <div className="prose prose-lg mx-auto mb-10 text-black">
            <p className="mb-6">
              At Ulaman we redefine luxury as an experience that not only
              pampers the senses but also nurtures the soul. Nestled in pristine
              nature, our eco-luxury retreat offers a sanctuary for healing and
              transformation.
            </p>
            <p>
              With personalised programs you can enjoy dedicated amenities such
              as: immersing yourself in relaxation, rejuvenation or profound
              inner change through meticulously curated activities and
              treatments. Your transformative journey begins here.
            </p>
          </div>

          <button className="px-8 py-4 transition-colors rounded-full text-xl inline-flex items-center group shadow-lg hover:shadow-xl">
            LEARN MORE
            <span className="ml-3 group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WellnessSection;
