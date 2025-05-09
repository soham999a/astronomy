import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HoverServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  imageSrc: string;
  comingSoon?: boolean;
}

const HoverServiceCard = ({
  title,
  description,
  link,
  icon: Icon,
  imageSrc,
  comingSoon = false,
}: HoverServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isMobile = useIsMobile();

  // For mobile devices, show content on first touch, hide on second touch
  const handleTouch = () => {
    if (isMobile) {
      setIsTouched(!isTouched);
    }
  };

  // Use the touch state for mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsHovered(isTouched);
    }
  }, [isTouched, isMobile]);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl touch-manipulation"
      style={{ height: isMobile ? '300px' : '350px' }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Background Image - Fills the entire card */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: imageSrc || 'linear-gradient(to bottom, #1A202C, #2D3748)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          filter: isHovered ? 'brightness(0.7)' : 'brightness(0.9)'
        }}
      />

      {/* Light Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-40" />

      {/* Mobile tap indicator */}
      {isMobile && !isHovered && (
        <div className="absolute bottom-4 right-4 bg-white/80 text-charcoal rounded-full p-2 shadow-md animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0V12" />
            <path d="M14 10.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022 1.867 1.867 0 0 1 2.28.28L8 13" />
          </svg>
        </div>
      )}

      {/* Content that slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 bg-white/90 text-charcoal transition-all duration-500 ease-in-out"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(calc(100% - 0px))',
          height: 'auto',
          maxHeight: '85%',
          backdropFilter: 'blur(5px)'
        }}
      >
        {/* All content is inside the sliding panel */}
        <div className="flex flex-col space-y-3">
          {/* Title and Icon in the same row */}
          <div className="flex items-center space-x-3 mb-1">
            {/* Icon */}
            <div className="h-12 w-12 rounded-full bg-mystic-gold/20 flex items-center justify-center text-mystic-gold flex-shrink-0">
              <Icon size={24} />
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-charcoal">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-charcoal">{description}</p>

          {/* Buttons */}
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            {comingSoon ? (
              <span className="inline-block px-4 py-2 rounded-md bg-gray-200 text-gray-700">
                Coming Soon
              </span>
            ) : (
              <>
                {/* Book Now Button */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-mystic-gold to-amber-500
                            text-white px-4 py-2 md:px-5 md:py-2 rounded-md border-2 border-white/30
                            hover:from-amber-500 hover:to-mystic-gold transition-all duration-300
                            font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105
                            animate-pulse-slow z-20"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                {/* Explore Button - Links to the service page */}
                <Link
                  to={link}
                  className="inline-flex items-center justify-center bg-white
                            text-mystic-gold px-4 py-2 md:px-5 md:py-2 rounded-md border-2 border-mystic-gold
                            hover:bg-mystic-gold hover:text-white transition-all duration-300
                            font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105
                            z-20"
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverServiceCard;
