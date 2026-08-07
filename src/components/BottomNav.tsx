import React from 'react';
import { Home, Building2, Radio, AlertTriangle, UserCheck } from 'lucide-react';
import { NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unresolvedReportsCount?: number;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unresolvedReportsCount = 0,
}) => {
  const { t } = useLanguage();

  const tabs: NavItem[] = [
    { id: 'home', label: t('Tahanan', 'Home'), icon: Home },
    { id: 'services', label: t('LGU Offices', 'LGU Directory'), icon: Building2 },
    { id: 'updates', label: t('Balita & Reports', 'News & Reports'), icon: Radio, badge: unresolvedReportsCount > 0 ? unresolvedReportsCount : null },
    { id: 'emergency', label: t('Emergency', 'Emergency'), icon: AlertTriangle },
    { id: 'account', label: t('Akaun', 'Account'), icon: UserCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="max-w-md sm:max-w-xl mx-auto px-1 flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as NavTab)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-bold bg-sky-50/80 dark:bg-sky-950/40 border-t-2 border-sky-500'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isActive ? 'scale-110 text-sky-600 dark:text-sky-400' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

