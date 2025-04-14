'use client';

export default function HoverPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        <video
          src="/blood.mp4"
          className="w-64 h-64 object-cover"
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
} 