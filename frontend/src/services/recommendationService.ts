import { Item, UserPreferences } from '../types';
import { INITIAL_ITEMS } from '../data/mockData';
import { request } from './api';

export const recommendationService = {
  async getExploreItems(params?: {
    search?: string;
    category?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy?: 'relevance' | 'rating' | 'priceAsc' | 'priceDesc' | 'newest';
  }): Promise<Item[]> {
    // Attempt real backend if configured
    const res = await request<Item[]>(`/items?${new URLSearchParams(params as any).toString()}`);
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }

    // High fidelity enterprise demo implementation
    await new Promise((r) => setTimeout(r, 200));
    let items = [...INITIAL_ITEMS];

    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (params?.category && params.category !== 'All') {
      items = items.filter((it) => it.category === params.category);
    }

    if (params?.minRating) {
      items = items.filter((it) => it.rating >= params.minRating!);
    }

    if (params?.maxPrice) {
      items = items.filter((it) => (it.price || 0) <= params.maxPrice!);
    }

    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'rating':
          items.sort((a, b) => b.rating - a.rating);
          break;
        case 'priceAsc':
          items.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'priceDesc':
          items.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'newest':
          items.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
          break;
        case 'relevance':
        default:
          items.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
          break;
      }
    }

    return items;
  },

  async getPersonalizedRecommendations(
    preferences?: UserPreferences,
    section: 'forYou' | 'history' | 'popular' | 'discoveries' = 'forYou'
  ): Promise<Item[]> {
    const res = await request<Item[]>(`/recommendations?section=${section}`);
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }

    await new Promise((r) => setTimeout(r, 250));
    const items = [...INITIAL_ITEMS];

    switch (section) {
      case 'history':
        return items.filter((i) => ['item-101', 'item-102', 'item-104'].includes(i.id));
      case 'popular':
        return [...items].sort((a, b) => b.reviewCount - a.reviewCount);
      case 'discoveries':
        return items.filter((i) => ['item-105', 'item-107', 'item-108'].includes(i.id));
      case 'forYou':
      default:
        return [...items].sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }
  },

  async getSimilarItems(sourceItemId: string): Promise<{ sourceItem: Item; similarItems: Item[] }> {
    const res = await request<{ sourceItem: Item; similarItems: Item[] }>(`/similar/${sourceItemId}`);
    if (res.success && res.data) {
      return res.data;
    }

    await new Promise((r) => setTimeout(r, 200));
    const sourceItem = INITIAL_ITEMS.find((it) => it.id === sourceItemId) || INITIAL_ITEMS[0];
    const similarItems = INITIAL_ITEMS.filter((it) => it.id !== sourceItem.id)
      .map((it) => ({
        ...it,
        similarityScore: Math.max(70, Math.min(99, Math.round(96 - Math.random() * 18)))
      }))
      .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));

    return { sourceItem, similarItems };
  }
};
