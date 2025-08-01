'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TopLeftLogo() {
  return (
    <Link href="/" className="fixed top-4 left-4 z-50">
      <div className="relative w-12 h-12 md:w-16 md:h-16">
        <Image 
          src="/ye2.png" 
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
} 