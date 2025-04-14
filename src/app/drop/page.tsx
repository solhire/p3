import PhantomWalletConnect from '../components/PhantomWalletConnect';
import Image from 'next/image';
import Link from 'next/link';

// YZY WWIII DROP page
export default function DropPage() {
  return (
    <main className="min-h-screen pb-12 flex flex-col relative overflow-x-hidden">
      {/* Drop Header */}
      <div className="w-full text-center pt-12 pb-8">
        <h1 className="text-white font-mono text-5xl md:text-7xl font-extrabold tracking-wider">
          YZY WWIII DROP
        </h1>
        <p className="text-white/70 font-mono text-lg mt-4">
          APRIL 15 - APRIL 17, 2025
        </p>
      </div>
      
      {/* Drop Collections Display */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-12 mb-12">
        {/* SET_01 Collection */}
        <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
          <h2 className="text-white font-mono text-2xl font-bold mb-4">SET_01</h2>
          <div className="relative w-48 h-48 mx-auto mb-4">
            <Image 
              src="/war2.png" 
              alt="SET_01"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white/70 font-mono">3,333 SUPPLY</p>
          <p className="text-white font-mono font-bold mt-2">0.333 SOL</p>
        </div>
        
        {/* DDAY Collection */}
        <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
          <h2 className="text-white font-mono text-2xl font-bold mb-4">DDAY</h2>
          <div className="relative w-48 h-48 mx-auto mb-4">
            <Image 
              src="/DDAY.png" 
              alt="DDAY"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white/70 font-mono">2,222 SUPPLY</p>
          <p className="text-white font-mono font-bold mt-2">0.444 SOL</p>
        </div>
        
        {/* WWIII Collection */}
        <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
          <h2 className="text-white font-mono text-2xl font-bold mb-4">WWIII</h2>
          <div className="relative w-48 h-48 mx-auto mb-4">
            <Image 
              src="/WWIII.png" 
              alt="WWIII"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white/70 font-mono">1,111 SUPPLY</p>
          <p className="text-white font-mono font-bold mt-2">0.777 SOL</p>
        </div>
      </div>
      
      {/* Phantom Wallet Integration */}
      <div className="max-w-md mx-auto w-full px-4">
        <PhantomWalletConnect />
      </div>
      
      {/* Coming Soon Message */}
      <div className="mt-12 text-center">
        <p className="text-[#FF0000] font-mono text-xl">
          COMING SOON - NOT YET LIVE
        </p>
        <Link href="/" className="text-white/60 font-mono hover:text-white mt-4 inline-block">
          Return to Main Site
        </Link>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-white/40 font-mono text-sm">
        <p>YZY WWIII DROP © 2025</p>
        <p className="mt-1">THE WARPATH BEGINS</p>
      </footer>
    </main>
  );
} 