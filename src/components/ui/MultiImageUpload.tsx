'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { FiUpload, FiX } from 'react-icons/fi';

interface MultiImageUploadProps {
  label?: string;
  value?: string[];
  onChange: (urls: string[]) => void;
  error?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  label,
  value = [],
  onChange,
  error,
  maxImages = 10,
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed maxImages
    if (previews.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const newPreviews: string[] = [...previews];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        newPreviews.push(result);
        setPreviews([...newPreviews]);
        onChange([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    onChange(newPreviews);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Current Images */}
        {previews.map((preview, index) => (
          <div 
            key={`image-${index}`} 
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
          >
            <Image
              src={preview}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
        
        {/* Upload Button - only show if under max limit */}
        {previews.length < maxImages && (
          <div 
            className="aspect-square border-2 border-dashed rounded-lg border-gray-300 hover:border-pink-500 transition-colors cursor-pointer flex flex-col items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUpload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Add Image</p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        {previews.length} of {maxImages} images
      </p>
    </div>
  );
} 