import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';
import { useChatSession } from '../hooks/useChatSession';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const { messages, isTyping, sendMessage, clearMessages } = useChatSession();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-96 h-[600px] z-40"
        >
          <div className="h-full flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Chat Assistant
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Always here to help
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearMessages}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Clear conversation"
                >
                  <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && !isTyping ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Welcome to Chat
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
                    Start a conversation by asking a question or choosing a suggestion below.
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
                    <button
                      onClick={() => sendMessage('What services do you offer?')}
                      className="px-4 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      What services do you offer?
                    </button>
                    <button
                      onClick={() => sendMessage('Tell me about your AI philosophy')}
                      className="px-4 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      Tell me about your AI philosophy
                    </button>
                    <button
                      onClick={() => sendMessage('How do I get started?')}
                      className="px-4 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      How do I get started?
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      <MessageBubble message={message} />
                      {message.sender === 'bot' &&
                        message.suggestions &&
                        message.suggestions.length > 0 &&
                        index === messages.length - 1 &&
                        !isTyping && (
                          <SuggestionChips
                            suggestions={message.suggestions}
                            onSuggestionClick={sendMessage}
                          />
                        )}
                    </div>
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-2 items-center">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="flex-shrink-0 h-[42px] w-[42px] flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed text-white transition-colors"
                  aria-label="Send message"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
