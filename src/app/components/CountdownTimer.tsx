'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Set end time to 24 hours from a fixed start time (April 10, 2025 00:00:00 UTC)
    const endTime = new Date('2025-04-10T00:00:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeLeft('00:00:00');
        return;
      }

      // Calculate hours, minutes, seconds
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format with leading zeros
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      setTimeLeft(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    };

    // Update immediately and then every second
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="text-white font-mono tracking-wider text-center text-xl mt-4 transition-colors duration-300"
      style={{ color: isHovered ? '#FF0000' : 'white' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {timeLeft}
    </div>
  );
} 