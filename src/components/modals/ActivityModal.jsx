import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ActivityCarousel from "../ActivityCorousel";

const ActivityModal = ({ activity, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ willChange: "transform, opacity" }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-2xl font-serif">{activity.details.title}</h3>
            <button
              onClick={onClose}
              className="text-2xl p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ActivityCarousel activity={activity} />

            <p className="text-gray-700 my-6">{activity.details.description}</p>

            <div className="border-t border-b py-4 my-6">
              <p className="text-lg">
                <strong>Duration:</strong> {activity.details.duration}
              </p>
              <p className="text-lg">
                <strong>Location:</strong> {activity.details.location}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-serif mb-4">Individual Rate</h4>
              <p className="text-2xl font-bold">{activity.details.price}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-black text-white hover:bg-gray-800 rounded-full">
                Book Now
              </button>
              <button className="px-8 py-3 border border-black text-black hover:bg-gray-100 rounded-full">
                VIEW TERMS
              </button>
            </div>
          </div>

          <div className="p-6 border-t">
            <a
              href="/booking"
              className="text-lg font-semibold hover:underline flex items-center"
            >
              BOOK YOUR STAY
              <FiChevronRight className="ml-2" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ActivityModal;
