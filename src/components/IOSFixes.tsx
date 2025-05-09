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

    // Apply fixes for all mobile devices
    const applyMobileFixes = () => {
      // Fix for mobile navbar
      const navbar = document.querySelector('header');
      if (navbar) {
        // Ensure navbar is properly positioned on mobile
        (navbar as HTMLElement).style.position = 'fixed';
        (navbar as HTMLElement).style.width = '100%';
        (navbar as HTMLElement).style.zIndex = '1000';
      }

      // Fix for hero section on mobile
      const heroSection = document.querySelector('section.h-screen');
      if (heroSection) {
        // Ensure hero section takes up the full viewport height on mobile
        (heroSection as HTMLElement).style.height = `${window.innerHeight}px`;
      }

      // Fix for loading animation on mobile
      const loadingContainer = document.querySelector('.fixed.inset-0.flex.flex-col.items-center.justify-center');
      if (loadingContainer) {
        // Ensure loading animation takes up the full viewport height
        (loadingContainer as HTMLElement).style.height = `${window.innerHeight}px`;
        // Prevent any scrolling during animation
        (loadingContainer as HTMLElement).style.overflow = 'hidden';
      }

      // Improve touch targets for mobile
      const touchTargets = document.querySelectorAll('a, button, input, select, textarea');
      touchTargets.forEach(element => {
        const el = element as HTMLElement;
        if (window.getComputedStyle(el).getPropertyValue('min-height') === 'auto' ||
            parseInt(window.getComputedStyle(el).getPropertyValue('min-height')) < 44) {
          el.style.minHeight = '44px';
        }
        if (window.getComputedStyle(el).getPropertyValue('min-width') === 'auto' ||
            parseInt(window.getComputedStyle(el).getPropertyValue('min-width')) < 44) {
          el.style.minWidth = '44px';
        }
      });

      // Make service cards more mobile-friendly
      const serviceCards = document.querySelectorAll('.hover-service-card');
      serviceCards.forEach(card => {
        (card as HTMLElement).style.touchAction = 'manipulation';
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

      // Additional iOS-specific fixes for loading animation
      const fixLoadingAnimationForIOS = () => {
        const loadingContainer = document.querySelector('.fixed.inset-0.flex.flex-col.items-center.justify-center');
        if (loadingContainer) {
          // Apply iOS-specific styles to the loading container
          (loadingContainer as HTMLElement).style.position = 'fixed';
          (loadingContainer as HTMLElement).style.top = '0';
          (loadingContainer as HTMLElement).style.left = '0';
          (loadingContainer as HTMLElement).style.right = '0';
          (loadingContainer as HTMLElement).style.bottom = '0';
          (loadingContainer as HTMLElement).style.height = `${window.innerHeight}px`;
          (loadingContainer as HTMLElement).style.WebkitOverflowScrolling = 'touch';

          // Ensure the logo animation works correctly on iOS
          const logoContainer = loadingContainer.querySelector('.relative.z-10');
          if (logoContainer) {
            (logoContainer as HTMLElement).style.willChange = 'transform';
            (logoContainer as HTMLElement).style.WebkitBackfaceVisibility = 'hidden';
          }
        }
      };

      // Apply iOS loading animation fixes
      fixLoadingAnimationForIOS();
      window.addEventListener('resize', fixLoadingAnimationForIOS);
      window.addEventListener('orientationchange', fixLoadingAnimationForIOS);

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

      // Cleanup for iOS-specific fixes
      return () => {
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';
        document.documentElement.style.touchAction = '';
        window.removeEventListener('resize', setVhProperty);
        window.removeEventListener('orientationchange', setVhProperty);
        window.removeEventListener('load', setVhProperty);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('touchend', preventDoubleTapZoom);

        // Remove loading animation event listeners
        window.removeEventListener('resize', fixLoadingAnimationForIOS);
        window.removeEventListener('orientationchange', fixLoadingAnimationForIOS);

        inputElements.forEach(element => {
          element.removeEventListener('focus', handleInputFocus);
        });
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
