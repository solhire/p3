'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
  const [isVisible, setIsVisible] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Set up intersection observer for scroll-based video playback on mobile
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        
        // For mobile, play/pause based on visibility in viewport
        if (isMobile && videoRef.current && !mediaError) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((error) => {
              console.error('Video play prevented by browser', error);
              setMediaError(true);
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% visible
    );
    
    // Observe the container element
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      
      // Disconnect observer
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
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
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video element - show for both mobile and desktop but control via JS */}
        <div className={`absolute inset-0 z-10 ${
          (isMobile && isVisible) ? 'opacity-100' : 
          (!isMobile) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}>
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
        
        {/* SMT overlay image - appears on hover/scroll */}
        <div className={`absolute inset-0 z-20 ${
          (isMobile && isVisible) ? 'opacity-100' : 
          (!isMobile) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        } transition-opacity duration-300 pointer-events-none`}>
          <Image 
            src="/ww34.png" 
            alt="SMT" 
            fill={true}
            className="object-contain"
            priority
          />
        </div>
        
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          onError={() => setMediaError(true)}
        >
          <source src="/converge.mp3" type="audio/mpeg" />
        </audio>
        
        {/* RED logo - always visible but with opacity changes based on video visibility */}
        <div className={`absolute inset-0 z-0 ${
          (isMobile && isVisible) ? 'opacity-40' : 
          (!isMobile) ? 'group-hover:opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}>
          <Image 
            src="/t.png" 
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