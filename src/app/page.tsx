import Link from 'next/link';
import Image from 'next/image';
import ProtectedPage from './components/ProtectedPage';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import BullyVideo from './components/BullyVideo';

export default function Home() {
  return (
    <ProtectedPage>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 relative">
        {/* Version number display */}
        <div className="absolute top-6 left-6 version">
          3.16.25
        </div>
        
        {/* Main content */}
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          {/* Logo with HOOLIGANS text and ye */}
          <div className="w-full flex flex-col md:flex-row items-center">
            <Link href="/hooligans" className="md:absolute md:left-16 text-center md:text-left">
              <div className="text-white text-[2rem] md:text-[3rem] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] font-mono">HOOLIGANS</div>
            </Link>
            
            <div className="w-full flex justify-center">
              <Link href="/sunday-service" className="group w-48 h-48 md:w-64 md:h-64 transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer relative">
                <Image 
                  src="/logo.png" 
                  alt="Sunday Service Logo" 
                  fill
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </Link>
            </div>
            
            {/* Using the client component for Ye logo with video */}
            <YeLogoWithVideo />
          </div>
          
          {/* BULLY video with autoplay */}
          <BullyVideo />
        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-white/50 font-mono text-xs">
          &copy; {new Date().getFullYear()} SUNDAY SERVICE
        </div>
      </main>
    </ProtectedPage>
  );
}
