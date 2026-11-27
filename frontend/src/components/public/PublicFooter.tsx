import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { PublicPage } from '../../types';

interface PublicFooterProps {
  onNavigate: (page: PublicPage) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              Rec<span className="text-blue-500">AI</span> Platform
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Enterprise AI recommendation infrastructure combining LLMs (Gemini, Claude, GPT), dense semantic vector indexing, constrained prefix-tree decoding, and explainability.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Conversational CRS</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Vector Match Engine</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white">Surrogate Explainers</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing & Plans</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-white">Research & Blog</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact & Support</button></li>
              <li><span className="text-slate-500">Careers (Hiring!)</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-sm">Trust & Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('cookies')} className="hover:text-white">Cookie Policy</button></li>
              <li><span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II Certified</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 NexusRec Technologies Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:underline">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:underline">Terms</button>
            <button onClick={() => onNavigate('cookies')} className="hover:underline">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
