'use client';
// WwLogoWithVideo component - toggles between sleep.png and awake.png on hover

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface WwLogoWithVideoProps {
  messages: {
    ww3Deluxe: string;
    redTitle: string;
  };
}

export default function WwLogoWithVideo({ messages }: WwLogoWithVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Set up intersection observer for scroll-based effects on mobile
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
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
  }, []);

  // Play audio when hovering
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (audioRef.current) {
      // Reset audio to start to ensure it plays each time
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // For mobile, toggle on tap/touch
  const handleTap = () => {
    if (isMobile) {
      setIsHovering(prev => !prev);
      if (!isHovering && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
      >
        {/* awake.png image - shows on hover */}
        {isHovering && (
          <div className="absolute inset-0 z-10">
            <Image 
              src="/awake.png" 
              alt="AWAKE" 
              fill={true}
              className="object-contain"
              priority
            />
          </div>
        )}
        
        {/* Audio element for awake.mp3 */}
        <audio ref={audioRef} src="/awake.mp3" preload="auto" />
        
        {/* sleep.png image - base image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/sleep.png" 
            alt="SLEEP" 
            fill={true}
            className="object-contain"
            priority
          />
        </div>
      </div>
      {/* Text below image */}
      <div className="mt-2 text-white font-mono tracking-wider text-center text-lg">
        PLEASE DONT WAKE ME UP.
      </div>
    </div>
  );
} 