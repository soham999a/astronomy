import { useRef, useEffect, useState } from 'react';

interface LogoVideoProps {
  className?: string;
  width?: string;
  height?: string;
}

const LogoVideo = ({ className = '', width = '150px', height = 'auto' }: LogoVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const detectIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(isIOSDevice);
    };

    detectIOS();
  }, []);

  useEffect(() => {
    // Ensure video plays and restarts if it stops
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.play().catch(e => console.error("Video play failed:", e));
    };

    // iOS-specific video handling
    const handleIOSVideoIssues = () => {
      if (isIOS) {
        // Force play on iOS after a short delay
        setTimeout(() => {
          video.play().catch(e => {
            console.error("iOS video play failed:", e);
            // Try again with user interaction simulation
            document.addEventListener('touchstart', function playOnTouch() {
              video.play().catch(e => console.error("iOS touch play failed:", e));
              document.removeEventListener('touchstart', playOnTouch);
            }, { once: true });
          });
        }, 100);
      }
    };

    // Handle video loading issues
    const handleCanPlayThrough = () => {
      video.play().catch(e => console.error("Video canplaythrough play failed:", e));
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    // Apply iOS fixes
    handleIOSVideoIssues();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [isIOS]);

  return (
    <div
      className={`logo-video-container ${className}`}
      style={{
        width,
        height,
        borderRadius: '6px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle glow effect - optimized for iOS */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-mystic-gold/5 to-transparent z-0 rounded-md"
        style={{
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)'
        }}
      ></div>

      {/* Animated subtle pulsing border - simplified for iOS */}
      <div
        className={`absolute inset-0 rounded-md border border-mystic-gold/20 ${isIOS ? '' : 'animate-pulse-slow'} z-10`}
        style={{
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)'
        }}
      ></div>

      {/* The video - optimized for iOS */}
      <video
        ref={videoRef}
        src="/logo video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="relative z-1 rounded-md"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'normal',
          filter: isIOS ? 'contrast(1.03) brightness(1.03)' : 'contrast(1.05) brightness(1.05) saturate(1.1)',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)'
        }}
      />

      {/* Overlay to enhance video appearance - simplified for iOS */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mystic-gold/5 z-2 rounded-md pointer-events-none"
        style={{
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)'
        }}
      ></div>
    </div>
  );
};

export default LogoVideo;
