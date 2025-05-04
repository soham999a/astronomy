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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-sm shadow-md py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <a href="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-mystic-gold">
            Logo
          </h1>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-charcoal hover:text-mystic-gold"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 z-40 bg-soft-cream transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out md:hidden`}
          style={{ top: '60px' }}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/numerology', label: 'Numerology' },
    { to: '/vastu', label: 'Vastu' },
    { to: '/astrology', label: 'Astrology' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.to;

        if (isActive) {
          // Render disabled/non-clickable text
          return (
            <span
              key={link.to}
              className="font-medium opacity-60 cursor-default"
            >
              {link.label}
            </span>
          );
        } else {
          // Render clickable link with enhanced hover effects
          return (
            <a
              key={link.to}
              href={link.to}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-glow font-medium transition-all duration-300 hover:text-mystic-gold hover:scale-110"
              onClick={onClick}
            >
              {link.label}
            </a>
          );
        }
      })}
    </>
  );
};

export default Navbar;
