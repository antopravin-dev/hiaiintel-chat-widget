/**
 * MessageMatcher Service
 * Single Responsibility: Handles matching user messages to appropriate responses
 * Dependency Inversion: Depends on ResponsesData interface, not concrete implementation
 */

import type { ResponseItem, ResponsesData } from '../types';

export class MessageMatcher {
  private responsesData: ResponsesData;

  constructor(responsesData: ResponsesData) {
    this.responsesData = responsesData;
  }

  /**
   * Finds the best matching response for a user message
   */
  findBestMatch(userMessage: string): { response: string; suggestions: string[] } {
    const lowerMessage = userMessage.toLowerCase();
    const words = lowerMessage.split(/\s+/);

    const allCategories = this.getAllCategories();
    const scores = this.scoreResponses(allCategories, lowerMessage, words);

    return this.selectBestResponse(scores);
  }

  /**
   * Combines all response categories into a single array
   */
  private getAllCategories(): ResponseItem[] {
    return [
      ...this.responsesData.greetings,
      ...this.responsesData.services,
      ...this.responsesData.philosophy,
      ...this.responsesData.vibrant_capital,
      ...this.responsesData.technology,
      ...this.responsesData.pricing,
      ...this.responsesData.getting_started,
      ...this.responsesData.industries,
    ];
  }

  /**
   * Scores each response based on keyword matches
   */
  private scoreResponses(
    categories: ResponseItem[],
    lowerMessage: string,
    words: string[]
  ): Array<{ item: ResponseItem; score: number }> {
    return categories.map((item) => {
      let score = 0;

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
  }

  /**
   * Selects the best response from scored results
   */
  private selectBestResponse(
    scores: Array<{ item: ResponseItem; score: number }>
  ): { response: string; suggestions: string[] } {
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
    const fallbackItem =
      this.responsesData.fallback[
        Math.floor(Math.random() * this.responsesData.fallback.length)
      ];
    return {
      response: fallbackItem.response,
      suggestions: fallbackItem.suggestions,
    };
  }
}
