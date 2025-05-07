import { useState, useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  external?: boolean;
}

interface ServiceSlideshowProps {
  services: ServiceItem[];
  autoplaySpeed?: number; // in milliseconds
}

const ServiceSlideshow = ({
  services,
  autoplaySpeed = 4000
}: ServiceSlideshowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const totalSlides = services.length;

  // Determine number of visible cards based on screen size with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (window.innerWidth < 640) {
          setVisibleCards(1);
        } else if (window.innerWidth < 1024) {
          setVisibleCards(2);
        } else {
          setVisibleCards(3);
        }
      }, 150); // Debounce resize events
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle automatic slideshow
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % (totalSlides - visibleCards + 1));
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [totalSlides, autoplaySpeed, isPaused, visibleCards]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? totalSlides - visibleCards : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((current) =>
      current === totalSlides - visibleCards ? 0 : current + 1
    );
  };

  // Pause slideshow on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Get visible services based on current index
  const getVisibleServices = () => {
    return services.slice(activeIndex, activeIndex + visibleCards);
  };

  return (
    <div
      className="relative py-6 md:py-8 px-3 md:px-4 overflow-hidden"
      ref={slideshowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 5000)}
    >
      {/* Clean background */}
      <div className="absolute inset-0 -z-10 bg-soft-cream/50"></div>

      {/* Service Cards Slideshow Container */}
      <div className="relative mx-auto max-w-6xl">
        {/* Navigation arrows - Desktop */}
        {totalSlides > visibleCards && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-white rounded-full p-2 shadow-md text-charcoal hover:text-mystic-gold transition-all duration-300 hover:shadow-lg focus:outline-none hidden md:block"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-white rounded-full p-2 shadow-md text-charcoal hover:text-mystic-gold transition-all duration-300 hover:shadow-lg focus:outline-none hidden md:block"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Mobile navigation buttons - Touch-friendly */}
        {totalSlides > visibleCards && visibleCards === 1 && (
          <div className="flex justify-between mb-4 md:hidden">
            <button
              onClick={goToPrevSlide}
              className="bg-white rounded-full p-2 shadow-sm text-charcoal hover:text-mystic-gold transition-all duration-300 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slide indicator */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalSlides - visibleCards + 1 }).map((_, index) => (
                <span
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-mystic-gold'
                      : 'bg-mystic-gold/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNextSlide}
              className="bg-white rounded-full p-2 shadow-sm text-charcoal hover:text-mystic-gold transition-all duration-300 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Cards grid with touch swipe support */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          style={{
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {getVisibleServices().map((service, index) => (
            <div
              key={activeIndex + index}
              className="transition-all duration-500 transform hover:translate-y-[-5px]"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                link={service.link}
                icon={service.icon}
                comingSoon={service.comingSoon}
                external={service.external}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow indicator dots - Desktop and tablet */}
      {totalSlides > visibleCards && visibleCards > 1 && (
        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {Array.from({ length: totalSlides - visibleCards + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-mystic-gold'
                  : 'bg-mystic-gold/30 hover:bg-mystic-gold/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* View All Services button */}
      <div className="text-center mt-6 md:mt-8">
        <a
          href="/services"
          className="inline-flex items-center text-mystic-gold font-medium hover:underline transition-all duration-300"
        >
          View All Services
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-all duration-300 group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ServiceSlideshow;
