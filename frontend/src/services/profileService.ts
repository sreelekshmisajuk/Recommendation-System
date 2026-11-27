/**
 * Centralized User Profile & Auth Service Layer
 * Connects frontend directly with /api/users/me and /api/auth endpoints
 * Uses real Bearer tokens and authentic backend user profiles.
 */

import { UserProfile, RecommendationPreferences } from '../types';
import { request } from './api';

const TOKEN_KEY = 'recai_auth_token';

export const profileService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  /**
   * Fetch authenticated user profile: GET /api/users/me
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    const res = await request<any>('/api/users/me', {
      headers: this.getAuthHeaders()
    });

    if (res.success && res.data?.data) {
      return res.data.data as UserProfile;
    }
    return null;
  },

  /**
   * Update profile fields: PUT /api/users/me
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const res = await request<any>('/api/users/me', {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    });

    if (res.success && res.data?.data) {
      return res.data.data as UserProfile;
    }
    return null;
  },

  /**
   * Update avatar: POST /api/users/me/avatar
   */
  async updateAvatar(avatarUrl: string): Promise<boolean> {
    const res = await request<any>('/api/users/me/avatar', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ avatar: avatarUrl })
    });
    return res.success;
  },

  /**
   * Fetch user recommendation profile: GET /api/users/me/preferences
   */
  async getPreferences(): Promise<RecommendationPreferences | null> {
    const res = await request<any>('/api/users/me/preferences', {
      headers: this.getAuthHeaders()
    });

    if (res.success && res.data?.data) {
      return res.data.data as RecommendationPreferences;
    }
    return null;
  },

  /**
   * Save user recommendation preferences: PUT /api/users/me/preferences
   */
  async updatePreferences(prefs: Partial<RecommendationPreferences>): Promise<boolean> {
    const res = await request<any>('/api/users/me/preferences', {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(prefs)
    });
    return res.success;
  },

  /**
   * Log out session: POST /api/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await request('/api/auth/logout', {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch {
      // Non-blocking cleanup
    } finally {
      this.clearToken();
    }
  }
};
