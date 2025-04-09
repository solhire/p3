'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Calculate the target time (24 hours from now)
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 24);
    
    const updateTimer = () => {
      const currentTime = new Date();
      const difference = targetTime.getTime() - currentTime.getTime();
      
      // If countdown is finished
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      
      // Calculate remaining time
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };
    
    // Update timer immediately
    updateTimer();
    
    // Set up interval to update timer every second
    const interval = setInterval(updateTimer, 1000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, []);
  
  // Format time with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, '0');
  
  return (
    <div 
      className="mt-4 font-mono tracking-wider text-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-xl transition-colors duration-300 ${isHovered ? 'text-[#FF0000]' : 'text-white'}`}>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
} 