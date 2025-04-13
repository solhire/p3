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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Set up IntersectionObserver for mobile devices
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && videoRef.current && !mediaError) {
          videoRef.current.play().catch(e => {
            console.log('Mobile video play prevented:', e);
            setMediaError(true);
          });
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isMobile, mediaError]);

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
        ref={containerRef}
        className="relative w-56 h-56 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video that will play on hover or scroll into view on mobile */}
        <div className={`absolute inset-0 z-10 ${!isMobile ? 'opacity-0 group-hover:opacity-100' : isInView && !mediaError ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
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
        
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          muted={isMobile} // Mute on mobile
          onError={() => setMediaError(true)}
        >
          <source src="/converge.mp3" type="audio/mpeg" />
        </audio>
        
        {/* RED logo - visible when video not playing */}
        <div className={`absolute inset-0 z-0 ${!isMobile ? 'group-hover:opacity-0' : isInView && !mediaError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
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