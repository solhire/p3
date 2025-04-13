'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YeLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Autoplay video and audio on load for desktop
    if (!isMobile) {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
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
  }, [isMobile]);
  
  // Set up IntersectionObserver for mobile devices
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(e => console.log('Mobile video play prevented:', e));
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
  }, [isMobile]);
  
  return (
    <Link href="/ye" className="group text-center">
      <div className="flex flex-col items-center">
        {/* Audio element */}
        <audio 
          ref={audioRef}
          src="/bully.mp3" 
          preload="auto"
          muted={isMobile} // Mute on mobile
        />
        <div 
          ref={containerRef}
          className="relative w-56 h-56 md:w-96 md:h-96 mb-2 group"
          onMouseEnter={() => {
            if (!isMobile) {
              videoRef.current?.play().catch(e => console.log('Video play prevented:', e));
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
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
          {/* Video element - show for both mobile and desktop */}
          <div className={`absolute inset-0 overflow-hidden ${!isMobile && !isInView ? 'opacity-0 group-hover:opacity-100' : ''} ${isMobile && isInView ? 'opacity-100' : isMobile ? 'opacity-0' : ''} transition-opacity duration-300`} 
               style={{ WebkitMaskImage: 'url(/ye2.png)', maskImage: 'url(/ye2.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
            <video 
              ref={videoRef}
              src="/bully.mp4" 
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              autoPlay={!isMobile}
            />
          </div>
          
          {/* Ye2 logo - visible when video not showing */}
          <Image 
            src="/ye2.png" 
            alt="Ye Logo" 
            fill
            className={`absolute inset-0 object-contain ${!isMobile ? 'group-hover:opacity-0' : isInView ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            priority
          />
        </div>
      </div>
    </Link>
  );
}
