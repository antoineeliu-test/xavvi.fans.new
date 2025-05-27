'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { Influencer } from '@/types';
import { deleteInfluencer } from '@/lib/influencers';
import { revalidateInfluencerData } from '@/lib/cache';

interface AdminInfluencerListProps {
  influencers: Influencer[];
}

export default function AdminInfluencerList({ influencers }: AdminInfluencerListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this influencer? This action cannot be undone.')) {
      setIsDeleting(id);
      
      try {
        await deleteInfluencer(id);
        
        // Revalidate cache to ensure changes appear immediately in production
        try {
          await revalidateInfluencerData();
        } catch (cacheError) {
          console.warn('Cache revalidation failed, but data was deleted:', cacheError);
        }
        
        router.refresh();
      } catch (error) {
        console.error('Error deleting influencer:', error);
        alert('Failed to delete influencer. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Influencer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Followers
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {influencers.map((influencer) => (
            <tr key={influencer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    {influencer.profile_image_url ? (
                      <Image
                        src={influencer.profile_image_url}
                        alt={influencer.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {influencer.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                    <div className="text-sm text-gray-500">@{influencer.slug}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {[
                    influencer.instagram_followers && influencer.instagram_followers > 0 && `Instagram: ${influencer.instagram_followers.toLocaleString()}`,
                    influencer.tiktok_followers && influencer.tiktok_followers > 0 && `TikTok: ${influencer.tiktok_followers.toLocaleString()}`,
                    influencer.youtube_followers && influencer.youtube_followers > 0 && `YouTube: ${influencer.youtube_followers.toLocaleString()}`,
                    influencer.twitter_followers && influencer.twitter_followers > 0 && `X: ${influencer.twitter_followers.toLocaleString()}`,
                    influencer.facebook_followers && influencer.facebook_followers > 0 && `Facebook: ${influencer.facebook_followers.toLocaleString()}`
                  ].filter(Boolean).join(', ')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(influencer.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link
                    href={`/influencer/${influencer.slug}`}
                    className="text-gray-600 hover:text-gray-900"
                    title="View profile"
                    target="_blank"
                  >
                    <FiExternalLink size={18} />
                  </Link>
                  
                  <Link
                    href={`/admin/influencers/edit/${influencer.id}`}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit influencer"
                  >
                    <FiEdit2 size={18} />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(influencer.id)}
                    disabled={isDeleting === influencer.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete influencer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          
          {influencers.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                No influencers found. Click &quot;Add Influencer&quot; to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 