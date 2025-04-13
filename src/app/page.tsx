import Link from 'next/link';
import Image from 'next/image';
import YeLogoWithVideo from './components/YeLogoWithVideo';
import WwLogoWithVideo from './components/WwLogoWithVideo';
import ClientImageWrapper from './components/ClientImageWrapper';
import SVideo from './components/SVideo';

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
      {/* Pump.fun link and CA at very top of page, above WWIII */}
      <div className="w-full text-center pt-6 pb-2">
        <div className="text-white/70 font-mono text-xs md:text-sm tracking-wider">
          <Link href="https://pump.fun/profile/ƒuck" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors duration-300">{messages.pumpFunLink}</Link>
          <div className="mt-1 text-white/50 text-xs">
            CA: {messages.caAddress}
          </div>
        </div>
      </div>
      
      {/* WWIII text at the top of the page */}
      <div className="w-full text-center pb-4">
        <h1 className="text-white font-mono text-5xl md:text-7xl font-extrabold tracking-wider">
          WWIII
        </h1>
        
        {/* DDAY image and war2.png below WWIII heading */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image 
                src="/DDAY.png" 
                alt="D-Day"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 ml-4">
              <Image 
                src="/war2.png" 
                alt="War"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* SET_01 text below images */}
          <div className="mt-4 text-white font-mono text-2xl md:text-3xl font-bold tracking-wider">
            SET_01
          </div>
        </div>
      </div>
      
      {/* YE22 image with ENLIST NOW hover text - left side */}
      <div className="absolute top-6 left-6 flex flex-col items-start">
        <div className="relative w-24 h-24 md:w-32 md:h-32 group">
          <Image 
            src="/ye22.png" 
            alt="YE22"
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
        
        {/* yereich2.png image below ye22 with YEREICH.png overlay on hover */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mt-4 group">
          <Image 
            src="/yereich2.png" 
            alt="YeReich2"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <Image 
              src="/YEREICH.png" 
              alt="YEREICH"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* "THE WARPATH BEGINS" text with ye22 image below - right side */}
      <div className="absolute top-6 right-6 flex flex-col items-end">
        <div className="text-white font-mono text-xl font-bold tracking-wider text-right">
          THE WARPATH BEGINS
        </div>
        <div className="relative w-24 h-24 md:w-32 md:h-32 mt-2 group">
          <Image 
            src="/ye22.png" 
            alt="YE22"
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
      <div className="w-full mt-64 sm:mt-72 md:mt-48">
        {/* Main text */}
        <div className="w-full text-center px-4 text-white font-mono text-lg md:text-xl tracking-wider">
          {messages.evolvedText}
        </div>
        
        {/* Art message */}
        <div className="w-full text-center mt-4 px-4 text-[#FF0000] font-mono text-lg md:text-xl tracking-wider font-bold">
          {messages.warBegins}
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
          
          {/* Logo with video */}
          <div className="w-full md:w-3/5 flex items-center justify-center md:pl-8">
            <WwLogoWithVideo messages={messages} />
          </div>
          
          {/* Right column with S Video and AIE image */}
          <div className="w-full md:w-1/5 flex flex-col items-center">
            {/* S Video */}
            <div className="mb-6">
              <SVideo />
            </div>
            
            {/* AIE image */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 group mt-4">
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
