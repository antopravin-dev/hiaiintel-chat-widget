import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[];
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(!message.isStreaming);

  useEffect(() => {
    if (!message.isStreaming) {
      setDisplayedText(message.content);
      setIsComplete(true);
      return;
    }

    // Streaming text effect
    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < message.content.length) {
        setDisplayedText((prev) => prev + message.content[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message.content, message.isStreaming]);

  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-br from-brand-cyan-500 to-brand-indigo-600 text-white rounded-br-sm shadow-lg'
            : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-bl-sm border border-neutral-200 dark:border-neutral-800'
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
              isUser
                ? 'text-white/70'
                : 'text-neutral-500 dark:text-neutral-500'
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

export default MessageBubble;
