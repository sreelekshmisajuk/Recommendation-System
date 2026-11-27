import React, { useState } from 'react';
import { Sparkles, ArrowRight, Menu, X, Shield, Lock, ExternalLink } from 'lucide-react';
import { PublicPage } from '../../types';

interface PublicHeaderProps {
  currentPage: PublicPage;
  onNavigate: (page: PublicPage) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PublicPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services & Pricing', page: 'pricing' },
    { label: 'Blog & Research', page: 'blog' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
              Nexus<span className="text-blue-600">Rec</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                SaaS
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Intelligent Recommendation Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentPage === link.page
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-blue-500/20 flex items-center gap-1.5"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === link.page ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
            >
              Log In
            </button>
            <button
              onClick={() => {
                onOpenAuth('signup');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
