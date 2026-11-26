import React from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface ErrorPageProps {
  code?: 404 | 500;
  onGoHome: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ code = 404, onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-5xl font-black text-slate-900">{code}</h1>
      <h2 className="text-xl font-bold text-slate-800">
        {code === 404 ? 'Page Not Found' : 'Internal Engine Anomaly'}
      </h2>
      <p className="text-xs text-slate-500 max-w-sm">
        {code === 404
          ? 'The recommendation tab or route you are looking for has been relocated or does not exist.'
          : 'Our surrogate recommendation cluster encountered a temporary fault. Telemetry has been recorded.'}
      </p>
      <div className="pt-4 flex gap-3">
        <button
          onClick={onGoHome}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reload
        </button>
      </div>
    </div>
  );
};
