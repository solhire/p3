'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Phantom wallet integration for YZY WWIII DROP
export default function PhantomWalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [dropEligible, setDropEligible] = useState(false);
  const [dropSet, setDropSet] = useState("SET01");
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if Phantom wallet is installed
  const getProvider = () => {
    if ('phantom' in window) {
      // @ts-ignore
      const provider = window.phantom?.solana;
      
      if (provider?.isPhantom) {
        return provider;
      }
    }
    
    return null;
  };
  
  // Connect to Phantom wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      
      if (!provider) {
        window.open('https://phantom.app/', '_blank');
        return;
      }
      
      const response = await provider.connect();
      const address = response.publicKey.toString();
      
      setWalletAddress(address);
      setIsConnected(true);
      
      // Check if wallet is eligible for WWIII drop
      checkDropEligibility(address);
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Disconnect from Phantom wallet
  const disconnectWallet = async () => {
    try {
      const provider = getProvider();
      
      if (provider) {
        await provider.disconnect();
        setWalletAddress(null);
        setIsConnected(false);
        setDropEligible(false);
      }
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error);
    }
  };
  
  // Check if wallet is eligible for YZY WWIII DROP
  const checkDropEligibility = async (address: string) => {
    try {
      // This would be an actual API call in a real implementation
      // const response = await fetch(`/api/check-eligibility?wallet=${address}`);
      // const data = await response.json();
      
      // For the fake implementation, we'll just randomly determine eligibility
      const isEligible = Math.random() > 0.5;
      setDropEligible(isEligible);
      
      // Determine which SET the user is eligible for
      if (isEligible) {
        const sets = ["SET01", "DDAY", "WWIII"];
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setDropSet(randomSet);
      }
    } catch (error) {
      console.error("Error checking drop eligibility:", error);
    }
  };
  
  // TODO: Implement claiming functionality for YZY WWIII DROP
  const claimDrop = async () => {
    // Not implemented yet
    alert(`Claiming ${dropSet} from YZY WWIII DROP`);
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-black/50 backdrop-blur-sm rounded-lg">
      <h2 className="text-white font-mono text-2xl md:text-3xl font-bold tracking-wider mb-6">
        YZY WWIII DROP
      </h2>
      
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#222222] to-[#444444] py-3 px-8 rounded text-white font-mono tracking-wider hover:opacity-90 transition-opacity duration-300"
        >
          {isLoading ? "Connecting..." : "Connect Phantom Wallet"}
        </button>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="text-white/80 font-mono text-sm mb-4 truncate max-w-full">
            Connected: {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
          </div>
          
          {dropEligible ? (
            <div className="w-full">
              <div className="text-[#00FF00] font-mono text-lg mb-4 text-center">
                ELIGIBLE FOR {dropSet}
              </div>
              
              <div className="mb-6 flex justify-center">
                <div className="relative w-64 h-64">
                  <Image 
                    src={`/${dropSet === "DDAY" ? "DDAY.png" : dropSet === "SET01" ? "war2.png" : "WWIII.png"}`}
                    alt={dropSet}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <button
                onClick={claimDrop}
                className="w-full bg-[#FF0000] py-3 rounded text-white font-mono tracking-wider hover:opacity-90 transition-opacity duration-300"
              >
                CLAIM {dropSet}
              </button>
            </div>
          ) : (
            <div className="text-[#FF0000] font-mono text-lg mb-4">
              NOT ELIGIBLE FOR DROP
            </div>
          )}
          
          <button
            onClick={disconnectWallet}
            className="mt-6 text-white/60 font-mono text-sm hover:text-white transition-colors duration-300"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
      
      {/* Warning: Incomplete implementation - DO NOT DEPLOY */}
      <div className="mt-6 text-[#FF0000]/80 font-mono text-xs text-center">
        WWIII YZY DROP INTEGRATION - DEVELOPMENT ONLY
      </div>
    </div>
  );
} 