import { Metadata } from 'next';
import InfluencerForm from '@/components/admin/InfluencerForm';

export const metadata: Metadata = {
  title: 'Add New Influencer - xavvi.fans',
  description: 'Add a new influencer to the xavvi.fans platform',
};

export default function AddInfluencerPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Influencer</h1>
        <p className="text-gray-600 mt-1">Create a new influencer profile</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <InfluencerForm />
      </div>
    </div>
  );
} 