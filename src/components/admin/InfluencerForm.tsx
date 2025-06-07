'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Influencer } from '@/types';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import MultiImageUpload from '@/components/ui/MultiImageUpload';
import { createInfluencer, updateInfluencer } from '@/lib/influencers';
import { uploadImage, uploadMultipleImages } from '@/lib/images';
import { revalidateInfluencerData } from '@/lib/cache';

// Form validation schema
const influencerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  bio: z.string().optional(),
  website: z.string().url('Please enter a valid URL (e.g., https://example.com)').optional().or(z.literal('')),
  instagram_followers: z.coerce.number().optional(),
  tiktok_followers: z.coerce.number().optional(),
  youtube_followers: z.coerce.number().optional(),
  twitter_followers: z.coerce.number().optional(),
  facebook_followers: z.coerce.number().optional(),
  profile_image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
});

type InfluencerFormValues = z.infer<typeof influencerSchema>;

interface InfluencerFormProps {
  influencer?: Influencer;
  isEditing?: boolean;
}

export default function InfluencerForm({ influencer, isEditing = false }: InfluencerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  
  // Setup form with default values
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerSchema),
    defaultValues: {
      name: influencer?.name || '',
      slug: influencer?.slug || '',
      bio: influencer?.bio || '',
      website: influencer?.website || '',
      instagram_followers: influencer?.instagram_followers,
      tiktok_followers: influencer?.tiktok_followers,
      youtube_followers: influencer?.youtube_followers,
      twitter_followers: influencer?.twitter_followers,
      facebook_followers: influencer?.facebook_followers,
      profile_image_url: influencer?.profile_image_url || '',
      gallery_images: influencer?.gallery_images || [],
    },
  });
  
  // Watch the name field to auto-generate slug
  const name = watch('name');
  
  // Auto-generate slug from name if not editing
  useEffect(() => {
    if (!isEditing && name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
      
      setValue('slug', slug);
    }
  }, [name, setValue, isEditing]);
  
  // Handler for profile image changes
  const handleProfileImageChange = (imageData: string | null) => {
    if (imageData) {
      // Convert base64 to File object
      const byteString = atob(imageData.split(',')[1]);
      const mimeType = imageData.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeType });
      const fileName = `profile-${Date.now()}.${mimeType.split('/')[1]}`;
      const file = new File([blob], fileName, { type: mimeType });
      
      setProfileImageFile(file);
      setValue('profile_image_url', imageData);
    } else {
      setProfileImageFile(null);
      setValue('profile_image_url', '');
    }
  };
  
  // Handler for gallery images changes
  const handleGalleryImagesChange = (imagesData: string[]) => {
    const files: File[] = [];
    
    imagesData.forEach((imageData, index) => {
      // Skip if the imageData is a URL (already uploaded)
      if (imageData.startsWith('http')) {
        return;
      }
      
      // Convert base64 to File object
      const byteString = atob(imageData.split(',')[1]);
      const mimeType = imageData.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeType });
      const fileName = `gallery-${Date.now()}-${index}.${mimeType.split('/')[1]}`;
      const file = new File([blob], fileName, { type: mimeType });
      
      files.push(file);
    });
    
    setGalleryImageFiles(files);
    setValue('gallery_images', imagesData);
  };
  
  const onSubmit = async (data: InfluencerFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Upload profile image if there's a new one
      let profileImageUrl = data.profile_image_url;
      if (profileImageFile) {
        profileImageUrl = await uploadImage(profileImageFile);
      }
      
      // Upload gallery images if there are new ones
      let galleryImageUrls = data.gallery_images || [];
      
      // Filter out any base64 data URLs from existing gallery_images
      const existingUrls = galleryImageUrls.filter(url => url.startsWith('http'));
      
      // Upload new gallery images
      if (galleryImageFiles.length > 0) {
        const newUrls = await uploadMultipleImages(galleryImageFiles);
        galleryImageUrls = [...existingUrls, ...newUrls];
      } else {
        galleryImageUrls = existingUrls;
      }
      
      // Prepare the influencer data
      const influencerData = {
        name: data.name,
        slug: data.slug,
        bio: data.bio,
        website: data.website,
        instagram_followers: data.instagram_followers,
        tiktok_followers: data.tiktok_followers,
        youtube_followers: data.youtube_followers,
        twitter_followers: data.twitter_followers,
        facebook_followers: data.facebook_followers,
        profile_image_url: profileImageUrl,
        gallery_images: galleryImageUrls,
      };
      
      // Create or update the influencer
      if (isEditing && influencer) {
        await updateInfluencer(influencer.id, influencerData);
      } else {
        await createInfluencer(influencerData);
      }
      
      // Revalidate cache to ensure changes appear immediately in production
      try {
        await revalidateInfluencerData();
      } catch (cacheError) {
        console.warn('Cache revalidation failed, but data was saved:', cacheError);
      }
      
      // Redirect to the admin dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error saving influencer:', error);
      setError('Failed to save influencer. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 md:col-span-1">
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Influencer's name"
          />
          
          <Input
            label="Slug"
            {...register('slug')}
            error={errors.slug?.message}
            placeholder="unique-identifier"
            disabled={!isEditing} // Only editable in edit mode
          />
          
          <TextArea
            label="Bio"
            {...register('bio')}
            error={errors.bio?.message}
            placeholder="About this influencer..."
            rows={6}
          />
          
          <Input
            label="Website"
            {...register('website')}
            error={errors.website?.message}
            placeholder="https://example.com"
            type="url"
          />
        </div>
        
        <div className="space-y-6 md:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Instagram Followers"
              type="number"
              {...register('instagram_followers')}
              error={errors.instagram_followers?.message}
              placeholder="0"
            />
            
            <Input
              label="TikTok Followers"
              type="number"
              {...register('tiktok_followers')}
              error={errors.tiktok_followers?.message}
              placeholder="0"
            />
            
            <Input
              label="YouTube Followers"
              type="number"
              {...register('youtube_followers')}
              error={errors.youtube_followers?.message}
              placeholder="0"
            />
            
            <Input
              label="X Followers"
              type="number"
              {...register('twitter_followers')}
              error={errors.twitter_followers?.message}
              placeholder="0"
            />
            
            <Input
              label="Facebook Followers"
              type="number"
              {...register('facebook_followers')}
              error={errors.facebook_followers?.message}
              placeholder="0"
            />
          </div>
          
          <ImageUpload
            label="Profile Image"
            value={watch('profile_image_url')}
            onChange={handleProfileImageChange}
            error={errors.profile_image_url?.message}
          />
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Gallery Images</h3>
        <MultiImageUpload
          value={watch('gallery_images')}
          onChange={handleGalleryImagesChange}
          error={errors.gallery_images?.message}
        />
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/dashboard')}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Update Influencer' : 'Create Influencer'}
        </Button>
      </div>
    </form>
  );
} 