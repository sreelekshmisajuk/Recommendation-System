import React, { useState } from 'react';
import { SlidersHorizontal, Check, Plus, X, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserPreferences } from '../types';

interface PreferencesProps {
  preferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
}

const AVAILABLE_CATEGORIES = ['Video Games', 'Movies & Media', 'Electronics', 'Books & Literature', 'Home Tech', 'Board Games'];
const POPULAR_GENRES = ['Action RPG', 'Open World', 'Sci-Fi', 'Dark Fantasy', 'Cyberpunk', 'Turn-Based Strategy', 'Thriller', 'Horror', 'Indie'];
const POPULAR_INTERESTS = ['Environmental Storytelling', 'High Immersion', 'Atmospheric Audio', 'Complex Lore', 'Fast Pacing', 'Customizable Builds'];

export const Preferences: React.FC<PreferencesProps> = ({
  preferences,
  onSavePreferences
}) => {
  const [formData, setFormData] = useState<UserPreferences>({ ...preferences });
  const [newBrand, setNewBrand] = useState('');
  const [newDisliked, setNewDisliked] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat]
      };
    });
  };

  const toggleGenre = (genre: string) => {
    setFormData((prev) => {
      const exists = prev.favoriteGenres.includes(genre);
      return {
        ...prev,
        favoriteGenres: exists ? prev.favoriteGenres.filter((g) => g !== genre) : [...prev.favoriteGenres, genre]
      };
    });
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((i) => i !== interest) : [...prev.interests, interest]
      };
    });
  };

  const addBrand = () => {
    if (newBrand.trim() && !formData.preferredBrands.includes(newBrand.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferredBrands: [...prev.preferredBrands, newBrand.trim()]
      }));
      setNewBrand('');
    }
  };

  const removeBrand = (brand: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredBrands: prev.preferredBrands.filter((b) => b !== brand)
    }));
  };

  const addDisliked = () => {
    if (newDisliked.trim() && !formData.dislikedCategories.includes(newDisliked.trim())) {
      setFormData((prev) => ({
        ...prev,
        dislikedCategories: [...prev.dislikedCategories, newDisliked.trim()]
      }));
      setNewDisliked('');
    }
  };

  const removeDisliked = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      dislikedCategories: prev.dislikedCategories.filter((d) => d !== item)
    }));
  };

  const handleSave = () => {
    onSavePreferences(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Personal Taste Profile
            </span>
            <span className="text-xs text-slate-400">• Dynamic User Embedding Vector</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Manage Your Taste Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            These explicit signals calibrate the candidate retrieval and reranking models across all platform feeds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
        >
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Your taste profile and latent constraints were successfully updated! Recommendations will re-weight automatically.</span>
        </div>
      )}

      {/* 1. Preferred Categories */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">1. Preferred Product & Media Categories</h3>
          <p className="text-xs text-slate-500">Toggle categories you actively want surfaced in your personalized feeds.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_CATEGORIES.map((cat) => {
            const isSelected = formData.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Favorite Genres */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">2. Favorite Genres & Thematic Tags</h3>
          <p className="text-xs text-slate-500">Helps the dense embedding model (RecLM-emb) prioritize specific sub-genre affinities.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_GENRES.map((genre) => {
            const isSelected = formData.favoriteGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Interests & Mechanics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">3. Mechanics & Experience Priorities</h3>
          <p className="text-xs text-slate-500">Qualitative signals used by the LLM reasoning agent when drafting explanations.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_INTERESTS.map((interest) => {
            const isSelected = formData.interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Preferred Brands & Creators */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">4. Preferred Brands, Studios & Creators</h3>
          <p className="text-xs text-slate-500">Provide direct boost weights to items produced by these entities.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.preferredBrands.map((brand) => (
            <span
              key={brand}
              className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium border border-slate-200 flex items-center gap-1.5"
            >
              {brand}
              <button onClick={() => removeBrand(brand)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 max-w-md">
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBrand()}
            placeholder="Add brand, studio, or author..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-500"
          />
          <button
            onClick={addBrand}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* 5. Negative Filtering / Disliked */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">5. Negative Sampling Constraints (Disliked)</h3>
          <p className="text-xs text-slate-500">Hard exclusion filters preventing items with these tags from being recommended.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.dislikedCategories.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium border border-rose-200 flex items-center gap-1.5"
            >
              {item}
              <button onClick={() => removeDisliked(item)} className="hover:text-rose-950">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 max-w-md">
          <input
            type="text"
            value={newDisliked}
            onChange={(e) => setNewDisliked(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addDisliked()}
            placeholder="Add negative exclusion keyword..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-500"
          />
          <button
            onClick={addDisliked}
            className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Exclude
          </button>
        </div>
      </div>
    </div>
  );
};
