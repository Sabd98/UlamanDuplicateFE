import { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import axios from "axios";

export const Header = ({ isMenuOpen, toggleMenu,onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navMenuData, setNavMenuData] = useState([]);

  // Fetch navigation data
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("/api/navigationData.json"); // Path to your JSON file
        setNavMenuData(response.data.navLinks);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerState = isMenuOpen || isScrolled;
  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        headerState
          ? "bg-light-background text-brand shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div
        className={`mx-auto px-4 flex justify-between items-center transition-all duration-300 ${
          headerState ? "py-5" : "py-9"
        }`}
      >
        <nav className="flex items-center">
          <button
            onClick={toggleMenu}
            className={`text-2xl p-2  transition-colors ${
              headerState ? "text-brand" : "text-white"
            }`}
          >
            <HiMenu />
          </button>
          <div className="flex gap-4">
            {navMenuData.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className={`hidden md:block transition-colors ${
                  headerState
                    ? "text-brand hover:text-brand-dark"
                    : "text-white hover:text-gray-200"
                }`}
              >
                {link.text}
              </a>
            ))}
          </div>
        </nav>

        <div
          className={`absolute left-[42rem] top-2 transform -translate-x-1/2 transition-all duration-300 ${
            headerState ? "opacity-100 scale-90" : "opacity-100 scale-100"
          }`}
        >
          <Image
            src="/aAMlsuvxEdbNPPas_logo-new.svg"
            alt="Ulaman Resort Logo"
            width={headerState ? 72 : 90}
            height={headerState ? 28 : 35}
          />
        </div>

        {/* Button with dynamic sizing */}
        <div>
          <button
            onClick={onOpenBooking}
            className={`border rounded-full transition-all duration-300 ${
              headerState ? "py-1 px-3 text-sm" : "py-1.5 px-4"
            }`}
          >
            stay with us
          </button>
        </div>
      </div>
    </div>
  );
};
