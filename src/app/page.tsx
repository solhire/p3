// Version update - small tweak April 2025
import Link from 'next/link';
import Image from 'next/image';
import SVideo from './components/SVideo';
import FlashingTime from './components/FlashingTime';
import SVideoHover from './components/SVideoHover';

// Get messages from the API
async function getMessages() {
  // Default messages to use if API fails
  const defaultMessages = {
    pumpFunLink: "PUMP.FUN/PROFILE/INAPERFECTWORLD",
    caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump"
  };
  
  try {
    // Try to fetch messages from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/update-messages`, {
      cache: 'no-store',
      next: { revalidate: 0 } // Don't cache
    });
    
    if (!res.ok) {
      console.error('API response not OK:', res.status);
      return defaultMessages;
    }
    
    try {
      const data = await res.json();
      
      if (data.success && data.data && data.data.homepage) {
        // Only extract the needed messages
        return {
          pumpFunLink: data.data.homepage.pumpFunLink || defaultMessages.pumpFunLink,
          caAddress: data.data.homepage.caAddress || defaultMessages.caAddress
        };
      }
      
      console.error('Invalid data format from API');
      return defaultMessages;
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      return defaultMessages;
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return defaultMessages;
  }
}

export default async function Home() {
  const messages = await getMessages();
  
  return (
    <main className="min-h-screen pb-12 flex flex-col relative overflow-x-hidden">
      {/* Pump.fun link and CA at very top of page */}
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
        <SVideoHover />
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
              <span className="text-white font-mono text-sm md:text-lg font-bold tracking-wider hover:text-white/80">JOIN ME</span>
            </Link>
          </div>
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
      
      {/* WHY image at bottom right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group">
          <Image 
            src="/why.png" 
            alt="WHY - In A Perfect World"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
