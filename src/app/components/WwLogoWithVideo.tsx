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
  const [isMobile, setIsMobile] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [activeWw3Item, setActiveWw3Item] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleWw3ItemHover = (item: string) => {
    setActiveWw3Item(item);
  };

  const handleWw3ItemLeave = () => {
    setActiveWw3Item(null);
  };

  return (
    <div className="flex flex-col items-center">
      {/* WW3 DELUXE text */}
      <div className="mb-4 text-[#FF0000] font-mono tracking-wider text-center text-xl">
        {messages.ww3Deluxe}
      </div>
      
      {/* WW3 Gear Collection */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div 
          className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => handleWw3ItemHover('helmet')}
          onMouseLeave={handleWw3ItemLeave}
        >
          <Image 
            src="/helm.png" 
            alt="WW3 Helmet" 
            fill
            className="object-contain"
          />
          {activeWw3Item === 'helmet' && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#FF0000] font-mono">
              HELM
            </div>
          )}
        </div>
        <div 
          className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => handleWw3ItemHover('balaclava')}
          onMouseLeave={handleWw3ItemLeave}
        >
          <Image 
            src="/ww3/Balaclava.png" 
            alt="WW3 Balaclava" 
            fill
            className="object-contain"
          />
          {activeWw3Item === 'balaclava' && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#FF0000] font-mono">
              MASK
            </div>
          )}
        </div>
        <div 
          className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => handleWw3ItemHover('vest')}
          onMouseLeave={handleWw3ItemLeave}
        >
          <Image 
            src="/ww3/vest.png" 
            alt="WW3 Vest" 
            fill
            className="object-contain"
          />
          {activeWw3Item === 'vest' && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#FF0000] font-mono">
              VEST
            </div>
          )}
        </div>
      </div>
      
      <div 
        className="relative w-56 h-56 md:w-80 md:h-80 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Yereich image overlay */}
        <div className="absolute inset-0 w-full h-full z-20 flex items-center justify-center">
          <Image 
            src="/by.png" 
            alt="BY" 
            fill
            className="object-contain scale-75 p-2"
            style={{ objectFit: 'scale-down' }}
          />
        </div>
        
        {/* Audio element */}
        <audio 
          ref={audioRef}
          preload="auto"
          onError={() => setMediaError(true)}
        >
          <source src="/reign.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Video that will be masked by the logo - only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: 'url(/t.png)', maskImage: 'url(/t.png)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              onError={() => setMediaError(true)}
            >
              <source src="/RED3D2.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* RED logo - always visible on mobile, visible on desktop when not hovering */}
        <Image 
          src="/t.png" 
          alt="REIGN Logo" 
          fill
          className={`absolute inset-0 object-contain ${!isMobile ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`}
        />
      </div>
      {/* RED text */}
      <div className="mt-4 text-[#FF0000] font-mono font-bold tracking-wider text-center text-xl">
        LET THERE BE LIGHT
      </div>
    </div>
  );
} 