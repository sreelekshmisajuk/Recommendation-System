import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, User, Sliders, Bell, Save, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://generativelanguage.googleapis.com/v1beta/openai/');
  const [defaultModel, setDefaultModel] = useState('gemini-3.1-flash-lite');
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(600);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [modelAlerts, setModelAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
              <SettingsIcon className="w-3.5 h-3.5" /> Workspace Configuration
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Platform Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure LLM inference endpoints, user profile, and recommendation serving hyper-parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>System settings and API credentials were saved successfully.</span>
        </div>
      )}

      {/* 1. API Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Key className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">LLM Inference & Gemini Credentials</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Google Gemini API Key</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Acquired from Google AI Studio. Stored securely in your session.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">OpenAI-Compatible Base URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Default Gemini Model</label>
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
              >
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Active & Fast)</option>
                <option value="gemini-3.8-flash">gemini-3.8-flash (Latest General)</option>
                <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite</option>
                <option value="gpt-4o">gpt-4o (OpenAI Alternative)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Generation Parameters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Recommendation Generation Hyperparameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Sampling Temperature:</span>
              <span className="text-blue-600">{temperature}</span>
            </div>
            <input
              type="range"
              min={0.0}
              max={1.0}
              step={0.1}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">Lower values yield deterministic recommendations; higher values increase novelty.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Max Generation Tokens:</span>
              <span className="text-blue-600">{maxTokens}</span>
            </div>
            <input
              type="range"
              min={256}
              max={2048}
              step={128}
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">Controls the length of generated natural language reasoning explanations.</p>
          </div>
        </div>
      </div>

      {/* 3. User Profile */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">User Profile</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Organization</label>
            <input
              type="text"
              placeholder="e.g. Researcher, Engineer, Guest"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Notification Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Bell className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Notification Alerts</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={modelAlerts}
              onChange={(e) => setModelAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 accent-blue-600"
            />
            <span>Receive in-app alerts when evaluation benchmark runs complete</span>
          </label>

          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 accent-blue-600"
            />
            <span>Notify when new high-affinity recommendations are generated</span>
          </label>
        </div>
      </div>
    </div>
  );
};
