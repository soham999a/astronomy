
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const slides = [
  {
    bg: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop')",
    mobileBg: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop')",
  },
  {
    bg: "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1920&auto=format&fit=crop')",
    mobileBg: "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop')",
  },
  {
    bg: "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1920&auto=format&fit=crop')",
    mobileBg: "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800&auto=format&fit=crop')",
  },
  {
    bg: "url('https://images.unsplash.com/photo-1543604055-c4ca3f836063?q=80&w=1920&auto=format&fit=crop')",
    mobileBg: "url('https://images.unsplash.com/photo-1543604055-c4ca3f836063?q=80&w=800&auto=format&fit=crop')",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide-bg ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: isMobile ? slide.mobileBg : slide.bg,
            transitionDelay: index === currentSlide ? '0ms' : '0ms',
            backgroundPosition: isMobile ? 'center center' : 'center',
            backgroundSize: isMobile ? 'cover' : 'cover'
          }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/30"></div>

      {/* Left and Right Navigation Buttons - smaller on mobile */}
      <button
        onClick={goToPrevSlide}
        className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full ${isMobile ? 'p-2' : 'p-3'} backdrop-blur-sm transition-all duration-300 hero-nav-button touch-manipulation`}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full ${isMobile ? 'p-2' : 'p-3'} backdrop-blur-sm transition-all duration-300 hero-nav-button touch-manipulation`}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative h-full container mx-auto flex flex-col justify-center items-center text-center text-white px-4">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Align Your Life with <br className="hidden sm:block" />
            <span className="text-mystic-gold">Numbers, Space, and Stars</span>
          </h1>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '600ms' }}>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8">Numerology | Vastu | Astrology</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in opacity-0 w-full max-w-xs sm:max-w-md mx-auto" style={{ animationDelay: '900ms' }}>
          <Link
            to="/contact"
            target='_blank'
            className="btn-primary flex items-center justify-center touch-manipulation"
          >
            <Calendar size={isMobile ? 16 : 18} className="mr-2" />
            Book Consultation
          </Link>
          <Link to="/contact" target='_blank' className="btn-secondary touch-manipulation">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full transition-all touch-manipulation ${
              index === currentSlide
                ? `bg-mystic-gold ${isMobile ? 'w-4' : 'w-6'}`
                : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
