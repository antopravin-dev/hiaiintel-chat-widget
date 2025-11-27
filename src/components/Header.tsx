/**
 * Header Component
 * Navigation header with logo and links
 */

import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-neutral-900/80 border-b border-neutral-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <img
            src="/haiintel-logo.svg"
            alt="HaiIntel"
            className="h-12 sm:h-14 md:h-16 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              isActive('/')
                ? 'bg-indigo-600 text-white'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Home
          </Link>
          <Link
            to="/integration"
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              isActive('/integration')
                ? 'bg-indigo-600 text-white'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Integration
          </Link>
        </nav>
      </div>
    </header>
  );
};
