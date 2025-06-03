import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const VerticalGallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create individual transforms for each image
  const yPositions = [
    useTransform(scrollYProgress, [0, 1], [-200, 120]),
    useTransform(scrollYProgress, [0, 1], [-200, 120]),
    useTransform(scrollYProgress, [0, 1], [-200, 120]),
  ];

  const galleryItems = [
    { id: 1, image: "/culinary_section_1_1.avif" },
    { id: 2, image: "/culinary_section_1_2.avif" },
    { id: 3, image: "/culinary_section_1_3.avif" },
  ];

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
        A world-class gastronomic journey where nature’s finest ingredients meet
        culinary craftsmanship.
      </h2>

      <div
        ref={containerRef}
        className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 pt-10 overflow-hidden min-h-screen w-full"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            style={{ y: yPositions[index] }}
            className="overflow-hidden  rounded-xl  "
          >
              <Image
                src={item.image}
                alt="Ulaman Eco Resort surrounded by nature"
                fill
                className="object-cover"
              />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VerticalGallery;
