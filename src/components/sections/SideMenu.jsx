import { sideMenuSections } from "@/utils/navigationData";
import { motion, AnimatePresence } from "framer-motion";

export const SideMenu = ({ isOpen, closeMenu }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="fixed inset-0 bg-light-background text-brand z-40 pt-20 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {sideMenuSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        className="hover:underline"
                        onClick={(e) => {
                          if (!link.url.startsWith("http")) {
                            e.preventDefault();
                            // Handle internal navigation
                            closeMenu();
                          }
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
