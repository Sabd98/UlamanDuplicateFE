import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PackageModal from "../modals/PackageModal";
import { motion } from "framer-motion";

const FooterCredits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

   
  const packages = [
    {
      id: 1,
      title: "The Words of Wellness",
      duration: "4 days 3 nights",
      description:
        "Immerse yourself in holistic healing with personalized wellness programs",
      price: "IDR 6,500,000+",
    },
    {
      id: 2,
      title: "The Avatar Experience",
      duration: "3 days 2 nights",
      description:
        "Explore nature-inspired luxury in our iconic treehouse villas",
      price: "IDR 7,200,000+",
    },
    {
      id: 3,
      title: "The Ultimate Honeymoon",
      duration: "3 days 2 nights",
      description:
        "Romantic getaway with premium amenities and private experiences",
      price: "IDR 8,350,000+",
    },
    {
      id: 4,
      title: "The Lovers Getaway",
      duration: "3 days 2 nights",
      description: "Intimate escape for couples with bespoke services",
      price: "IDR 7,800,000+",
    },
    {
      id: 5,
      title: "The Wonders Of Wellness",
      duration: "5 days 4 nights",
      description: "Comprehensive wellness retreat with expert guidance",
      price: "IDR 9,500,000+",
    },
  ];

  const duplicatedSlides = [...packages, ...packages];


  const openPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };



  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-3">
          {/* Top links section */}
          <ul className="flex flex-wrap gap-x-16 gap-y-2 text-sm mb-6">
            <li className="font-bold">Terms</li>
            <li>
              <Link className="hover:underline" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>Kids under 6 are not advised.</li>
            <li >
              © 2024-2025 Two Moves Studio for ulaman.com. All Rights Reserved
            </li>
            <li>Made With ♥ By Two Moves Studio</li>
          </ul>

          {/* Infinite carousel section */}
          <div className="w-full bg-light-background overflow-hidden">
            <motion.div
              className="flex py-4"
              animate={{
                x: ["0%", "-100%"],
                transition: {
                  ease: "linear",
                  duration: 20,
                  repeat: Infinity,
                },
              }}
            >
              {duplicatedSlides.map((pkg, i) => (
                <div key={i} className="flex-shrink-0 mx-6 flex items-center">
                  <button
                    onClick={() => openPackageModal(pkg)}
                    className="text-nowrap hover:underline text-gray-500"
                  >
                    <span className="font-medium">{pkg.title}</span> |{" "}
                    {pkg.duration}
                  </button>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedPackage && (
        <PackageModal
          package={selectedPackage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FooterCredits;
