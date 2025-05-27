import { Influencer } from '@/types';
import InfluencerCard from './InfluencerCard';

interface InfluencerGridProps {
  influencers: Influencer[];
}

export default function InfluencerGrid({ influencers }: InfluencerGridProps) {
  if (influencers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No influencers found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.id} influencer={influencer} />
      ))}
    </div>
  );
} 