import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Building2 } from 'lucide-react';
import { PublicPage } from '../../types';

interface ContactPageProps {
  onNavigate: (page: PublicPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: 'Bengaluru', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          🇮🇳 India HQ & Research Lab
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Connect with RecAI India Team</h1>
        <p className="text-xs text-slate-500">
          Have queries about Indian cloud data residency, catalog ingestion, or enterprise DPDP Act compliance? Our Bengaluru and Hyderabad engineering teams are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900">India Contact Centers</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600"><MapPin className="w-4 h-4" /></div>
              <div>
                <div className="font-semibold text-slate-900">Bengaluru Innovation Campus (HQ)</div>
                <div className="text-slate-500">4th Floor, Tech Park Central, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600"><Building2 className="w-4 h-4" /></div>
              <div>
                <div className="font-semibold text-slate-900">Hyderabad AI Engineering Hub</div>
                <div className="text-slate-500">HITEC City, Madhapur, Hyderabad, Telangana 500081</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600"><Phone className="w-4 h-4" /></div>
              <div>
                <div className="font-semibold text-slate-900">India Business Support</div>
                <div className="text-slate-500">+91 (80) 4567-8900 / +91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600"><Mail className="w-4 h-4" /></div>
              <div>
                <div className="font-semibold text-slate-900">Email Inquiries</div>
                <div className="text-slate-500">india-team@recai-platform.ai</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600"><Clock className="w-4 h-4" /></div>
              <div>
                <div className="font-semibold text-slate-900">Working Hours</div>
                <div className="text-slate-500">Mon – Fri: 9:30 AM – 6:30 PM IST</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Average response time for inquiries across India: &lt; 2 business hours.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">धन्यवाद! Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out to RecAI India. Our solution architects from Bengaluru will get in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sreeharsha / Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (India)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Tech Hub</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Bengaluru">Bengaluru (Karnataka)</option>
                    <option value="Hyderabad">Hyderabad (Telangana)</option>
                    <option value="Mumbai">Mumbai (Maharashtra)</option>
                    <option value="Delhi-NCR">Delhi NCR / Gurugram / Noida</option>
                    <option value="Chennai">Chennai (Tamil Nadu)</option>
                    <option value="Pune">Pune (Maharashtra)</option>
                    <option value="Kochi">Kochi / Trivandrum (Kerala)</option>
                    <option value="Other">Other City in India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details / Requirements</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your e-commerce, OTT, or D2C recommendation requirements, monthly catalog scale, or custom LLM deployment..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Submit Inquiry to India Office <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
