{/*}
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

const ServiceCard = ({ title, description, link, icon: Icon, comingSoon = false }: ServiceCardProps) => {
  return (
    <div className="service-card group">
      <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-mystic-gold">{title}</h3>
      <p className="text-cool-gray mb-6">{description}</p>
      {comingSoon ? (
        <span className="inline-block px-4 py-2 rounded bg-cool-gray/20 text-cool-gray">Coming Soon</span>
      ) : (
        <Link to={link} className="inline-flex items-center text-mystic-gold group-hover:translate-x-1 transition-transform">
          Explore
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
*/}

import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  external?: boolean;
}

const ServiceCard = ({
  title,
  description,
  link,
  icon: Icon,
  comingSoon = false,
  external = false,
}: ServiceCardProps) => {
  const ExploreLink = ({ children }: { children: React.ReactNode }) =>
    external ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-mystic-gold group-hover:translate-x-1 transition-transform"
      >
        {children}
      </a>
    ) : (
      <Link
        to={link}
        className="inline-flex items-center text-mystic-gold group-hover:translate-x-1 transition-transform"
      >
        {children}
      </Link>
    );

  return (
    <div className="service-card group overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500">
      {/* Indicator dots at top of card */}
      <div className="flex justify-end space-x-1 mb-3 md:mb-4 pt-3 px-3">
        <div className="w-1.5 h-1.5 rounded-full bg-mystic-gold/30"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-mystic-gold/60"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-mystic-gold"></div>
      </div>

      {/* Clean, minimalist icon - centered on mobile, left-aligned on desktop */}
      <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-full bg-soft-cream flex items-center justify-center mb-4 md:mb-5 text-mystic-gold transition-all duration-300
                    group-hover:bg-mystic-gold/10 group-hover:text-mystic-gold
                    transform group-hover:scale-110 mx-auto md:mx-0">
        <Icon
          size={24}
          className="transition-all duration-500 ease-in-out group-hover:scale-110"
          strokeWidth={1.5}
        />
      </div>

      {/* Title with clean typography */}
      <h3 className="text-lg font-semibold mb-2 md:mb-3 transition-all duration-300
                     text-charcoal group-hover:text-mystic-gold">
        {title}
      </h3>

      {/* Description with good contrast - optimized for mobile */}
      <p className="text-charcoal/80 text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">{description}</p>

      {comingSoon ? (
        <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-cool-gray/10 text-charcoal font-medium text-xs md:text-sm
                       transition-all duration-300 group-hover:bg-cool-gray/20">
          Coming Soon
        </span>
      ) : (
        <ExploreLink>
          <span className="inline-flex items-center text-mystic-gold font-medium text-xs md:text-sm transition-all duration-300 group-hover:translate-x-1">
            Book Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 md:h-4 md:w-4 ml-1 transition-all duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </ExploreLink>
      )}

      {/* Touch feedback effect for mobile */}
      <div className="absolute inset-0 bg-mystic-gold/0 transition-colors duration-200 active:bg-mystic-gold/5 md:active:bg-transparent -z-5"></div>

      {/* Subtle hover effect for the entire card */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Subtle border on hover */}
        <div className="absolute inset-0 rounded-xl border border-mystic-gold/0 group-hover:border-mystic-gold/10 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default ServiceCard;
