'use client';
// WwLogoWithVideo component - displays sleep.png with blood.mp4 on hover

import Image from 'next/image';

interface WwLogoWithVideoProps {
  messages: {
    ww3Deluxe: string;
    redTitle: string;
  };
}

export default function WwLogoWithVideo({ messages }: WwLogoWithVideoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <video 
          src="/blood.mp4" 
          className="w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {/* Text below image */}
      <div className="mt-2 text-white font-mono tracking-wider text-center text-lg">
        PLEASE DONT WAKE ME UP.
      </div>
    </div>
  );
} 