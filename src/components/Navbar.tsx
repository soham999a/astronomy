import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-soft-cream/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto flex items-center px-4 md:px-6">
        {/* Logo positioned to the left with more left margin */}
        <a href="/" className="flex items-center pl-0 md:pl-0 mr-auto">
          <h1 className="text-xl md:text-2xl font-bold text-mystic-gold">
            Logo
          </h1>
        </a>

        {/* Mobile menu button with enhanced hover effect */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-charcoal hover:text-mystic-gold transition-colors duration-300 p-2 rounded-full hover:bg-mystic-gold/10 ml-auto"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation - positioned to the right */}
        <nav className="hidden md:flex items-center space-x-8 ml-auto">
          <NavLinks />
        </nav>

        {/* Mobile Navigation - Fixed for iOS with improved handling */}
        {isMenuOpen && (
          <div
            className="fixed inset-x-0 top-[60px] bottom-0 z-40 bg-white md:hidden overflow-hidden"
            style={{
              height: 'calc(100vh - 60px)',
              overscrollBehavior: 'contain'
            }}
            onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
          >
            <div className="h-full overflow-y-auto pb-safe" style={{ WebkitOverflowScrolling: 'touch' }}>
              <nav className="flex flex-col items-center pt-8 pb-20 space-y-8 text-lg px-6">
                <NavLinks onClick={() => setIsMenuOpen(false)} />
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();
  const isMobile = typeof onClick !== 'undefined'; // If onClick is provided, we're in mobile view

  const links = [
    { to: '/', label: 'Home' },
    { to: '/numerology', label: 'Numerology' },
    { to: '/vastu', label: 'Vastu' },
    { to: '/astrology', label: 'Astrology' },
    { to: '/contact', label: 'Contact Us', isHighlighted: true },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.to;

        // Special styling for Contact Us button - more prominent box
        if (link.isHighlighted && !isActive) {
          return (
            <div key={link.to} className="relative py-2 group">
              <a
                href={link.to}
                className={`font-medium text-mystic-gold px-5 py-2.5 border-2 border-mystic-gold rounded-lg transition-all duration-300
                          hover:bg-mystic-gold hover:text-white hover:shadow-md ${isMobile ? 'block mx-auto w-3/4' : ''}`}
                onClick={onClick}
              >
                {link.label}
              </a>
            </div>
          );
        }

        if (isActive) {
          // Enhanced active state with prominent indicator
          return (
            <div
              key={link.to}
              className={`relative py-2 ${isMobile ? 'w-full text-center mb-2' : ''}`}
            >
              <span className="font-medium text-mystic-gold cursor-default">
                {link.label}
              </span>
              {/* Active indicator - more visible gold bar */}
              <span className={`absolute bottom-0 ${isMobile ? 'left-1/4 w-1/2' : 'left-0 w-full'} h-0.5 bg-mystic-gold rounded-full`}></span>
              {/* Glow effect */}
              <span className={`absolute bottom-0 ${isMobile ? 'left-1/4 w-1/2' : 'left-0 w-full'} h-1 bg-mystic-gold/30 blur-sm rounded-full`}></span>
            </div>
          );
        } else {
          // Enhanced hover effects with better visual feedback
          return (
            <div
              key={link.to}
              className={`relative py-2 group ${isMobile ? 'w-full text-center mb-2' : ''}`}
            >
              <a
                href={link.to}
                className={`font-medium text-charcoal transition-all duration-300 hover:text-mystic-gold ${isMobile ? 'block py-2 px-4' : ''} ${link.isHighlighted && isMobile ? 'text-mystic-gold' : ''}`}
                onClick={onClick}
              >
                {link.label}
              </a>
              {/* Animated underline that appears on hover */}
              <span className={`absolute bottom-0 ${isMobile ? 'left-1/4 w-0 group-hover:w-1/2' : 'left-0 w-0 group-hover:w-full'} h-0.5 bg-mystic-gold rounded-full transition-all duration-300`}></span>
              {/* Background highlight on hover */}
              <span className="absolute inset-0 bg-mystic-gold/0 rounded-md -z-10 transition-colors duration-300 group-hover:bg-mystic-gold/5"></span>
            </div>
          );
        }
      })}
    </>
  );
};

export default Navbar;
