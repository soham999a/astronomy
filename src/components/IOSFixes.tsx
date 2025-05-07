import { useEffect } from 'react';

/**
 * Component that applies fixes for iOS Safari issues
 * - Prevents overscroll bounce effect
 * - Handles viewport height issues with address bar
 * - Fixes touch event handling
 */
const IOSFixes = () => {
  useEffect(() => {
    // Function to detect iOS
    const isIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    };

    // Fix for iOS Safari overscroll bounce effect
    if (isIOS()) {
      // Add CSS to prevent overscroll
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.touchAction = 'manipulation';
      
      // Fix for iOS Safari viewport height issues
      const setVhProperty = () => {
        // Set a CSS variable with the actual viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      // Set initially and on resize
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
      
      // Cleanup
      return () => {
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';
        document.documentElement.style.touchAction = '';
        window.removeEventListener('resize', setVhProperty);
        window.removeEventListener('orientationchange', setVhProperty);
        document.removeEventListener('touchend', preventDoubleTapZoom);
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default IOSFixes;
