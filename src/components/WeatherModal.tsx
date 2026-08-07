import React from 'react';
import { CloudRain, Sun, Wind, Droplets, Eye, X, Umbrella, AlertTriangle } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherModalProps {
  weather: WeatherData;
  onClose: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ weather, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Binangonan Weather Advisory</h3>
              <p className="text-[11px] text-sky-200">Rizal Coastal & Lake Weather Update</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs">
          {/* Main Weather Card */}
          <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black tracking-tight">{weather.temp}°C</span>
                <p className="text-xs font-semibold text-sky-100">{weather.condition}</p>
                <p className="text-[11px] text-sky-200 mt-0.5">Feels like {weather.feelsLike}°C</p>
              </div>
              <Umbrella className="w-12 h-12 text-sky-200 opacity-80" />
            </div>

            <p className="text-xs text-sky-100 bg-black/15 p-2.5 rounded-xl border border-white/10 leading-relaxed">
              {weather.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Droplets className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">Humidity</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{weather.humidity}%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Wind className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">Wind</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{weather.windSpeed} km/h</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Eye className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block font-semibold">UV Index</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{weather.uvIndex} (Mod)</span>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              5-Day Binangonan Forecast
            </h4>
            <div className="grid grid-cols-5 gap-1 text-center">
              {weather.forecast.map((f, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1"
                >
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">{f.day}</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">{f.temp}°C</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
