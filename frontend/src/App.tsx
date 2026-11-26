import React, { useState } from 'react';
import { NavTab, Item, Interaction, UserPreferences } from './types';
import { INITIAL_ITEMS, INITIAL_INTERACTIONS, INITIAL_PREFERENCES } from './data/mockData';
import { MainLayout } from './components/layout/MainLayout';
import { ItemModal } from './components/common/ItemModal';

// Pages
import { Overview } from './pages/Overview';
import { RecommendationChat } from './pages/RecommendationChat';
import { ExploreItems } from './pages/ExploreItems';
import { PersonalizedRecommendations } from './pages/PersonalizedRecommendations';
import { SimilarItems } from './pages/SimilarItems';
import { Preferences } from './pages/Preferences';
import { InteractionHistory } from './pages/InteractionHistory';
import { SavedItems } from './pages/SavedItems';
import { RecommendationInsights } from './pages/RecommendationInsights';
import { ModelPerformance } from './pages/ModelPerformance';
import { Explainability } from './pages/Explainability';
import { EvaluationCenter } from './pages/EvaluationCenter';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [items] = useState<Item[]>(INITIAL_ITEMS);
  const [savedItems, setSavedItems] = useState<Item[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Modal inspection state
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Helper to record interactions
  const logInteraction = (item: Item, type: 'view' | 'save' | 'like') => {
    const newInteraction: Interaction = {
      id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      itemId: item.id,
      itemTitle: item.title,
      category: item.category,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: type === 'save' ? 'Saved to bookmarks' : 'Inspected item attributes'
    };
    setInteractions((prev) => [newInteraction, ...prev]);
  };

  // Toggle item bookmark/save
  const handleToggleSave = (item: Item) => {
    setSavedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        logInteraction(item, 'save');
        return [...prev, item];
      }
    });
  };

  // Open item inspection modal
  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    logInteraction(item, 'view');
  };

  // Find similar items shortcut
  const handleFindSimilar = (_item: Item) => {
    setIsModalOpen(false);
    setActiveTab('similar');
  };

  const isCurrentItemSaved = selectedItem
    ? savedItems.some((s) => s.id === selectedItem.id)
    : false;

  return (
    <>
      <MainLayout
        activeTab={activeTab}
        onNavigate={setActiveTab}
        savedCount={savedItems.length}
        preferences={preferences}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
      >
        {activeTab === 'overview' && (
          <Overview
            items={items}
            savedItems={savedItems}
            onNavigate={setActiveTab}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
          />
        )}

        {activeTab === 'chat' && (
          <RecommendationChat
            savedItems={savedItems}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreItems
            items={items}
            savedItems={savedItems}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
          />
        )}

        {activeTab === 'personalized' && (
          <PersonalizedRecommendations
            items={items}
            savedItems={savedItems}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
          />
        )}

        {activeTab === 'similar' && (
          <SimilarItems
            items={items}
            savedItems={savedItems}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
          />
        )}

        {activeTab === 'preferences' && (
          <Preferences
            preferences={preferences}
            onSavePreferences={setPreferences}
          />
        )}

        {activeTab === 'history' && (
          <InteractionHistory
            interactions={interactions}
            onClearHistory={() => setInteractions([])}
            onItemClick={(itemId) => {
              const it = items.find((i) => i.id === itemId);
              if (it) handleSelectItem(it);
            }}
          />
        )}

        {activeTab === 'saved' && (
          <SavedItems
            savedItems={savedItems}
            onViewDetails={handleSelectItem}
            onSaveToggle={handleToggleSave}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'insights' && (
          <RecommendationInsights />
        )}

        {activeTab === 'performance' && (
          <ModelPerformance />
        )}

        {activeTab === 'explainability' && (
          <Explainability
            items={items}
            onViewDetails={handleSelectItem}
          />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationCenter />
        )}

        {activeTab === 'settings' && (
          <Settings />
        )}
      </MainLayout>

      {/* Global Item Inspector Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSaved={isCurrentItemSaved}
        onSaveToggle={handleToggleSave}
        onFindSimilar={handleFindSimilar}
      />
    </>
  );
};
export default App;
