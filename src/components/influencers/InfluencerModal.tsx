'use client';

import Image from 'next/image';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Influencer } from '@/types';

interface InfluencerModalProps {
  influencer: Influencer;
}

export default function InfluencerModal({ influencer }: InfluencerModalProps) {
  // Format follower counts with commas
  const formatFollowersWithCommas = (count?: number) => {
    if (!count) return '0';
    return count.toLocaleString();
  };

  return (
    <div className="max-w-none">
      {/* Header with profile image */}
      <div className="relative h-48 w-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl overflow-hidden mb-6">
        {influencer.profile_image_url && (
          <Image
            src={influencer.profile_image_url}
            alt={influencer.name}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
            {influencer.name}
          </h1>
        </div>
      </div>

      {/* Social Media Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {influencer.instagram_followers !== undefined && influencer.instagram_followers > 0 && (
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200">
            <FaInstagram className="text-[#E1306C] text-xl mb-2" />
            <span className="text-gray-600 text-xs">Instagram</span>
            <span className="font-semibold text-sm">{formatFollowersWithCommas(influencer.instagram_followers)}</span>
          </div>
        )}
        
        {influencer.tiktok_followers !== undefined && influencer.tiktok_followers > 0 && (
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200">
            <FaTiktok className="text-black text-xl mb-2" />
            <span className="text-gray-600 text-xs">TikTok</span>
            <span className="font-semibold text-sm">{formatFollowersWithCommas(influencer.tiktok_followers)}</span>
          </div>
        )}
        
        {influencer.youtube_followers !== undefined && influencer.youtube_followers > 0 && (
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200">
            <FaYoutube className="text-[#FF0000] text-xl mb-2" />
            <span className="text-gray-600 text-xs">YouTube</span>
            <span className="font-semibold text-sm">{formatFollowersWithCommas(influencer.youtube_followers)}</span>
          </div>
        )}
        
        {influencer.twitter_followers !== undefined && influencer.twitter_followers > 0 && (
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200">
            <FaXTwitter className="text-[#000000] text-xl mb-2" />
            <span className="text-gray-600 text-xs">X</span>
            <span className="font-semibold text-sm">{formatFollowersWithCommas(influencer.twitter_followers)}</span>
          </div>
        )}
        
        {influencer.facebook_followers !== undefined && influencer.facebook_followers > 0 && (
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200">
            <FaFacebook className="text-[#1877F2] text-xl mb-2" />
            <span className="text-gray-600 text-xs">Facebook</span>
            <span className="font-semibold text-sm">{formatFollowersWithCommas(influencer.facebook_followers)}</span>
          </div>
        )}
      </div>
      
      {/* Bio */}
      {influencer.bio && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">About</h3>
          <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{influencer.bio}</p>
        </div>
      )}
      
      {/* Gallery */}
      {influencer.gallery_images && influencer.gallery_images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Gallery</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {influencer.gallery_images.slice(0, 8).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${influencer.name} gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {influencer.gallery_images.length > 8 && (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">
                  +{influencer.gallery_images.length - 8} more
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 