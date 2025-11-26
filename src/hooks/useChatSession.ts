import { useState, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import responsesData from '../data/responses.json';

const STORAGE_KEY = 'chat-widget-messages';
const INITIAL_GREETING_ID = 'initial-greeting';

interface ResponseItem {
  response: string;
  keywords: string[];
  suggestions: string[];
}

interface HaiIntelResponses {
  greetings: ResponseItem[];
  services: ResponseItem[];
  philosophy: ResponseItem[];
  vibrant_capital: ResponseItem[];
  technology: ResponseItem[];
  pricing: ResponseItem[];
  getting_started: ResponseItem[];
  industries: ResponseItem[];
  fallback: ResponseItem[];
}

const responses: HaiIntelResponses = responsesData as HaiIntelResponses;

export const useChatSession = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Failed to load messages from localStorage:', error);
        initializeGreeting();
      }
    } else {
      initializeGreeting();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const initializeGreeting = () => {
    const greetingItem = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    console.log('Greeting item:', greetingItem);
    console.log('Greeting response:', greetingItem.response);
    const greetingMessage: Message = {
      id: INITIAL_GREETING_ID,
      content: greetingItem.response,
      sender: 'bot',
      timestamp: new Date(),
      isStreaming: false,
      suggestions: greetingItem.suggestions,
    };
    console.log('Greeting message:', greetingMessage);
    setMessages([greetingMessage]);
  };

  const getRandomDelay = (): number => {
    // Random delay between 1000ms (1s) and 2000ms (2s)
    return Math.floor(Math.random() * 1000) + 1000;
  };

  const findBestMatch = (userMessage: string): { response: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    const words = lowerMessage.split(/\s+/);

    // Combine all categories for searching
    const allCategories = [
      ...responses.greetings,
      ...responses.services,
      ...responses.philosophy,
      ...responses.vibrant_capital,
      ...responses.technology,
      ...responses.pricing,
      ...responses.getting_started,
      ...responses.industries,
    ];

    // Score each response based on keyword matches
    const scores = allCategories.map((item) => {
      let score = 0;

      // Check each keyword against the message
      item.keywords.forEach((keyword) => {
        const keywordLower = keyword.toLowerCase();

        // Exact phrase match gets highest score
        if (lowerMessage.includes(keywordLower)) {
          score += 10;
        }

        // Word match gets medium score
        words.forEach((word) => {
          if (word === keywordLower || keywordLower.includes(word)) {
            score += 3;
          }
        });
      });

      return { item, score };
    });

    // Sort by score and get the best matches
    const sortedByScore = scores.sort((a, b) => b.score - a.score);
    const bestScore = sortedByScore[0]?.score || 0;

    // If we have a good match (score > 0), return one of the top matches
    if (bestScore > 0) {
      const topMatches = sortedByScore.filter((s) => s.score >= bestScore * 0.8);
      const randomMatch = topMatches[Math.floor(Math.random() * topMatches.length)];
      return {
        response: randomMatch.item.response,
        suggestions: randomMatch.item.suggestions,
      };
    }

    // No good match found, return fallback
    const fallbackItem = responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
    return {
      response: fallbackItem.response,
      suggestions: fallbackItem.suggestions,
    };
  };

  const generateAiResponse = useCallback(
    (userMessage: string): { response: string; suggestions: string[] } => {
      return findBestMatch(userMessage);
    },
    []
  );

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

        const { response, suggestions } = generateAiResponse(content);
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
    [isTyping, generateAiResponse]
  );

  const clearMessages = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    initializeGreeting();
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
};
