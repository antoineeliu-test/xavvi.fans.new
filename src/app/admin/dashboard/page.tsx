import { Metadata } from 'next';
import Link from 'next/link';
import { FiPlus, FiUsers } from 'react-icons/fi';
import { getAllInfluencers } from '@/lib/influencers';
import AdminInfluencerList from '@/components/admin/AdminInfluencerList';
import SignOutButton from '@/components/admin/SignOutButton';

export const metadata: Metadata = {
  title: 'Admin Dashboard - xavvi.fans',
  description: 'Manage influencers on the xavvi.fans platform',
};

// Force dynamic rendering and disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const influencers = await getAllInfluencers();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white-900">Admin Dashboard</h1>
        
        <div className="flex gap-4">
          <Link
            href="/admin/influencers/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <FiPlus className="mr-2 -ml-1 h-4 w-4" />
            Add Influencer
          </Link>
          
          <SignOutButton />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4 text-gray-700">
          <FiUsers className="w-5 h-5" />
          <span>Total Influencers: <strong>{influencers.length}</strong></span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminInfluencerList influencers={influencers} />
      </div>
    </div>
  );
} 