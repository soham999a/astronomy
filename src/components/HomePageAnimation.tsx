import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoVideo from './LogoVideo';

interface HomePageAnimationProps {
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const HomePageAnimation = ({
  onComplete,
  duration = 3500 // 3.5 seconds by default
}: HomePageAnimationProps) => {
  const [animationStage, setAnimationStage] = useState<'initial' | 'zooming' | 'complete'>('initial');
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [navbarLogoPosition, setNavbarLogoPosition] = useState({ x: 0, y: 0 });

  // Get device type for responsive adjustments
  const isMobile = window.innerWidth <= 768;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Get the position of the navbar logo
  useEffect(() => {
    const getNavbarLogoPosition = () => {
      // Wait a bit for the DOM to be fully loaded
      setTimeout(() => {
        const navbarLogo = document.querySelector('header .logo-video-container');
        if (navbarLogo) {
          const rect = navbarLogo.getBoundingClientRect();
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          // Calculate the distance from center to navbar logo
          setNavbarLogoPosition({
            x: rect.left + rect.width / 2 - centerX,
            y: rect.top + rect.height / 2 - centerY
          });

          console.log('Navbar logo position:', {
            x: rect.left + rect.width / 2 - centerX,
            y: rect.top + rect.height / 2 - centerY
          });
        } else {
          // Fallback position if logo not found
          setNavbarLogoPosition({
            x: -window.innerWidth / 2 + 80,
            y: -window.innerHeight / 2 + 60
          });
        }
      }, 100);
    };

    // Get position on mount and window resize
    getNavbarLogoPosition();
    window.addEventListener('resize', getNavbarLogoPosition);

    return () => {
      window.removeEventListener('resize', getNavbarLogoPosition);
    };
  }, []);

  // Custom font for the brand name
  const brandNameStyles = {
    fontFamily: "'Cinzel', serif", // Elegant font for mystical/astrological theme
    color: '#D4AF37', // Mystic gold color
    textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
    letterSpacing: '0.15em'
  };

  useEffect(() => {
    // Start with a smooth entrance animation
    const entranceDelay = setTimeout(() => {
      // Start zooming animation after a delay to give users time to read
      const initialDelay = setTimeout(() => {
        setAnimationStage('zooming');

        // Complete animation after zooming - longer for the spinning animation
        const zoomingDuration = 1800; // 1.8 seconds for the zooming/spinning animation
        timeoutRef.current = setTimeout(() => {
          setAnimationStage('complete');

          // Hide the animation after completion
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 300);
        }, zoomingDuration);
      }, duration * 0.5); // 50% of total duration for initial stage

      return () => clearTimeout(initialDelay);
    }, 500); // Slightly longer entrance delay for better effect

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            exit: { duration: 0.2 }
          }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-soft-cream z-50"
        >
          {/* Enhanced cosmic background with stars and nebula effect */}
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-charcoal/95 via-charcoal/85 to-charcoal/95">
            {/* Animated cosmic gradient background */}
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0) 70%)',
                  'radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0) 70%)',
                  'radial-gradient(circle at 40% 80%, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0) 70%)',
                  'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0) 70%)'
                ]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Optimized stars with different sizes and colors */}
            {Array.from({ length: 60 }).map((_, i) => {
              // Determine star type
              const isGolden = i % 8 === 0;
              const isPurple = i % 12 === 0;
              const isLarge = i % 15 === 0;

              // Set color based on type
              let starColor = 'bg-white';
              if (isGolden) starColor = 'bg-mystic-gold';
              if (isPurple) starColor = 'bg-purple-300';

              return (
                <div
                  key={`star-${i}`}
                  className={`absolute rounded-full ${starColor}`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: isLarge ? `${Math.random() * 3 + 2}px` : `${Math.random() * 2 + 1}px`,
                    height: isLarge ? `${Math.random() * 3 + 2}px` : `${Math.random() * 2 + 1}px`,
                    opacity: Math.random() * 0.7 + 0.3,
                    boxShadow: (isGolden || isLarge) ? '0 0 4px rgba(212, 175, 55, 0.5)' : 'none',
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`
                  }}
                />
              );
            })}

            {/* Optimized shooting stars */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`shooting-${i}`}
                className={`absolute h-1 bg-gradient-to-r ${
                  i % 2 === 0
                    ? 'from-transparent via-mystic-gold to-transparent'
                    : 'from-transparent via-white to-transparent'
                }`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 80 + 60}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 4,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Main content container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Logo container with spinning animation */}
            <motion.div
              className="relative flex flex-col items-center"
              animate={{
                scale: animationStage === 'initial' ? 1 : animationStage === 'zooming' ? [1, 0.5] : 0.5,
                x: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, navbarLogoPosition.x] : navbarLogoPosition.x,
                y: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, navbarLogoPosition.y] : navbarLogoPosition.y,
                rotate: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, 720] : 720, // Two full rotations for more dramatic effect
              }}
              transition={{
                duration: animationStage === 'zooming' ? 1.5 : 0.2, // Slightly longer for a more dramatic effect
                ease: "easeInOut",
                rotate: {
                  duration: 1.5, // Match the overall duration
                  ease: [0.4, 0.0, 0.2, 1] // Custom ease for smooth rotation
                },
                scale: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                },
                x: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                },
                y: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }
              }}
            >
              {/* Logo Video with enhanced cosmic glow effect */}
              <motion.div
                className="relative z-10"
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{
                  rotate: animationStage === 'initial' ? [0, 3, -3, 0] : 0,
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 2,
                  repeat: animationStage === 'initial' ? Infinity : 0,
                  repeatType: "reverse",
                  scale: { duration: 0.8, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" }
                }}
              >
                {/* Multiple layers of glow for a more cosmic effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-mystic-gold/10 blur-3xl"
                  animate={{
                    scale: [1.5, 1.7, 1.5],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* The logo video with entrance animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10"
                >
                  <LogoVideo
                    width={isMobile ? '180px' : '220px'}
                    height={isMobile ? '180px' : '220px'}
                    className="relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Brand Name with Special Font and Cosmic Animation */}
              <div className="relative mt-6 md:mt-8">
                {/* Glowing underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mystic-gold to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: animationStage === 'initial' ? 1 : 0,
                    opacity: animationStage === 'zooming' ? [1, 0] : animationStage === 'complete' ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />

                {/* Text with letter animation */}
                <motion.h1
                  className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold relative z-10`}
                  style={brandNameStyles}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: animationStage === 'zooming' ? [1, 0] : animationStage === 'complete' ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {/* Animate each letter individually */}
                  {"HARMONY SEEKER".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.5 + i * (isMobile ? 0.03 : 0.05),
                        ease: "easeOut"
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
            </motion.div>

            {/* Welcome text that appears after logo animation */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: animationStage === 'zooming' ? [0, 1] : animationStage === 'complete' ? 1 : 0,
                scale: animationStage === 'zooming' ? [0.9, 1] : animationStage === 'complete' ? 1 : 0.9,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-mystic-gold mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: animationStage === 'zooming' || animationStage === 'complete' ? 0 : 20,
                  opacity: animationStage === 'zooming' || animationStage === 'complete' ? 1 : 0
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Welcome to Your Cosmic Journey
              </motion.h2>
              <motion.p
                className="text-white/80 text-center max-w-md px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: animationStage === 'zooming' || animationStage === 'complete' ? 0 : 20,
                  opacity: animationStage === 'zooming' || animationStage === 'complete' ? 1 : 0
                }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Discover the ancient wisdom of the stars and numbers to transform your life
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePageAnimation;
