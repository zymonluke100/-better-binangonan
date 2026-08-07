import React from 'react';
import { Trash2, X, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface WasteScheduleModalProps {
  onClose: () => void;
}

export const WasteScheduleModal: React.FC<WasteScheduleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">MENRO Waste Collection Schedule</h3>
              <p className="text-[11px] text-teal-200">Binangonan Municipal Environmental Office</p>
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
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-teal-900 dark:text-teal-200 space-y-1">
            <h4 className="font-bold text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Segregation at Source Ordinance</span>
            </h4>
            <p className="text-[11px] leading-normal">
              Garbage trucks will only collect properly segregated trash in closed bins or sacks starting 6:00 AM on scheduled days.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              Zone 1 (Calumpang, Bilibiran, Darangan, Lunsad, Libis)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Biodegradable</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">Mon / Wed / Fri</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-sky-600 dark:text-sky-400 block">Non-Biodegradable</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">Tue / Thu / Sat</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              Zone 2 (Pantok, Muzon, Pag-asa, Tagpos, San Carlos)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Biodegradable</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">Tue / Thu / Sat</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-sky-600 dark:text-sky-400 block">Non-Biodegradable</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">Mon / Wed / Fri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
