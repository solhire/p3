import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';

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
      phaseTitle: "PHASE 2",
      wwiii: "WWIII",
      ww3Deluxe: "WW3 DELUXE",
      redTitle: "RED",
      pumpFunLink: "PUMP.FUN/PROFILE/ƒUCK",
      caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump",
      bullyV1: "BULLY V1"
    };
  }
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
      
      {/* Art message */}
      <div className="w-full text-center mt-4 text-[#FF0000] font-mono text-lg md:text-xl tracking-wider font-bold">
        LOVE MY ART WHILE IM STILL HERE
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
            src="/helm.png" 
            alt="WW3 Helmet"
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
    </main>
  );
}
