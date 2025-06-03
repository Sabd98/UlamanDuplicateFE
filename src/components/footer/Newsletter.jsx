import Link from "next/link";
import { useState } from "react";

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
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "This field is required";
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic here
    console.log("Submitted:", { name, email });
  };

  return (
    <div className="grid grid-cols-2 gap-60 w-[90vw] md:grid-cols-3 px-16 rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Get Notified On Our Offers</h3>

        <div>
          <input
            type="text"
            placeholder="Your Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 border-b`}
          />
          {errors.name && <p className="text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border-b`}
          />
          {errors.email && <p className="text-sm mt-1">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          SUBMIT
        </button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-4">Explore</h3>
        <div className="grid grid-cols-2 gap-2">
          {exploreLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Connect</h3>
        <div className="grid grid-cols-2 gap-2">
          {connectLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
