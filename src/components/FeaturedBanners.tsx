import React, { useState } from 'react';
import { DollarSign, Ship, Navigation, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedBannersProps {
  onOpenPesoChecker: () => void;
  onOpenFerry: () => void;
  onSelectTab: (tab: any) => void;
  onOpenHistory: () => void;
}

export const FeaturedBanners: React.FC<FeaturedBannersProps> = ({
  onOpenPesoChecker,
  onOpenFerry,
  onSelectTab,
  onOpenHistory,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useLanguage();

  const banners = [
    {
      id: 'peso',
      badge: t('PALITAN NG PISO', 'PESO RATE CHECKER'),
      title: t("Suriin ang palitan ng piso ngayon", "Check today's peso value"),
      description: t('Impormasyon sa palitan ng Piso sa Dollar (USD), Euro, SGD, at Yen.', 'PHP reference rates for major foreign currencies (USD, EUR, SGD, JPY).'),
      buttonText: t('Tingnan ang Rate', 'View Rates'),
      gradient: 'from-teal-900 via-emerald-800 to-slate-900',
      icon: DollarSign,
      action: onOpenPesoChecker,
      accentBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'ferry',
      badge: t('BYAHE SA ISLA NG TALIM', 'TALIM ISLAND COMMUTE'),
      title: t('Iskedyul ng Bangka sa Pritil at Pila-pila', 'Pritil & Pila-pila Ferry Schedules'),
      description: t('Araw-araw na biyahe ng passenger banca patungong Janosa, Subay, Rayap & Habagatan.', 'Daily passenger banca departures to Janosa, Subay, Rayap & Habagatan.'),
      buttonText: t('Tingnan ang Byahe', 'Check Schedule'),
      gradient: 'from-sky-950 via-blue-900 to-slate-900',
      icon: Ship,
      action: onOpenFerry,
      accentBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    {
      id: 'traffic',
      badge: t('ULAT SA TRAPIKO AT KALSADA', 'TRAFFIC & ROAD ADVISORY'),
      title: t('Kasalukuyang Trapiko sa Manila East Road', 'Manila East Road Live Status'),
      description: t('Tingnan ang lagay ng kalsada sa Calumpang, Darangan, at Quarry Road bago bumiyahe.', 'Check Calumpang, Darangan, & Quarry Road bottlenecks before driving.'),
      buttonText: t('Tingnan ang Trapiko', 'View Traffic Map'),
      gradient: 'from-amber-950 via-orange-900 to-slate-900',
      icon: Navigation,
      action: () => onSelectTab('updates'),
      accentBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'history',
      badge: t('KASAYSAYAN NG BINANGONAN', 'BINANGONAN HERITAGE'),
      title: t('Tuklasin ang Kasaysayan ng Bayan', 'Discover Our City History'),
      description: t('Alamin ang tungkol sa Santa Ursula Church, Angono-Binangonan Petroglyphs, at pamana mula 1621.', 'Learn about Santa Ursula Church, Petroglyphs, and 1621 Franciscan heritage.'),
      buttonText: t('Basahin ang Kwento', 'Explore Story'),
      gradient: 'from-indigo-950 via-slate-900 to-sky-950',
      icon: Landmark,
      action: onOpenHistory,
      accentBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
  ];

  const current = banners[activeSlide];
  const Icon = current.icon;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {t('MGA TAMPOK NA SERBISYO', 'Featured Services')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('Makabuluhang impormasyon mula sa Pamahalaang Bayan ng Binangonan', 'Useful tools and advisories for Binangonan residents')}
          </p>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center gap-1.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeSlide ? 'w-5 bg-sky-600 dark:bg-sky-400' : 'w-1.5 bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Banner Card */}
      <div 
        onClick={current.action}
        className={`relative rounded-2xl bg-gradient-to-r ${current.gradient} text-white p-5 shadow-sm border border-white/10 cursor-pointer group overflow-hidden transition-all duration-300`}
      >
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-[80%]">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold tracking-wide rounded-full border ${current.accentBg}`}>
              <Icon className="w-3 h-3" />
              {current.badge}
            </span>
            <h4 className="text-lg font-bold tracking-tight leading-snug group-hover:text-sky-300 transition-colors">
              {current.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              {current.description}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors shadow-xs">
                {current.buttonText}
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white group-hover:scale-110 transition-transform shrink-0">
            <Icon className="w-8 h-8 text-sky-300" />
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/40 hover:bg-black/60 backdrop-blur-xs rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/40 hover:bg-black/60 backdrop-blur-xs rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
