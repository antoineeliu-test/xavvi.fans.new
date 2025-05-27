'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import { Session } from '@supabase/supabase-js';

interface AuthStatusData {
  session: Session | null;
}

interface ApiResponseData {
  status?: string;
  serverSession?: unknown;
  environmentInfo?: unknown;
  error?: string;
  message?: string;
}

export default function AuthTestClient() {
  const [authStatus, setAuthStatus] = useState<AuthStatusData | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Check client-side auth status
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      setAuthStatus(data);
    }
    
    checkAuth();
  }, []);
  
  // Test server-side auth status
  const testServerAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-auth');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error testing auth:', error);
      setApiResponse({ error: 'Failed to fetch' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  
  const goToLogin = () => {
    router.push('/login');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Client-side Auth Status</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-xs">
          {JSON.stringify(authStatus, null, 2)}
        </pre>
      </div>
      
      <div className="flex space-x-4">
        <Button onClick={testServerAuth} isLoading={isLoading}>
          Test Server Auth
        </Button>
        
        {authStatus?.session ? (
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Button variant="outline" onClick={goToLogin}>
            Go to Login
          </Button>
        )}
      </div>
      
      {apiResponse && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Server Response</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-xs">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 