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
    // Always redirect to contact page for "Book Now" buttons
    external ? (
      <a
        href="/contact"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-mystic-gold group-hover:translate-x-1 transition-transform"
      >
        {children}
      </a>
    ) : (
      <Link
        to="/contact"
        className="inline-flex items-center text-mystic-gold group-hover:translate-x-1 transition-transform"
      >
        {children}
      </Link>
    );

  return (
    <div className="service-card group overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 relative">
      {/* Card image/background - similar to animal cards */}
      <div className="absolute inset-0 bg-gradient-to-b from-mystic-gold/10 to-mystic-gold/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

      {/* Content container with padding */}
      <div className="relative z-10 p-5">
        {/* Icon at the top */}
        <div className="h-16 w-16 rounded-full bg-soft-cream flex items-center justify-center mb-4 text-mystic-gold transition-all duration-300
                      group-hover:bg-mystic-gold group-hover:text-white
                      transform group-hover:scale-110 mx-auto">
          <Icon
            size={28}
            className="transition-all duration-500 ease-in-out"
            strokeWidth={1.5}
          />
        </div>

        {/* Title with clean typography */}
        <h3 className="text-xl font-semibold mb-3 transition-all duration-300
                      text-charcoal group-hover:text-mystic-gold text-center">
          {title}
        </h3>

        {/* Description with good contrast */}
        <p className="text-charcoal/80 text-sm mb-6 leading-relaxed line-clamp-3 text-center">{description}</p>

        {/* Action button at bottom */}
        <div className="text-center">
          {comingSoon ? (
            <span className="inline-block px-4 py-2 rounded-md bg-cool-gray/10 text-charcoal font-medium
                          transition-all duration-300 group-hover:bg-cool-gray/20">
              Coming Soon
            </span>
          ) : (
            <ExploreLink>
              <span className="inline-flex items-center justify-center text-mystic-gold font-medium transition-all duration-300
                            group-hover:text-white bg-transparent group-hover:bg-mystic-gold px-4 py-2 rounded-lg border border-mystic-gold">
                Book Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 transition-all duration-300 group-hover:translate-x-1"
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
        </div>
      </div>

      {/* Overlay effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-mystic-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default ServiceCard;
