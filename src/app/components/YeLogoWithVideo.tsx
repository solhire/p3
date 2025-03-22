'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YeLogoWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  return (
    <Link href="/ye" className="group md:absolute md:right-36 text-center md:text-left">
      <div className="flex flex-col items-center">
        <div 
          className="relative w-64 h-64 md:w-96 md:h-96 mb-2 group"
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
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
            />
          </div>
          
          {/* Ye2 logo as a visible element when not hovering */}
          <Image 
            src="/ye2.png" 
            alt="Ye Logo" 
            fill
            className="absolute inset-0 object-contain group-hover:opacity-0 transition-opacity duration-300"
          />
        </div>
        <div className="text-white text-[2rem] md:text-[3rem] font-black tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] lowercase">ye</div>
      </div>
    </Link>
  );
}
