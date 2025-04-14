'use client';
// WwLogoWithVideo component - displays sleep.png with blood.mp4 video overlay on hover

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);

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
        const nowVisible = entry.isIntersecting;
        setIsVisible(nowVisible);
        
        // If newly visible on mobile and autoplay hasn't been attempted yet
        if (nowVisible && isMobile && !autoplayAttempted) {
          setIsHovering(true);
          setAutoplayAttempted(true);
          // Try to play the audio and video
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => {
              console.log("Mobile audio autoplay failed:", err);
              // If autoplay fails, we'll rely on the user interaction
            });
          }
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => {
              console.log("Mobile video autoplay failed:", err);
              // If autoplay fails, we'll rely on the user interaction
            });
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
    
    // Set up a listener for user interaction to enable audio/video on mobile
    const enableMediaOnUserAction = () => {
      if (audioRef.current && !audioRef.current.played.length) {
        audioRef.current.play().catch(err => console.log("Audio play on user action failed:", err));
      }
      if (videoRef.current && !videoRef.current.played.length) {
        videoRef.current.play().catch(err => console.log("Video play on user action failed:", err));
      }
      // Remove the listeners after first interaction
      document.removeEventListener('touchstart', enableMediaOnUserAction);
      document.removeEventListener('click', enableMediaOnUserAction);
    };
    
    // Add listeners for user interaction
    document.addEventListener('touchstart', enableMediaOnUserAction);
    document.addEventListener('click', enableMediaOnUserAction);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      
      // Remove user interaction listeners
      document.removeEventListener('touchstart', enableMediaOnUserAction);
      document.removeEventListener('click', enableMediaOnUserAction);
      
      // Disconnect observer
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, [isMobile, autoplayAttempted]);

  // Play media when hovering
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (audioRef.current) {
      // Reset audio to start to ensure it plays each time
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    if (videoRef.current) {
      // Reset video to start to ensure it plays each time
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
      // Pause the video when not hovering on desktop
      if (videoRef.current && !isMobile) {
        videoRef.current.pause();
      }
    }
  };

  // For mobile, toggle on tap/touch
  const handleTap = () => {
    if (isMobile) {
      const newHoveringState = !isHovering;
      setIsHovering(newHoveringState);
      if (newHoveringState) {
        // Play audio and video
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        }
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(err => console.log("Video play failed:", err));
        }
      } else {
        // Pause video
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }
  };

  // Determine if we should show the overlay based on hover state or mobile visibility
  const showOverlay = isHovering || (isMobile && isVisible);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
      >
        {/* blood.mp4 video - shows on hover or mobile when visible */}
        {showOverlay && (
          <div className="absolute inset-0 z-10">
            <video
              ref={videoRef}
              src="/blood.mp4"
              className="w-full h-full object-contain"
              playsInline
              muted={false}
              loop
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