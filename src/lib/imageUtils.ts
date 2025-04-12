import fs from 'fs';
import path from 'path';
import prisma from './prisma';
import { writeFile } from 'fs/promises';

// Get site images from database
export async function getSiteImages() {
  return prisma.siteImage.findMany({
    orderBy: { uploadedAt: 'desc' }
  });
}

// Get a specific image by its original key
export async function getSiteImageByKey(originalKey: string) {
  return prisma.siteImage.findUnique({
    where: { originalKey }
  });
}

// Update image in the database and filesystem
export async function updateSiteImage(
  formData: FormData,
  originalKey: string
) {
  try {
    // Check if this image exists
    const existingImage = await prisma.siteImage.findUnique({
      where: { originalKey }
    });

    if (!existingImage) {
      throw new Error(`Image with key ${originalKey} not found.`);
    }

    // Get the uploaded file or the replacement image key
    const file = formData.get('file') as File;
    const replacementImageKey = formData.get('replacementImageKey') as string;
    const forceReplacement = formData.get('forceReplacement') === 'true';
    
    // Get alt text if provided
    const altText = formData.get('altText') as string || existingImage.altText;
    
    let newPath: string;
    let uploadFailed = false;
    
    // Check if we're using another image as replacement
    if (replacementImageKey) {
      // Find the replacement image
      const replacementImage = await prisma.siteImage.findUnique({
        where: { originalKey: replacementImageKey }
      });
      
      if (!replacementImage) {
        throw new Error(`Replacement image with key ${replacementImageKey} not found.`);
      }
      
      // Use the current path of the replacement image
      newPath = replacementImage.currentPath;
    } else if (file) {
      try {
        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get file extension
        const fileExtension = path.extname(file.name).toLowerCase();
        
        // Create a unique path for the new file - keep the original path
        // but with a timestamp to avoid cache issues
        const timestamp = Date.now();
        newPath = originalKey.replace(
          /(\.[^.]+)$/,
          `_${timestamp}${fileExtension}`
        );
        
        // Full path in the public directory
        const publicDir = path.join(process.cwd(), 'public');
        const fullPath = path.join(publicDir, newPath);
        
        // Write file to disk
        await writeFile(fullPath, buffer);
      } catch (error) {
        console.error('Error writing file:', error);
        uploadFailed = true;
        
        // If not forcing replacement and upload fails, throw error
        if (!forceReplacement) {
          throw new Error('Failed to write file to disk. Try using an existing image as replacement instead.');
        }
        
        // If forcing replacement, use the original path as fallback
        newPath = existingImage.currentPath;
      }
    } else {
      throw new Error('Either a file or a replacement image key is required.');
    }
    
    // Update database entry
    const updatedImage = await prisma.siteImage.update({
      where: { originalKey },
      data: {
        currentPath: newPath,
        altText,
        updatedAt: new Date()
      }
    });
    
    // Delete old file if it's different from the new one
    // and not the original file (we keep originals as backup)
    // Only attempt if upload didn't fail
    if (
      !uploadFailed &&
      !replacementImageKey && // Only delete if we uploaded a new file, not when swapping
      existingImage.currentPath !== newPath &&
      existingImage.currentPath !== originalKey
    ) {
      const publicDir = path.join(process.cwd(), 'public');
      const oldFullPath = path.join(publicDir, existingImage.currentPath);
      try {
        if (fs.existsSync(oldFullPath)) {
          fs.unlinkSync(oldFullPath);
        }
      } catch (error) {
        console.error('Error deleting old file:', error);
        // Don't fail the operation if we can't delete the old file
      }
    }
    
    return {
      ...updatedImage,
      uploadFailed
    };
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
}

// Initialize the database with existing images
export async function seedImages() {
  try {
    console.log('Checking if we need to seed images...');
    
    // Check if we have any images in the database
    const existingImages = await prisma.siteImage.count();
    
    // If we already have images, don't seed
    if (existingImages > 0) {
      console.log('Images already seeded.');
      return;
    }
    
    console.log('Seeding images...');
    
    // Get list of images in the public directory
    const publicDir = path.join(process.cwd(), 'public');
    const files = getAllFiles(publicDir);
    
    // Filter to only keep image files
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Create records for each image
    const createOperations = imageFiles.map(file => {
      // Get path relative to public directory
      const relativePath = file.replace(publicDir, '').replace(/\\/g, '/');
      // Remove leading slash if present
      const cleanPath = relativePath.startsWith('/') 
        ? relativePath.substring(1) 
        : relativePath;
      
      return prisma.siteImage.create({
        data: {
          originalKey: `/${cleanPath}`,
          currentPath: `/${cleanPath}`,
          altText: path.basename(file, path.extname(file))
        }
      });
    });
    
    await prisma.$transaction(createOperations);
    console.log(`Seeded ${createOperations.length} images`);
  } catch (error) {
    console.error('Error seeding images:', error);
    throw error;
  }
}

// Utility function to get all files recursively in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
} 