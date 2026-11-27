import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Shield,
  Calendar,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Camera,
  Layers,
  Heart,
  Tag,
  Key
} from 'lucide-react';
import { UserProfile, RecommendationPreferences } from '../types';
import { profileService } from '../services/profileService';

interface ProfilePageProps {
  user: UserProfile | null;
  onProfileUpdated: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onProfileUpdated }) => {
  // Personal Info Form State
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [role, setRole] = useState(user?.role || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Recommendation Profile State
  const [preferences, setPreferences] = useState<RecommendationPreferences>({
    categories: [],
    interests: [],
    favoriteGenres: [],
    preferredBrands: [],
    priceRange: [0, 500],
    recommendationMode: 'accuracy',
    responseStyle: 'detailed'
  });

  const [newInterest, setNewInterest] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingPrefs, setIsLoadingPrefs] = useState(true);

  // Sync state if user prop changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setRole(user.role || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  // Load actual backend preferences
  useEffect(() => {
    const fetchPrefs = async () => {
      setIsLoadingPrefs(true);
      const data = await profileService.getPreferences();
      if (data) {
        setPreferences(data);
      }
      setIsLoadingPrefs(false);
    };
    fetchPrefs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // 1. Update personal info
      const updatedUser = await profileService.updateProfile({
        name: name.trim() || undefined,
        username: username.trim() || undefined,
        role: role.trim() || undefined,
        avatar: avatar.trim() || undefined
      });

      // 2. Update recommendation preferences
      await profileService.updatePreferences(preferences);

      if (updatedUser) {
        onProfileUpdated(updatedUser);
      }
      setSuccessMessage('Profile and recommendation preferences saved successfully.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save profile changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !preferences.interests.includes(newInterest.trim())) {
      setPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== item)
    }));
  };

  const handleAddGenre = () => {
    if (newGenre.trim() && !preferences.favoriteGenres.includes(newGenre.trim())) {
      setPreferences(prev => ({
        ...prev,
        favoriteGenres: [...prev.favoriteGenres, newGenre.trim()]
      }));
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (item: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter(g => g !== item)
    }));
  };

  const initial = (name || user?.name || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> User Profile & Identity
            </span>
            <span className="text-xs text-slate-400">• Authenticated Session</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Account & Recommendation Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal credentials, recommendation taste vector, and CRS agent personalization.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. PERSONAL INFORMATION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Personal Information</h3>
            </div>
            <span className="text-[11px] text-slate-400">Actual Authenticated User Data</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name || 'Avatar'}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center border-2 border-white shadow-md">
                  {initial}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Active Account" />
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">If blank, your actual name initial ({initial}) is displayed.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || 'Not provided'}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400">Primary authentication email (read-only)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="e.g. sreeharsha"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Job Title</label>
              <input
                type="text"
                placeholder="e.g. AI Researcher / Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* 2. RECOMMENDATION PROFILE & PERSONALIZATION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Recommendation Profile</h3>
            </div>
            <span className="text-[11px] text-slate-400">Personalized CRS Alignment</span>
          </div>

          {/* Mode & Style Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Default Recommendation Mode</label>
              <select
                value={preferences.recommendationMode}
                onChange={(e) => setPreferences({ ...preferences, recommendationMode: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="accuracy">Accuracy (Prioritize Exact Taste Alignment)</option>
                <option value="diversity">Diversity (Serendipitous Exploration)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Response Style</label>
              <select
                value={preferences.responseStyle}
                onChange={(e) => setPreferences({ ...preferences, responseStyle: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
              >
                <option value="detailed">Detailed (In-depth Rationale & Attribution)</option>
                <option value="concise">Concise (Direct Summary & Top Ranked Cards)</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-700">Specific Interests & Themes</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add theme (e.g. Environmental Lore, Tactical Combat)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest(); } }}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {preferences.interests.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No interests added yet.</span>
              ) : (
                preferences.interests.map((it) => (
                  <span
                    key={it}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium"
                  >
                    <span>{it}</span>
                    <button type="button" onClick={() => handleRemoveInterest(it)} className="text-blue-500 hover:text-blue-800 font-bold">×</button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Favorite Genres */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-700">Favorite Genres or Item Types</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add genre (e.g. Action RPG, Sci-Fi Epic, Hi-Fi Audio)"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGenre(); } }}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddGenre}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {preferences.favoriteGenres.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No favorite genres added yet.</span>
              ) : (
                preferences.favoriteGenres.map((g) => (
                  <span
                    key={g}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium"
                  >
                    <span>{g}</span>
                    <button type="button" onClick={() => handleRemoveGenre(g)} className="text-indigo-500 hover:text-indigo-800 font-bold">×</button>
                  </span>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 3. ACCOUNT INFORMATION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Account Details & Status</h3>
            </div>
            <span className="text-[11px] text-slate-400">System Records</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-400">Account Status</div>
              <div className="font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {user?.accountStatus || 'Active'}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-400">Authentication Provider</div>
              <div className="font-bold text-slate-800 mt-1">
                {user?.authProvider || 'RecAI Native Auth'}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-400">Member Since</div>
              <div className="font-bold text-slate-800 mt-1">
                {user?.createdAt || 'Active Session'}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
