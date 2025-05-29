'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [imageError, setImageError] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {/* Your logo */}
            {!imageError ? (
              <Image
                src="/xavvi_logo.png" 
                alt="Xavvi Logo" 
                width={177} 
                height={50} 
                className="object-contain h-[50px] w-auto"
                priority
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('Logo loaded successfully');
                }}
              />
            ) : (
              <div className="h-[50px] px-4 bg-gray-200 flex items-center justify-center text-pink-600 font-bold">
                xavvi.fans
              </div>
            )}
          </Link>
          
          <nav className="flex space-x-6 items-center">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-pink-600 ${pathname === '/' ? 'font-medium text-pink-600' : ''}`}
            >
              Influencers
            </Link>
            
            <Link 
              href="/login" 
              className={`flex items-center gap-1 text-gray-600 hover:text-pink-600 ${pathname === '/login' ? 'font-medium text-pink-600' : ''}`}
            >
              <FiUser className="w-4 h-4" />
              {isAdmin ? 'Dashboard' : 'Admin Login'}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 