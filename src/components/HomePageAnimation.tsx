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
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Get device type for responsive adjustments
  const isMobile = windowDimensions.width <= 768;
  const isTablet = windowDimensions.width > 768 && windowDimensions.width <= 1024;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Get the position of the navbar logo
  useEffect(() => {
    const getNavbarLogoPosition = () => {
      // Wait a bit for the DOM to be fully loaded
      setTimeout(() => {
        const navbarLogo = document.querySelector('header .logo-video-container');
        if (navbarLogo) {
          const rect = navbarLogo.getBoundingClientRect();
          const centerX = windowDimensions.width / 2;
          const centerY = windowDimensions.height / 2;

          // Calculate the distance from center to navbar logo
          const newPosition = {
            x: rect.left + rect.width / 2 - centerX,
            y: rect.top + rect.height / 2 - centerY
          };

          // Apply iOS-specific adjustments if needed
          if (isIOS) {
            // iOS sometimes needs slight adjustments due to different viewport handling
            newPosition.y = newPosition.y - (isMobile ? 10 : 0);
          }

          setNavbarLogoPosition(newPosition);
        } else {
          // Fallback position if logo not found - more responsive based on screen size
          setNavbarLogoPosition({
            x: -windowDimensions.width / 2 + (isMobile ? 60 : isTablet ? 70 : 80),
            y: -windowDimensions.height / 2 + (isMobile ? 40 : isTablet ? 50 : 60)
          });
        }
      }, 150); // Slightly longer timeout for iOS devices
    };

    // Get position on mount and when window dimensions change
    getNavbarLogoPosition();

    // Also update position when orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(getNavbarLogoPosition, 300); // Longer delay after orientation change
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [windowDimensions, isMobile, isTablet, isIOS]);

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
      // Longer initial delay for iOS devices which sometimes need more time to render properly
      const initialDelayDuration = isIOS ? duration * 0.6 : duration * 0.5;

      const initialDelay = setTimeout(() => {
        setAnimationStage('zooming');

        // Complete animation after zooming - longer for the spinning animation
        // Adjust zooming duration based on device type
        const zoomingDuration = isIOS ? 2000 : isMobile ? 1900 : 1800;

        timeoutRef.current = setTimeout(() => {
          setAnimationStage('complete');

          // Hide the animation after completion
          // Longer fade-out time for iOS to ensure smooth transition
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, isIOS ? 400 : 300);
        }, zoomingDuration);
      }, initialDelayDuration);

      return () => clearTimeout(initialDelay);
    }, isIOS ? 600 : 500); // Slightly longer entrance delay for iOS devices

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, onComplete, isIOS, isMobile]);

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
          style={{
            height: `${windowDimensions.height}px`, // Use exact window height for iOS
            width: `${windowDimensions.width}px`,   // Use exact window width for iOS
            overflow: 'hidden',                     // Prevent any scrolling
            WebkitOverflowScrolling: 'touch',       // Better scrolling on iOS if needed
            WebkitBackfaceVisibility: 'hidden',     // Prevent flickering on iOS
            WebkitTransform: 'translate3d(0,0,0)',  // Force GPU acceleration on iOS
            touchAction: 'none'                     // Prevent touch events from bubbling
          }}
        >
          {/* Enhanced cosmic background with stars and nebula effect */}
          <div
            className="absolute inset-0 overflow-hidden bg-gradient-to-b from-charcoal/95 via-charcoal/85 to-charcoal/95"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            {/* Animated cosmic gradient background - optimized for iOS */}
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                willChange: 'background', // Optimize for animation performance
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translate3d(0,0,0)'
              }}
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

            {/* Optimized stars with different sizes and colors - reduced count for mobile */}
            {Array.from({ length: isMobile ? 40 : isTablet ? 50 : 60 }).map((_, i) => {
              // Determine star type
              const isGolden = i % 8 === 0;
              const isPurple = i % 12 === 0;
              const isLarge = i % 15 === 0;

              // Set color based on type
              let starColor = 'bg-white';
              if (isGolden) starColor = 'bg-mystic-gold';
              if (isPurple) starColor = 'bg-purple-300';

              // Generate random positions but ensure they're consistent
              const topPos = (i * 7.3) % 100;
              const leftPos = (i * 13.7) % 100;

              // Simpler animation for iOS to improve performance
              const animationStyle = isIOS
                ? { opacity: isLarge ? 0.8 : 0.6 }
                : {
                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
                    opacity: Math.random() * 0.7 + 0.3
                  };

              return (
                <div
                  key={`star-${i}`}
                  className={`absolute rounded-full ${starColor}`}
                  style={{
                    top: `${topPos}%`,
                    left: `${leftPos}%`,
                    width: isLarge ? `${Math.random() * 3 + 2}px` : `${Math.random() * 2 + 1}px`,
                    height: isLarge ? `${Math.random() * 3 + 2}px` : `${Math.random() * 2 + 1}px`,
                    boxShadow: (isGolden || isLarge) ? '0 0 4px rgba(212, 175, 55, 0.5)' : 'none',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)',
                    ...animationStyle
                  }}
                />
              );
            })}

            {/* Optimized shooting stars - fewer on mobile for better performance */}
            {Array.from({ length: isMobile ? 2 : isTablet ? 3 : 4 }).map((_, i) => {
              // Pre-calculate random values for consistency
              const topPos = (i * 23.7) % 100;
              const leftPos = (i * 17.3) % 100;
              const rotateAngle = (i * 83) % 360;
              const widthVal = 60 + (i * 20) % 40;

              return (
                <motion.div
                  key={`shooting-${i}`}
                  className={`absolute h-1 bg-gradient-to-r ${
                    i % 2 === 0
                      ? 'from-transparent via-mystic-gold to-transparent'
                      : 'from-transparent via-white to-transparent'
                  }`}
                  style={{
                    top: `${topPos}%`,
                    left: `${leftPos}%`,
                    width: `${widthVal}px`,
                    transform: `rotate(${rotateAngle}deg)`,
                    opacity: 0,
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)',
                    willChange: 'opacity'
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: isIOS ? 1.5 : 1.2, // Slightly longer for iOS
                    repeat: Infinity,
                    repeatDelay: 3 + i * 2, // More predictable delays
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </div>

          {/* Main content container - optimized for iOS */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              WebkitBackfaceVisibility: 'hidden',
              WebkitTransform: 'translate3d(0,0,0)',
              willChange: 'transform, opacity'
            }}
          >
            {/* Logo container with spinning animation - optimized for mobile and iOS */}
            <motion.div
              className="relative flex flex-col items-center"
              style={{
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translate3d(0,0,0)',
                willChange: 'transform'
              }}
              animate={{
                scale: animationStage === 'initial' ? 1 : animationStage === 'zooming' ? [1, 0.5] : 0.5,
                x: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, navbarLogoPosition.x] : navbarLogoPosition.x,
                y: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, navbarLogoPosition.y] : navbarLogoPosition.y,
                // Reduce rotation on iOS for better performance
                rotate: animationStage === 'initial' ? 0 :
                        animationStage === 'zooming' ?
                          (isIOS ? [0, 360] : [0, 720]) :
                          (isIOS ? 360 : 720),
              }}
              transition={{
                // Adjust timing for iOS
                duration: animationStage === 'zooming' ? (isIOS ? 1.8 : 1.5) : 0.2,
                ease: "easeInOut",
                rotate: {
                  duration: isIOS ? 1.8 : 1.5,
                  ease: [0.4, 0.0, 0.2, 1]
                },
                scale: {
                  type: "spring",
                  stiffness: isIOS ? 80 : 100, // Softer spring for iOS
                  damping: isIOS ? 25 : 20     // More damping for iOS
                },
                x: {
                  type: "spring",
                  stiffness: isIOS ? 60 : 80,
                  damping: isIOS ? 25 : 20
                },
                y: {
                  type: "spring",
                  stiffness: isIOS ? 60 : 80,
                  damping: isIOS ? 25 : 20
                }
              }}
            >
              {/* Logo Video with enhanced cosmic glow effect - optimized for mobile */}
              <motion.div
                className="relative z-10"
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  WebkitTransform: 'translate3d(0,0,0)',
                  willChange: 'transform, opacity'
                }}
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{
                  // Reduce rotation amount on iOS
                  rotate: animationStage === 'initial' ? (isIOS ? [0, 2, -2, 0] : [0, 3, -3, 0]) : 0,
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: isIOS ? 2.5 : 2,
                  repeat: animationStage === 'initial' ? Infinity : 0,
                  repeatType: "reverse",
                  scale: { duration: 0.8, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" }
                }}
              >
                {/* Multiple layers of glow - simplified for iOS */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-mystic-gold/10"
                  style={{
                    filter: isIOS ? 'blur(20px)' : 'blur(30px)',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)'
                  }}
                  animate={{
                    scale: isIOS ? [1.4, 1.6, 1.4] : [1.5, 1.7, 1.5],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{
                    duration: isIOS ? 5 : 4, // Slower animation for iOS
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* The logo video with entrance animation - responsive sizing */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10"
                  style={{
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)'
                  }}
                >
                  <LogoVideo
                    width={isMobile ? '160px' : isTablet ? '180px' : '220px'}
                    height={isMobile ? '160px' : isTablet ? '180px' : '220px'}
                    className="relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Brand Name with Special Font and Cosmic Animation - optimized for mobile */}
              <div className="relative mt-4 md:mt-6">
                {/* Glowing underline - simplified for iOS */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mystic-gold to-transparent"
                  style={{
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)',
                    willChange: 'transform, opacity'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: animationStage === 'initial' ? 1 : 0,
                    opacity: animationStage === 'zooming' ? [1, 0] : animationStage === 'complete' ? 0 : 1,
                  }}
                  transition={{
                    duration: isIOS ? 1 : 0.8,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />

                {/* Text with letter animation - optimized for mobile */}
                <motion.h1
                  className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} font-bold relative z-10`}
                  style={{
                    ...brandNameStyles,
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)',
                    willChange: 'transform, opacity'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: animationStage === 'zooming' ? [1, 0] : animationStage === 'complete' ? 0 : 1,
                  }}
                  transition={{
                    duration: isIOS ? 0.6 : 0.5,
                    ease: "easeOut"
                  }}
                >
                  {/* Animate each letter individually - fewer animations for iOS */}
                  {isIOS ? (
                    // For iOS, animate the whole text at once for better performance
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      HARMONY SEEKER
                    </motion.span>
                  ) : (
                    // For other devices, animate each letter individually
                    "HARMONY SEEKER".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.5 + i * (isMobile ? 0.03 : 0.05),
                          ease: "easeOut"
                        }}
                        style={{
                          display: 'inline-block',
                          WebkitBackfaceVisibility: 'hidden',
                          WebkitTransform: 'translate3d(0,0,0)'
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))
                  )}
                </motion.h1>
              </div>
            </motion.div>

            {/* Welcome text that appears after logo animation - optimized for mobile and iOS */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translate3d(0,0,0)',
                willChange: 'transform, opacity'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: animationStage === 'zooming' ? [0, 1] : animationStage === 'complete' ? 1 : 0,
                scale: animationStage === 'zooming' ? [0.9, 1] : animationStage === 'complete' ? 1 : 0.9,
              }}
              transition={{
                duration: isIOS ? 1 : 0.8,
                ease: "easeOut"
              }}
            >
              <motion.h2
                className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-mystic-gold mb-3 md:mb-4 px-4 text-center`}
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  WebkitTransform: 'translate3d(0,0,0)',
                  willChange: 'transform, opacity'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: animationStage === 'zooming' || animationStage === 'complete' ? 0 : 20,
                  opacity: animationStage === 'zooming' || animationStage === 'complete' ? 1 : 0
                }}
                transition={{
                  delay: isIOS ? 0.3 : 0.2,
                  duration: isIOS ? 0.6 : 0.5
                }}
              >
                Welcome to Your Cosmic Journey
              </motion.h2>
              <motion.p
                className={`text-white/80 text-center max-w-md px-4 ${isMobile ? 'text-sm' : 'text-base'}`}
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  WebkitTransform: 'translate3d(0,0,0)',
                  willChange: 'transform, opacity'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: animationStage === 'zooming' || animationStage === 'complete' ? 0 : 20,
                  opacity: animationStage === 'zooming' || animationStage === 'complete' ? 1 : 0
                }}
                transition={{
                  delay: isIOS ? 0.5 : 0.4,
                  duration: isIOS ? 0.6 : 0.5
                }}
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
