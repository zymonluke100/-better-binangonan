import React from 'react';
import { CloudDrizzle, Fuel, DollarSign, History, Building2, ChevronRight, Navigation } from 'lucide-react';
import { WeatherData, FuelPrice, TrafficReport } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CityAtAGlanceProps {
  weather: WeatherData;
  fuelPrices: FuelPrice[];
  forex: { currency: string; rate: number; change: string; isUp: boolean };
  trafficList: TrafficReport[];
  onOpenWeatherModal: () => void;
  onOpenFuelPrices: () => void;
  onOpenPesoChecker: () => void;
  onOpenHistory: () => void;
  onOpenDirectory: () => void;
  onSelectTab: (tab: any) => void;
}

export const CityAtAGlance: React.FC<CityAtAGlanceProps> = ({
  weather,
  fuelPrices,
  forex,
  trafficList,
  onOpenWeatherModal,
  onOpenFuelPrices,
  onOpenPesoChecker,
  onOpenHistory,
  onOpenDirectory,
  onSelectTab,
}) => {
  const { t } = useLanguage();
  const mainFuel = fuelPrices[0] || { type: 'RON 91 / LITER', price: 62.40, change: '-₱0.50' };
  const heavyTrafficCount = trafficList.filter(t => t.status === 'Heavy' || t.status === 'Standstill').length;

  return (
    <div className="space-y-4">
      {/* City at a Glance Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {t('BUOD NG BAYAN NG BINANGONAN', 'City at a Glance')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('Kasalukuyang impormasyon at status ng bayan', 'Current local information and useful metrics')}
          </p>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weather Widget Card */}
        <button
          onClick={onOpenWeatherModal}
          className="flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/50 rounded-xl text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
              <CloudDrizzle className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-full border border-sky-100 dark:border-sky-800">
              Binangonan
            </span>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {weather.temp}°C
            </span>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {t('Lagay ng Panahon', 'Local Weather')}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {weather.condition} • {t('Ramdam', 'Feels')} {weather.feelsLike}°
            </p>
          </div>
        </button>

        {/* Fuel Prices Card */}
        <button
          onClick={onOpenFuelPrices}
          className="flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <Fuel className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {mainFuel.type.split(' ')[0]}
            </span>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ₱{mainFuel.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${mainFuel.isUp ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                {mainFuel.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {t('Gasolina sa Mainland', 'Mainland Gas Stations')}
            </p>
          </div>
        </button>

        {/* Forex Card */}
        <button
          onClick={onOpenPesoChecker}
          className="flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              USD - PHP
            </span>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ₱{forex.rate.toFixed(2)}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {forex.change}
            </p>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              {t('Palitan ng Piso', 'Peso Rate Checker')}
            </p>
          </div>
        </button>

        {/* Traffic Status Quick Card */}
        <button
          onClick={() => onSelectTab('updates')}
          className="flex flex-col justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
              <Navigation className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              heavyTrafficCount > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}>
              {heavyTrafficCount > 0 ? `${heavyTrafficCount} ` + t('Mabagal', 'Slow') : t('Ligtas / Maluwag', 'Passable')}
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Manila East
            </span>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {t('Ulat sa Trapiko', 'Traffic Reports')}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              Calumpang, Darangan & Pantok
            </p>
          </div>
        </button>
      </div>

      {/* City Information Section */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {t('IMPORMASYON NG BAYAN', 'City Information')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('Tanggapan, kasaysayan, hotlines, at pasilidad sa 40 barangay', 'Offices, history, hotlines, and 40 barangays')}
            </p>
          </div>
          <button
            onClick={onOpenDirectory}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5"
          >
            <span>{t('Tingnan Lahat', 'View all')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* City History */}
          <button
            onClick={onOpenHistory}
            className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform mb-2">
              <History className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {t('Kasaysayan ng Bayan', 'City History')}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {t('Tuklasin ang pamana ng Binangonan', "Explore Binangonan's story")}
            </p>
          </button>

          {/* City Directory */}
          <button
            onClick={onOpenDirectory}
            className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t('Direktoryo ng LGU', 'City Directory')}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {t('40 Barangays, tanggapan at hotlines', '40 Barangays, offices & hotlines')}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
