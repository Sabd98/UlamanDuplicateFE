import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const SideMenu = ({ isOpen, closeMenu }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [sideMenuData, setSideMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch navigation data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/navigationData.json"); // Path to your JSON file
        setSideMenuData(response.data.sideMenuSections);

        // Set initial image
        if (response.data.sideMenuSections.length > 0) {
          setCurrentImage(response.data.sideMenuSections[0].links[0].image);
        }
      } catch (err) {
        setError("Failed to load navigation data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset image when menu opens
  useEffect(() => {
    if (isOpen && sideMenuData.length > 0) {
      setCurrentImage(sideMenuData[0].links[0].image);
    }
  }, [isOpen, sideMenuData]);

  if (loading)
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-light-background text-brand z-40 pt-20 flex items-center justify-center">
            <p>Loading menu...</p>
          </div>
        )}
      </AnimatePresence>
    );

  if (error)
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-light-background text-brand z-40 pt-20 flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </AnimatePresence>
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.1,
            delay: 0.1,
            ease: [0, 0.31, 0.2, 0.51],
          }}
          className="fixed inset-0 bg-light-background text-brand z-40 pt-20 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
            {/* Navigation Links - 3 columns */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl">
                {sideMenuData.map((section, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <ul className="flex flex-col items-center space-y-6">
                      {section.links.map((link, idx) => (
                        <li key={`${index}-${idx}`} className="relative group">
                          <a
                            href={link.url}
                            className="text-2xl font-light tracking-wider py-2 transition-all duration-300 group-hover:text-amber-600 group-hover:pl-4"
                            onMouseEnter={() => setCurrentImage(link.image)}
                            onClick={(e) => {
                              if (!link.url.startsWith("http")) {
                                e.preventDefault();
                                closeMenu();
                              }
                            }}
                          >
                            {link.text}{" "}
                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              /
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Preview Area */}
            <div className="hidden lg:flex items-center justify-center p-8">
              <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage || "default"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        currentImage || "/images/default-menu-image.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </AnimatePresence>

                {!currentImage && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-lg text-gray-400">
                      Select a menu item
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
