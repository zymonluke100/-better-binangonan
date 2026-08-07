import React, { useState } from 'react';
import { ShieldCheck, Info, FileText, Lock, Globe, Heart, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LegalDisclaimerFooter: React.FC = () => {
  const { t } = useLanguage();
  const [showLegalModal, setShowLegalModal] = useState(false);

  return (
    <footer className="mt-8 pt-6 pb-8 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-md sm:max-w-xl mx-auto space-y-3 px-2 text-center">
        {/* Civic Tech Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t('OPISYAL NA RESIDENT & CIVIC PORTAL', 'CIVIC TECH & CITIZEN TRANSPARENCY PORTAL')}</span>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          {t(
            'Binuo para sa mga residente at mamamayan ng Bayan ng Binangonan, Rizal. Nagbibigay ng direktang access sa emergency hotlines, barangay directory, commuting schedules, at public services.',
            'Developed for the residents and visitors of the Municipality of Binangonan, Rizal. Providing 1-tap access to emergency hotlines, 40 barangay directories, commuting schedules, and public LGU services.'
          )}
        </p>

        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-semibold">
          <button
            onClick={() => setShowLegalModal(true)}
            className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t('Legal, Privacy & Copyright Notice', 'Legal, Privacy & Copyright Notice')}</span>
          </button>
        </div>

        <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          © {new Date().getFullYear()} Binangonan Connect • {t('Lahat ng Karapatan ay Naaayon sa Batas', 'All Rights Reserved')}
        </p>
      </div>

      {/* Legal & Copyright Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base">
                  {t('Pahayag sa Legal, Copyright, at Data Privacy', 'Legal, Copyright & Data Privacy Notice')}
                </h3>
              </div>
              <button
                onClick={() => setShowLegalModal(false)}
                className="p-1 hover:bg-white/20 rounded-lg text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-h-[75vh] overflow-y-auto font-sans">
              {/* Section 1: Non-Commercial & Open Civic Purpose */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-sky-500" />
                  <span>1. {t('Layunin at Angkop na Gamit', 'Civic Tech Purpose')}</span>
                </h4>
                <p>
                  {t(
                    'Ang aplikasyong ito ay binuo bilang isang civic-tech public utility portal para sa mga mamamayan ng Binangonan, Rizal. Wala itong komersyal o moneryaryong pakinabang at hindi nagbebenta ng anumang produkto o serbisyo.',
                    'This application operates as a community-first civic technology platform designed to empower citizens and residents of Binangonan, Rizal with easy access to public info, schedules, and emergency contacts.'
                  )}
                </p>
              </div>

              {/* Section 2: Intellectual Property & Trademark Protection */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>2. {t('Karapatan sa Ari-Arian (Copyright & Trademarks)', 'Intellectual Property & Copyright')}</span>
                </h4>
                <p>
                  {t(
                    'Lahat ng opisyal na pangalan ng tanggapan (hal. MDRRMO, MENRO, PNP Binangonan, Pag-asa Hospital), tatak, at sagisag ay mananatiling pagmamay-ari ng Pamahalaang Bayan ng Binangonan at kani-kanilang mga ahensya. Ang pagbanggit ay para lamang sa layunin ng pampublikong impormasyon at pagtulong.',
                    'All government agency names (MDRRMO, MENRO, PNP Binangonan, Pag-asa Hospital), symbols, and references belong exclusively to their respective government entities. Mention of these names is solely for public assistance and reference.'
                  )}
                </p>
              </div>

              {/* Section 3: Data Privacy Act (RA 10173) */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span>3. {t('Proteksyon sa Datos (RA 10173 Data Privacy)', 'Data Privacy & Resident Protection')}</span>
                </h4>
                <p>
                  {t(
                    'Sumusunod ang platform sa Philippine Data Privacy Act of 2012 (RA 10173). Ang impormasyong ipinapasok ng residente (hal. pangalan, barangay) ay lokal lamang na nakaimbak sa browser at hindi ibinabahagi o ibinebenta sa anumang ikatlong partido.',
                    'In full compliance with the Philippine Data Privacy Act of 2012 (RA 10173), all user inputs and profile details are stored strictly locally in browser storage and are never collected, profiled, or transferred to external third parties.'
                  )}
                </p>
              </div>

              {/* Section 4: Emergency Hotlines Notice */}
              <div className="space-y-1 bg-rose-50 dark:bg-rose-950/30 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900/40">
                <h4 className="font-bold text-rose-900 dark:text-rose-200 text-xs flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>4. {t('Pang-sakuna at Emergency Hotlines', 'Emergency Dispatch Policy')}</span>
                </h4>
                <p>
                  {t(
                    'Sa mga kritikal na sakuna at medikal na emergency, direktang tumawag sa MDRRMO Binangonan hotline na (02) 8652-1875 o PNP Binangonan (02) 8652-0123.',
                    'For life-threatening emergencies or medical rescue, please dial MDRRMO Binangonan hotline directly at (02) 8652-1875 or PNP Binangonan at (02) 8652-0123.'
                  )}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowLegalModal(false)}
                  className="px-5 py-2 bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
                >
                  {t('Naintindihan Ko', 'I Understand')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
