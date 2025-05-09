import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoVideo from './LogoVideo';

interface LoadingAnimationProps {
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const LoadingAnimation = ({
  onComplete,
  duration = 3200 // 3.2 seconds - balanced animation time
}: LoadingAnimationProps) => {
  const [animationStage, setAnimationStage] = useState<'initial' | 'zooming' | 'complete'>('initial');
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [navbarPosition, setNavbarPosition] = useState({ top: 0, left: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the position of the navbar logo for the final position
  useEffect(() => {
    const getNavbarPosition = () => {
      // Find the navbar logo specifically (not any logo-video-container)
      const navbarLogo = document.querySelector('header .logo-video-container');
      if (navbarLogo) {
        const rect = navbarLogo.getBoundingClientRect();
        setNavbarPosition({
          top: rect.top,
          left: rect.left
        });
        console.log('Navbar position:', rect.top, rect.left);
      } else {
        // Fallback position if navbar logo not found
        setNavbarPosition({
          top: 20,
          left: 20
        });
      }
    };

    // Try to get position immediately
    getNavbarPosition();

    // Also try after a short delay to ensure DOM is ready
    const positionTimer = setTimeout(getNavbarPosition, 100);

    // And listen for load event
    window.addEventListener('load', getNavbarPosition);

    return () => {
      clearTimeout(positionTimer);
      window.removeEventListener('load', getNavbarPosition);
    };
  }, [windowDimensions]); // Re-run when window dimensions change

  useEffect(() => {
    // Start with a smooth entrance animation
    const entranceDelay = setTimeout(() => {
      // Start zooming animation after a longer delay to give users time to read
      const initialDelay = setTimeout(() => {
        setAnimationStage('zooming');

        // Complete animation after zooming - balanced timing
        const zoomingDuration = duration * 0.35; // 35% of total duration for zooming
        timeoutRef.current = setTimeout(() => {
          setAnimationStage('complete');

          // Hide the animation IMMEDIATELY after completion
          // This ensures the background doesn't stay visible after animation
          setIsVisible(false);
          if (onComplete) onComplete();
        }, zoomingDuration);
      }, duration * 0.6); // 60% of total duration for initial stage - longer to read

      return () => clearTimeout(initialDelay);
    }, 400); // Slightly longer entrance delay for better effect

    return () => {
      clearTimeout(entranceDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, onComplete]);

  // Custom font for the brand name
  const brandNameStyles = {
    fontFamily: "'Cinzel', serif", // Elegant font for mystical/astrological theme
    background: 'linear-gradient(to right, #D4AF37, #FFC857)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
    letterSpacing: '0.15em'
  };

  // Get device type for responsive adjustments
  const isMobile = window.innerWidth <= 768;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Calculate the final position for the logo with improved accuracy and mobile/iOS adjustments
  const calculateFinalPosition = () => {
    if (animationStage === 'initial') return { x: 0, y: 0 };

    // Get the center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Adjust logo sizes for mobile
    const initialLogoSize = isMobile ? 180 : 220; // Smaller on mobile
    const finalLogoSize = isMobile ? 90 : 110; // Smaller on mobile

    // Calculate the distance to move
    // We need to account for the difference in size and position
    let moveX = navbarPosition.left - centerX + (finalLogoSize / 2);
    let moveY = navbarPosition.top - centerY + (finalLogoSize / 2);

    // iOS-specific adjustments
    if (isIOS) {
      // iOS sometimes needs additional adjustments due to viewport issues
      moveY = moveY - (isMobile ? 10 : 0); // Slight adjustment for iOS
    }

    // Mobile-specific adjustments
    if (isMobile) {
      // Ensure the logo doesn't move too far on small screens
      moveX = Math.max(Math.min(moveX, window.innerWidth / 2), -window.innerWidth / 2);
      moveY = Math.max(Math.min(moveY, window.innerHeight / 2), -window.innerHeight / 2);
    }

    return {
      x: moveX,
      y: moveY
    };
  };

  const finalPosition = calculateFinalPosition();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3, // Faster fade in/out
            exit: { duration: 0.2 } // Even faster fade out
          }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-soft-cream z-50"
        >
          {/* Enhanced cosmic background with stars, nebula and cosmic effects */}
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

            {/* Enhanced nebula effect with animation */}
            <div className="absolute inset-0 opacity-40">
              <motion.div
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-mystic-gold/15 blur-3xl"
                animate={{
                  scale: [1, 1.2, 0.9, 1],
                  opacity: [0.15, 0.25, 0.1, 0.15]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-purple-500/15 blur-3xl"
                animate={{
                  scale: [1, 0.8, 1.1, 1],
                  opacity: [0.15, 0.2, 0.1, 0.15]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 2
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-blue-500/15 blur-3xl"
                animate={{
                  scale: [1, 1.1, 0.9, 1],
                  opacity: [0.15, 0.2, 0.1, 0.15]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 4
                }}
              />
            </div>

            {/* Optimized cosmic dust particles - reduced for better performance */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`dust-${i}`}
                  className="absolute rounded-full bg-white/30 blur-sm"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    animation: `float ${8 + Math.random() * 4}s infinite alternate ease-in-out`
                  }}
                />
              ))}
            </div>

            {/* Optimized stars with different sizes and colors - reduced count for better performance */}
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

            {/* Optimized shooting stars - reduced for better performance */}
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

            {/* Simplified cosmic energy waves */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={`wave-${i}`}
                  className="absolute top-1/2 left-1/2 rounded-full border border-mystic-gold/30"
                  style={{
                    width: `${(i + 1) * 30}%`,
                    height: `${(i + 1) * 30}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `pulse ${6 + i * 2}s infinite alternate ease-in-out`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main content container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Logo container */}
            <motion.div
              className="relative flex flex-col items-center"
              animate={{
                scale: animationStage === 'initial' ? 1 : animationStage === 'zooming' ? [1, 0.5] : 0.5,
                x: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, finalPosition.x] : finalPosition.x,
                y: animationStage === 'initial' ? 0 : animationStage === 'zooming' ? [0, finalPosition.y] : finalPosition.y,
              }}
              transition={{
                duration: animationStage === 'zooming' ? 0.6 : 0.2, // Faster animation
                ease: "easeInOut",
                x: { type: "spring", stiffness: 200, damping: 20 }, // Spring physics for more natural movement
                y: { type: "spring", stiffness: 200, damping: 20 }
              }}
            >
              {/* Logo Video with enhanced cosmic glow effect */}
              <motion.div
                className="relative z-10"
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{
                  rotate: animationStage === 'initial' ? [0, 3, -3, 0] : 0,
                  scale: animationStage === 'initial' ? 1 : 0.5,
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
                {/* Enhanced glow layers with animation */}
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
                <motion.div
                  className="absolute inset-0 rounded-full bg-mystic-gold/15 blur-2xl"
                  animate={{
                    scale: [1.25, 1.4, 1.25],
                    opacity: [0.15, 0.2, 0.15]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-mystic-gold/20 blur-xl"
                  animate={{
                    scale: [1.1, 1.2, 1.1],
                    opacity: [0.2, 0.25, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />

                {/* Multiple pulsing rings with different timings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-mystic-gold/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0.2, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20"
                  animate={{
                    scale: [1.1, 1.4, 1.1],
                    opacity: [0.5, 0.1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full border border-purple-300/20"
                  animate={{
                    scale: [1.2, 1.5, 1.2],
                    opacity: [0.4, 0.1, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />

                {/* Cosmic energy points around the logo */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`energy-point-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-mystic-gold/80"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateX(120px)`,
                      transformOrigin: 'left center',
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 3px rgba(212, 175, 55, 0.5)',
                        '0 0 8px rgba(212, 175, 55, 0.8)',
                        '0 0 3px rgba(212, 175, 55, 0.5)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* The logo video with entrance animation - responsive for mobile */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10"
                >
                  <LogoVideo
                    width={animationStage === 'initial'
                      ? (isMobile ? '180px' : '220px')
                      : (isMobile ? '90px' : '110px')}
                    height={animationStage === 'initial'
                      ? (isMobile ? '180px' : '220px')
                      : (isMobile ? '90px' : '110px')}
                    className="relative z-10"
                  />
                </motion.div>

                {/* Animated cosmic energy around the logo */}
                <motion.div
                  className="absolute -inset-8 -z-10 opacity-70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {/* Cosmic rays */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-t from-mystic-gold/0 via-mystic-gold/30 to-mystic-gold/0"
                      style={{
                        top: '50%',
                        left: '50%',
                        height: `${40 + Math.random() * 30}px`,
                        transform: `rotate(${i * 30}deg) translateX(70px)`,
                        transformOrigin: 'left center',
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        height: [(40 + Math.random() * 30) + 'px', (60 + Math.random() * 30) + 'px', (40 + Math.random() * 30) + 'px'],
                      }}
                      transition={{
                        duration: 3 + Math.random(),
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Orbiting particles */}
                <motion.div
                  className="absolute inset-0 z-20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-mystic-gold"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 72}deg) translateX(${120 + i * 10}px)`,
                        transformOrigin: 'left center',
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        boxShadow: [
                          '0 0 3px rgba(212, 175, 55, 0.5)',
                          '0 0 8px rgba(212, 175, 55, 0.8)',
                          '0 0 3px rgba(212, 175, 55, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Brand Name with Special Font and Cosmic Animation - responsive for mobile */}
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

                {/* Text with letter animation - responsive font size */}
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
                  {/* Animate each letter individually - faster on mobile */}
                  {"HARMONY SEEKER".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.5 + i * (isMobile ? 0.03 : 0.05), // Faster on mobile
                        ease: "easeOut"
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-mystic-gold/5 blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </motion.div>

            {/* Loading indicator with cosmic theme */}
            <motion.div
              className="mt-16 flex flex-col items-center justify-center"
              animate={{
                opacity: animationStage === 'zooming' ? [1, 0] : animationStage === 'complete' ? 0 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Loading text */}
              <motion.p
                className="text-white/70 text-sm mb-4 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                ENTERING THE COSMIC REALM
              </motion.p>

              {/* Animated dots */}
              <div className="flex space-x-3 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-mystic-gold to-amber-500"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                      boxShadow: [
                        '0 0 0px rgba(212, 175, 55, 0.3)',
                        '0 0 10px rgba(212, 175, 55, 0.7)',
                        '0 0 0px rgba(212, 175, 55, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Cosmic line */}
              <motion.div
                className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-mystic-gold/50 to-transparent rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: ['0%', '30%', '70%', '100%'],
                  opacity: [0, 1, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  times: [0, 0.3, 0.6, 1]
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
