'use client';
import Image from 'next/image';
import ProtectedPage from '../components/ProtectedPage';

export default function HoverPage() {
  return (
    <ProtectedPage>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative w-64 h-64">
          <Image 
            src="/YEREICH4.PNG" 
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </ProtectedPage>
  );
} 