/**
 * Centralized API Client Layer for RecAI Frontend
 * Configurable via VITE_API_BASE_URL, with seamless fallback to simulated local enterprise backend engine.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  latencyMs?: number;
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const startTime = performance.now();
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      data,
      success: true,
      latencyMs
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      data: null as any,
      success: false,
      message: err?.message || 'Network request failed',
      latencyMs
    };
  }
}
