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
    <div className="service-card group">
      <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-mystic-gold">{title}</h3>
      <p className="text-cool-gray mb-6">{description}</p>
      {comingSoon ? (
        <span className="inline-block px-4 py-2 rounded bg-cool-gray/20 text-cool-gray">Coming Soon</span>
      ) : (
        <ExploreLink>
          Explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </ExploreLink>
      )}
    </div>
  );
};

export default ServiceCard;
