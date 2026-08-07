import React, { useRef } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, QrCode, Download, Printer, X, MapPin, Award, CheckCircle2, Building2, User, Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ResidentDigitalIDModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const ResidentDigitalIDModal: React.FC<ResidentDigitalIDModalProps> = ({ user, onClose }) => {
  const { t } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const getSectorBg = () => {
    if (user.sector === 'Senior Citizen' || user.isSeniorCitizen) return 'from-amber-600 via-amber-700 to-amber-900';
    if (user.sector === 'PWD') return 'from-emerald-600 via-emerald-700 to-emerald-900';
    if (user.sector === 'Solo Parent') return 'from-purple-600 via-purple-700 to-purple-900';
    return 'from-blue-700 via-blue-800 to-slate-900';
  };

  const qrDataString = encodeURIComponent(
    `BINANGONAN_LGU_OFFICIAL_RESIDENT|ID:${user.residentId}|NAME:${user.name}|BRGY:${user.barangay}|SECTOR:${user.sector}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base tracking-tight">
                {t('OPISYAL NA DIGITAL RESIDENT ID', 'OFFICIAL RESIDENT DIGITAL ID PASS')}
              </h3>
              <p className="text-[11px] text-slate-300">
                {t('Awtomatikong Nairehistro sa LGU Binangonan Database', 'Verified Binangonan LGU Citizen Record')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div
            ref={printRef}
            className={`relative rounded-3xl p-5 text-white bg-gradient-to-br ${getSectorBg()} shadow-xl border-2 border-white/20 overflow-hidden print:m-0 print:shadow-none`}
          >
            {/* Background Seal Watermark */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Building2 className="w-64 h-64 text-white" />
            </div>

            {/* Top LGU Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center font-black text-xs shadow-inner border border-amber-300">
                  <Building2 className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black tracking-widest text-amber-200 uppercase">
                    REPUBLIKA NG PILIPINAS • PROBINSYA NG RIZAL
                  </h4>
                  <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase">
                    PAMAHALAANG BAYAN NG BINANGONAN
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[9px] rounded-md tracking-wider uppercase shadow-xs">
                  {user.sector === 'Senior Citizen' || user.isSeniorCitizen
                    ? 'OSCA SENIOR'
                    : user.sector === 'PWD'
                    ? 'PWD PASS'
                    : user.sector === 'Solo Parent'
                    ? 'SOLO PARENT'
                    : 'RESIDENT PASS'}
                </span>
              </div>
            </div>

            {/* Main ID Details */}
            <div className="grid grid-cols-3 gap-3 my-4 items-center">
              {/* Photo Box */}
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-amber-300/80 shadow-md flex flex-col items-center justify-center text-slate-700 relative overflow-hidden">
                  <User className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 w-full text-center py-1 absolute bottom-0">
                    VERIFIED PHOTO
                  </span>
                </div>
              </div>

              {/* Resident Personal Data */}
              <div className="col-span-2 space-y-1.5 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-blue-200 dark:text-slate-300 block uppercase">
                    PANGALAN / FULL NAME:
                  </span>
                  <p className="font-black text-sm sm:text-base text-white tracking-tight uppercase leading-tight">
                    {user.name}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-blue-200 dark:text-slate-300 block uppercase">
                    PRIMARY RESIDENT KEY:
                  </span>
                  <p className="font-mono font-bold text-xs text-amber-300 bg-black/30 px-2 py-0.5 rounded-md inline-block">
                    {user.residentId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <div>
                    <span className="text-[8px] font-bold text-blue-200 block uppercase">BARANGAY:</span>
                    <p className="font-bold text-white truncate">{user.barangay}</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-blue-200 block uppercase">EDAD / AGE:</span>
                    <p className="font-bold text-white">{user.age || 30} anyos ({user.gender || 'M'})</p>
                  </div>
                </div>

                <div>
                  <span className="text-[8px] font-bold text-blue-200 block uppercase">TIRAHAN / ADDRESS:</span>
                  <p className="font-medium text-[10px] text-blue-100 line-clamp-2 leading-tight">
                    {user.address || `Binangonan, Rizal`}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Barcode / QR Section */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3 bg-black/25 -mx-5 -mb-5 p-3.5 rounded-b-2xl">
              <div className="flex items-center gap-2">
                {/* Generated QR Code via api */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${qrDataString}`}
                  alt="Resident QR Code"
                  className="w-12 h-12 bg-white p-1 rounded-lg shadow-sm"
                />
                <div>
                  <span className="text-[9px] font-bold text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>LGU DIGITAL VERIFICATION STAMP</span>
                  </span>
                  <p className="text-[9px] text-blue-100">
                    {t('Valid para sa Health, Ayuda, at LGU Services', 'Valid for LGU Services, Health, & Ayuda')}
                  </p>
                  <span className="text-[8px] font-mono text-slate-300">
                    ISSUED: {user.createdAt || '2026-01-01'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-white block">
                  BINANGONAN CONNECT
                </span>
                <span className="text-[8px] font-bold text-amber-300">
                  CITIZEN PASS #2026
                </span>
              </div>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <h5 className="font-bold text-xs">
                {t('Opisyal na Verified Resident Account', 'Official Verified Resident Account')}
              </h5>
              <p className="mt-0.5 leading-relaxed text-[11px]">
                {t(
                  'Ang ID pass na ito ay nagpapatunay na kayo ay opisyal na nakarehistrong mamamayan ng Binangonan. Maaari itong ipakita sa Municipal Hall, Pag-asa Hospital, at Barangay Center.',
                  'This ID pass confirms your registered citizen status in Binangonan, Rizal. You can present this at Municipal Hall, Pag-asa Hospital, and Barangay Centers.'
                )}
              </p>
            </div>
          </div>

          {/* Print & Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t('I-PRINT / DOWNLOAD DIGITAL ID PASS', 'PRINT / DOWNLOAD ID PASS')}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              {t('Isara', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
