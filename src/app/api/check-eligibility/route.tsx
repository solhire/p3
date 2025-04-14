import { NextResponse } from 'next/server';

// YZY WWIII DROP eligibility check API
// This is a placeholder implementation for the WWIII SET01 and DDAY drops

// Whitelist for SET01 (just example addresses)
const SET01_WHITELIST = [
  'EXvR6Ek7qXmfJ4SCxt3wLomUSEh1mLzskZ6GuXQ1QAqE',
  '5Mb9mLDWLfbvxvJn1Xi913UbPZXhgvUXYQR1XEaYTnyw',
  '8PcCqYHJpymD1MgKK2rSXbmhLyUPqwxT3E4rKyG8s3QT',
  // Add more wallets...
];

// Whitelist for DDAY (just example addresses)
const DDAY_WHITELIST = [
  '2xdPrMNbKXwuS9pxGJCMK3uKzCCKvuWcY6F3KdyH6LF1',
  'BzJtqGxUm8FwkZJy5gbJQJAZjGAAmgJTxXRwsadipZeE',
  // Add more wallets...
];

// Whitelist for WWIII (just example addresses)
const WWIII_WHITELIST = [
  '3YxN9umZS7eaYEcVryy6rH8TV6UTUnLw6e2dT6LqoMXT',
  'HZAW4LZxfGEZPmFM6YD15CpJMKQQoXZCyYkqL3QgKzAB',
  // Add more wallets...
];

// Handler for eligibility check
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');
    
    if (!wallet) {
      return NextResponse.json({ 
        success: false, 
        error: 'Wallet address is required' 
      }, { status: 400 });
    }
    
    // Determine which drop the wallet is eligible for
    let eligibleDrop = null;
    
    if (SET01_WHITELIST.includes(wallet)) {
      eligibleDrop = "SET01";
    } else if (DDAY_WHITELIST.includes(wallet)) {
      eligibleDrop = "DDAY";
    } else if (WWIII_WHITELIST.includes(wallet)) {
      eligibleDrop = "WWIII";
    }
    
    return NextResponse.json({
      success: true,
      data: {
        eligible: !!eligibleDrop,
        drop: eligibleDrop,
        message: eligibleDrop 
          ? `Your wallet is eligible for the YZY ${eligibleDrop} DROP!` 
          : 'Your wallet is not eligible for any drops at this time.'
      }
    });
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 