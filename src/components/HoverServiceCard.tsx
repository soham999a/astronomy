import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
      style={{ height: '350px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Content that slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 bg-white/90 text-charcoal transition-all duration-500 ease-in-out"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(calc(100% - 0px))',
          height: 'auto',
          maxHeight: '80%',
          backdropFilter: 'blur(5px)'
        }}
      >
        {/* All content is inside the sliding panel */}
        <div className="flex flex-col space-y-3">
          {/* Icon */}
          <div className="h-12 w-12 rounded-full bg-mystic-gold/20 flex items-center justify-center text-mystic-gold">
            <Icon size={24} />
          </div>

          {/* Description */}
          <p className="text-charcoal">{description}</p>

          {/* Button */}
          <div className="pt-2">
            {comingSoon ? (
              <span className="inline-block px-4 py-2 rounded-md bg-gray-200 text-gray-700">
                Coming Soon
              </span>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-mystic-gold to-amber-500
                          text-white px-6 py-3 rounded-md border-2 border-white/30
                          hover:from-amber-500 hover:to-mystic-gold transition-all duration-300
                          font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverServiceCard;
