'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function WwLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = async () => {
    if (!isMobile && !mediaError) {
      try {
        // Play both video and audio on hover
        if (videoRef.current) {
          await videoRef.current.play();
        }
        if (audioRef.current) {
          audioRef.current.volume = 1;
          await audioRef.current.play();
        }
      } catch (error) {
        console.error('Media playback failed:', error);
        setMediaError(true);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !mediaError) {
      // Stop both video and audio when hovering off
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* WW3 DELUXE text */}
      <div className="mb-4 text-[#FF0000] font-mono tracking-wider text-center text-xl">
        WW3 DELUXE
      </div>
      <div 
        className="relative w-56 h-56 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* A image on top of RED logo - positioned absolutely */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <img 
            src="/a.png" 
            alt="A Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          onError={() => setMediaError(true)}
        >
          <source src="/red.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Video that will be masked by the logo - only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: 'url(/red.png)', maskImage: 'url(/red.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              onError={() => setMediaError(true)}
            >
              <source src="/red3d.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* RED logo - always visible on mobile, visible on desktop when not hovering */}
        <Image 
          src="/red.png" 
          alt="RED Logo" 
          fill
          className={`absolute inset-0 object-contain ${!isMobile ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`}
        />
      </div>
      {/* RED text */}
      <div className="mt-4 text-[#FF0000] font-mono font-bold tracking-wider text-center text-xl">
        RED
      </div>
    </div>
  );
} 