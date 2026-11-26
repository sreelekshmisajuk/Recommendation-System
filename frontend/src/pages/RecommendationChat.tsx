import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  Sliders,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Item, ChatMessage } from '../types';
import { chatService } from '../services/chatService';
import { ItemCard } from '../components/common/ItemCard';

interface RecommendationChatProps {
  savedItems: Item[];
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
}

const SUGGESTED_PROMPTS = [
  'Recommend games based on my previous interests',
  'Find products similar to my previous choices',
  'Recommend highly rated items (4.8+ rating)',
  'Suggest something new based on my preferences',
  'What open-world RPG should I play with deep lore?'
];

export const RecommendationChat: React.FC<RecommendationChatProps> = ({
  savedItems,
  onSaveToggle,
  onViewDetails
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: "Hello! I am **RecAI Recommender Assistant** (powered by InteRecAgent & Gemini).\n\nTell me about your favorite genres, games, movies, or gear, and I will generate personalized recommendations backed by collaborative filtering and surrogate model explanations.",
      timestamp: 'Just now',
      followUpQuestions: [
        'Recommend games based on my previous interests',
        'Find products similar to my previous choices',
        'What open-world RPG should I play with deep lore?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'accuracy' | 'diversity'>('accuracy');
  const [style, setStyle] = useState<'concise' | 'detailed'>('detailed');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(text, messages, { mode, style });
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I encountered an issue processing your recommendation request. Please ensure your backend or Gemini API key is configured.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'assistant',
        text: "Conversation cleared. What recommendation task would you like to explore?",
        timestamp: 'Just now',
        followUpQuestions: SUGGESTED_PROMPTS.slice(0, 3)
      }
    ]);
  };

  const isItemSaved = (id: string) => savedItems.some((s) => s.id === id);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Controller Bar */}
      <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div className="flex items-center gap-4">
          {/* Recommendation Mode */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-blue-600" /> Mode:
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-medium">
              <button
                onClick={() => setMode('accuracy')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mode === 'accuracy' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Accuracy
              </button>
              <button
                onClick={() => setMode('diversity')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mode === 'diversity' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Diversity
              </button>
            </div>
          </div>

          {/* Response Style */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Style:
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-medium">
              <button
                onClick={() => setStyle('detailed')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  style === 'detailed' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Detailed
              </button>
              <button
                onClick={() => setStyle('concise')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  style === 'concise' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Concise
              </button>
            </div>
          </div>
        </div>

        {/* Clear Conversation */}
        <button
          onClick={handleClearChat}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Chat
        </button>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-2xs ${
                msg.sender === 'user' ? 'bg-slate-900' : 'bg-blue-600'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble & Content */}
            <div className={`space-y-3 flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block text-left text-sm p-4 rounded-2xl shadow-2xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.latencyMs && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Response Latency: {msg.latencyMs}ms</span>
                    <span>• Gemini Reasoning Engine</span>
                  </div>
                )}
              </div>

              {/* Render Recommended Item Cards if attached */}
              {msg.items && msg.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-left">
                  {msg.items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isSaved={isItemSaved(item.id)}
                      onSaveToggle={onSaveToggle}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              )}

              {/* Follow-up question chips */}
              {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 text-left">
                  {msg.followUpQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-4xl">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
              <span>Analyzing collaborative filtering patterns & querying catalog...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-6 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
          Suggested:
        </span>
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="text-xs whitespace-nowrap bg-white hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for recommendations, compare items, or describe what you want..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 transition-all"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
