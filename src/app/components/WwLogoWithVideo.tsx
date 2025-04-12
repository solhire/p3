'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import ImageWithDynamicPath from './ImageWithDynamicPath';

interface WwLogoWithVideoProps {
  messages: {
    ww3Deluxe: string;
    redTitle: string;
  };
}

export default function WwLogoWithVideo({ messages }: WwLogoWithVideoProps) {
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
        {messages.ww3Deluxe}
      </div>
      
      <div 
        className="relative w-56 h-56 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video that will play on hover - only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <video 
              ref={videoRef}
              className="w-full h-full object-contain"
              muted
              playsInline
              loop
              onError={() => setMediaError(true)}
            >
              <source src="/converge.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          onError={() => setMediaError(true)}
        >
          <source src="/converge.mp3" type="audio/mpeg" />
        </audio>
        
        {/* RED logo - always visible on mobile, visible on desktop when not hovering */}
        <div className="absolute inset-0 z-0 group-hover:opacity-0 transition-opacity duration-300">
          <Image 
            src="/ww32.png" 
            alt="WW3 Logo" 
            fill={true}
            className="object-contain"
            priority
          />
        </div>
      </div>
      {/* EMBRACE IT text */}
      <div className="mt-2 text-[#FF0000] font-mono tracking-wider text-center text-lg">
        THE ONLY WAY IS TO BECOME MYSELF AGAIN
      </div>
    </div>
  );
} 