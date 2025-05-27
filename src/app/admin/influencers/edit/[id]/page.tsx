import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InfluencerForm from '@/components/admin/InfluencerForm';
import { getInfluencerById } from '@/lib/influencers';

export const metadata: Metadata = {
  title: 'Edit Influencer - xavvi.fans',
  description: 'Edit an existing influencer on the xavvi.fans platform',
};

interface EditInfluencerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInfluencerPage({ params }: EditInfluencerPageProps) {
  const { id } = await params;
  const influencer = await getInfluencerById(id);
  
  if (!influencer) {
    notFound();
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Influencer</h1>
        <p className="text-gray-600 mt-1">Update {influencer.name}&apos;s profile</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <InfluencerForm influencer={influencer} isEditing={true} />
      </div>
    </div>
  );
} 