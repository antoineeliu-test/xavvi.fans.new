import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaInstagram, FaTiktok, FaYoutube, FaArrowLeft, FaGlobe } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back to Directory</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Compact Profile Card - Centered and Immediately Visible */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Minimal Header with Profile Image and Name */}
          <div className="relative h-32 sm:h-40 w-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
            {influencer.profile_image_url && (
              <div className="absolute inset-0">
                <Image
                  src={influencer.profile_image_url}
                  alt={influencer.name}
                  fill
                  className="object-cover opacity-30"
                  priority
                />
              </div>
            )}
            
            <div className="relative z-10 text-center flex items-center justify-center gap-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {influencer.name}
              </h1>
              {influencer.website && (
                <a 
                  href={influencer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors duration-300"
                  aria-label={`Visit ${influencer.name}'s website`}
                >
                  <FaGlobe className="text-xl sm:text-2xl drop-shadow-lg" />
                </a>
              )}
            </div>
          </div>
          
          {/* Main Profile Content - Immediately Visible */}
          <div className="p-6 sm:p-8">
            
            {/* Social Media Stats - Primary Content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {influencer.instagram_followers !== undefined && influencer.instagram_followers > 0 && (
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-200">
                  <FaInstagram className="text-[#E1306C] text-2xl sm:text-3xl mb-2" />
                  <span className="text-gray-600 text-sm font-medium">Instagram</span>
                  <span className="font-bold text-lg sm:text-xl text-gray-900">{formatFollowersWithCommas(influencer.instagram_followers)}</span>
                </div>
              )}
              
              {influencer.tiktok_followers !== undefined && influencer.tiktok_followers > 0 && (
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <FaTiktok className="text-black text-2xl sm:text-3xl mb-2" />
                  <span className="text-gray-600 text-sm font-medium">TikTok</span>
                  <span className="font-bold text-lg sm:text-xl text-gray-900">{formatFollowersWithCommas(influencer.tiktok_followers)}</span>
                </div>
              )}
              
              {influencer.youtube_followers !== undefined && influencer.youtube_followers > 0 && (
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-200">
                  <FaYoutube className="text-[#FF0000] text-2xl sm:text-3xl mb-2" />
                  <span className="text-gray-600 text-sm font-medium">YouTube</span>
                  <span className="font-bold text-lg sm:text-xl text-gray-900">{formatFollowersWithCommas(influencer.youtube_followers)}</span>
                </div>
              )}
              
              {influencer.twitter_followers !== undefined && influencer.twitter_followers > 0 && (
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <FaXTwitter className="text-[#000000] text-2xl sm:text-3xl mb-2" />
                  <span className="text-gray-600 text-sm font-medium">X</span>
                  <span className="font-bold text-lg sm:text-xl text-gray-900">{formatFollowersWithCommas(influencer.twitter_followers)}</span>
                </div>
              )}
            </div>
            
            {/* Bio */}
            {influencer.bio && (
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">About</h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line text-base sm:text-lg leading-relaxed">{influencer.bio}</p>
                </div>
              </div>
            )}
            
            {/* Gallery */}
            {influencer.gallery_images && influencer.gallery_images.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {influencer.gallery_images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
    </div>
  );
} 