import Link from 'next/link';
import Image from 'next/image';
import ProtectedPage from '../components/ProtectedPage';
import MusicPlayer from '../components/MusicPlayer';

export default function Ye() {
  return (
    <ProtectedPage>
      <main className="flex min-h-screen flex-col items-center p-6 relative bg-white">
        {/* Pump.fun profile link */}
        <div className="absolute top-6 right-6">
          <a 
            href="https://pump.fun/profile/ssye?include-nsfw=true" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black/30 font-mono text-sm hover:text-black/60 transition-colors duration-300"
          >
            pump.fun/profile/ssye
          </a>
        </div>
        
        {/* Ye image at the top center */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 mt-8 mb-8">
          <Image 
            src="/ye.png" 
            alt="Ye" 
            fill 
            priority
            className="object-contain"
          />
        </div>
        
        {/* Music Player */}
        <div className="w-full my-4">
          <MusicPlayer />
        </div>
        
        {/* Fitsketch image - right side */}
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 w-24 h-40 md:w-48 md:h-80 z-0">
          <Image 
            src="/fitsketch.png" 
            alt="Fit Sketch" 
            fill
            className="object-contain"
          />
        </div>
        
        {/* Bully image - bottom right */}
        <div className="hidden sm:block absolute bottom-6 right-0 w-24 h-24 md:w-48 md:h-48 z-0">
          <Image 
            src="/BULLY.jpg" 
            alt="Bully" 
            fill
            className="object-contain"
          />
        </div>
        
        {/* Ye2 image - bottom left */}
        <div className="hidden sm:block absolute bottom-6 left-0 w-24 h-24 md:w-48 md:h-48 z-0">
          <Image 
            src="/ye2.png" 
            alt="Ye2" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Mobile-only images row */}
        <div className="flex sm:hidden justify-between w-full mt-8 mb-12">
          <div className="relative w-24 h-24">
            <Image 
              src="/ye2.png" 
              alt="Ye2" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="relative w-24 h-24">
            <Image 
              src="/fitsketch.png" 
              alt="Fit Sketch" 
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-24 h-24">
            <Image 
              src="/BULLY.jpg" 
              alt="Bully" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Back link */}
        <Link href="/" className="text-black/50 font-mono text-sm hover:text-black transition-colors duration-300 mt-12 z-10">
          BACK
        </Link>
      </main>
    </ProtectedPage>
  );
}
