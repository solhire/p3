import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Version number */}
      <div className="absolute top-6 right-6 text-white/50 font-mono text-sm tracking-wider">
        4.10.25
      </div>
      
      {/* Pump.fun link - centered at top */}
      <div className="w-full text-center mt-4 mb-8 text-white/70 font-mono text-xs md:text-sm tracking-wider">
        <Link href="https://pump.fun/profile/ƒuck" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">PUMP.FUN/PROFILE/ƒUCK</Link>
      </div>
      
      {/* WW32 logo with video - now centered */}
      <div className="flex-1 flex items-center justify-center">
        <WwLogoWithVideo />
      </div>
      
      {/* Ye logo with video - now on left side */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
        {/* BULLY V1 text */}
        <div className="text-white font-mono tracking-wider text-center text-xl">
          BULLY V1
        </div>
        <YeLogoWithVideo />
      </div>
      
      {/* Copyright */}
      <div className="mt-auto text-center w-full text-white/50 font-mono text-xs py-6">
        &copy; {new Date().getFullYear()} YZY
      </div>
    </main>
  );
}
