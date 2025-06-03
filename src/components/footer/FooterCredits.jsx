import Link from "next/link";
import { useState } from "react";
import PackageModal from "../modals/PackageModal";

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

  const openPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <ul className="gap-x-10 text-md flex w-[90vw]">
            <li className="font-bold mb-2">Terms</li>
            <li>
              <Link className="hover:underline" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>Kids under 6 are not advised.</li>
            <li>
              © 2024-2025 Two Moves Studio for ulaman.com. All Rights Reserved
            </li>
            <li>Made With ♥ By Two Moves Studio</li>
          </ul>
          <div>
            <ul className="gap-x-5 text-sm flex w-[80rem]">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <button
                    onClick={() => openPackageModal(pkg)}
                    className="text-left hover:underline"
                  >
                    {pkg.title} | {pkg.duration}
                  </button>
                </li>
              ))}
            </ul>
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
