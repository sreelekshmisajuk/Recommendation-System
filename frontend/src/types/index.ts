export type NavTab = 
  | 'overview'
  | 'chat'
  | 'explore'
  | 'personalized'
  | 'similar'
  | 'profile'
  | 'preferences'
  | 'history'
  | 'saved'
  | 'insights'
  | 'performance'
  | 'explainability'
  | 'evaluation'
  | 'settings'
  | 'billing';

export type PublicPage = 
  | 'home'
  | 'about'
  | 'pricing'
  | 'blog'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookies';

export type AuthModalMode = 'login' | 'signup' | 'forgot' | 'verify' | null;

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  username?: string;
  role: string;
  plan: 'Developer Free' | 'Pro Tier' | 'Enterprise Mesh' | string;
  avatar?: string;
  createdAt?: string;
  authProvider?: string;
  accountStatus?: string;
}

export interface RecommendationPreferences {
  categories: string[];
  interests: string[];
  favoriteGenres: string[];
  preferredBrands: string[];
  priceRange: [number, number];
  recommendationMode: 'accuracy' | 'diversity';
  responseStyle: 'concise' | 'detailed';
}

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

export interface CartItem {
  item: Item;
  quantity: number;
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
  diversityPreference: 'high' | 'balanced' | 'low';
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
