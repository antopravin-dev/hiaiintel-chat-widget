/**
 * MessageStorage Service
 * Single Responsibility: Handles persistence of chat messages to localStorage
 * Open/Closed: Can be extended to support other storage mechanisms
 */

import type { Message } from '../types';

export class MessageStorage {
  private storageKey: string;

  constructor(storageKey: string = 'chat-widget-messages') {
    this.storageKey = storageKey;
  }

  /**
   * Loads messages from storage
   */
  loadMessages(): Message[] | null {
    try {
      const savedMessages = localStorage.getItem(this.storageKey);
      if (!savedMessages) {
        return null;
      }

      const parsed = JSON.parse(savedMessages);
      // Convert timestamp strings back to Date objects
      return parsed.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    } catch (error) {
      console.error('Failed to load messages from localStorage:', error);
      return null;
    }
  }

  /**
   * Saves messages to storage
   */
  saveMessages(messages: Message[]): void {
    try {
      if (messages.length > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Failed to save messages to localStorage:', error);
    }
  }

  /**
   * Clears all messages from storage
   */
  clearMessages(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear messages from localStorage:', error);
    }
  }
}
