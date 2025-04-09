'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';

export default function WwLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [firstInteraction, setFirstInteraction] = useState(true);

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
        // On first interaction, play both video and audio
        if (firstInteraction) {
          if (videoRef.current) {
            await videoRef.current.play();
          }
          if (audioRef.current) {
            audioRef.current.volume = 1;
            await audioRef.current.play();
          }
          setFirstInteraction(false);
        } else {
          // On subsequent hovers, only play video
          if (videoRef.current) {
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.error('Media playback failed:', error);
        setMediaError(true);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !mediaError) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* WW3 DELUXE text */}
      <div className="mb-4 text-white font-mono tracking-wider text-center text-xl">
        WW3 DELUXE
      </div>
      <div 
        className="relative w-56 h-56 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          onError={() => setMediaError(true)}
        >
          <source src="/ww3.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Video that will be masked by the logo - only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: 'url(/ww32.png)', maskImage: 'url(/ww32.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              onError={() => setMediaError(true)}
            >
              <source src="/ww3d.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* WW32 logo - always visible on mobile, visible on desktop when not hovering */}
        <Image 
          src="/ww32.png" 
          alt="WW32 Logo" 
          fill
          className={`absolute inset-0 object-contain ${!isMobile ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`}
        />
      </div>
      {/* 24-hour countdown timer */}
      <CountdownTimer />
    </div>
  );
} 