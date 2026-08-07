import React from 'react';
import { Fuel, HeartPulse, Ship, Trash2, FileText, ChevronRight, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ResidentServicesProps {
  onOpenFuelPrices: () => void;
  onOpenHealth: () => void;
  onOpenEmergency: () => void;
  onOpenFerrySchedule: () => void;
  onOpenWasteSchedule: () => void;
  onOpenPermits: () => void;
  onOpenPesoChecker: () => void;
}

export const ResidentServices: React.FC<ResidentServicesProps> = ({
  onOpenFuelPrices,
  onOpenHealth,
  onOpenEmergency,
  onOpenFerrySchedule,
  onOpenWasteSchedule,
  onOpenPermits,
  onOpenPesoChecker,
}) => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'fuel',
      title: t('Presyo ng Gasolina', 'Fuel Rates'),
      status: t('Petron & Shell Update', 'Petron & Shell Live'),
      icon: Fuel,
      color: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      action: onOpenFuelPrices,
    },
    {
      id: 'health',
      title: t('Ospital & Health', 'Health & Hospital'),
      status: t('MDRRMO / Pag-asa', 'MDRRMO / Emergency'),
      icon: HeartPulse,
      color: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      action: onOpenHealth,
    },
    {
      id: 'peso',
      title: t('Peso Exchange Rate', 'Peso Exchange Rates'),
      status: t('Palitan ng Dolyar', 'Dollar / Foreign Currency'),
      icon: DollarSign,
      color: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      action: onOpenPesoChecker,
    },
    {
      id: 'ferry',
      title: t('Bangka / Ferry Schedule', 'Ferry Boat Schedule'),
      status: t('Pritil & Talim Island', 'Pritil Wharf & Talim'),
      icon: Ship,
      color: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800',
      action: onOpenFerrySchedule,
    },
    {
      id: 'waste',
      title: t('Hakot ng Basura', 'Garbage Schedule'),
      status: t('MENRO Binangonan', 'MENRO Environmental'),
      icon: Trash2,
      color: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      action: onOpenWasteSchedule,
    },
    {
      id: 'permits',
      title: t('Cedula at Clearance', 'Permits & Clearances'),
      status: t('Barangay & Municipal', 'Barangay & LGU Hall'),
      icon: FileText,
      color: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
      action: onOpenPermits,
    },
  ];

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {t('MGA PANGUNAHING SERBISYO', 'KEY LGU SERVICES')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('Mabilis na access sa mga serbisyo ng Binangonan LGU', 'Quick access to Binangonan Municipal LGU services')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <button
              key={srv.id}
              onClick={srv.action}
              className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 shadow-xs hover:shadow-md transition-all text-left group active:scale-98"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-2 rounded-lg border shrink-0 ${srv.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {srv.status}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

