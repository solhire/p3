'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SiteImage {
  id: string;
  originalKey: string;
  currentPath: string;
  altText: string;
  uploadedAt: string;
  updatedAt: string;
}

export default function AdminImageManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null);
  const [replacementImage, setReplacementImage] = useState<SiteImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [replacementMode, setReplacementMode] = useState<'upload' | 'existing'>('upload');
  const [forceReplacement, setForceReplacement] = useState(false);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file selection
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Free memory when this component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/update-images');
      const result = await response.json();
      
      if (result.success) {
        setImages(result.data);
      } else {
        setError('Failed to load images');
      }
    } catch (err) {
      setError('Error fetching images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image: SiteImage) => {
    setSelectedImage(image);
    setFile(null);
    setPreviewUrl(null);
    setReplacementImage(null);
  };

  const handleReplacementImageSelect = (image: SiteImage) => {
    // Don't allow selecting the same image as replacement
    if (selectedImage && image.id === selectedImage.id) {
      return;
    }
    
    setReplacementImage(image);
    setFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setReplacementImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Please select an image to replace');
      return;
    }
    
    if (replacementMode === 'upload' && !file) {
      setError('Please select a replacement file to upload');
      return;
    }
    
    if (replacementMode === 'existing' && !replacementImage) {
      setError('Please select an existing image as replacement');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      setSuccess(null);
      
      // Get admin session from localStorage for authentication
      const adminSession = localStorage.getItem('admin-session');
      if (!adminSession) {
        setError('Admin session expired. Please login again.');
        return;
      }
      
      // Create form data
      const formData = new FormData();
      
      if (replacementMode === 'upload' && file) {
        formData.append('file', file);
        // Add force replacement flag
        formData.append('forceReplacement', forceReplacement.toString());
      } else if (replacementMode === 'existing' && replacementImage) {
        formData.append('replacementImageKey', replacementImage.originalKey);
      }
      
      formData.append('altText', selectedImage.altText);
      
      // Send update request
      const response = await fetch(`/api/update-images?originalKey=${encodeURIComponent(selectedImage.originalKey)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminSession}`
        },
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        if (result.data.uploadFailed) {
          setSuccess(`Image update partially succeeded. File upload failed, but the image was updated in the database.`);
        } else {
          setSuccess(`Image updated successfully!`);
        }
        
        // Update the image in the list
        setImages(prev => 
          prev.map(img => 
            img.id === result.data.id ? {
              ...result.data,
              // Remove the uploadFailed property before updating the state
              uploadFailed: undefined
            } : img
          )
        );
        
        // Reset form
        setFile(null);
        setPreviewUrl(null);
        setSelectedImage(null);
        setReplacementImage(null);
        
        // Refetch all images to ensure we have the latest data
        fetchImages();
      } else {
        setError(result.error || 'Failed to update image');
      }
    } catch (err) {
      setError('Error updating image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  
  // Filter images based on search term
  const filteredImages = images.filter(img => 
    img.originalKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.altText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Image Manager</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 mb-4 rounded">
          {success}
        </div>
      )}
      
      {/* Search input */}
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black border border-white/30 p-3 text-white"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image list */}
        <div className="w-full md:w-1/2 overflow-y-auto max-h-[500px] pr-2">
          <h3 className="text-lg font-semibold mb-3">Select Image to Replace</h3>
          {loading ? (
            <div className="text-white/50">Loading images...</div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredImages.map(image => (
                <div 
                  key={image.id}
                  className={`relative aspect-square cursor-pointer rounded overflow-hidden border-2 transition-all ${
                    selectedImage?.id === image.id 
                      ? 'border-[#FF0000]' 
                      : 'border-transparent hover:border-white/30'
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <Image 
                    src={image.currentPath} 
                    alt={image.altText}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-xs p-1 truncate">
                    {image.originalKey}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/50">No images found.</div>
          )}
        </div>
        
        {/* Image edit form */}
        <div className="w-full md:w-1/2">
          {selectedImage ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">{selectedImage.originalKey}</h3>
                <p className="text-white/70 text-sm mb-4">
                  Currently using: {selectedImage.currentPath}
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Current image */}
                  <div className="relative aspect-square w-full md:w-1/2 border border-white/20">
                    <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center text-xs uppercase text-white/50 font-mono">
                      Current Image
                    </div>
                    <Image 
                      src={selectedImage.currentPath} 
                      alt={selectedImage.altText}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Preview new image */}
                  <div className="relative aspect-square w-full md:w-1/2 border border-white/20">
                    {previewUrl ? (
                      <Image 
                        src={previewUrl} 
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    ) : replacementImage ? (
                      <Image 
                        src={replacementImage.currentPath} 
                        alt={replacementImage.altText}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center text-xs uppercase text-white/50 font-mono">
                        New Image Preview
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Replacement Method Tabs */}
                <div className="flex border-b border-white/20 mb-4">
                  <button
                    type="button"
                    onClick={() => setReplacementMode('upload')}
                    className={`px-4 py-2 ${replacementMode === 'upload' ? 'border-b-2 border-[#FF0000] text-white' : 'text-white/50'}`}
                  >
                    Upload New
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplacementMode('existing')}
                    className={`px-4 py-2 ${replacementMode === 'existing' ? 'border-b-2 border-[#FF0000] text-white' : 'text-white/50'}`}
                  >
                    Use Existing
                  </button>
                </div>
                
                {replacementMode === 'upload' ? (
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-2">
                      Upload New Image
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full bg-black border border-white/30 p-3 text-white"
                    />
                    <div className="mt-2">
                      <label className="flex items-center text-white/70 text-sm">
                        <input
                          type="checkbox"
                          checked={forceReplacement}
                          onChange={() => setForceReplacement(!forceReplacement)}
                          className="mr-2"
                        />
                        Continue if upload fails (will keep current image)
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-2">
                      Select Existing Image
                    </label>
                    <div className="overflow-y-auto max-h-[200px] border border-white/20 p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {filteredImages
                          .filter(img => img.id !== selectedImage.id)
                          .map(image => (
                            <div 
                              key={image.id}
                              className={`relative aspect-square cursor-pointer rounded overflow-hidden border-2 transition-all ${
                                replacementImage?.id === image.id 
                                  ? 'border-[#FF0000]' 
                                  : 'border-transparent hover:border-white/30'
                              }`}
                              onClick={() => handleReplacementImageSelect(image)}
                            >
                              <Image 
                                src={image.currentPath} 
                                alt={image.altText}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <button 
                  type="submit"
                  disabled={uploading || (replacementMode === 'upload' && !file) || (replacementMode === 'existing' && !replacementImage)}
                  className={`w-full py-3 bg-[#FF0000] text-white ${
                    (uploading || (replacementMode === 'upload' && !file) || (replacementMode === 'existing' && !replacementImage))
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#FF0000]/80'
                  }`}
                >
                  {uploading ? 'Updating...' : 'Update Image'}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] border border-white/10 rounded">
              <p className="text-white/50">Select an image to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 