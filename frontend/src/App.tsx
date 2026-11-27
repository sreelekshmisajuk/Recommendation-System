import React, { useState } from 'react';
import {
  NavTab,
  PublicPage,
  AuthModalMode,
  UserProfile,
  Item,
  CartItem,
  Interaction,
  UserPreferences
} from './types';
import { INITIAL_ITEMS, INITIAL_INTERACTIONS, INITIAL_PREFERENCES } from './data/mockData';

// Public Experience
import { PublicHeader } from './components/public/PublicHeader';
import { PublicFooter } from './components/public/PublicFooter';
import { CookieConsentBanner } from './components/public/CookieConsentBanner';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { PricingPage } from './pages/public/PricingPage';
import { BlogPage } from './pages/public/BlogPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPage } from './pages/public/LegalPage';

// Auth & Onboarding
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/auth/OnboardingWizard';

// Member Workspace Layout & Components
import { MainLayout } from './components/layout/MainLayout';
import { ItemModal } from './components/common/ItemModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { ErrorPage } from './pages/ErrorPage';

// Member Pages
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
import { Billing } from './pages/Billing';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  // Authentication & View Mode State
  // When isAuthenticated is false -> Render Public Enterprise Site (Homepage, Pricing, Docs, Auth)
  // When user logs in or signs up -> Automatically redirect to the Member Dashboard!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Navigation State
  const [publicPage, setPublicPage] = useState<PublicPage>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  // Application Data State
  const [items] = useState<Item[]>(INITIAL_ITEMS);
  const [savedItems, setSavedItems] = useState<Item[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [interactions, setInteractions] = useState<Interaction[]>(INITIAL_INTERACTIONS);
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

  // Add to cart helper
  const handleAddToCart = (item: Item) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
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

  // Auth Success Handler -> Redirect to Member User Page!
  const handleAuthSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setActiveTab('overview'); // Direct redirect to dashboard!
    setShowOnboarding(true); // Launch onboarding flow
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPublicPage('home');
  };

  const isCurrentItemSaved = selectedItem
    ? savedItems.some((s) => s.id === selectedItem.id)
    : false;

  // ==========================================
  // SCENARIO 1: PUBLIC PAGES (BEFORE LOGIN)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <PublicHeader
          currentPage={publicPage}
          onNavigate={setPublicPage}
          onOpenAuth={(mode) => setAuthModalMode(mode)}
        />

        <main className="flex-1">
          {publicPage === 'home' && (
            <HomePage
              onNavigate={setPublicPage}
              onOpenAuth={(mode) => setAuthModalMode(mode)}
            />
          )}

          {publicPage === 'about' && (
            <AboutPage
              onNavigate={setPublicPage}
              onOpenAuth={(mode) => setAuthModalMode(mode)}
            />
          )}

          {publicPage === 'pricing' && (
            <PricingPage
              onNavigate={setPublicPage}
              onOpenAuth={(mode) => setAuthModalMode(mode)}
            />
          )}

          {publicPage === 'blog' && (
            <BlogPage onNavigate={setPublicPage} />
          )}

          {publicPage === 'contact' && (
            <ContactPage onNavigate={setPublicPage} />
          )}

          {(publicPage === 'privacy' || publicPage === 'terms' || publicPage === 'cookies') && (
            <LegalPage page={publicPage} onNavigate={setPublicPage} />
          )}
        </main>

        <PublicFooter onNavigate={setPublicPage} />
        <CookieConsentBanner onNavigate={setPublicPage} />

        {/* Authentication Modal */}
        <AuthModal
          mode={authModalMode}
          isOpen={authModalMode !== null}
          onClose={() => setAuthModalMode(null)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(newMode) => setAuthModalMode(newMode)}
        />
      </div>
    );
  }

  // ==========================================
  // SCENARIO 2: POST-LOGIN MEMBER SCREENS
  // ==========================================
  return (
    <>
      <MainLayout
        activeTab={activeTab}
        onNavigate={setActiveTab}
        savedCount={savedItems.length}
        preferences={preferences}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        user={user}
        onLogout={handleLogout}
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

        {activeTab === 'profile' && (
          <ProfilePage
            user={user}
            onProfileUpdated={(updated) => setUser(updated)}
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

        {activeTab === 'billing' && user && (
          <Billing user={user} />
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

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((ci) => ci.item.id !== id))}
        onUpdateQuantity={(id, qty) =>
          setCartItems((prev) =>
            prev.map((ci) => (ci.item.id === id ? { ...ci, quantity: qty } : ci))
          )
        }
        onCheckoutSuccess={() => setCartItems([])}
      />

      {/* Onboarding Wizard (shown on first login/signup) */}
      {user && (
        <OnboardingWizard
          user={user}
          isOpen={showOnboarding}
          onComplete={(updated) => {
            setPreferences((prev) => ({ ...prev, ...updated }));
            setShowOnboarding(false);
          }}
        />
      )}
    </>
  );
};
export default App;
