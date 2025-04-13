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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group"
      >
        {/* WW34A overlay image - appears on hover/scroll */}
        <div className={`absolute inset-0 z-10 ${
          (isMobile && isVisible) ? 'opacity-100' : 
          (!isMobile) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        } transition-opacity duration-300 pointer-events-none`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4">
              <Image 
                src="/ww34a.png" 
                alt="WW34A" 
                fill={true}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* ww34a.png image - base image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/ww34a.png" 
            alt="WW34A" 
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