import { useEffect, useState } from "react";

export const HeroVideo = ({onOpenChat}) => {
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 100);
    
      return () => clearTimeout(timer);
    }, [])
    
  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
          showVideo ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-full bg-[url('/ZiO2APPdc1huKpxk_eco-resort-bali.avif')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* YouTube Video Background (shown after delay) */}
      <div className={`absolute inset-0 ${showVideo ? "z-0" : "z-0"}`}>
        {showVideo && (
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 scale-150">
              <iframe
                src="https://www.youtube.com/embed/pqkVOxt7Tk4?autoplay=1&mute=1&loop=1&playlist=pqkVOxt7Tk4&controls=0&modestbranding=1&rel=0&showinfo=0"
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
        )}
        <button
          onClick={onOpenChat}
          className="relative z-10 border-2 border-white px-8 py-3 text-lg hover:bg-white hover:text-black transition-colors"
        >
          Stay With Us
        </button>
      </div>
    </section>
  );
};
