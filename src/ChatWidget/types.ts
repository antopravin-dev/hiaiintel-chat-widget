/**
 * Message interface for chat conversations
 * Single Responsibility: Defines the structure of a chat message
 */
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[];
}

/**
 * Configuration interface for the ChatWidget
 * Interface Segregation: Only includes necessary configuration options
 */
export interface ChatWidgetConfig {
  /** Primary color for the chat widget (default: indigo) */
  primaryColor?: string;
  /** Storage key for persisting messages (default: 'chat-widget-messages') */
  storageKey?: string;
  /** Initial greeting message */
  initialGreeting?: string;
  /** Whether to show suggestions */
  showSuggestions?: boolean;
  /** Custom responses data */
  responsesData?: ResponsesData;
}

/**
 * Props for the main ChatWidget component
 */
export interface ChatWidgetProps {
  config?: ChatWidgetConfig;
}

/**
 * Response item structure for AI responses
 */
export interface ResponseItem {
  response: string;
  keywords: string[];
  suggestions: string[];
}

/**
 * Structure for the responses data
 */
export interface ResponsesData {
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
