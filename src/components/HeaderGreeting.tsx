import React from 'react';
import { MapPin, Sun, CloudRain, ShieldCheck } from 'lucide-react';
import { WeatherData } from '../types';

interface HeaderGreetingProps {
  weather: WeatherData;
  onOpenWeatherModal: () => void;
}

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({ weather, onOpenWeatherModal }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Magandang Umaga, Binangoneño!';
    if (hour < 18) return 'Magandang Hapon, Binangoneño!';
    return 'Magandang Gabi, Binangoneño!';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md border border-sky-800/60 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Binangonan Town Proper & Talim Island</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="text-slate-300">ZIP 1940</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {getGreeting()}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            MDRRMO Updates, Panahon, Hotlines, at LGU Directory.
          </p>
        </div>

        {/* Quick Weather Button */}
        <button
          onClick={onOpenWeatherModal}
          className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-left transition-all group shrink-0"
        >
          <div className="p-2 bg-sky-500/20 rounded-lg text-sky-300 group-hover:scale-110 transition-transform">
            {weather.rainChance > 30 ? (
              <CloudRain className="w-5 h-5 text-sky-300" />
            ) : (
              <Sun className="w-5 h-5 text-amber-300" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold leading-none">{weather.temp}°C</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-medium">
                {weather.rainChance}% Rain
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 font-medium">
              {weather.condition}
            </p>
          </div>
        </button>
      </div>

      {/* Trust Badge */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Opisyal na LGU Hotline & Emergency Services</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">RIZAL 4th DIST</span>
      </div>
    </div>
  );
};

