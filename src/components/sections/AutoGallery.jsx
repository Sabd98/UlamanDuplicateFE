import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";


const AutoGallery = () => {
 
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/galleryItems.json"); // Path to your JSON file
      setGalleryItems(response.data.galleryItems||[]);
      setCurrentImageIndex(
        Array(response.data.galleryItems?.length || 0).fill(0)
      );
    };

    fetchData();
  }, []);

 

  useEffect(() => {
    if (!galleryItems.length) return;

    const intervals = galleryItems.map((item, galleryIndex) => {
      return setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev.map((imgIndex, idx) =>
            idx === galleryIndex
              ? (imgIndex + 1) % item.images.length
              : imgIndex
          )
        );
      }, 3000 + galleryIndex * 500);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Define the specific layout pattern for masonry grid
  const getCardDimensions = (index) => {
    const patterns = [
      // Row 1
      { height: "h-[40rem]" }, // Card 1
      { height: "h-[30rem]" }, // Card 2
      { height: "h-[40rem]" }, // Card 3
      // Row 2
      { height: "h-[30rem]" }, // Card 4
      { height: "h-[40rem]" }, // Card 5
      { height: "h-[30rem]" }, // Card 6
    ];
    return patterns[index] || { height: "h-[30rem]" };
  };

  if (!galleryItems.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No gallery items found</p>
      </div>
    );
  }

  // Group items into rows
  const rows = [];
  const itemsPerRow = 3;
  for (let i = 0; i < galleryItems.length; i += itemsPerRow) {
    rows.push(galleryItems.slice(i, i + itemsPerRow));
  }

  return (
    <div className="bg-gradient-to-br py-8">
      <div className="mx-auto max-w-7xl ">
        {/* Custom masonry layout using grid rows */}
        <div className="flex flex-col gap-4">
{          console.log('rows:',rows)
}          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
            >
              {row.map((gallery, galleryIndex) => {
                // Calculate the absolute index in the galleryItems array
                const absoluteIndex = rowIndex * itemsPerRow + galleryIndex;
                const dimensions = getCardDimensions(absoluteIndex);

                return (
                  <motion.div
                    key={gallery.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: absoluteIndex * 0.1 }}
                    className="group relative w-full"
                  >
                    <div
                      className={`${dimensions.height} rounded-md overflow-hidden shadow-2xl bg-white`}
                    >
                      <div className="w-full ">
                        {gallery?.images?.map((image, imgIndex) => (
                          <motion.div
                            key={image}
                            className="absolute inset-0 w-full"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity:
                                currentImageIndex[absoluteIndex] === imgIndex
                                  ? 1
                                  : 0,
                              zIndex:
                                currentImageIndex[absoluteIndex] === imgIndex
                                  ? 10
                                  : 0,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: [0.33, 1, 0.68, 1],
                            }}
                          >
                            <img
                              src={image}
                              alt={gallery.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <motion.h3
                          className="text-white bg-gray-500/50 px-3 py-1 rounded-2xl text-sm md:text-base font-semibold inline-block"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {gallery.title}
                        </motion.h3>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md z-10" />

                      {/* Card border effect */}
                      <div className="absolute inset-0 rounded-md ring-1 ring-black/5" />
                    </div>

                    {/* Card shadow and lift effect */}
                    <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white to-slate-100 -z-10 transform group-hover:scale-105 transition-transform duration-300 shadow-lg" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto text-center mt-12">
          <button className="px-8 mx-auto py-4 relative group overflow-hidden transition-colors rounded-full text-xl">
            DISCOVER ALL EXPERIENCES{" "}
            <span className="absolute left-0 top-10 w-full h-px bg-current transition-all duration-800 opacity-100 group-hover:opacity-0 group-hover:translate-x-1"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoGallery;
