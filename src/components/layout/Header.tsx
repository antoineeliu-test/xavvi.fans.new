'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser } from 'react-icons/fi';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">
              xavvi.fans
            </div>
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