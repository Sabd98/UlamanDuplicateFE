import { useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";

const FloatingChat = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg z-40 flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FiMessageCircle className="text-xl" />
      {isHovered && (
        <motion.span
          className="ml-2 text-sm whitespace-nowrap"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
        >
          Start Chat
        </motion.span>
      )}
    </motion.button>
  );
};

export default FloatingChat;
