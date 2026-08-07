import React, { useState } from 'react';
import { Building2, Search, MapPin, User, Phone, ShieldCheck, Ship, ChevronRight, Globe, Mail } from 'lucide-react';
import { BARANGAYS_LIST, MUNICIPAL_OFFICES } from '../data/binangonanData';
import { useLanguage } from '../context/LanguageContext';

export const CityDirectory: React.FC = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'barangays' | 'offices'>('barangays');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Mainland' | 'Talim Island'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBarangays = BARANGAYS_LIST.filter((b) => {
    const matchesLoc = locationFilter === 'All' || b.locationType === locationFilter;
    if (!searchQuery.trim()) return matchesLoc;

    const normalizedQuery = searchQuery.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
    const normalizedName = b.name.toLowerCase().replace(/[-_\s]+/g, ' ');
    const normalizedCaptain = b.captain.toLowerCase().replace(/[-_\s]+/g, ' ');
    const normalizedAddress = b.hallAddress.toLowerCase().replace(/[-_\s]+/g, ' ');

    const matchesSearch =
      normalizedName.includes(normalizedQuery) ||
      normalizedCaptain.includes(normalizedQuery) ||
      normalizedAddress.includes(normalizedQuery);
    return matchesLoc && matchesSearch;
  });

  const filteredOffices = MUNICIPAL_OFFICES.filter((off) => {
    return (
      !searchQuery ||
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {t('Direktoryo ng Bayan ng Binangonan', 'Binangonan City Directory')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('Direktoryo ng 40 Barangay (Mainland at Isla ng Talim) at mga Tanggapan ng LGU', 'Directory of 40 Barangays (Mainland & Talim Island) and Municipal LGU Offices')}
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('barangays')}
            className={`py-2 rounded-lg transition-all ${
              activeSubTab === 'barangays'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t('40 Barangay', '40 Barangays')} ({BARANGAYS_LIST.length})
          </button>
          <button
            onClick={() => setActiveSubTab('offices')}
            className={`py-2 rounded-lg transition-all ${
              activeSubTab === 'offices'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t('Tanggapan ng LGU', 'LGU Municipal Offices')} ({MUNICIPAL_OFFICES.length})
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeSubTab === 'barangays'
                ? t('Maghanap ng barangay, kapitan, address...', 'Search barangay, captain, address...')
                : t('Maghanap ng tanggapan o serbisyo...', 'Search municipal office or service...')
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        {activeSubTab === 'barangays' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['All', 'Mainland', 'Talim Island'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  locationFilter === loc
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {loc === 'All' ? 'All Barangays' : loc}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BARANGAYS LIST */}
      {activeSubTab === 'barangays' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredBarangays.map((b) => (
            <div
              key={b.name}
              className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Brgy. {b.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Est. Pop: {b.populationEst}
                  </p>
                </div>

                <span
                  className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                    b.locationType === 'Talim Island'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {b.locationType}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Captain: <strong>{b.captain}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{b.hallAddress}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <a
                  href={`tel:${b.contact}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-sky-950 text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {b.contact}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MUNICIPAL OFFICES */}
      {activeSubTab === 'offices' && (
        <div className="space-y-3">
          {filteredOffices.map((off) => (
            <div
              key={off.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {off.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Head: {off.head}</p>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{off.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{off.email}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Key Services Offered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {off.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium rounded-lg"
                    >
                      • {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <a
                  href={`tel:${off.contact.split('/')[0].trim()}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Office ({off.contact})</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
