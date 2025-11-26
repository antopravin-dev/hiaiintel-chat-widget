/**
 * MessageBubble Component
 * Single Responsibility: Displays a single message with streaming effect
 */

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  onAnimationComplete?: () => void;
}

export const MessageBubble = ({ message, onAnimationComplete }: MessageBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(!message.isStreaming);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!message.isStreaming) {
      setDisplayedText(message.content);
      setIsComplete(true);
      // Call completion immediately for non-streaming messages
      onAnimationComplete?.();
      return;
    }

    // If already animated once, show full text immediately
    if (hasAnimated.current) {
      setDisplayedText(message.content);
      setIsComplete(true);
      onAnimationComplete?.();
      return;
    }

    // Streaming text effect (only first time)
    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);
    hasAnimated.current = true;

    const interval = setInterval(() => {
      if (currentIndex < message.content.length) {
        setDisplayedText((prev) => prev + message.content[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        // Notify parent that animation is complete
        onAnimationComplete?.();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message.content, message.isStreaming, onAnimationComplete]);

  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2 items-end`}
    >
      {/* AI Avatar - only show for bot messages */}
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg"
        >
          {/* AI Sparkle Icon */}
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        </motion.div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-br-sm shadow-lg'
            : 'bg-neutral-800 text-neutral-100 rounded-bl-sm border border-neutral-700'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {displayedText}
          {!isComplete && message.isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="inline-block w-1.5 h-4 bg-current ml-0.5 align-middle"
            />
          )}
        </p>
        {isComplete && message.timestamp && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.2 }}
            className={`text-xs mt-1 block ${
              isUser ? 'text-white/70' : 'text-neutral-400'
            }`}
          >
            {(() => {
              try {
                const date = new Date(message.timestamp);
                if (isNaN(date.getTime())) return '';
                return date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                });
              } catch {
                return '';
              }
            })()}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};
