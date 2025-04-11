import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the messages.json file
const messagesPath = path.join(process.cwd(), 'src/app/data/messages.json');

// Function to read the current messages
const readMessages = () => {
  try {
    return JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  } catch (error) {
    console.error('Error reading messages file:', error);
    return null;
  }
};

// Function to write updated messages
const writeMessages = (data: any) => {
  try {
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
    if (!currentMessages) {
      return NextResponse.json({ success: false, error: 'Could not read messages file' }, { status: 500 });
    }
    
    // Update with new messages
    const { page, updates } = data;
    
    // Validate required fields
    if (!page || !updates || typeof updates !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request format' }, { status: 400 });
    }
    
    // Check if page exists
    if (!currentMessages[page]) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }
    
    // Update messages for the specified page
    const updatedMessages = {
      ...currentMessages,
      [page]: {
        ...currentMessages[page],
        ...updates
      }
    };
    
    // Write updated messages back to file
    const writeSuccess = writeMessages(updatedMessages);
    if (!writeSuccess) {
      return NextResponse.json({ success: false, error: 'Failed to write messages' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: updatedMessages[page] });
  } catch (error) {
    console.error('Error handling update request:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Get current messages (doesn't require authentication)
export async function GET() {
  const messages = readMessages();
  if (!messages) {
    return NextResponse.json({ success: false, error: 'Could not read messages file' }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: messages });
} 