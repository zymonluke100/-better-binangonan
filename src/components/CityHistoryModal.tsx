import React from 'react';
import { Landmark, X, Calendar, MapPin, Sparkles, Award } from 'lucide-react';
import { CITY_HISTORY_INFO } from '../data/binangonanData';

interface CityHistoryModalProps {
  onClose: () => void;
}

export const CityHistoryModal: React.FC<CityHistoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg max-h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{CITY_HISTORY_INFO.title}</h3>
              <p className="text-[11px] text-sky-200">{CITY_HISTORY_INFO.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto text-xs">
          {/* Fast Facts Badge */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Founded Year</span>
              <span className="text-lg font-black text-sky-600 dark:text-sky-400">{CITY_HISTORY_INFO.foundedYear}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Patron Saint</span>
              <span className="text-lg font-black text-sky-600 dark:text-sky-400">{CITY_HISTORY_INFO.patronSaint}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
              About Binangonan
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {CITY_HISTORY_INFO.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Cultural Landmarks & History</span>
            </h4>

            <div className="space-y-2">
              {CITY_HISTORY_INFO.keyHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1"
                >
                  <h5 className="font-bold text-slate-900 dark:text-sky-300 text-xs">
                    {hl.title}
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-normal">
                    {hl.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
