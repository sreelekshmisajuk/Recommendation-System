import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { AuthModalMode, UserProfile } from '../../types';

interface AuthModalProps {
  mode: AuthModalMode;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  onSwitchMode: (newMode: AuthModalMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  isOpen,
  onClose,
  onSuccess,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [signupSuccessMsg, setSignupSuccessMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !mode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'forgot') {
      setTimeout(() => {
        setIsLoading(false);
        setRecoverySent(true);
      }, 700);
      return;
    }

    if (mode === 'signup') {
      // Step 1: User creates account
      // Step 2: Show success notification and immediately redirect to Log In screen
      setTimeout(() => {
        setIsLoading(false);
        setSignupSuccessMsg(true);
        setPassword(''); // Clear password field for secure login
        onSwitchMode('login'); // Redirect to login!
      }, 700);
      return;
    }

    // mode === 'login' -> Authenticate and enter User Dashboard!
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Workspace User'),
        email: email || 'user@recai.io',
        role: 'AI Engineer',
        plan: 'Pro',
        joinedDate: 'Today'
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 pt-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Your RecAI Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'login' && 'Enter your credentials to access your recommendation workspace.'}
            {mode === 'signup' && 'Get instant access to live conversational CRS models.'}
            {mode === 'forgot' && 'Enter your account email to receive a recovery link.'}
          </p>
        </div>

        {/* Account Created Success Alert banner shown when redirected to Login */}
        {mode === 'login' && signupSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Account created successfully! Please enter your password to log in to your dashboard.</span>
          </div>
        )}

        {/* Forgot password success state */}
        {mode === 'forgot' && recoverySent ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Recovery Email Dispatched</h4>
            <p className="text-xs text-slate-500">
              We sent password reset instructions to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setRecoverySent(false);
                onSwitchMode('login');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors"
            >
              Back to Log In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Social Logins */}
            {(mode === 'login' || mode === 'signup') && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onSuccess({
                      name: 'Google User',
                      email: 'user@gmail.com',
                      role: 'Researcher',
                      plan: 'Pro',
                      joinedDate: 'Today'
                    });
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => onSwitchMode('forgot')}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600"
                />
                <span>I agree to the Terms of Service & Privacy Policy</span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Connecting...</span>
              ) : mode === 'login' ? (
                <>Log In & Go to Dashboard <ArrowRight className="w-3.5 h-3.5" /></>
              ) : mode === 'signup' ? (
                <>Create Free Account & Onboard <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>Send Recovery Email</>
              )}
            </button>
          </form>
        )}

        {/* Switch mode links */}
        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => onSwitchMode('signup')} className="font-bold text-blue-600 hover:underline">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => onSwitchMode('login')} className="font-bold text-blue-600 hover:underline">
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
