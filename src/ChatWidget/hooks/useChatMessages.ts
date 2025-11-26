/**
 * useChatMessages Hook
 * Single Responsibility: Manages chat messages state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import type { Message, ResponsesData } from '../types';
import { MessageStorage } from '../services/MessageStorage';
import { MessageMatcher } from '../services/MessageMatcher';

const INITIAL_GREETING_ID = 'initial-greeting';

interface UseChatMessagesProps {
  storageKey?: string;
  responsesData: ResponsesData;
}

export const useChatMessages = ({ storageKey, responsesData }: UseChatMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const storage = new MessageStorage(storageKey);
  const matcher = new MessageMatcher(responsesData);

  // Initialize greeting message
  const initializeGreeting = useCallback(() => {
    const greetingItem =
      responsesData.greetings[Math.floor(Math.random() * responsesData.greetings.length)];
    const greetingMessage: Message = {
      id: INITIAL_GREETING_ID,
      content: greetingItem.response,
      sender: 'bot',
      timestamp: new Date(),
      isStreaming: false,
      suggestions: greetingItem.suggestions,
    };
    setMessages([greetingMessage]);
  }, [responsesData]);

  // Load messages from storage on mount
  useEffect(() => {
    const savedMessages = storage.loadMessages();
    if (savedMessages) {
      setMessages(savedMessages);
    } else {
      initializeGreeting();
    }
  }, []);

  // Save messages to storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      storage.saveMessages(messages);
    }
  }, [messages]);

  // Generate random delay for typing indicator
  const getRandomDelay = (): number => {
    return Math.floor(Math.random() * 1000) + 1000;
  };

  // Send a message
  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isTyping) return;

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
        isStreaming: false,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Show typing indicator
      setIsTyping(true);

      // Simulate AI response with random delay
      const delay = getRandomDelay();
      setTimeout(() => {
        setIsTyping(false);

        const { response, suggestions } = matcher.findBestMatch(content);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: response,
          sender: 'bot',
          timestamp: new Date(),
          isStreaming: true,
          suggestions,
        };

        setMessages((prev) => [...prev, botMessage]);
      }, delay);
    },
    [isTyping, matcher]
  );

  // Clear all messages
  const clearMessages = useCallback(() => {
    storage.clearMessages();
    initializeGreeting();
  }, [initializeGreeting]);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
};
