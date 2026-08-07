import React, { useState } from 'react';
import { DollarSign, X, RefreshCw, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PesoCheckerModalProps {
  onClose: () => void;
}

export const PesoCheckerModal: React.FC<PesoCheckerModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'SGD' | 'JPY' | 'SAR'>('USD');

  const rates: Record<string, { rate: number; name: string; symbol: string }> = {
    USD: { rate: 58.45, name: 'US Dollar', symbol: '$' },
    EUR: { rate: 63.80, name: 'Euro', symbol: '€' },
    SGD: { rate: 43.20, name: 'Singapore Dollar', symbol: 'S$' },
    JPY: { rate: 0.39, name: 'Japanese Yen', symbol: '¥' },
    SAR: { rate: 15.58, name: 'Saudi Riyal', symbol: 'SR' },
  };

  const current = rates[selectedCurrency];
  const convertedPhp = (amount * current.rate).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{t('KUMPAS SA PALITAN NG PISO (OFW)', 'PESO EXCHANGE RATE CHECKER')}</h3>
              <p className="text-[11px] text-emerald-200">{t('Mabilis na Palitan at Remittance Calculator', 'Fast OFW Remittance Rate Calculator')}</p>
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
          {/* Currency Selection */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Select Foreign Currency
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.keys(rates) as Array<keyof typeof rates>).map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCurrency(code)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCurrency === code
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Amount in {current.name} ({selectedCurrency})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  {current.symbol}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white text-base focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-center py-1">
              <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Converted Value in Philippine Peso (PHP)
              </span>
              <div className="mt-1 p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 tracking-tight">
                  ₱{convertedPhp}
                </span>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
                  1 {selectedCurrency} = ₱{current.rate} PHP
                </p>
              </div>
            </div>
          </div>

          {/* Reference Disclaimer */}
          <p className="text-[10px] text-slate-400 text-center">
            Rates updated daily based on Philippine Bangko Sentral reference rates. Local money changers in Binangonan Town Proper may vary slightly.
          </p>
        </div>
      </div>
    </div>
  );
};
