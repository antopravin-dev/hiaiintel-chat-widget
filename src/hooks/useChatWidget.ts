import { useState, useCallback } from 'react';
import type { ChatState, Message } from '../types';

export const useChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    messages: [],
  });

  const toggleChat = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  }, []);

  const clearMessages = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      messages: [],
    }));
  }, []);

  return {
    isOpen: chatState.isOpen,
    messages: chatState.messages,
    toggleChat,
    addMessage,
    clearMessages,
  };
};
