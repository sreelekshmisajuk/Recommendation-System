import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { PublicPage } from '../../types';

interface CookieConsentBannerProps {
  onNavigate: (page: PublicPage) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasConsented = localStorage.getItem('nexusrec_cookie_consent');
    if (!hasConsented) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexusrec_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 text-xs text-slate-700 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-bold text-slate-900">We respect your privacy</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            We use essential cookies to analyze platform traffic and secure recommendation agent sessions. Read our{' '}
            <button
              onClick={() => onNavigate('cookies')}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Cookie Policy
            </button>.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => setAccepted(true)}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
            >
              Necessary Only
            </button>
          </div>
        </div>
        <button onClick={() => setAccepted(true)} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
