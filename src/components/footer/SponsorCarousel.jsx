import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SponsorCarousel = () => {
  const sponsors = [
    {
      id: 1,
      image: "/ZtB9AUaF0TcGJhNw_loop.avif",
    },
    {
      id: 2,
      image: "/ZtB82EaF0TcGJhNj_unesco.avif",
    },
    {
      id: 3,
      image: "/ZtB9TEaF0TcGJhOP_deluxe.avif",
    },
    {
      id: 4,
      image: "/ZtB8YUaF0TcGJhMu_award.avif",
    },
    {
      id: 5,
      image: "/Z9vXJTiBA97GisWj_Hotellogoblack.avif",
    },
    {
      id: 6,
      image: "/Z9vWIDiBA97GisV6_asfeatured_experiences_white.avif",
    },
  ];

  const duplicatedSponsors = [...sponsors];
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let position = 0;
    const speed = 0.5; // Pixels per frame

    const animate = () => {
      position -= speed;

      // Reset position when scrolled half way
      if (position < -container.scrollWidth / 2) {
        position = 0;
      }

      container.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="overflow-hidden py-8 border-y border-gray-300 my-8">
      <motion.div ref={containerRef} className="flex whitespace-nowrap">
        {duplicatedSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="mx-8 text-2xl font-bold opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image
              src={sponsor.image}
              alt="Peaceful eco retreat meditation space"
              width={100}
              height={100}
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SponsorCarousel;
