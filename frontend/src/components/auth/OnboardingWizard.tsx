import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Bot, Target, Layers, X } from 'lucide-react';
import { UserProfile, UserPreferences } from '../../types';

interface OnboardingWizardProps {
  user: UserProfile;
  isOpen: boolean;
  onComplete: (updatedPrefs: Partial<UserPreferences>) => void;
  onSkip?: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  user,
  isOpen,
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['Video Games', 'Electronics']);
  const [selectedGoal, setSelectedGoal] = useState<string>('Conversational AI Agent (InteRecAgent)');
  const [diversity, setDiversity] = useState<'high' | 'balanced' | 'low'>('balanced');

  if (!isOpen) return null;

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete({});
    }
  };

  const domains = ['Video Games', 'Movies & Media', 'Electronics', 'Books & Audio', 'SaaS Tools'];
  const goals = [
    'Conversational AI Agent (InteRecAgent)',
    'Semantic Similarity & Vector Match (RecLM-emb)',
    'Offline Benchmark Evals & Metric Analysis',
    'Explainable Recommendations (RecExplainer)'
  ];

  const handleFinish = () => {
    onComplete({
      categories: selectedDomains,
      diversityPreference: diversity
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-slate-200 shadow-2xl relative space-y-6">
        {/* Top Header: Progress Bar & Skip Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Step {step} of 3</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400 font-medium">
              {step === 1 ? 'Select Domains' : step === 2 ? 'Primary Goal' : 'CRS Parameters'}
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            title="Skip onboarding and go directly to Dashboard"
          >
            <span>Skip for now</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Welcome aboard, {user.name}! 👋 What items are you recommending?
            </h3>
            <p className="text-xs text-slate-500">
              Select one or more domain categories to initialize your personalized item index.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {domains.map((dom) => {
                const selected = selectedDomains.includes(dom);
                return (
                  <button
                    key={dom}
                    onClick={() => {
                      setSelectedDomains(
                        selected ? selectedDomains.filter((d) => d !== dom) : [...selectedDomains, dom]
                      );
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dom}</span>
                    {selected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">What is your primary focus?</h3>
            <p className="text-xs text-slate-500">
              This configures default prompt templates and evaluation metrics in your workspace.
            </p>
            <div className="space-y-2 pt-2">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGoal(g)}
                  className={`w-full p-3.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                    selectedGoal === g
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{g}</span>
                  {selectedGoal === g && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Configure Exploration Diversity</h3>
            <p className="text-xs text-slate-500">
              Control the exploration-exploitation tradeoff between pinpoint accuracy and serendipitous discovery.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {(['accuracy', 'balanced', 'diversity'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDiversity(mode === 'accuracy' ? 'low' : mode === 'diversity' ? 'high' : 'balanced')}
                  className={`p-4 rounded-xl text-center border text-xs capitalize font-semibold transition-all ${
                    (diversity === 'low' && mode === 'accuracy') ||
                    (diversity === 'balanced' && mode === 'balanced') ||
                    (diversity === 'high' && mode === 'diversity')
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{mode}</div>
                  <div className="text-[10px] mt-1 opacity-80">
                    {mode === 'accuracy' ? 'Precision' : mode === 'balanced' ? 'Hybrid' : 'Serendipity'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
            ) : null}

            <button
              onClick={handleSkip}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium underline-offset-4 hover:underline"
            >
              Skip to Dashboard
            </button>
          </div>

          <button
            onClick={() => {
              if (step < 3) setStep(step + 1);
              else handleFinish();
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            {step === 3 ? 'Launch My Dashboard' : 'Next'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
