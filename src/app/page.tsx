import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 relative">
      {/* Version number */}
      <div className="absolute top-6 left-6 version">
        3.16.25
      </div>
      
      {/* Coin deployed text */}
      <div className="absolute top-6 right-6 text-white/70 font-mono text-xs md:text-sm tracking-wider">
        COIN DEPLOYED FROM <Link href="https://pump.fun/profile/sundayserv" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">PUMP.FUN/PROFILE/SUNDAYSERV</Link>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        {/* Logo with HOOLIGANS text and ye */}
        <div className="w-full flex flex-col md:flex-row items-center">
          <Link href="/hooligans" className="md:absolute md:left-16 text-center md:text-left">
            <div className="text-white text-[2rem] md:text-[3rem] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] font-mono">HOOLIGANS</div>
          </Link>
          
          <div className="w-full flex justify-center">
            <Link href="/sunday-service" className="group w-48 h-48 md:w-64 md:h-64 transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Sunday Service Logo" 
                className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
              />
            </Link>
          </div>
          
          <Link href="/ye" className="md:absolute md:right-36 text-center md:text-left">
            <div className="text-white text-[2rem] md:text-[3rem] font-black tracking-[0.2em] transition-all duration-300 hover:text-[#FF0000] lowercase">ye</div>
          </Link>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-8 text-white/50 font-mono text-xs">
        &copy; {new Date().getFullYear()} SUNDAY SERVICE
      </div>
    </main>
  );
}
