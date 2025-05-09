import { useRef, useEffect } from 'react';

interface LogoVideoProps {
  className?: string;
  width?: string;
  height?: string;
}

const LogoVideo = ({ className = '', width = '150px', height = 'auto' }: LogoVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays and restarts if it stops
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.play().catch(e => console.error("Video play failed:", e));
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div
      className={`logo-video-container ${className}`}
      style={{
        width,
        height,
        borderRadius: '6px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-mystic-gold/5 to-transparent z-0 rounded-md"></div>

      {/* Animated subtle pulsing border */}
      <div className="absolute inset-0 rounded-md border border-mystic-gold/20 animate-pulse-slow z-10"></div>

      {/* The video */}
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
          filter: 'contrast(1.05) brightness(1.05) saturate(1.1)',
        }}
      />

      {/* Overlay to enhance video appearance */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mystic-gold/5 z-2 rounded-md pointer-events-none"></div>
    </div>
  );
};

export default LogoVideo;
