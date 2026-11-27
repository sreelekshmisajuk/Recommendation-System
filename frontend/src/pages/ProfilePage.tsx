import React, { useState, useEffect, useRef } from 'react';
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
  Key,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
  Bookmark,
  History,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Search,
  ExternalLink,
  Clock
} from 'lucide-react';
import { UserProfile, RecommendationPreferences, Item, Interaction } from '../types';
import { profileService } from '../services/profileService';
import { ItemCard } from '../components/common/ItemCard';

interface ProfilePageProps {
  user: UserProfile | null;
  savedItems?: Item[];
  interactions?: Interaction[];
  onProfileUpdated: (updated: UserProfile) => void;
  onViewDetails?: (item: Item) => void;
  onSaveToggle?: (item: Item) => void;
  onClearHistory?: () => void;
}

type ProfileTab = 'personal' | 'preferences' | 'saved' | 'history';

const PRESET_THEMES = [
  'Environmental Lore',
  'Tactical Combat',
  'Atmospheric Audio',
  'Dark Fantasy',
  'Open World Agency',
  'Cinematic Storytelling',
  'Complex Skill Trees',
  'Cyberpunk Dystopia',
  'Minimalist Hardware',
  'High Immersion',
  'Real-Time Strategy',
  'Procedural Generation'
];

const PRESET_GENRES = [
  'Action RPG',
  'Open World',
  'Sci-Fi Epic',
  'Dark Fantasy',
  'Story Rich',
  'Historical Drama',
  'Wireless Audio',
  'Hi-Fi Peripherals',
  'Turn-Based Strategy',
  'Indie Masterpiece',
  'Developer Tooling',
  'Cloud Infrastructure'
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  savedItems = [],
  interactions = [],
  onProfileUpdated,
  onViewDetails,
  onSaveToggle,
  onClearHistory
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ProfileTab>('personal');

  // Personal Info Form State
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [role, setRole] = useState(user?.role || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setSuccessMessage('Avatar uploaded! Click "Save Profile Changes" to persist.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  // Search filter inside saved items tab
  const [savedSearch, setSavedSearch] = useState('');

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

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
      setPreferences((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== item)
    }));
  };

  const handleAddGenre = () => {
    if (newGenre.trim() && !preferences.favoriteGenres.includes(newGenre.trim())) {
      setPreferences((prev) => ({
        ...prev,
        favoriteGenres: [...prev.favoriteGenres, newGenre.trim()]
      }));
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (item: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter((g) => g !== item)
    }));
  };

  const initial = (name || user?.name || user?.email || 'U').charAt(0).toUpperCase();

  const filteredSavedItems = savedItems.filter(
    (it) =>
      it.title.toLowerCase().includes(savedSearch.toLowerCase()) ||
      it.description.toLowerCase().includes(savedSearch.toLowerCase()) ||
      it.category.toLowerCase().includes(savedSearch.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> User Profile & Personalization
            </span>
            <span className="text-xs text-slate-400">• Authenticated Session</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">My Profile & Personalization</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal credentials, CRS recommendation preferences, saved items, and interaction history.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={isSaving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
        </button>
      </div>

      {/* Profile Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('personal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'personal'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Personal Information & Account
        </button>

        <button
          onClick={() => setActiveSubTab('preferences')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'preferences'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Recommendation Preferences
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'saved'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Items</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-current font-bold">
            {savedItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'history'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Interaction History</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-current font-bold">
            {interactions.length}
          </span>
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

      {/* ========================================================= */}
      {/* TAB 1: PERSONAL INFORMATION & CREDENTIALS */}
      {/* ========================================================= */}
      {activeSubTab === 'personal' && (
        <div className="space-y-6">
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Personal Information</h3>
              </div>
              <span className="text-[11px] text-slate-400">Actual Authenticated User Data</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
              {/* Avatar Preview */}
              <div className="relative group flex-shrink-0">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name || 'Avatar'}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white font-black text-3xl flex items-center justify-center border-2 border-white shadow-md">
                    {initial}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Active Account" />
              </div>

              {/* Upload & Controls */}
              <div className="flex-1 space-y-2">
                <label className="block text-xs font-bold text-slate-800">Profile Photo / Avatar</label>
                <p className="text-[11px] text-slate-500">
                  Upload an image (PNG, JPG, WebP max 2MB) or input a picture URL below.
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" /> Upload New Photo
                  </button>

                  {avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3.5 py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
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

          {/* Account Information Details */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Account Credentials & Status</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Authentication Provider</span>
                <span className="font-bold text-slate-900 mt-1 block">RecAI Token-Based Auth</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Account Status</span>
                <span className="font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active & Verified
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Account Created</span>
                <span className="font-bold text-slate-900 mt-1 block">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Session'}
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: RECOMMENDATION PREFERENCES */}
      {/* ========================================================= */}
      {activeSubTab === 'preferences' && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Recommendation Profile & Parameters</h3>
            </div>
            <span className="text-[11px] text-slate-400">CRS Personalization Engine</span>
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

          {/* Specific Interests & Themes */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Specific Interests & Themes</label>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Click any suggested theme below to add it instantly to your profile, or type a custom one.
              </p>
            </div>

            {/* Quick-Select Suggestions */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Click to Select Themes:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_THEMES.map((preset) => {
                  const isSelected = preferences.interests.includes(preset);
                  return (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => {
                        if (isSelected) {
                          handleRemoveInterest(preset);
                        } else {
                          setPreferences((prev) => ({ ...prev, interests: [...prev.interests, preset] }));
                        }
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {isSelected ? `✓ ${preset}` : `+ ${preset}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Type custom theme (e.g. Tactical Combat, Cyberpunk)..."
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Add Theme
              </button>
            </div>

            {/* Selected Active Interests */}
            <div className="pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Your Active Themes ({preferences.interests.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {preferences.interests.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No interests added yet.</span>
                ) : (
                  preferences.interests.map((it) => (
                    <span
                      key={it}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                    >
                      <span>{it}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(it)}
                        className="text-blue-500 hover:text-blue-800 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Favorite Genres */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Favorite Genres or Item Types</label>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Click any preset genre below to toggle it, or input custom domains.
              </p>
            </div>

            {/* Quick-Select Suggestions */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Click to Select Genres:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_GENRES.map((genre) => {
                  const isSelected = preferences.favoriteGenres.includes(genre);
                  return (
                    <button
                      type="button"
                      key={genre}
                      onClick={() => {
                        if (isSelected) {
                          handleRemoveGenre(genre);
                        } else {
                          setPreferences((prev) => ({ ...prev, favoriteGenres: [...prev.favoriteGenres, genre] }));
                        }
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {isSelected ? `✓ ${genre}` : `+ ${genre}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Type custom genre or category..."
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGenre();
                  }
                }}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddGenre}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                Add Genre
              </button>
            </div>

            {/* Selected Active Genres */}
            <div className="pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Your Active Genres ({preferences.favoriteGenres.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {preferences.favoriteGenres.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No favorite genres added yet.</span>
                ) : (
                  preferences.favoriteGenres.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold"
                    >
                      <span>{g}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGenre(g)}
                        className="text-indigo-500 hover:text-indigo-800 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 3: SAVED ITEMS */}
      {/* ========================================================= */}
      {activeSubTab === 'saved' && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Saved Items ({savedItems.length})</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Items you have bookmarked for quick access across your recommendation sessions.
              </p>
            </div>

            {savedItems.length > 0 && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={savedSearch}
                  onChange={(e) => setSavedSearch(e.target.value)}
                  placeholder="Filter saved items..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            )}
          </div>

          {filteredSavedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSavedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSaved={true}
                  onSaveToggle={onSaveToggle || (() => {})}
                  onViewDetails={onViewDetails || (() => {})}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No saved items found.</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {savedItems.length === 0
                  ? 'Click the bookmark icon on any item card in AI Chat or Explore to save it here.'
                  : 'No items match your search filter.'}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 4: INTERACTION HISTORY */}
      {/* ========================================================= */}
      {activeSubTab === 'history' && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Interaction History ({interactions.length})</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit log of items viewed, saved, or rated during your current session.
              </p>
            </div>

            {interactions.length > 0 && onClearHistory && (
              <button
                onClick={onClearHistory}
                className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5 self-start"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear History
              </button>
            )}
          </div>

          {interactions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {interactions.map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                      {act.type === 'save' ? (
                        <Bookmark className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-blue-600" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{act.itemTitle}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px] uppercase font-bold">
                          {act.category}
                        </span>
                        <span>{act.details || (act.type === 'save' ? 'Saved item' : 'Viewed item details')}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No activity yet.</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Items you browse, inspect, or bookmark will appear here in chronological order.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
