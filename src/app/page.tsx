import { Metadata } from 'next';
import InfluencerGrid from '@/components/influencers/InfluencerGrid';
import { getAllInfluencers } from '@/lib/influencers';

export const metadata: Metadata = {
  title: 'xavvi.fans',
  description: 'Browse and connect with top social media influencers across Instagram, TikTok, YouTube, and X.',
};

// Force dynamic rendering and disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const influencers = await getAllInfluencers();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Discover Xavvi&apos;s
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Influencer Partners
              </span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Influencers Section */}
      <div className="relative max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <InfluencerGrid influencers={influencers} />
        </div>
      </div>
    </div>
  );
}
