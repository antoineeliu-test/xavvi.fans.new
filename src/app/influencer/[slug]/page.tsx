import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { getInfluencerBySlug } from '@/lib/influencers';

// Force dynamic rendering and disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const influencer = await getInfluencerBySlug(slug);
  
  if (!influencer) {
    return {
      title: 'Influencer Not Found - xavvi.fans',
    };
  }
  
  return {
    title: `${influencer.name} - xavvi.fans`,
    description: influencer.bio?.substring(0, 160) || `View ${influencer.name}&apos;s profile and connect on social media.`,
  };
}

export default async function InfluencerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const influencer = await getInfluencerBySlug(slug);
  
  if (!influencer) {
    notFound();
  }
  
  // Format follower counts with commas
  const formatFollowersWithCommas = (count?: number) => {
    if (!count) return '0';
    return count.toLocaleString();
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with profile image */}
        <div className="relative h-64 sm:h-80 w-full bg-gradient-to-r from-pink-400 to-purple-500">
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
              {influencer.name}
            </h1>
          </div>
        </div>
        
        {/* Profile information */}
        <div className="p-6">
          {/* Social Media Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {influencer.instagram_followers !== undefined && influencer.instagram_followers > 0 && (
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <FaInstagram className="text-[#E1306C] text-2xl mb-2" />
                <span className="text-gray-600 text-sm">Instagram</span>
                <span className="font-semibold text-lg">{formatFollowersWithCommas(influencer.instagram_followers)}</span>
              </div>
            )}
            
            {influencer.tiktok_followers !== undefined && influencer.tiktok_followers > 0 && (
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <FaTiktok className="text-black text-2xl mb-2" />
                <span className="text-gray-600 text-sm">TikTok</span>
                <span className="font-semibold text-lg">{formatFollowersWithCommas(influencer.tiktok_followers)}</span>
              </div>
            )}
            
            {influencer.youtube_followers !== undefined && influencer.youtube_followers > 0 && (
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <FaYoutube className="text-[#FF0000] text-2xl mb-2" />
                <span className="text-gray-600 text-sm">YouTube</span>
                <span className="font-semibold text-lg">{formatFollowersWithCommas(influencer.youtube_followers)}</span>
              </div>
            )}
            
            {influencer.twitter_followers !== undefined && influencer.twitter_followers > 0 && (
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <FaXTwitter className="text-[#000000] text-2xl mb-2" />
                <span className="text-gray-600 text-sm">X</span>
                <span className="font-semibold text-lg">{formatFollowersWithCommas(influencer.twitter_followers)}</span>
              </div>
            )}
          </div>
          
          {/* Bio */}
          {influencer.bio && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">About</h2>
              <p className="text-gray-700 whitespace-pre-line">{influencer.bio}</p>
            </div>
          )}
          
          {/* Gallery */}
          {influencer.gallery_images && influencer.gallery_images.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {influencer.gallery_images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${influencer.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 