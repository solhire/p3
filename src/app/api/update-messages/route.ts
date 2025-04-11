import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the messages.json file
const messagesPath = path.join(process.cwd(), 'src/app/data/messages.json');

// Define types for messages
interface PageMessages {
  [key: string]: string;
}

interface SiteMessages {
  homepage: PageMessages;
  [key: string]: PageMessages;
}

// Default messages in case the file can't be read
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

// Function to read the current messages
const readMessages = (): SiteMessages => {
  try {
    // Check if file exists
    if (!fs.existsSync(messagesPath)) {
      // Create directory if it doesn't exist
      const dir = path.dirname(messagesPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write default messages to file
      fs.writeFileSync(messagesPath, JSON.stringify(defaultMessages, null, 2), 'utf8');
      return defaultMessages;
    }
    
    // Read file
    const data = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    return data;
  } catch (error) {
    console.error('Error reading messages file:', error);
    return defaultMessages;
  }
};

// Function to write updated messages
const writeMessages = (data: SiteMessages): boolean => {
  try {
    // Create directory if it doesn't exist
    const dir = path.dirname(messagesPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(messagesPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing messages file:', error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate admin session token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get current messages
    const currentMessages = readMessages();
    
    // Update with new messages
    const { page, updates } = data;
    
    // Validate required fields
    if (!page || !updates || typeof updates !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request format' }, { status: 400 });
    }
    
    // Convert page to string to ensure type safety
    const pageKey = String(page);
    
    // Check if page exists, if not create it
    if (!currentMessages[pageKey]) {
      currentMessages[pageKey] = {} as PageMessages;
    }
    
    // Update messages for the specified page
    const updatedMessages = {
      ...currentMessages,
      [pageKey]: {
        ...currentMessages[pageKey],
        ...updates
      }
    };
    
    // Write updated messages back to file
    const writeSuccess = writeMessages(updatedMessages);
    if (!writeSuccess) {
      return NextResponse.json({ success: false, error: 'Failed to write messages' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: updatedMessages[pageKey] });
  } catch (error) {
    console.error('Error handling update request:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Get current messages (doesn't require authentication)
export async function GET() {
  const messages = readMessages();
  return NextResponse.json({ success: true, data: messages });
} 