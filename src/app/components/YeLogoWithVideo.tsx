'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YeLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    
    // Autoplay video and audio on load for desktop
    if (!isMobile) {
      if (videoRef.current) {
        videoRef.current.play();
      }
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.play();
      }
    }
    
    // Add resize event listener to check for orientation changes
    window.addEventListener('resize', checkMobile);
    
    // Store reference to video element for cleanup
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Cleanup
      if (videoElement) {
        videoElement.pause();
      }
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);
  
  return (
    <Link href="/ye" className="group text-center">
      <div className="flex flex-col items-center">
        {/* Audio element */}
        <audio 
          ref={audioRef}
          src="/bully.mp3" 
          preload="auto"
        />
        <div 
          className="relative w-64 h-64 md:w-96 md:h-96 mb-2 group"
          onMouseEnter={() => {
            if (!isMobile) {
              videoRef.current?.play();
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            }
          }}
          onMouseLeave={() => {
            if (!isMobile && videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
              if (audioRef.current) {
                audioRef.current.pause();
              }
            }
          }}
        >
          {/* Video that will be masked by the logo - only on desktop */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: 'url(/ye2.png)', maskImage: 'url(/ye2.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
              <video 
                ref={videoRef}
                src="/bully.mp4" 
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                autoPlay
              />
            </div>
          )}
          
          {/* Ye2 logo - always visible on mobile, visible on desktop when not hovering */}
          <Image 
            src="/ye2.png" 
            alt="Ye Logo" 
            fill
            className={`absolute inset-0 object-contain ${!isMobile ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`}
          />
        </div>
      </div>
    </Link>
  );
}
