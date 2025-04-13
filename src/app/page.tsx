import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';
import ClientImageWrapper from './components/ClientImageWrapper';

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
      pumpFunLink: "PUMP.FUN/PROFILE/ƒUCK",
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
      {/* coverdraft.png and wartime.png images - top left, stack on very small mobile */}
      <div className="absolute top-6 left-6 z-10 flex flex-wrap xs:flex-nowrap">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
          <Image 
            src="/coverdraft.png" 
            alt="Cover Draft"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 ml-2 group">
          <Image 
            src="/wartime.png" 
            alt="Wartime"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#FF0000] font-mono text-lg sm:text-2xl font-bold tracking-wider">WARTIME</span>
          </div>
        </div>
      </div>
      
      {/* Date display */}
      <div className="absolute top-6 right-6 text-[#FF0000] font-mono text-xl font-bold tracking-wider">
        {messages.currentDate}
        <div className="text-center text-[#FF0000] font-mono text-md font-bold tracking-wider mt-1">
          {messages.dDayText}
        </div>
      </div>
      
      {/* Main content starts below top elements with a safe margin */}
      <div className="w-full mt-36 sm:mt-52 md:mt-28">
        {/* Main text */}
        <div className="w-full text-center px-4 text-white font-mono text-lg md:text-xl tracking-wider">
          {messages.evolvedText}
        </div>
        
        {/* D-Day image */}
        <div className="w-full flex justify-center mt-3">
          <ClientImageWrapper width={240} height={240} mobileWidth={180} mobileHeight={180} />
        </div>
        
        {/* Art message */}
        <div className="w-full text-center mt-4 px-4 text-[#FF0000] font-mono text-lg md:text-xl tracking-wider font-bold">
          {messages.warBegins}
        </div>
        
        {/* Pump.fun link - preserved as requested */}
        <div className="w-full text-center mb-8 text-white/70 font-mono text-xs md:text-sm tracking-wider">
          <Link href="https://pump.fun/profile/ƒuck" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">{messages.pumpFunLink}</Link>
          <div className="mt-1 text-white/50 text-xs">
            CA: {messages.caAddress}
          </div>
        </div>
        
        {/* Media content - stack vertically on mobile, side by side on larger screens */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-12 space-y-8 md:space-y-0">
          {/* Ye logo with video */}
          <div className="w-full md:w-1/5 flex flex-col items-center">
            {/* BULLY V1 text */}
            <div className="text-white font-mono tracking-wider text-center text-xl mb-2">
              {messages.bullyV1}
            </div>
            <YeLogoWithVideo />
          </div>
          
          {/* RED logo with video */}
          <div className="w-full md:w-3/5 flex items-center justify-center md:pl-8">
            <WwLogoWithVideo messages={messages} />
          </div>
          
          {/* AIE image */}
          <div className="w-full md:w-1/5 flex flex-col items-center">
            <div className="relative w-36 h-36 md:w-44 md:h-44 group">
              <Image 
                src="/aie4.png" 
                alt="AIE4"
                fill
                className="object-contain group-hover:opacity-0 transition-opacity duration-300"
                priority
              />
              <Image 
                src="/aie3.png" 
                alt="AIE3"
                fill
                className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
