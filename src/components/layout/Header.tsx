'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser } from 'react-icons/fi';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Your logo */}
            <div className="flex items-center">
              <img 
                src="/xavvi_small_logo.png" 
                alt="Xavvi Logo" 
                width="40" 
                height="40" 
                className="object-contain w-10 h-10"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                }}
              />
            </div>
            
            {/* Brand text */}
            <span className="text-xl font-bold text-pink-600 hover:text-pink-700">
              xavvi.fans
            </span>
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