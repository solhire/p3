'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BackgroundImage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-[-1]">
      <Image
        src="/bg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
} 