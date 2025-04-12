import { NextRequest, NextResponse } from 'next/server';
import { 
  updateSiteImage, 
  getSiteImages, 
  getSiteImageByKey,
  seedImages
} from '../../../lib/imageUtils';

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

// Upload a new image to replace an existing one
export async function POST(request: NextRequest) {
  try {
    // Validate admin session token
    const authHeader = request.headers.get('authorization');
    if (!validateAdminSession(authHeader)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the original image key from the URL parameter
    const { searchParams } = new URL(request.url);
    const originalKey = searchParams.get('originalKey');
    
    if (!originalKey) {
      return NextResponse.json({ success: false, error: 'Missing originalKey parameter' }, { status: 400 });
    }
    
    // Get form data from the request
    const formData = await request.formData();
    
    // Process the image update
    const updatedImage = await updateSiteImage(formData, originalKey);
    
    return NextResponse.json({ success: true, data: updatedImage });
  } catch (error) {
    console.error('Error handling image update:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}

// Get all images or a specific image
export async function GET(request: NextRequest) {
  try {
    // Ensure images are seeded
    await seedImages();
    
    // Check if we're looking for a specific image
    const { searchParams } = new URL(request.url);
    const originalKey = searchParams.get('originalKey');
    
    if (originalKey) {
      // Get specific image
      const image = await getSiteImageByKey(originalKey);
      if (!image) {
        return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: image });
    } else {
      // Get all images
      const images = await getSiteImages();
      return NextResponse.json({ success: true, data: images });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
} 