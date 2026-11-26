import { Item, Interaction, EvaluationResult, UserPreferences } from '../types';

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'item-101',
    title: 'Elden Ring: Shadow of the Erdtree',
    category: 'Video Games',
    genres: ['Action RPG', 'Open World', 'Dark Fantasy'],
    rating: 4.9,
    reviewCount: 38420,
    price: 59.99,
    description: 'An acclaimed dark fantasy action RPG featuring rich environmental storytelling, meticulous combat mechanics, and a vast seamless world.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    tags: ['Souls-like', 'Challenging', 'Masterpiece', 'Atmospheric'],
    relevanceScore: 98,
    similarityScore: 95,
    matchReason: 'Strong latent alignment with your gameplay history in Dark Souls III and Skyrim, specifically prioritizing deep exploration and challenging boss mechanics.',
    factors: [
      { name: 'Souls-like Combat Affinity', weight: 42 },
      { name: 'Vast Open-World Exploration', weight: 34 },
      { name: 'High Community Rating (4.9/5)', weight: 15 },
      { name: 'Studio Preference (FromSoftware)', weight: 9 }
    ]
  },
  {
    id: 'item-102',
    title: 'The Witcher 3: Wild Hunt (Complete Edition)',
    category: 'Video Games',
    genres: ['RPG', 'Story Rich', 'Open World'],
    rating: 4.9,
    reviewCount: 65200,
    price: 39.99,
    description: 'A benchmark story-driven open world RPG where choices ripple through moral shades of grey in a war-torn Slavic fantasy realm.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2022,
    tags: ['Narrative Masterpiece', 'High Fantasy', 'Choice & Consequence'],
    relevanceScore: 96,
    similarityScore: 92,
    matchReason: 'Matches your high preference for rich character-driven narratives and expansive morally ambiguous quest structures.',
    factors: [
      { name: 'Narrative Depth & Dialogue', weight: 45 },
      { name: 'Exploration & Lore Gathering', weight: 30 },
      { name: 'Collaborative Filtering Match', weight: 25 }
    ]
  },
  {
    id: 'item-103',
    title: 'Cyberpunk 2077: Phantom Liberty',
    category: 'Video Games',
    genres: ['Sci-Fi', 'Action RPG', 'First-Person'],
    rating: 4.7,
    reviewCount: 42100,
    price: 49.99,
    description: 'A gripping espionage-thriller expansion set in the lawless district of Dogtown in the vibrant, dystopian Night City metropolis.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    tags: ['Cyberpunk', 'Keanu Reeves', 'Spy Thriller', 'Immersive'],
    relevanceScore: 91,
    similarityScore: 88,
    matchReason: 'Shares key development team DNA with The Witcher 3 with cinematic quest direction and visceral high-tech builds.',
    factors: [
      { name: 'CD Projekt Red Design Patterns', weight: 40 },
      { name: 'Urban World Immersion', weight: 32 },
      { name: 'Character Progression Tree', weight: 28 }
    ]
  },
  {
    id: 'item-104',
    title: 'Baldur’s Gate 3',
    category: 'Video Games',
    genres: ['Turn-Based RPG', 'D&D', 'Co-op', 'Fantasy'],
    rating: 4.9,
    reviewCount: 51200,
    price: 59.99,
    description: 'A revolutionary party-based RPG set in the Forgotten Realms with peerless freedom of choice, tactical combat, and cinematic dialogues.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    tags: ['Game of the Year', 'Tactical', 'D&D 5e', 'Endless Replayability'],
    relevanceScore: 95,
    similarityScore: 89,
    matchReason: 'Top collaborative recommendation for users engaged with high-agency fantasy storytelling and complex strategic mechanics.',
    factors: [
      { name: 'Unmatched Player Agency', weight: 50 },
      { name: 'Rich Companion Relationships', weight: 30 },
      { name: 'High Critical Consensus', weight: 20 }
    ]
  },
  {
    id: 'item-105',
    title: 'Dune: Part Two (4K UHD Film Experience)',
    category: 'Movies & Media',
    genres: ['Sci-Fi', 'Epic Adventure', 'Drama'],
    rating: 4.8,
    reviewCount: 29400,
    price: 24.99,
    description: 'Denis Villeneuve’s breathtaking adaptation of Frank Herbert’s sci-fi epic, chronicling Paul Atreides’ mythic desert journey.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    tags: ['Cinematic Masterpiece', 'Hans Zimmer', 'Grand Scale', 'IMAX'],
    relevanceScore: 94,
    similarityScore: 87,
    matchReason: 'Recommended based on high overlap between sci-fi epic lore fans and worldbuilding-focused gamers.',
    factors: [
      { name: 'Worldbuilding & Scale', weight: 48 },
      { name: 'Audiovisual Production Value', weight: 32 },
      { name: 'Cross-Category Recommendation', weight: 20 }
    ]
  },
  {
    id: 'item-106',
    title: 'Oppenheimer (Collector’s Edition)',
    category: 'Movies & Media',
    genres: ['Biographical Drama', 'History', 'Thriller'],
    rating: 4.9,
    reviewCount: 45000,
    price: 22.99,
    description: 'Christopher Nolan’s pulse-pounding biographical drama about J. Robert Oppenheimer and the race against time in the Manhattan Project.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    tags: ['Academy Award Winner', 'High Tension', 'Practical FX'],
    relevanceScore: 89,
    similarityScore: 84,
    matchReason: 'High affinity score derived from complex non-linear narrative and intense intellectual pacing preference.',
    factors: [
      { name: 'Complex Non-Linear Pacing', weight: 40 },
      { name: 'Critical Acclaim Profile', weight: 35 },
      { name: 'Director Affinity (Nolan)', weight: 25 }
    ]
  },
  {
    id: 'item-107',
    title: 'Sony WH-1000XM5 Wireless ANC Headphones',
    category: 'Electronics',
    genres: ['Audio Equipment', 'Noise Cancelling', 'Wireless'],
    rating: 4.8,
    reviewCount: 19800,
    price: 398.00,
    description: 'Industry-leading noise cancelling with dual processors and 8 microphones for unparalleled calls and immersive Hi-Res wireless audio.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    tags: ['Hi-Res Audio', 'ANC Leader', '30-Hour Battery', 'Premium Comfort'],
    relevanceScore: 93,
    similarityScore: 86,
    matchReason: 'Optimal companion hardware recommendation for users with intense immersive gaming and cinematic listening behavior.',
    factors: [
      { name: 'Soundstage Immersion Complement', weight: 45 },
      { name: 'Category Cross-Sell Affinity', weight: 35 },
      { name: 'Hardware Review Score Tier', weight: 20 }
    ]
  },
  {
    id: 'item-108',
    title: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    category: 'Electronics',
    genres: ['Computer Peripherals', 'Custom Hardware', 'Productivity'],
    rating: 4.7,
    reviewCount: 8400,
    price: 199.00,
    description: 'Full-metal CNC machined 75% layout custom mechanical keyboard with QMK/VIA programmable knobs and gasket mount acoustic design.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    tags: ['Mechanical Switch', 'Hot-Swappable', 'Aluminum Body', 'Productivity'],
    relevanceScore: 88,
    similarityScore: 82,
    matchReason: 'Frequently co-purchased and engaged by tech-forward desktop setup and gaming enthusiasts.',
    factors: [
      { name: 'Desk Setup Co-occurrence', weight: 50 },
      { name: 'Tactile Feedback Preference', weight: 30 },
      { name: 'Enthusiast Tier Rating', weight: 20 }
    ]
  }
];

export const INITIAL_INTERACTIONS: Interaction[] = [
  {
    id: 'act-001',
    itemId: 'item-101',
    itemTitle: 'Elden Ring: Shadow of the Erdtree',
    category: 'Video Games',
    type: 'like',
    timestamp: '10 minutes ago',
    details: 'User liked recommendation from AI Chat'
  },
  {
    id: 'act-002',
    itemId: 'item-107',
    itemTitle: 'Sony WH-1000XM5 Wireless ANC Headphones',
    category: 'Electronics',
    type: 'save',
    timestamp: '45 minutes ago',
    details: 'Added to Saved Items from Explore'
  },
  {
    id: 'act-003',
    itemId: 'item-102',
    itemTitle: 'The Witcher 3: Wild Hunt',
    category: 'Video Games',
    type: 'view',
    timestamp: '2 hours ago',
    details: 'Viewed item details modal'
  },
  {
    id: 'act-004',
    itemId: 'item-105',
    itemTitle: 'Dune: Part Two',
    category: 'Movies & Media',
    type: 'search',
    timestamp: 'Yesterday at 8:40 PM',
    details: 'Searched query: "sci-fi grand scale cinematic lore"'
  },
  {
    id: 'act-005',
    itemId: 'item-104',
    itemTitle: 'Baldur’s Gate 3',
    category: 'Video Games',
    type: 'view',
    timestamp: '2 days ago',
    details: 'Viewed via Personalized Recommendations'
  }
];

export const INITIAL_PREFERENCES: UserPreferences = {
  categories: ['Video Games', 'Movies & Media', 'Electronics'],
  favoriteGenres: ['Action RPG', 'Open World', 'Sci-Fi', 'Dark Fantasy', 'Narrative-Rich'],
  preferredBrands: ['CD Projekt Red', 'FromSoftware', 'Sony', 'Denis Villeneuve', 'A24'],
  priceRange: [15, 450],
  interests: ['Environmental Storytelling', 'High Immersion', 'Atmospheric Audio', 'Complex Lore'],
  dislikedCategories: ['Hyper-casual mobile games', 'Low-budget sequels'],
  diversityPreference: 'balanced'
};

export const INITIAL_EVALUATIONS: EvaluationResult[] = [
  {
    id: 'eval-2024-001',
    model: 'RecLM-uni (Prefix-Tree Constrained)',
    dataset: 'Steam Game Catalog (2024)',
    hitRate5: 0.742,
    hitRate10: 0.884,
    ndcg5: 0.612,
    ndcg10: 0.729,
    mrr: 0.584,
    precision: 0.812,
    recall: 0.884,
    latencyMs: 142,
    hallucinationRate: 0.0,
    timestamp: '2026-11-25 14:32',
    status: 'completed'
  },
  {
    id: 'eval-2024-002',
    model: 'InteRecAgent (Gemini 3.1 Flash + SQL Tools)',
    dataset: 'Multi-Domain E-Commerce Benchmark',
    hitRate5: 0.768,
    hitRate10: 0.892,
    ndcg5: 0.635,
    ndcg10: 0.748,
    mrr: 0.601,
    precision: 0.845,
    recall: 0.892,
    latencyMs: 185,
    hallucinationRate: 0.01,
    timestamp: '2026-11-26 09:15',
    status: 'completed'
  },
  {
    id: 'eval-2024-003',
    model: 'RecLM-emb (Dense Representation 10-Task)',
    dataset: 'MovieLens 1M Dense Retrieval',
    hitRate5: 0.721,
    hitRate10: 0.857,
    ndcg5: 0.598,
    ndcg10: 0.710,
    mrr: 0.562,
    precision: 0.798,
    recall: 0.857,
    latencyMs: 48,
    hallucinationRate: 0.0,
    timestamp: '2026-11-24 18:20',
    status: 'completed'
  },
  {
    id: 'eval-2024-004',
    model: 'RecExplainer-H (Hybrid Surrogate LLM)',
    dataset: 'Amazon Video Games v3 Explanations',
    hitRate5: 0.715,
    hitRate10: 0.839,
    ndcg5: 0.584,
    ndcg10: 0.698,
    mrr: 0.548,
    precision: 0.782,
    recall: 0.839,
    latencyMs: 220,
    hallucinationRate: 0.02,
    timestamp: '2026-11-23 11:45',
    status: 'completed'
  }
];
