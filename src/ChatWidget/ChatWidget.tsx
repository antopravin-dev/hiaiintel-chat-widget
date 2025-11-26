/**
 * ChatWidget Component
 * Single Responsibility: Main component that orchestrates the chat widget
 * Open/Closed: Configurable via props, closed for modification
 */

import { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatLauncher } from './components/ChatLauncher';
import { useChatMessages } from './hooks/useChatMessages';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import type { ChatWidgetProps } from './types';
import defaultResponses from '../data/responses.json';

export const ChatWidget = ({ config }: ChatWidgetProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Lock body scroll when chat is open
  useLockBodyScroll(isChatOpen);

  const { messages, isTyping, sendMessage, clearMessages, markMessageComplete } = useChatMessages({
    storageKey: config?.storageKey,
    responsesData: config?.responsesData || defaultResponses,
  });

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatWindow
        isOpen={isChatOpen}
        onClose={toggleChat}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={sendMessage}
        onClearMessages={clearMessages}
        onMarkMessageComplete={markMessageComplete}
      />
      <ChatLauncher onClick={toggleChat} isOpen={isChatOpen} />
    </>
  );
};
