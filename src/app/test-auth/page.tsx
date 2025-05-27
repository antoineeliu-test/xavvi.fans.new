import { Metadata } from 'next';
import AuthTestClient from './AuthTestClient';

export const metadata: Metadata = {
  title: 'Auth Test - Xavvi.fans',
  description: 'Test authentication functionality',
};

export default function TestAuthPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      <p className="mb-4">This page lets you test authentication functionality.</p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <AuthTestClient />
      </div>
    </div>
  );
} 