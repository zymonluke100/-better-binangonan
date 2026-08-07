import React from 'react';
import { Shield, PhoneCall, Bot, UserCheck, Sun, Moon, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenEmergency: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  user: UserProfile | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language: 'tagalog' | 'english';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenEmergency,
  user,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white border-b border-sky-800 shadow-md">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Badge */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sm flex items-center justify-center font-black text-lg border border-sky-300 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="font-black text-sm sm:text-base text-white tracking-tight leading-none group-hover:text-sky-300 transition-colors">
                BINANGONAN
              </h1>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/30 rounded-full">
                Rizal
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-sky-200 font-medium">
              {language === 'tagalog' ? 'Bayan ng Binangonan App' : 'Municipality Resident Portal'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Selector */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all border border-white/20"
            title="Switch Language / Palitan ang Wika"
          >
            <Globe className="w-3.5 h-3.5 text-sky-300" />
            <span className="uppercase text-[11px]">{language === 'tagalog' ? 'TL' : 'EN'}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-sky-200" />
            )}
          </button>

          {/* Account Profile Button */}
          {user && (
            <button
              onClick={() => onSelectTab('account')}
              className={`flex items-center gap-1 px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeTab === 'account'
                  ? 'bg-sky-500 text-white border-sky-300 shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline truncate max-w-[80px]">{user.name.split(' ')[0]}</span>
            </button>
          )}

          {/* Ask AI Button */}
          <button
            onClick={() => onSelectTab('ai')}
            className={`flex items-center gap-1 px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'ai'
                ? 'bg-sky-500 text-white border-sky-300 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{language === 'tagalog' ? 'Gabay AI' : 'Ask AI'}</span>
          </button>

          {/* Emergency Hotline Quick Dial */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 px-2.5 py-1.2 sm:px-3 sm:py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all border border-rose-500"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">
              {language === 'tagalog' ? 'HOTLINES' : 'HELP'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};


