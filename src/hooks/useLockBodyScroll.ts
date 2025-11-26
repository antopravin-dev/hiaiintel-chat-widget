import { useLayoutEffect } from 'react';

/**
 * useLockBodyScroll Hook
 * Prevents body scrolling when active (e.g., when modal or chat is open)
 * Uses useLayoutEffect to prevent flash of scrollable content
 */
export const useLockBodyScroll = (lock: boolean = true) => {
  useLayoutEffect(() => {
    if (!lock) return;

    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
};
