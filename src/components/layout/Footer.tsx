'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser } from 'react-icons/fi';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname === '/login';
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <nav className="flex items-center">
            {isAdmin || isLogin ? (
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors duration-200"
              >
                <span className="font-medium">Gallery</span>
              </Link>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-1 text-gray-300 hover:text-pink-400"
              >
                <FiUser className="w-4 h-4" />
                <span className="font-medium">Admin Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
} 