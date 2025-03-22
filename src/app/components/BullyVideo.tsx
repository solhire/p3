'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function BullyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Store reference to video element for cleanup
    const videoElement = videoRef.current;
    
    // Attempt to autoplay the video when component mounts
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
    
    // Add event listener to know when video is loaded
    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };
    
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full max-w-md mx-auto my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-100">
        {/* Show loading state or placeholder until video is loaded */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Image 
              src="/BULLY.jpg" 
              alt="BULLY" 
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        )}
        
        {/* Video element */}
        <video 
          ref={videoRef}
          src="/bully.mp4" 
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          controls={false}
          poster="/BULLY.jpg"
        />
        
        {/* Optional overlay text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-black text-white text-center">BULLY</h2>
        </div>
      </div>
    </div>
  );
}
