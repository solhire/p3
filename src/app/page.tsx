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
      
      {/* PHASE 2 text - centered at top */}
      <div className="w-full text-center mt-4 text-white font-mono text-lg md:text-xl tracking-wider">
        PHASE 2
      </div>
      
      {/* WWIII text - italic and bold under PHASE 2 */}
      <div className="w-full text-center mt-1 text-white font-mono text-md md:text-lg tracking-wider italic font-bold">
        WWIII
      </div>
      
      {/* WW3 Images Row */}
      <div className="w-full flex justify-center items-center gap-4 mt-4 mb-6 flex-wrap px-4">
        <div className="relative w-36 h-36 md:w-44 md:h-44">
          <Image 
            src="/ww3/vest.png" 
            alt="WW3 Vest"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-36 h-36 md:w-44 md:h-44">
          <Image 
            src="/ww3/Balaclava.png" 
            alt="WW3 Balaclava"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-36 h-36 md:w-44 md:h-44">
          <Image 
            src="/enhanced_exist.png" 
            alt="Enhanced Exist"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Pump.fun link - moved below images */}
      <div className="w-full text-center mb-8 text-white/70 font-mono text-xs md:text-sm tracking-wider">
        <Link href="https://pump.fun/profile/ƒuck" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">PUMP.FUN/PROFILE/ƒUCK</Link>
        <div className="mt-1 text-white/50 text-xs">
          CA: D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump
        </div>
      </div>
      
      {/* Arrange the WW3 and Ye content side by side */}
      <div className="flex flex-1 items-center w-full px-4 md:px-12">
        {/* Ye logo with video - on left side */}
        <div className="w-1/5 flex flex-col items-center">
          {/* BULLY V1 text */}
          <div className="text-white font-mono tracking-wider text-center text-xl mb-2">
            BULLY V1
          </div>
          <YeLogoWithVideo />
        </div>
        
        {/* RED logo with video - centered but shifted left */}
        <div className="w-3/5 flex items-center justify-center pl-0 md:pl-8">
          <WwLogoWithVideo />
        </div>
        
        {/* AIE image on right side */}
        <div className="w-1/5 flex flex-col items-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            <Image 
              src="/aie3.png" 
              alt="AIE3"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
