'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Influencer } from '@/types';
import Modal from '@/components/ui/Modal';
import InfluencerModal from './InfluencerModal';

interface InfluencerCardProps {
  influencer: Influencer;
}

export default function InfluencerCard({ influencer }: InfluencerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, profile_image_url, instagram_followers, tiktok_followers, youtube_followers, twitter_followers, facebook_followers } = influencer;
  
  // Format follower counts (e.g., 1.2K, 3.5M)
  const formatFollowers = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };
  
  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer h-full"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-white/20 hover:border-pink-300/50 h-full flex flex-col">
          <div className="relative h-72 w-full overflow-hidden flex-shrink-0">
            {profile_image_url ? (
              <Image
                src={profile_image_url}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
              {name}
            </h3>
            
            <div className="grid grid-cols-2 gap-3 h-24 overflow-y-auto">
              {instagram_followers !== undefined && instagram_followers > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-pink-50 transition-colors duration-200 h-fit">
                  <FaInstagram className="text-[#E1306C] text-base flex-shrink-0" />
                  <span className="font-medium">{formatFollowers(instagram_followers)}</span>
                </div>
              )}
              
              {tiktok_followers !== undefined && tiktok_followers > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-pink-50 transition-colors duration-200 h-fit">
                  <FaTiktok className="text-[#000000] text-base flex-shrink-0" />
                  <span className="font-medium">{formatFollowers(tiktok_followers)}</span>
                </div>
              )}
              
              {youtube_followers !== undefined && youtube_followers > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-pink-50 transition-colors duration-200 h-fit">
                  <FaYoutube className="text-[#FF0000] text-base flex-shrink-0" />
                  <span className="font-medium">{formatFollowers(youtube_followers)}</span>
                </div>
              )}
              
              {twitter_followers !== undefined && twitter_followers > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-pink-50 transition-colors duration-200 h-fit">
                  <FaXTwitter className="text-[#000000] text-base flex-shrink-0" />
                  <span className="font-medium">{formatFollowers(twitter_followers)}</span>
                </div>
              )}
              
              {facebook_followers !== undefined && facebook_followers > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-pink-50 transition-colors duration-200 h-fit">
                  <FaFacebook className="text-[#1877F2] text-base flex-shrink-0" />
                  <span className="font-medium">{formatFollowers(facebook_followers)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={name}
      >
        <InfluencerModal influencer={influencer} />
      </Modal>
    </>
  );
} 