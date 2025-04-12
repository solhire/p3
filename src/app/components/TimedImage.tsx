'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { isDDayTime, getMillisecondsUntilDDay } from '../../lib/timerUtils';

interface TimedImageProps {
  className?: string;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
}

export default function TimedImage({
  className,
  width,
  height,
  mobileWidth = width,
  mobileHeight = height
}: TimedImageProps) {
  // State to track if it's D-Day time
  const [isDDay, setIsDDay] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Set to true once component mounts to avoid hydration mismatch
    setIsClient(true);
    
    // Check if it's already D-Day time
    setIsDDay(isDDayTime());
    
    // Calculate time until 3:45 AM EST
    const msUntilDDay = getMillisecondsUntilDDay();
    console.log(`D-Day countdown: ${msUntilDDay / 1000 / 60} minutes`);
    
    // Set a timer to switch to D-Day mode at exactly 3:45 AM EST
    const timer = setTimeout(() => {
      console.log("D-Day has arrived!");
      setIsDDay(true);
    }, msUntilDDay);
    
    // Also set a regular check every minute in case the timer calculation is slightly off
    const intervalCheck = setInterval(() => {
      if (isDDayTime()) {
        setIsDDay(true);
        clearInterval(intervalCheck);
      }
    }, 60000); // Check every minute
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalCheck);
    };
  }, []);
  
  // Don't render anything on the server to avoid hydration mismatch
  if (!isClient) return null;
  
  return (
    <div className="flex items-center gap-4">
      {/* Red text on the left */}
      <div className="text-[#FF0000] font-mono font-bold text-lg md:text-xl text-right">
        3:45<br />SET_01
      </div>
      
      {/* Image container */}
      <div 
        className={`relative ${className || ''}`}
        style={{
          width: typeof window !== 'undefined' && window.innerWidth < 768 ? `${mobileWidth}px` : `${width}px`,
          height: typeof window !== 'undefined' && window.innerWidth < 768 ? `${mobileHeight}px` : `${height}px`
        }}
      >
        <Image 
          src={isDDay ? "/DDAY.png" : "/iamhere.png"} 
          alt={isDDay ? "D-Day" : "I am here"}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 