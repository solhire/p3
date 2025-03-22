import Link from 'next/link';
import Image from 'next/image';
import ProtectedPage from '../components/ProtectedPage';
import MusicPlayer from '../components/MusicPlayer';

export default function Ye() {
  return (
    <ProtectedPage>
      <main className="flex min-h-screen flex-col items-center p-6 relative bg-white">
        {/* Version number */}
        <div className="absolute top-6 right-6 text-black/50 font-mono text-sm">
          3.16.25
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
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-32 h-56 md:w-48 md:h-80">
          <Image 
            src="/fitsketch.png" 
            alt="Fit Sketch" 
            fill
            className="object-contain"
          />
        </div>
        
        {/* Bully image - bottom right */}
        <div className="absolute bottom-6 right-0 w-32 h-32 md:w-48 md:h-48">
          <Image 
            src="/BULLY.jpg" 
            alt="Bully" 
            fill
            className="object-contain"
          />
        </div>
        
        {/* Ye2 image - bottom left */}
        <div className="absolute bottom-6 left-0 w-32 h-32 md:w-48 md:h-48">
          <Image 
            src="/ye2.png" 
            alt="Ye2" 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Back link */}
        <Link href="/" className="text-black/50 font-mono text-sm hover:text-black transition-colors duration-300 mt-12 z-10">
          BACK
        </Link>
      </main>
    </ProtectedPage>
  );
}
