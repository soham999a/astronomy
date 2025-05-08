import { useEffect } from 'react';

/**
 * Component that applies fixes for iOS Safari issues
 * - Prevents overscroll bounce effect
 * - Handles viewport height issues with address bar
 * - Fixes touch event handling
 * - Handles safe area insets
 * - Improves scrolling performance
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

    // Fix for iOS Safari overscroll bounce effect
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

      // Cleanup
      return () => {
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';
        document.documentElement.style.touchAction = '';
        window.removeEventListener('resize', setVhProperty);
        window.removeEventListener('orientationchange', setVhProperty);
        document.removeEventListener('touchend', preventDoubleTapZoom);

        inputElements.forEach(element => {
          element.removeEventListener('focus', handleInputFocus);
        });
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default IOSFixes;
