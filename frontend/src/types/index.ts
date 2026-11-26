export type NavTab = 
  | 'overview'
  | 'chat'
  | 'explore'
  | 'personalized'
  | 'similar'
  | 'preferences'
  | 'history'
  | 'saved'
  | 'insights'
  | 'performance'
  | 'explainability'
  | 'evaluation'
  | 'settings';

export interface Item {
  id: string;
  title: string;
  category: string;
  genres: string[];
  rating: number;
  reviewCount: number;
  price?: number;
  description: string;
  image: string;
  releaseYear?: number;
  tags: string[];
  relevanceScore?: number;
  similarityScore?: number;
  matchReason?: string;
  factors?: { name: string; weight: number }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  items?: Item[];
  followUpQuestions?: string[];
  mode?: 'accuracy' | 'diversity';
  style?: 'concise' | 'detailed';
  latencyMs?: number;
}

export interface Interaction {
  id: string;
  itemId: string;
  itemTitle: string;
  category: string;
  type: 'view' | 'like' | 'dislike' | 'save' | 'search';
  timestamp: string;
  details?: string;
}

export interface UserPreferences {
  categories: string[];
  favoriteGenres: string[];
  preferredBrands: string[];
  priceRange: [number, number];
  interests: string[];
  dislikedCategories: string[];
  diversityPreference: 'accuracy' | 'balanced' | 'diversity';
}

export interface MetricCard {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  timeframe: string;
  subtext?: string;
}

export interface EvaluationResult {
  id: string;
  model: string;
  dataset: string;
  hitRate5: number;
  hitRate10: number;
  ndcg5: number;
  ndcg10: number;
  mrr: number;
  precision: number;
  recall: number;
  latencyMs: number;
  hallucinationRate: number;
  timestamp: string;
  status: 'completed' | 'running' | 'failed';
}
