'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YeLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
      setIsVideoPlaying(true);
    }
    
    return () => {
      // Cleanup
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  
  return (
    <Link href="/ye" className="group md:absolute md:right-36 text-center md:text-left">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-96 md:h-96 mb-2 group">
          {/* Video that will be masked by the logo */}
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
          
          {/* Ye2 logo as a visible element when not playing */}
          <Image 
            src="/ye2.png" 
            alt="Ye Logo" 
            fill
            className={`absolute inset-0 object-contain opacity-0 transition-opacity duration-300`}
          />
        </div>
        <div className="text-white text-[2rem] md:text-[3rem] font-black tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] lowercase">ye</div>
      </div>
    </Link>
  );
}
