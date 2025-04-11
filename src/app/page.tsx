import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';
import CountdownTimer from './components/CountdownTimer';
import { promises as fs } from 'fs';
import path from 'path';

// Get messages from JSON file
async function getMessages() {
  const messagesFile = path.join(process.cwd(), 'src/app/data/messages.json');
  const fileContents = await fs.readFile(messagesFile, 'utf8');
  const messages = JSON.parse(fileContents);
  return messages.homepage;
}

export default async function Home() {
  const messages = await getMessages();
  
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* A.png image - top left */}
      <div className="absolute top-6 left-6 z-10">
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          <Image 
            src="/a.png" 
            alt="A"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Date display */}
      <div className="absolute top-6 right-6 text-white font-mono text-xl font-bold tracking-wider">
        4.11
      </div>
      
      {/* PHASE 2 text - centered at top */}
      <div className="w-full text-center mt-4 text-white font-mono text-lg md:text-xl tracking-wider">
        {messages.phaseTitle}
      </div>
      
      {/* WWIII text - italic and bold under PHASE 2 */}
      <div className="w-full text-center mt-1 text-white font-mono text-md md:text-lg tracking-wider italic font-bold">
        {messages.wwiii}
      </div>
      
      {/* Countdown Timer */}
      <div className="w-full flex justify-center mt-2">
        <CountdownTimer />
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
            src="/offwar.png" 
            alt="Off War"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Pump.fun link - moved below images */}
      <div className="w-full text-center mb-8 text-white/70 font-mono text-xs md:text-sm tracking-wider">
        <Link href="https://pump.fun/profile/ƒuck" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">{messages.pumpFunLink}</Link>
        <div className="mt-1 text-white/50 text-xs">
          CA: {messages.caAddress}
        </div>
      </div>
      
      {/* Arrange the WW3 and Ye content side by side */}
      <div className="flex flex-1 items-center w-full px-4 md:px-12">
        {/* Ye logo with video - on left side */}
        <div className="w-1/5 flex flex-col items-center">
          {/* BULLY V1 text */}
          <div className="text-white font-mono tracking-wider text-center text-xl mb-2">
            {messages.bullyV1}
          </div>
          <YeLogoWithVideo />
        </div>
        
        {/* RED logo with video - centered but shifted left */}
        <div className="w-3/5 flex items-center justify-center pl-0 md:pl-8">
          <WwLogoWithVideo messages={messages} />
        </div>
        
        {/* AIE image on right side */}
        <div className="w-1/5 flex flex-col items-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            <Image 
              src="/aie4.png" 
              alt="AIE4"
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
