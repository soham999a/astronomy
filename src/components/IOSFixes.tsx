import { useEffect } from 'react';

/**
 * Component that applies fixes for iOS Safari issues
 * - Prevents overscroll bounce effect
 * - Handles viewport height issues with address bar
 * - Fixes touch event handling
 * - Handles safe area insets
 * - Improves scrolling performance
 * - Fixes navbar issues on mobile
 */
const IOSFixes = () => {
  useEffect(() => {
    // Function to detect iOS
    const isIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    };

    // Function to detect Safari
    const isSafari = () => {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    };

    // Function to detect mobile
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Enhanced fixes for all mobile devices
    const applyMobileFixes = () => {
      // Fix for mobile navbar
      const navbar = document.querySelector('header');
      if (navbar) {
        // Ensure navbar is properly positioned on mobile
        const navEl = navbar as HTMLElement;
        navEl.style.position = 'fixed';
        navEl.style.width = '100%';
        navEl.style.zIndex = '1000';
        navEl.style.top = '0';
        navEl.style.left = '0';

        // Optimize navbar for mobile performance
        navEl.style.WebkitBackfaceVisibility = 'hidden';
        navEl.style.WebkitTransform = 'translate3d(0,0,0)';
      }

      // Fix for hero section on mobile
      const heroSection = document.querySelector('section.h-screen');
      if (heroSection) {
        const heroEl = heroSection as HTMLElement;
        // Ensure hero section takes up the full viewport height on mobile
        heroEl.style.height = `${window.innerHeight}px`;
        heroEl.style.WebkitBackfaceVisibility = 'hidden';
        heroEl.style.WebkitTransform = 'translate3d(0,0,0)';
      }

      // Fix for loading animation on mobile
      const loadingContainer = document.querySelector('.fixed.inset-0.flex.flex-col.items-center.justify-center');
      if (loadingContainer) {
        const loadingEl = loadingContainer as HTMLElement;
        // Ensure loading animation takes up the full viewport height and width
        loadingEl.style.height = `${window.innerHeight}px`;
        loadingEl.style.width = `${window.innerWidth}px`;
        // Prevent any scrolling during animation
        loadingEl.style.overflow = 'hidden';
        loadingEl.style.touchAction = 'none';
        // Optimize for mobile performance
        loadingEl.style.WebkitBackfaceVisibility = 'hidden';
        loadingEl.style.WebkitTransform = 'translate3d(0,0,0)';
        loadingEl.style.willChange = 'transform, opacity';
      }

      // Improve touch targets for mobile
      const touchTargets = document.querySelectorAll('a, button, input, select, textarea');
      touchTargets.forEach(element => {
        const el = element as HTMLElement;
        // Ensure minimum touch target size of 44px (Apple's recommendation)
        if (window.getComputedStyle(el).getPropertyValue('min-height') === 'auto' ||
            parseInt(window.getComputedStyle(el).getPropertyValue('min-height')) < 44) {
          el.style.minHeight = '44px';
        }
        if (window.getComputedStyle(el).getPropertyValue('min-width') === 'auto' ||
            parseInt(window.getComputedStyle(el).getPropertyValue('min-width')) < 44) {
          el.style.minWidth = '44px';
        }

        // Optimize touch targets for mobile performance
        el.style.touchAction = 'manipulation';
      });

      // Make service cards more mobile-friendly
      const serviceCards = document.querySelectorAll('.relative.overflow-hidden.rounded-lg');
      serviceCards.forEach(card => {
        const cardEl = card as HTMLElement;
        cardEl.style.touchAction = 'manipulation';
        cardEl.style.WebkitBackfaceVisibility = 'hidden';
        cardEl.style.WebkitTransform = 'translate3d(0,0,0)';

        // Ensure proper height on mobile
        if (window.innerWidth <= 768) {
          cardEl.style.height = '300px';
        } else if (window.innerWidth <= 1024) {
          cardEl.style.height = '320px';
        }
      });

      // Optimize images for mobile
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const imgEl = img as HTMLElement;
        imgEl.style.WebkitBackfaceVisibility = 'hidden';
        imgEl.style.WebkitTransform = 'translate3d(0,0,0)';
      });
    };

    // Apply iOS-specific fixes
    if (isIOS() || isSafari()) {
      // Add CSS to prevent overscroll
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.touchAction = 'manipulation';

      // Fix for iOS Safari viewport height issues
      const setVhProperty = () => {
        // Set a CSS variable with the actual viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Also set safe area insets as CSS variables
        if (CSS && CSS.supports && CSS.supports('padding-top: env(safe-area-inset-top)')) {
          document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
          document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right)');
          document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
          document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left)');
        } else {
          document.documentElement.style.setProperty('--safe-area-inset-top', '0px');
          document.documentElement.style.setProperty('--safe-area-inset-right', '0px');
          document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px');
          document.documentElement.style.setProperty('--safe-area-inset-left', '0px');
        }
      };

      // Set initially and on resize/orientation change
      setVhProperty();
      window.addEventListener('resize', setVhProperty);
      window.addEventListener('orientationchange', setVhProperty);
      window.addEventListener('load', setVhProperty);

      // Also update on scroll for iOS Safari address bar changes
      let lastScrollTop = 0;
      const handleScroll = () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) > 50) {
          setVhProperty();
          lastScrollTop = st;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Prevent double-tap zoom on iOS
      const preventDoubleTapZoom = (e: TouchEvent) => {
        const now = Date.now();
        const lastTouch = (window as any).lastTouch || now + 1;
        const delta = now - lastTouch;
        if (delta < 500 && delta > 0) {
          e.preventDefault();
        }
        (window as any).lastTouch = now;
      };

      // Add event listener for double-tap prevention
      document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

      // Fix for iOS momentum scrolling
      const scrollableElements = document.querySelectorAll('.overflow-y-auto, .overflow-x-auto, .overflow-auto');
      scrollableElements.forEach(element => {
        (element as HTMLElement).style.WebkitOverflowScrolling = 'touch';
      });

      // Enhanced iOS-specific fixes for loading animation
      const fixLoadingAnimationForIOS = () => {
        // Target the loading animation container
        const loadingContainer = document.querySelector('.fixed.inset-0.flex.flex-col.items-center.justify-center');
        if (loadingContainer) {
          // Apply iOS-specific styles to the loading container
          const loadingEl = loadingContainer as HTMLElement;
          loadingEl.style.position = 'fixed';
          loadingEl.style.top = '0';
          loadingEl.style.left = '0';
          loadingEl.style.right = '0';
          loadingEl.style.bottom = '0';
          loadingEl.style.height = `${window.innerHeight}px`;
          loadingEl.style.width = `${window.innerWidth}px`;
          loadingEl.style.WebkitOverflowScrolling = 'touch';
          loadingEl.style.overflow = 'hidden';
          loadingEl.style.WebkitBackfaceVisibility = 'hidden';
          loadingEl.style.WebkitTransform = 'translate3d(0,0,0)';
          loadingEl.style.willChange = 'transform, opacity';
          loadingEl.style.touchAction = 'none';

          // Prevent scrolling during animation
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';

          // Ensure the logo animation works correctly on iOS
          const logoContainer = loadingContainer.querySelector('.relative.z-10');
          if (logoContainer) {
            const logoEl = logoContainer as HTMLElement;
            logoEl.style.willChange = 'transform';
            logoEl.style.WebkitBackfaceVisibility = 'hidden';
            logoEl.style.WebkitTransform = 'translate3d(0,0,0)';
          }

          // Fix for the cosmic background
          const cosmicBackground = loadingContainer.querySelector('.absolute.inset-0.overflow-hidden');
          if (cosmicBackground) {
            const bgEl = cosmicBackground as HTMLElement;
            bgEl.style.WebkitBackfaceVisibility = 'hidden';
            bgEl.style.WebkitTransform = 'translate3d(0,0,0)';
            bgEl.style.willChange = 'transform';
          }

          // Fix for stars and animations
          const stars = loadingContainer.querySelectorAll('.absolute.rounded-full');
          stars.forEach(star => {
            const starEl = star as HTMLElement;
            starEl.style.WebkitBackfaceVisibility = 'hidden';
            starEl.style.WebkitTransform = 'translate3d(0,0,0)';
          });

          // Fix for brand name text
          const brandName = loadingContainer.querySelector('h1');
          if (brandName) {
            const textEl = brandName as HTMLElement;
            textEl.style.WebkitBackfaceVisibility = 'hidden';
            textEl.style.WebkitTransform = 'translate3d(0,0,0)';
            textEl.style.willChange = 'transform, opacity';
          }
        }
      };

      // Apply iOS loading animation fixes
      fixLoadingAnimationForIOS();
      window.addEventListener('resize', fixLoadingAnimationForIOS);
      window.addEventListener('orientationchange', fixLoadingAnimationForIOS);

      // Re-apply fixes after orientation change with a delay
      window.addEventListener('orientationchange', () => {
        setTimeout(fixLoadingAnimationForIOS, 300);
      });

      // Fix for iOS input focus issues
      const handleInputFocus = () => {
        // Add a small delay to allow the keyboard to appear
        setTimeout(() => {
          // Scroll the window to ensure the input is visible
          window.scrollTo(0, window.scrollY);
        }, 300);
      };

      const inputElements = document.querySelectorAll('input, textarea');
      inputElements.forEach(element => {
        element.addEventListener('focus', handleInputFocus);
      });

      // Enhanced cleanup for iOS-specific fixes
      return () => {
        // Reset scroll behavior
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';
        document.documentElement.style.touchAction = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        // Remove event listeners
        window.removeEventListener('resize', setVhProperty);
        window.removeEventListener('orientationchange', setVhProperty);
        window.removeEventListener('load', setVhProperty);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('touchend', preventDoubleTapZoom);

        // Remove loading animation event listeners
        window.removeEventListener('resize', fixLoadingAnimationForIOS);
        window.removeEventListener('orientationchange', fixLoadingAnimationForIOS);

        // Remove delayed orientation change handler
        const delayedOrientationHandler = () => setTimeout(fixLoadingAnimationForIOS, 300);
        window.removeEventListener('orientationchange', delayedOrientationHandler);

        // Remove input focus handlers
        inputElements.forEach(element => {
          element.removeEventListener('focus', handleInputFocus);
        });

        // Reset any loading animation container styles if it exists
        const loadingContainer = document.querySelector('.fixed.inset-0.flex.flex-col.items-center.justify-center');
        if (loadingContainer) {
          const loadingEl = loadingContainer as HTMLElement;
          loadingEl.style.overflow = '';
          loadingEl.style.touchAction = '';
        }
      };
    }

    // Apply mobile fixes for all mobile devices
    if (isMobile()) {
      applyMobileFixes();

      // Add resize listener to reapply mobile fixes
      window.addEventListener('resize', applyMobileFixes);

      return () => {
        window.removeEventListener('resize', applyMobileFixes);
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default IOSFixes;
