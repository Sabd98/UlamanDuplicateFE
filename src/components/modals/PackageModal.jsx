import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const PackageModal = ({ package: pkg, onClose }) => {
  if (!pkg) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-2xl font-serif">{pkg.title}</h3>
            <button
              onClick={onClose}
              className="text-2xl p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-xl font-bold">{pkg.duration}</h4>
              <p>{pkg.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Features would come from package data */}
              <div className="flex items-start">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h5 className="font-bold">Ulaman Exclusive Gift Bag</h5>
                  <p>Premium welcome gifts</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h5 className="font-bold">Ulaman Chocolate Dates</h5>
                  <p>Handcrafted local chocolates</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h5 className="font-bold">Flower Bath</h5>
                  <p>Romantic floral experience</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h5 className="font-bold">60-minute Couples Massage</h5>
                  <p>Relaxing spa treatment</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-2xl font-bold">{pkg.price}</p>
              </div>
              <div className="flex space-x-4">
                <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                  BOOK NOW
                </button>
                <button className="px-8 py-3 border border-black rounded-lg">
                  VIEW TERMS
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PackageModal;
