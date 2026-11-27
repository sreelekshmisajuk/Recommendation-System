import { request } from './api';

export interface ServiceHealthInfo {
  name: string;
  status: 'Operational' | 'Degraded' | 'Offline' | 'Not Configured' | 'Unknown';
  model?: string;
  endpoint?: string;
  description?: string;
  itemsCount?: number;
  registeredUsers?: number;
}

export interface SystemHealthResponse {
  status: string;
  backend: string;
  timestamp: string;
  uptimeSeconds: number;
  services: {
    llmProvider: ServiceHealthInfo;
    recommendationAgent: ServiceHealthInfo;
    retrievalEngine: ServiceHealthInfo;
    generativeRecommender: ServiceHealthInfo;
    modelExplainer: ServiceHealthInfo;
    database: ServiceHealthInfo;
    evaluationService: ServiceHealthInfo;
    [key: string]: ServiceHealthInfo;
  };
}

export interface RecommendationLogEntry {
  id: string;
  timestamp: string;
  timeDisplay: string;
  userEmail: string;
  userId: string;
  query: string;
  mode: string;
  style: string;
  resultsCount: number;
  latencyMs: number;
  status: 'success' | 'failed';
  modelUsed?: string;
  error?: string;
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  service: string;
}

export interface DashboardSummaryResponse {
  success: boolean;
  timestamp: string;
  kpis: {
    totalRequests: number;
    activeUsers: number;
    totalItemsRetrieved: number;
    savedItemsCount: number;
    averageLatencyMs: number | null;
    successRate: number | null;
    catalogSize: number;
  };
  categoryDistribution: Array<{
    name: string;
    count: number;
  }>;
  recentLogs: RecommendationLogEntry[];
  recentEvents: SystemEvent[];
  modelSummary: {
    modelName: string;
    dataset: string;
    hitRate10: number | null;
    ndcg10: number | null;
    mrr: number | null;
    isEvaluated: boolean;
  };
}

export const dashboardService = {
  getSystemHealth: async (): Promise<SystemHealthResponse | null> => {
    try {
      const res = await request<SystemHealthResponse>('/health');
      if (res.success && res.data) {
        return res.data;
      }
      return null;
    } catch (err) {
      console.warn('Failed to fetch system health:', err);
      return null;
    }
  },

  getSummary: async (): Promise<DashboardSummaryResponse | null> => {
    try {
      const res = await request<DashboardSummaryResponse>('/api/dashboard/summary');
      if (res.success && res.data) {
        return res.data;
      }
      return null;
    } catch (err) {
      console.warn('Failed to fetch dashboard summary:', err);
      return null;
    }
  }
};
