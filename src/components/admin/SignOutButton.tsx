'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { useAuth } from '@/app/auth-provider';

interface SignOutButtonProps {
  className?: string;
}

export default function SignOutButton({ className = '' }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
      setIsSigningOut(false);
    }
  };
  
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSignOut}
      isLoading={isSigningOut}
      className={className}
    >
      <FiLogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
} 