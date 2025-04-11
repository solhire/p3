import { NextRequest, NextResponse } from 'next/server';

// Define types for messages
interface PageMessages {
  [key: string]: string;
}

interface SiteMessages {
  homepage: PageMessages;
  [key: string]: PageMessages;
}

// Default messages
const defaultMessages: SiteMessages = {
  homepage: {
    phaseTitle: "PHASE 2",
    wwiii: "WWIII",
    ww3Deluxe: "WW3 DELUXE",
    redTitle: "RED",
    pumpFunLink: "PUMP.FUN/PROFILE/ƒUCK",
    caAddress: "D351aeeC5XKniB99eEEd8aTLjXBcURWRoNyD9ikzpump",
    bullyV1: "BULLY V1"
  }
};

// Use memory storage for development/demo purposes
let messagesCache: SiteMessages = { ...defaultMessages };

// Function to validate admin session
function validateAdminSession(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  try {
    const sessionData = JSON.parse(authHeader.substring(7));
    return sessionData && sessionData.expires && sessionData.expires > Date.now();
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate admin session token
    const authHeader = request.headers.get('authorization');
    if (!validateAdminSession(authHeader)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    // Update with new messages
    const { page, updates } = data;
    
    // Validate required fields
    if (!page || !updates || typeof updates !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request format' }, { status: 400 });
    }
    
    // Convert page to string to ensure type safety
    const pageKey = String(page);
    
    // Check if page exists, if not create it
    if (!messagesCache[pageKey]) {
      messagesCache[pageKey] = {} as PageMessages;
    }
    
    // Update messages for the specified page
    messagesCache = {
      ...messagesCache,
      [pageKey]: {
        ...messagesCache[pageKey],
        ...updates
      }
    };
    
    return NextResponse.json({ success: true, data: messagesCache[pageKey] });
  } catch (error) {
    console.error('Error handling update request:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Get current messages (doesn't require authentication)
export async function GET() {
  return NextResponse.json({ success: true, data: messagesCache });
}

// Add Edge runtime directive
export const runtime = 'edge'; 