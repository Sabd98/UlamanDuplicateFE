import Link from "next/link";

const FooterNav = () => {
  const exploreLinks = [
    { text: "Home", url: "/" },
    { text: "Villas", url: "/villas" },
    { text: "Dining", url: "/dining" },
    { text: "Spa", url: "/spa" },
    { text: "Retreats", url: "/retreats" },
    { text: "Experiences", url: "/experiences" },
    { text: "Facilities", url: "/facilities" },
    { text: "Ulaman Map", url: "/map" },
    { text: "About", url: "/about" },
    { text: "Articles", url: "/articles" },
    { text: "Contact", url: "/contact" },
    { text: "Video Testimonials", url: "/testimonials" },
  ];

  const connectLinks = [
    { text: "Whatsapp", url: "https://wa.me/..." },
    { text: "Directions", url: "/directions" },
    { text: "TripAdvisor", url: "https://tripadvisor.com/..." },
    { text: "Instagram", url: "https://instagram.com/..." },
    { text: "Facebook", url: "https://facebook.com/..." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     
    </div>
  );
};

export default FooterNav;
