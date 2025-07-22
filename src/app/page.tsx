// Version update - small tweak April 2025
import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';
import ClientImageWrapper from './components/ClientImageWrapper';
import SVideo from './components/SVideo';
import FlashingTime from './components/FlashingTime';

// Get messages from the API
async function getMessages() {
  // Construct the proper URL (adding protocol if it's missing)
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Check if we need to add the protocol
  if (!baseUrl.startsWith('http')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  // For localhost development, use http instead of https
  if (baseUrl.includes('localhost')) {
    baseUrl = baseUrl.replace('https://', 'http://');
  }
  
  try {
    // Use server-side fetching to get the latest messages from the database
    const response = await fetch(`${baseUrl}/api/update-messages`, {
      cache: 'no-store', // Disable caching to always get fresh data
      next: { revalidate: 0 } // Don't use cached values
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.homepage) {
      return data.data.homepage;
    }
    
    throw new Error('No homepage messages found in API response');
  } catch (error) {
    console.error('Error fetching messages:', error);
    // Fallback to default messages if API fails
    return {
      evolvedText: "I DIDNT CHANGE I EVOLVED ITS ALWAYS BEEN IN MY IMAGERY IM JUST EMBRACING MYSELF",
      warBegins: "When diplomacy ends, War begins.",
      phaseTitle: "PHASE 2",
      wwiii: "WWIII",
      ww3Deluxe: "WW3 DELUXE",
      redTitle: "RED",
      pumpFunLink: "PUMP.FUN/PROFILE/INAPERFECTWORLD",
      caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump",
      bullyV1: "BULLY V1",
      currentDate: "4.12",
      dDayText: "D-DAY"
    };
  }
}

export default async function Home() {
  const messages = await getMessages();
  
  return (
    <main className="min-h-screen pb-12 flex flex-col relative overflow-x-hidden">
      {/* Pump.fun link and CA at very top of page, above WWIII */}
      <div className="w-full text-center pt-4 pb-2 px-2">
        <div className="text-black/70 font-mono text-xs tracking-wider">
          <Link href="https://pump.fun/profile/inaperfectworld" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">{messages.pumpFunLink}</Link>
          <div className="mt-1 text-black/50 text-[10px] break-all">
            CA: {messages.caAddress}
          </div>
        </div>
      </div>
      
      {/* S image at the top of the page */}
      <div className="w-full text-center pb-4">
        <div className="relative w-48 h-20 sm:w-64 sm:h-24 md:w-96 md:h-32 mx-auto">
          <Image 
            src="/s.png" 
            alt="S"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-gray-500 font-mono text-lg sm:text-xl md:text-2xl font-normal tracking-wider mt-2 sm:mt-4">
          inaperfectworld
        </div>
      </div>

      {/* WW3 images row */}
      <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-4 py-4 sm:py-8">
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border border-black group">
          <Image 
            src="/ww3/er.png" 
            alt="ER"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-mono text-sm">ER</span>
          </div>
        </div>
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border border-black group">
          <Image 
            src="/ww3/INAPW TEE.png" 
            alt="INAPW TEE"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-mono text-sm">TEE</span>
          </div>
        </div>
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border border-black group">
          <Image 
            src="/ww3/INAPW HOODIE.png" 
            alt="INAPW HOODIE"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-mono text-sm">HOODIE</span>
          </div>
        </div>
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border border-black group flex items-center justify-center">
          <div className="text-black font-mono text-sm">COMING SOON</div>
        </div>
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border border-black group flex items-center justify-center">
          <div className="text-black font-mono text-sm">COMING SOON</div>
        </div>
      </div>
      
      {/* "IN A PERFECT WORLD" text with inap.png image below - right side */}
      <div className="absolute top-4 right-2 sm:top-6 sm:right-6 flex flex-col items-end">
        <div className="text-black font-mono text-base sm:text-xl font-bold tracking-wider text-right">
          IN A PERFECT WORLD
        </div>
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mt-2 group">
          <Image 
            src="/inap.png" 
            alt="In A Perfect World"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href="https://pump.fun/coin/D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump?include-nsfw=true" target="_blank" rel="noopener noreferrer">
              <span className="text-[#006400] font-mono text-sm md:text-lg font-bold tracking-wider hover:text-[#008800]">ENLIST NOW</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content starts below top elements with a safe margin */}
      <div className="w-full mt-40 sm:mt-64 md:mt-48">
        {/* Main text */}
        <div className="w-full text-center px-4 text-black font-mono text-lg md:text-xl tracking-wider">
          {messages.evolvedText}
        </div>
        
        {/* Art message */}
        <div className="w-full text-center mt-4 px-4 text-[#FF0000] font-mono text-lg md:text-xl tracking-wider font-bold">
          {messages.warBegins}
        </div>
      </div>
      
      {/* OK image at bottom left */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group">
          <Image 
            src="/ok.png" 
            alt="OK"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
