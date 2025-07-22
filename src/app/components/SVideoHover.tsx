'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function SVideoHover() {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.style.display = 'block';
      videoRef.current.play().catch(err => console.error('Failed to play video:', err));
    }
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error('Failed to play audio:', err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div 
      className="relative w-48 h-20 sm:w-64 sm:h-24 md:w-96 md:h-32 mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image 
        src="/s.png" 
        alt="S"
        fill
        className={`object-contain transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
        priority
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        style={{ display: isHovering ? 'block' : 'none' }}
      >
        <source src="/se.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio ref={audioRef} src="/oh.mp3" />
    </div>
  );
} 