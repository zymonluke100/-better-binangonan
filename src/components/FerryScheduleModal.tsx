import React from 'react';
import { Ship, X, Clock, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';

interface FerryScheduleModalProps {
  onClose: () => void;
}

export const FerryScheduleModal: React.FC<FerryScheduleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Talim Island Ferry & Banca Guide</h3>
              <p className="text-[11px] text-sky-200">Pritil Port & Pila-pila Port Passenger Departures</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          {/* Safety Notice */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-emerald-900 dark:text-emerald-200 space-y-0.5">
              <h4 className="font-bold text-xs">Coast Guard Safety Status: CLEARED</h4>
              <p className="text-[11px]">
                Lake water condition on Laguna de Bay is normal. All passengers are required by Philippine Coast Guard to wear life vests upon boarding.
              </p>
            </div>
          </div>

          {/* Pritil Port Schedule */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Pritil Port (Brgy. Libis Mainland)</span>
              </h4>
              <span className="text-[10px] bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 px-2 py-0.5 font-bold rounded-full">
                Main Island Hub
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Pritil ➔ Brgy. Janosa (Mt. Tagapo Trail)</span>
                  <span className="text-[10px] text-slate-500">Every 45 mins • Fare: ₱40.00</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">5:30 AM - 6:30 PM</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Pritil ➔ Brgy. Limbon-limbon Coastal Wharf</span>
                  <span className="text-[10px] text-slate-500">Every 40 mins • Fare: ₱35.00</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">5:30 AM - 6:00 PM</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Pritil ➔ Subay / Habagatan</span>
                  <span className="text-[10px] text-slate-500">Hourly departures • Fare: ₱35.00</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">6:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Pila-pila Port Schedule */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Pila-pila Dock Station</span>
              </h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 font-bold rounded-full">
                Southern Route
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Pila-pila ➔ Rayap / Tabon Island</span>
                <span className="text-[10px] text-slate-500">Every 1 hour • Fare: ₱30.00</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">6:00 AM - 5:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
