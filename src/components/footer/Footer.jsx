import BookingWidget from "./BookingWidget";
import LocationInfo from "./LocationInfo";
import Newsletter from "./Newsletter";
import FooterNav from "./FooterNav";
import SponsorCarousel from "./SponsorCarousel";
import FooterCredits from "./FooterCredits";

const Footer = () => {
  return (
    <footer className="bg-dark-emphasis  text-gray-300">
      <div className="container mx-auto">
          <BookingWidget />
        <div className="lg:col-span-2">
          <LocationInfo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-60 mb-16">
          <div>
            <Newsletter />
          </div>
          <div>
            <FooterNav />
          </div>
        </div>

        <SponsorCarousel />

        <FooterCredits />
      </div>
    </footer>
  );
};

export default Footer;
