'use client';
import { useState } from "react";
import { Header } from "./sections/Header";
import { HeroVideo } from "./sections/HeroVideo";
import { SideMenu } from "./sections/SideMenu";
import TextRevealSection from "./sections/TextRevealSection";
import CarouselSection from "./sections/CarouselListSection";
import InteractiveCardCarousel from "./sections/InteractiveCardCarousel";
import HalfRoundReveal from "./sections/HalfRoundReveal";
import SpecialPackages from "./sections/SpecialPackages";
import WellnessSection from "./sections/WellnessSection";
import VerticalGallery from "./sections/VerticalGallerySection";
import MapSection from "./sections/MapSection";
import GuestReviews from "./sections/GuestReviews";
import AutoGallery from "./sections/AutoGallery";
import WeeklySchedule from "./sections/WeeklySchedule";
import Footer from "./footer/Footer";
import BookingModal from "./modals/BookingModal";
import ChatModal from "./modals/ChatModal";

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light-background text-brand">
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <SideMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      <HeroVideo onOpenChat={() => setIsChatOpen(true)} />
      <TextRevealSection />
      <CarouselSection />
      <InteractiveCardCarousel />
      <HalfRoundReveal />
      <SpecialPackages />
      <WellnessSection />
      <VerticalGallery />
      <MapSection />
      <GuestReviews />
      <WeeklySchedule />
      <AutoGallery />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {/* <FloatingChat />

      {activeIllustration && (
        <IllustrationViewer
          illustration={activeIllustration}
          onClose={() => setActiveIllustration(null)}
        />
      )} */}
    </div>
  );
};
