export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[];
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
}
