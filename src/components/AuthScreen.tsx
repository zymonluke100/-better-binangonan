import React, { useState } from 'react';
import { Shield, UserCheck, Heart, LogIn, ArrowRight, Sparkles, CheckCircle2, Mail } from 'lucide-react';
import { UserProfile } from '../types';
import { BARANGAYS_LIST } from '../data/binangonanData';

interface AuthScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [barangay, setBarangay] = useState('Brgy. Calumpang');
  const [isSenior, setIsSenior] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Paki-lagay po ang inyong Email Address.');
      return;
    }
    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    onLogin({
      name: formattedName || 'Binangonan Resident',
      email: email,
      barangay: barangay.startsWith('Brgy.') ? barangay : `Brgy. ${barangay}`,
      isSeniorCitizen: isSenior,
      seniorIdNumber: isSenior ? 'BNG-SR-2026-889' : undefined,
      contactNumber: '0917-555-0192',
      isLoggedIn: true,
    });
  };

  const handleDemoLogin = (type: 'senior' | 'resident') => {
    if (type === 'senior') {
      onLogin({
        name: 'Lolo Juan Dela Cruz',
        email: 'juan.delacruz@binangonan.ph',
        barangay: 'Brgy. Calumpang, Binangonan',
        isSeniorCitizen: true,
        seniorIdNumber: 'BNG-SR-2026-7890',
        contactNumber: '0918-123-4567',
        isLoggedIn: true,
      });
    } else {
      onLogin({
        name: 'Maria Santos (Resident)',
        email: 'maria.santos@binangonan.ph',
        barangay: 'Brgy. Darangan, Binangonan',
        isSeniorCitizen: false,
        contactNumber: '0920-987-6543',
        isLoggedIn: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-blue-600 shadow-xl overflow-hidden">
        {/* Header - Binangonan Official Blue */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-sky-700 text-white p-6 text-center space-y-2 relative">
          <div className="w-16 h-16 bg-white text-blue-800 rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-blue-200">
            <Shield className="w-9 h-9 text-blue-700" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            BAYAN NG BINANGONAN
          </h1>
          <p className="text-sm font-bold text-blue-100 bg-blue-900/40 py-1 px-3 rounded-full inline-block">
            MDRRMO & Resident Official App
          </p>
          <p className="text-xs text-blue-100 font-medium pt-1">
            Blue & White Senior-Friendly Access Portal
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Quick Demo Credentials Box - Easy for User */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              <span>1-TAP DIRECT ACCESS DEMO ACCOUNTS:</span>
            </div>
            
            <p className="text-xs text-blue-800 leading-relaxed font-medium">
              You can instantly sign in using our prepared demo credentials below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('senior')}
                className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 border border-blue-500 transition-all transform active:scale-95"
              >
                <UserCheck className="w-5 h-5" />
                <span>👴 Login as Senior Citizen (Lolo Juan)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('resident')}
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 border border-sky-400 transition-all transform active:scale-95"
              >
                <LogIn className="w-5 h-5" />
                <span>👤 Login as Regular Resident (Maria)</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-xs font-bold uppercase">
              O MAG-LOGIN GAMIT ANG EMAIL
            </span>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4 text-slate-900">
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-bold">
                ⚠️ {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                📧 Email Address / Account:
              </label>
              <input
                type="email"
                placeholder="Halimbawa: resident@binangonan.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 focus:border-blue-600 rounded-xl font-semibold text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                🔒 Password:
              </label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 focus:border-blue-600 rounded-xl font-semibold text-sm text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                📍 Barangay sa Binangonan (Pumili sa 40 Barangays):
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 focus:border-blue-600 rounded-xl font-bold text-sm text-slate-900 focus:outline-none"
              >
                <optgroup label="Mainland Barangays (23)">
                  {BARANGAYS_LIST.filter(b => b.locationType === 'Mainland').map(b => (
                    <option key={b.name} value={`Brgy. ${b.name}`}>
                      Brgy. {b.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Talim Island Barangays (17)">
                  {BARANGAYS_LIST.filter(b => b.locationType === 'Talim Island').map(b => (
                    <option key={b.name} value={`Brgy. ${b.name}`}>
                      Brgy. {b.name} (Talim Island)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <input
                type="checkbox"
                id="seniorCheck"
                checked={isSenior}
                onChange={(e) => setIsSenior(e.target.checked)}
                className="w-5 h-5 text-blue-600 accent-blue-600 rounded"
              />
              <label htmlFor="seniorCheck" className="text-xs sm:text-sm font-bold text-blue-900 cursor-pointer">
                Ako ay Senior Citizen (60 y/o above) / OSCA Member
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-black text-base shadow-lg flex items-center justify-center gap-2 border-2 border-blue-900 transition-all"
            >
              <span>MAG-LOG IN SA AKING ACCOUNT</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Senior friendly notice */}
          <div className="pt-2 text-center text-xs text-slate-500 font-medium">
            <p>
              🔒 Ligtas at Opisyal na Sistema ng Pamahalaang Bayan ng Binangonan, Rizal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
