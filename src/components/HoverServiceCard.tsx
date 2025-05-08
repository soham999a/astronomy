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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: imageSrc || 'linear-gradient(to bottom, #1A202C, #2D3748)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isHovered ? 'brightness(0.7)' : 'brightness(0.9)'
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

      {/* Title - Always Visible at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 text-white z-10">
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>

      {/* Content that slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 bg-black/70 text-white transition-all duration-500 ease-in-out flex flex-col"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(calc(100% - 60px))',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div className="flex-grow"></div>
        <div>

          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Icon */}
            <div className="h-12 w-12 rounded-full bg-mystic-gold/20 flex items-center justify-center mb-3 text-mystic-gold">
              <Icon size={24} />
            </div>

            {/* Description */}
            <p className="text-gray-200 mb-4">{description}</p>

            {/* Button */}
            {comingSoon ? (
              <span className="inline-block px-4 py-2 rounded-md bg-gray-700 text-gray-300">
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
