/**
 * ChatLauncher Component
 * Single Responsibility: Displays the floating action button to toggle chat
 * Features:
 * - Coin-flip 3D animation on open/close
 * - Pulse glow effect when idle
 * - Hides icon when open
 * - Fully responsive with Tailwind
 */

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChatLauncherProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatLauncher = ({ onClick, isOpen }: ChatLauncherProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* CSS keyframes for pulse-glow animation */}
      <style>
        {`
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
            }
            50% {
              box-shadow: 0 8px 32px rgba(79, 70, 229, 0.5),
                0 0 40px rgba(79, 70, 229, 0.3);
            }
          }
          .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <button
        onClick={onClick}
        className={`
          fixed bottom-5 right-5 sm:bottom-6 sm:right-6
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          bg-gradient-to-br from-indigo-600 to-indigo-500
          border-2 border-indigo-700
          flex items-center justify-center
          focus:outline-none focus:ring-4 focus:ring-indigo-400/30
          z-50
          ${!isOpen ? 'animate-pulse-glow hover:scale-110' : ''}
          ${isOpen ? 'pointer-events-none' : ''}
          active:scale-95
          select-none
          [transform-style:preserve-3d]
          touch-manipulation
          [-webkit-tap-highlight-color:transparent]
        `}
        style={{
          perspective: '800px',
          transformOrigin: 'center',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out, box-shadow 0.3s ease-out',
          transform: isOpen
            ? 'rotateY(180deg) rotateX(180deg) scale(0.6)'
            : 'rotateY(0deg) rotateX(0deg) scale(1)',
          opacity: isOpen ? 0 : 1,
          boxShadow: isOpen ? 'none' : undefined,
          animation: isOpen ? 'none' : undefined,
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        type="button"
      >
        {/* Chat Icon - only show when closed */}
        <AnimatePresence mode="wait">
          {!isOpen && mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-7 h-7 sm:w-8 sm:h-8"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};
