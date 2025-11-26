/**
 * Header Component
 * Navigation header with logo and links
 */

import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-neutral-900/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img
            src="/haiintel-logo.svg"
            alt="HaiIntel"
            className="h-14 sm:h-16 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive('/')
                ? 'bg-indigo-600 text-white'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Home
          </Link>
          <Link
            to="/integration"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
