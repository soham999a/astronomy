import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NumerologyService {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface NumerologyCardSliderProps {
  services: NumerologyService[];
}

const NumerologyCardSlider = ({ services }: NumerologyCardSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = services.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const carouselRadius = 300; // Radius of the carousel circle

  // Handle navigation
  const goToPrevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  };

  // Calculate position for each card in 3D space
  const calculateCardPosition = (index: number) => {
    // Calculate the angle for this card (in radians)
    const angleStep = (2 * Math.PI) / totalCards;
    const angle = angleStep * index;
    
    // Calculate the rotation angle (in degrees)
    const rotationAngle = (360 / totalCards) * index;
    
    // Calculate the offset from the active card
    const offset = (index - activeIndex + totalCards) % totalCards;
    
    // Calculate z-index based on position
    const zIndex = totalCards - Math.abs(offset > totalCards / 2 ? totalCards - offset : offset);
    
    // Calculate opacity based on position
    const opacity = offset === 0 ? 1 : 
                   (offset === 1 || offset === totalCards - 1) ? 0.8 : 
                   (offset === 2 || offset === totalCards - 2) ? 0.6 : 0.4;
    
    return {
      x: Math.sin(angle) * carouselRadius,
      y: 0,
      z: Math.cos(angle) * carouselRadius,
      rotationY: -rotationAngle,
      zIndex,
      opacity,
      isActive: offset === 0
    };
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 2000); // Rotate every 2 seconds as requested
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="card-container relative py-16 px-4 overflow-visible" ref={sliderRef}>
      {/* Card Gallery */}
      <div className="gallery relative mx-auto max-w-5xl">
        {services.map((service, index) => {
          const { x, y, z, rotationY, zIndex, opacity, isActive } = calculateCardPosition(index);
          
          return (
            <div
              key={`${service.title}-${index}`}
              className={`cards transition-all duration-500 ease-in-out absolute left-1/2 top-1/2`}
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotationY}deg)`,
                zIndex,
                opacity,
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`bg-white rounded-xl shadow-lg w-[280px] h-[350px] p-6 flex flex-col transition-all duration-300
                          ${isActive ? 'shadow-xl ring-2 ring-mystic-gold' : 'hover:shadow-xl'}`}
              >
                <div className="h-16 w-16 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-cool-gray mb-5 flex-grow text-center">{service.description}</p>
                <div className="text-center">
                  <Link
                    to="/contact"
                    target='_blank'
                    className="btn-primary inline-block text-sm px-6 py-2 rounded-lg"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={goToPrevSlide}
          className="bg-white rounded-full p-3 shadow-md text-charcoal hover:text-mystic-gold transition-all duration-300 hover:shadow-lg focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Indicator dots */}
        <div className="flex items-center space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-mystic-gold w-6' : 'bg-mystic-gold/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNextSlide}
          className="bg-white rounded-full p-3 shadow-md text-charcoal hover:text-mystic-gold transition-all duration-300 hover:shadow-lg focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default NumerologyCardSlider;
