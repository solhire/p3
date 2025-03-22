'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YeLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
      
      // Autoplay on mobile
      if (isMobileDevice && videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    };
    
    checkMobile();
    
    // Add resize event listener to check for orientation changes
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <Link href="/ye" className="group md:absolute md:right-36 text-center md:text-left">
      <div className="flex flex-col items-center">
        <div 
          className="relative w-64 h-64 md:w-96 md:h-96 mb-2 group"
          onMouseEnter={() => !isMobile && videoRef.current?.play()}
          onMouseLeave={() => {
            if (!isMobile && videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
          onClick={() => {
            // For mobile, toggle play/pause on click
            if (isMobile && videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
              } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }
          }}
        >
          {/* Video that will be masked by the logo */}
          <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: 'url(/ye2.png)', maskImage: 'url(/ye2.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
            <video 
              ref={videoRef}
              src="/bully.mp4" 
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              autoPlay={isMobile}
            />
          </div>
          
          {/* Ye2 logo as a visible element when not hovering */}
          <Image 
            src="/ye2.png" 
            alt="Ye Logo" 
            fill
            className={`absolute inset-0 object-contain ${isMobile ? '' : 'group-hover:opacity-0'} transition-opacity duration-300`}
          />
        </div>
        <div className="text-white text-[2rem] md:text-[3rem] font-black tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] lowercase">ye</div>
      </div>
    </Link>
  );
}
