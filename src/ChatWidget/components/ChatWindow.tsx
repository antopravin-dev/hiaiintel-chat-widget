import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { SuggestionChips } from './SuggestionChips';
import type { Message } from '../types';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  onClearMessages: () => void;
  onMarkMessageComplete: (messageId: string) => void;
}

export const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  onClearMessages,
  onMarkMessageComplete,
}: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState<{ [key: string]: boolean }>({});

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Track whether we should auto-scroll on new messages
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Ensure we scroll after DOM/layout updates
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // If user is within 80px of the bottom, keep auto-scroll enabled.
    // If they scroll higher than that, disable auto-scroll.
    shouldAutoScrollRef.current = distanceFromBottom < 80;
  };

  // Auto-scroll when messages / typing change, but only if user is near bottom
  useEffect(() => {
    if (!isOpen) return;
    if (!shouldAutoScrollRef.current) return;

    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // When chat opens, force-enable auto-scroll and scroll to bottom once
  useEffect(() => {
    if (!isOpen) return;

    shouldAutoScrollRef.current = true;

    const timer = setTimeout(() => {
      scrollToBottom();
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickSuggestions = [
    'What services do you offer?',
    'Tell me about your AI philosophy',
    'How do I get started?',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop - only show on mobile screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-30 sm:hidden"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{
              opacity: 0,
              y: '100%', // Mobile: slide from bottom
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: '100%', // Mobile: slide to bottom
              scale: 0.95,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2, // Slight delay to sync with button flip
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] z-40 p-0 sm:p-0"
          >
            <div className="h-full w-full flex flex-col bg-neutral-900 rounded-none sm:rounded-2xl shadow-2xl border-0 sm:border sm:border-neutral-800 overflow-hidden safe-top">
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-neutral-900">
                <div className="flex items-center gap-3 flex-1">
                  <img src="/haiintel-logo.svg" alt="HaiIntel" className="h-6 w-auto" />
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      HaiIntel Assistant
                    </h3>
                    <p className="text-xs text-neutral-400">AI-powered intelligence</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClearMessages}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    aria-label="Clear conversation"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    aria-label="Close chat"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 bg-neutral-950"
              >
                {messages.length === 0 && !isTyping ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-xl">
                      <svg
                        className="w-10 h-10 text-white"
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
                    </div>
                    <h4 className="text-lg font-semibold text-white">Welcome to HaiIntel</h4>
                    <p className="text-sm text-neutral-400 max-w-xs">
                      Your AI-powered intelligence assistant. Ask me anything to get started.
                    </p>
                    <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
                      {quickSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => onSendMessage(suggestion)}
                          className="px-4 py-2 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      const shouldShowSuggestions =
                        message.sender === 'bot' &&
                        message.suggestions &&
                        message.suggestions.length > 0 &&
                        isLastMessage &&
                        !isTyping &&
                        showSuggestions[message.id];

                      return (
                        <div key={message.id}>
                          <MessageBubble
                            message={message}
                            onAnimationComplete={() => {
                              if (message.isStreaming) {
                                onMarkMessageComplete(message.id);
                              }
                              setShowSuggestions((prev) => {
                                if (prev[message.id]) return prev;
                                return {
                                  ...prev,
                                  [message.id]: true,
                                };
                              });
                              scrollToBottom();
                            }}
                            onStreamingUpdate={() => {
                              // Only auto-scroll while user is near bottom
                              if (shouldAutoScrollRef.current) {
                                scrollToBottom();
                              }
                            }}
                          />
                          {shouldShowSuggestions && (
                            <SuggestionChips
                              suggestions={message.suggestions || []}
                              onSuggestionClick={onSendMessage}
                            />
                          )}
                        </div>
                      );
                    })}
                    {isTyping && <TypingIndicator />}
                  </>
                )}
              </div>

              {/* Input */}
              <div
                className="px-4 sm:px-6 py-3 sm:py-4 border-t border-neutral-800 bg-neutral-900"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
              >
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm sm:text-base"
                    rows={1}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="px-4 sm:px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-medium transition-colors text-sm sm:text-base"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
