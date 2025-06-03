import { motion } from "framer-motion";
import Image from "next/image";

const SponsorCarousel = () => {
  const sponsors = [
    { id: 1, image: "/ZtB9AUaF0TcGJhNw_loop.avif" },
    { id: 2, image: "/ZtB82EaF0TcGJhNj_unesco.avif" },
    { id: 3, image: "/ZtB9TEaF0TcGJhOP_deluxe.avif" },
    { id: 4, image: "/ZtB8YUaF0TcGJhMu_award.avif" },
    { id: 5, image: "/Z9vXJTiBA97GisWj_Hotellogoblack.avif" },
    { id: 6, image: "/Z9vWIDiBA97GisV6_asfeatured_experiences_white.avif" },
  ];

  const duplicatedSlides = [...sponsors, ...sponsors];


  return (
    <div className="overflow-hidden py-8 my-8 w-[84rem] relative left-1/2 -translate-x-1/2">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-50%"],
          transition: {
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((sponsor, i) => (
          <div
            key={i}
            className="flex items-center mx-12" 
          >
            <div className="w-[100px] h-[100px] flex items-center justify-center">
              {" "}
              {/* Fixed size container */}
              <Image
                src={sponsor.image}
                alt="Sponsor"
                width={100}
                height={100}
                className="object-contain rounded-xl max-w-[100%] max-h-[100%]"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SponsorCarousel;
