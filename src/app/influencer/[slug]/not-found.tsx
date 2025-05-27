import Link from 'next/link';
import { FiHome, FiUser } from 'react-icons/fi';

export default function InfluencerNotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Influencer Not Found</h1>
      <p className="text-gray-600 mb-8">
        The influencer profile you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <FiHome className="mr-2" /> 
          Back to Home
        </Link>
        
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <FiUser className="mr-2" /> 
          Admin Login
        </Link>
      </div>
    </div>
  );
} 