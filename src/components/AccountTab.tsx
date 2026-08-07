import React from 'react';
import { User, Shield, HeartPulse, LogOut, Award, MapPin, Phone, CheckCircle2, Clock } from 'lucide-react';
import { UserProfile } from '../types';

interface AccountTabProps {
  user: UserProfile;
  onLogout: () => void;
}

export const AccountTab: React.FC<AccountTabProps> = ({ user, onLogout }) => {
  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Blue & White Official Binangonan Resident ID Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-800 text-white rounded-3xl p-5 border-2 border-blue-400 shadow-lg space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white text-blue-800 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-blue-200 shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {user.name}
                </h2>
                {user.isSeniorCitizen && (
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-900 font-black text-[10px] rounded-full uppercase shadow-xs">
                    Senior Citizen
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100 font-semibold">{user.email}</p>
              <div className="flex items-center gap-1 text-[11px] text-blue-200 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                <span>{user.barangay}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>

        {/* Resident ID Details */}
        <div className="grid grid-cols-2 gap-2 bg-blue-950/60 p-3 rounded-2xl border border-blue-700/60 text-xs">
          <div>
            <span className="text-blue-300 text-[10px] font-bold block uppercase">
              Binangonan Resident ID:
            </span>
            <span className="text-white font-mono font-bold">
              {user.seniorIdNumber || 'BNG-RES-2026-901'}
            </span>
          </div>

          <div>
            <span className="text-blue-300 text-[10px] font-bold block uppercase">
              Registered Hotline:
            </span>
            <span className="text-white font-mono font-bold">
              {user.contactNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Senior Special Discounts & OSCA Privileges */}
      {user.isSeniorCitizen && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <span>AKING OSCA SENIOR CITIZEN BENEFITS (BINANGONAN)</span>
          </div>

          <ul className="text-xs text-amber-900 dark:text-amber-100 space-y-1.5 font-medium leading-relaxed pl-1">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>20% OSCA Discount + 12% VAT Exemption</strong> sa mga gamot at reseta sa Mercury Drug / Southstar Binangonan.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Free Priority Pass & Medical Checkup</strong> sa Pag-asa Hospital at MDRRMO Health Center.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>20% Fare Discount</strong> sa mga passenger banca sa Pritil Port at jeepney pabalik ng Angono/Taytay.</span>
            </li>
          </ul>
        </div>
      )}

      {/* Quick Resident Account Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-200 dark:border-slate-700 p-4 space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
          MGA SERBISYO NG AKING ACCOUNT
        </h3>

        <div className="space-y-2">
          <a
            href="tel:0286521875"
            className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5" />
              <span>Tawagan ang MDRRMO Emergency hotline</span>
            </div>
            <span className="font-mono text-xs">(02) 8652-1875</span>
          </a>

          <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-300">
            <span>Barangay Clearance Status</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">Approved / Ready</span>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-300">
            <span>Cedula / Community Tax Certificate</span>
            <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-bold">2026 Updated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
