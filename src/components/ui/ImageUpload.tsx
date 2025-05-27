'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { FiUpload, FiX } from 'react-icons/fi';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string | null) => void;
  error?: string;
  height?: number;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  error,
  height = 250,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className={`
          border-2 border-dashed rounded-lg 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          hover:border-pink-500 transition-colors
        `}
        style={{ height: `${height}px` }}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center h-full cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUpload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 