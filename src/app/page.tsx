// Version update - small tweak April 2025
import Link from 'next/link';
import Image from 'next/image';
import SVideo from './components/SVideo';
import FlashingTime from './components/FlashingTime';
import MusicPlayer from './components/MusicPlayer';

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
        <div className="w-full text-center pt-4 pb-2 px-2 relative">
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="text-[#FF0000] font-mono text-sm sm:text-base font-bold tracking-wider">
              34.2694° N, 118.7815° W
            </div>
          </div>
          <div className="text-black/70 font-mono text-xs tracking-wider relative group">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[#FF0000] font-bold text-lg md:text-xl tracking-wider">INAPERFECTWORLD</span>
            </div>
            <Link href="https://pump.fun/profile/inaperfectworld" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300 group-hover:opacity-0">{messages.pumpFunLink}</Link>
            <div className="mt-1 text-black/50 text-[10px] break-all group-hover:opacity-0">
              CA:
            </div>
          </div>
        </div>
        
        {/* OK image at the top of the page */}
        <div className="w-full text-center pb-4">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto group">
            <Image 
              src="/ok.png" 
              alt="OK"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-black font-mono text-sm md:text-base font-bold tracking-wider text-center whitespace-pre-line">
                THIS IS NOT A RELEASE<br/>
                THIS IS AN OBSERVATION<br/>
                NO HYPE<br/>
                NO EXPLANATION
              </div>
            </div>
          </div>
          <div className="text-black font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider mt-2 sm:mt-4">
            SZN X
          </div>
        </div>

        {/* WW3 images row - ER, SZN X, and FITSKETCH items */}
        <div className="w-full flex flex-wrap justify-center px-2 sm:px-4 py-8 sm:py-12">
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-4 my-4">
            <Image 
              src="/ww3/er.png" 
              alt="ER"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-4 my-4">
            <Image 
              src="/sznxw.png" 
              alt="SZN X"
              fill
              className="object-contain"
            />
          </div>

        </div>
        

        

        
        {/* FITSKETCH image at bottom right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group">
            <Image 
              src="/fitsketch.png" 
              alt="FITSKETCH"
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white font-mono text-xs md:text-sm font-bold tracking-wider text-center whitespace-pre-line">
                THIS IS NOT A RELEASE<br/>
                THIS IS AN OBSERVATION<br/>
                NO HYPE<br/>
                NO EXPLANATION
              </div>
            </div>
          </div>
        </div>
        


        {/* YZY Copyright at bottom */}
        <div className="absolute bottom-4 w-full text-center">
          <div className="text-black font-mono text-sm font-bold tracking-wider">
            © YZY {new Date().getFullYear()}
          </div>
        </div>

      </main>
  );
}
