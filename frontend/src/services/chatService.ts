import { ChatMessage, Item } from '../types';
import { INITIAL_ITEMS } from '../data/mockData';
import { request } from './api';

export const chatService = {
  async sendMessage(
    userText: string,
    history: ChatMessage[],
    options: {
      mode: 'accuracy' | 'diversity';
      style: 'concise' | 'detailed';
    }
  ): Promise<ChatMessage> {
    const startTime = performance.now();

    // 1. Send query to NexusRec Python Backend (Gemini-connected)
    try {
      const backendRes = await request<any>('/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userText,
          history: history.slice(-6).map((h) => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: h.text })),
          mode: options.mode,
          style: options.style
        })
      });

      if (backendRes.success && backendRes.data?.data?.text) {
        const text: string = backendRes.data.data.text;
        const modelUsed: string = backendRes.data.data.modelUsed || 'gemini-3.1-flash-lite';
        const followUps: string[] = backendRes.data.data.followUpQuestions || [];

        // Match items mentioned or relevant to the text
        const matchedItems = INITIAL_ITEMS.filter((item) => {
          const lowerText = text.toLowerCase();
          const lowerTitle = item.title.toLowerCase();
          const firstWord = lowerTitle.split(' ')[0];
          return lowerText.includes(lowerTitle) || (firstWord.length > 3 && lowerText.includes(firstWord));
        });

        // Ensure at least 2-3 relevant items are shown as rich visual cards
        let finalItems: Item[] = matchedItems;
        if (finalItems.length === 0) {
          const lowerUser = userText.toLowerCase();
          if (lowerUser.includes('movie') || lowerUser.includes('film') || lowerUser.includes('dune')) {
            finalItems = [INITIAL_ITEMS[4], INITIAL_ITEMS[5]];
          } else if (lowerUser.includes('headphone') || lowerUser.includes('keyboard') || lowerUser.includes('gear')) {
            finalItems = [INITIAL_ITEMS[6], INITIAL_ITEMS[7]];
          } else {
            finalItems = options.mode === 'diversity' 
              ? [INITIAL_ITEMS[0], INITIAL_ITEMS[4], INITIAL_ITEMS[6]]
              : [INITIAL_ITEMS[0], INITIAL_ITEMS[1], INITIAL_ITEMS[2]];
          }
        }

        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text,
          items: finalItems,
          followUpQuestions: followUps.length > 0 ? followUps : [
            'Would you like recommendations within a specific budget?',
            'Show me more items from this specific genre',
            'Find alternatives with different mechanics'
          ],
          mode: options.mode,
          style: options.style,
          latencyMs: backendRes.latencyMs || Math.round(performance.now() - startTime),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    } catch (e) {
      console.warn('Backend request failed, falling back to simulated CRS engine:', e);
    }

    // 2. High-fidelity client-side intelligence fallback
    await new Promise((resolve) => setTimeout(resolve, 600));
    const latencyMs = Math.round(performance.now() - startTime);

    const lowerQuery = userText.toLowerCase();
    let selectedItems: Item[] = [];
    let assistantReply = '';
    let followUps: string[] = [];

    if (lowerQuery.includes('game') || lowerQuery.includes('rpg') || lowerQuery.includes('witcher') || lowerQuery.includes('skyrim') || lowerQuery.includes('elden')) {
      selectedItems = [INITIAL_ITEMS[0], INITIAL_ITEMS[1], INITIAL_ITEMS[2]];
      assistantReply =
        options.style === 'detailed'
          ? `Based on your preference for open-world high-agency adventures, here are 3 top-tier recommendations. In **${options.mode.toUpperCase()}** mode, we prioritized ${
              options.mode === 'accuracy' ? 'direct mechanical and thematic affinity with Dark Souls and The Witcher' : 'cross-genre diversity spanning fantasy to dystopian sci-fi'
            }:`
          : `Here are 3 top matches matching your gaming history:`;
      followUps = [
        'Would you like combat to be more tactical or action-heavy?',
        'Do you prefer dark fantasy or cyberpunk sci-fi settings?',
        'Show me games under $40'
      ];
    } else if (lowerQuery.includes('movie') || lowerQuery.includes('film') || lowerQuery.includes('watch') || lowerQuery.includes('dune') || lowerQuery.includes('oppenheimer')) {
      selectedItems = [INITIAL_ITEMS[4], INITIAL_ITEMS[5]];
      assistantReply =
        options.style === 'detailed'
          ? `Here are cinematic experiences with high intellectual pacing and grand worldbuilding tailored to your taste profile:`
          : `Recommended cinematic titles for you:`;
      followUps = ['Do you prefer sci-fi spectacles or historical dramas?', 'Show films directed by Christopher Nolan'];
    } else if (lowerQuery.includes('headphone') || lowerQuery.includes('keyboard') || lowerQuery.includes('tech') || lowerQuery.includes('electronics')) {
      selectedItems = [INITIAL_ITEMS[6], INITIAL_ITEMS[7]];
      assistantReply =
        options.style === 'detailed'
          ? `Here are enthusiast-grade hardware peripherals aligned with your setup immersion criteria:`
          : `Top hardware recommendations:`;
      followUps = ['Show wireless noise-cancelling options only', 'Filter peripherals under $200'];
    } else {
      selectedItems = options.mode === 'diversity' 
        ? [INITIAL_ITEMS[0], INITIAL_ITEMS[4], INITIAL_ITEMS[6]] 
        : [INITIAL_ITEMS[0], INITIAL_ITEMS[1], INITIAL_ITEMS[3]];
      assistantReply =
        options.style === 'detailed'
          ? `I analyzed your interaction history and compiled these recommendations spanning your top interest vectors:`
          : `Here are curated recommendations for you:`;
      followUps = [
        'Recommend highly rated items only (4.8+)',
        'Find products similar to my previous choices',
        'Suggest something new based on my preferences'
      ];
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: assistantReply,
      items: selectedItems,
      followUpQuestions: followUps,
      mode: options.mode,
      style: options.style,
      latencyMs,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};
