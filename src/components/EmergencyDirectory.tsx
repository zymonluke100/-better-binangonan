import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, Flame, Zap, Copy, Check, ExternalLink, MapPin, Search } from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyDirectoryProps {
  contacts: EmergencyContact[];
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ contacts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Disaster & Rescue', 'Police', 'Fire', 'Medical', 'Utilities'];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phonePrimary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Disaster & Rescue':
        return <ShieldAlert className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'Police':
        return <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'Fire':
        return <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
      case 'Medical':
        return <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'Utilities':
        return <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <PhoneCall className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Emergency Header Card */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-rose-800/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <PhoneCall className="w-5 h-5 animate-bounce" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Binangonan Emergency Hotlines
              </h2>
              <p className="text-xs text-rose-200">
                1-Tap Direct Emergency Calling & Dispatch Assistance
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-300 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[11px] font-mono">
              MDRRMO: (02) 8652-1875
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[11px] font-mono">
              Police PNP: (02) 8652-0123
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[11px] font-mono">
              Hospital: (02) 8652-0112
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotline by agency or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hotline Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700/60 rounded-xl">
                    {getCategoryIcon(contact.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {contact.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {contact.category}
                    </span>
                  </div>
                </div>

                {contact.is24_7 && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[9px] font-bold rounded-full shrink-0">
                    24/7 OPEN
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {contact.description}
              </p>

              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{contact.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
              {/* Primary Call Link */}
              <a
                href={`tel:${contact.phonePrimary.replace(/[^0-9+]/g, '')}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contact.phonePrimary}</span>
              </a>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(contact.id, contact.phonePrimary)}
                className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition-colors"
                title="Copy Number"
              >
                {copiedId === contact.id ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
