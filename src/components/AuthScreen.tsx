import React, { useState } from 'react';
import { Shield, UserCheck, Heart, LogIn, ArrowRight, Sparkles, CheckCircle2, Mail, Key, User, MapPin, Phone, Calendar, HeartPulse, UserPlus, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { BARANGAYS_LIST } from '../data/binangonanData';

interface AuthScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [barangay, setBarangay] = useState('Brgy. Calumpang');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('0917-555-0192');
  const [birthDate, setBirthDate] = useState('1992-06-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [civilStatus, setCivilStatus] = useState<'Single' | 'Married' | 'Widowed' | 'Separated'>('Single');
  const [sector, setSector] = useState<'Regular Resident' | 'Senior Citizen' | 'PWD' | 'Solo Parent' | 'Youth / SK'>('Regular Resident');
  const [occupation, setOccupation] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [bloodType, setBloodType] = useState('O+');
  const [voterStatus, setVoterStatus] = useState<'Registered Voter (Binangonan)' | 'Non-Voter'>('Registered Voter (Binangonan)');
  const [errorMessage, setErrorMessage] = useState('');

  const generatePrimaryKey = (sectorType: string) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    if (sectorType === 'Senior Citizen') {
      return `BNG-2026-SR-${randomNum}`;
    } else if (sectorType === 'PWD') {
      return `BNG-2026-PWD-${randomNum}`;
    } else if (sectorType === 'Solo Parent') {
      return `BNG-2026-SP-${randomNum}`;
    }
    return `BNG-2026-RES-${randomNum}`;
  };

  const calculateAge = (bdate: string) => {
    if (!bdate) return 30;
    const birthYear = new Date(bdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return Math.max(1, currentYear - birthYear);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Paki-lagay po ang inyong Email Address.');
      return;
    }

    const calculatedAge = calculateAge(birthDate);
    const isSenior = sector === 'Senior Citizen' || calculatedAge >= 60;
    const residentPrimaryKey = generatePrimaryKey(isSenior ? 'Senior Citizen' : sector);

    let finalName = fullName.trim();
    if (!finalName) {
      const namePart = email.split('@')[0];
      finalName = namePart
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }

    onLogin({
      residentId: residentPrimaryKey, // Primary key assigned
      name: finalName || 'Binangonan Resident',
      email: email,
      barangay: barangay.startsWith('Brgy.') ? barangay : `Brgy. ${barangay}`,
      address: address || `Sitio Proper, ${barangay}, Binangonan, Rizal`,
      birthDate: birthDate,
      age: calculatedAge,
      gender: gender,
      civilStatus: civilStatus,
      occupation: occupation || 'Resident / Private Practitioner',
      contactNumber: contactNumber || '0917-555-0192',
      emergencyContactName: emergencyContactName || 'Kamag-anak / Kapamilya',
      emergencyContactPhone: emergencyContactPhone || '0917-999-0000',
      bloodType: bloodType,
      sector: isSenior ? 'Senior Citizen' : sector,
      isSeniorCitizen: isSenior,
      seniorIdNumber: isSenior ? residentPrimaryKey : undefined,
      voterStatus: voterStatus,
      isLoggedIn: true,
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleDemoLogin = (type: 'senior' | 'resident' | 'limbon') => {
    if (type === 'senior') {
      onLogin({
        residentId: 'BNG-2026-SR-7890',
        name: 'Lolo Juan Dela Cruz',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        email: 'juan.delacruz@binangonan.ph',
        barangay: 'Brgy. Calumpang, Binangonan',
        address: '124 Sitio Libis, Brgy. Calumpang, Binangonan, Rizal',
        birthDate: '1958-04-12',
        age: 68,
        gender: 'Male',
        civilStatus: 'Widowed',
        occupation: 'Retired Teacher',
        contactNumber: '0918-123-4567',
        emergencyContactName: 'Maria Cruz (Anak)',
        emergencyContactPhone: '0917-555-9081',
        bloodType: 'O+',
        householdSize: 4,
        numDependents: 2,
        sector: 'Senior Citizen',
        isSeniorCitizen: true,
        seniorIdNumber: 'BNG-2026-SR-7890',
        voterStatus: 'Registered Voter (Binangonan)',
        isLoggedIn: true,
        createdAt: '2026-01-15'
      });
    } else if (type === 'limbon') {
      onLogin({
        residentId: 'BNG-2026-RES-40118',
        name: 'Pedro Unida (Limbon-limbon)',
        firstName: 'Pedro',
        lastName: 'Unida',
        email: 'pedro.limbon@binangonan.ph',
        barangay: 'Brgy. Limbon-limbon (Mainland)',
        address: 'Purok 2 Coastal Road (Between Pila-pila & Ithan), Brgy. Limbon-limbon, Binangonan, Rizal',
        birthDate: '1985-11-20',
        age: 40,
        gender: 'Male',
        civilStatus: 'Married',
        occupation: 'Fisherman & Local Craftsman',
        contactNumber: '0919-888-2341',
        emergencyContactName: 'Elena Unida (Asawa)',
        emergencyContactPhone: '0919-888-2342',
        bloodType: 'A+',
        householdSize: 5,
        numDependents: 3,
        sector: 'Regular Resident',
        isSeniorCitizen: false,
        voterStatus: 'Registered Voter (Binangonan)',
        isLoggedIn: true,
        createdAt: '2026-02-01'
      });
    } else {
      onLogin({
        residentId: 'BNG-2026-RES-98214',
        name: 'Maria Santos',
        firstName: 'Maria',
        lastName: 'Santos',
        email: 'maria.santos@binangonan.ph',
        barangay: 'Brgy. Darangan, Binangonan',
        address: 'Blk 5 Lot 12 Manila East Road, Brgy. Darangan, Binangonan',
        birthDate: '1995-08-24',
        age: 30,
        gender: 'Female',
        civilStatus: 'Married',
        occupation: 'Store Manager',
        contactNumber: '0920-987-6543',
        emergencyContactName: 'Jose Santos (Asawa)',
        emergencyContactPhone: '0920-987-6000',
        bloodType: 'B+',
        householdSize: 3,
        numDependents: 1,
        sector: 'Regular Resident',
        isSeniorCitizen: false,
        voterStatus: 'Registered Voter (Binangonan)',
        isLoggedIn: true,
        createdAt: '2026-03-10'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-3 sm:p-6 font-sans transition-colors">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-600 dark:border-blue-500 shadow-xl overflow-hidden">
        {/* Header - Binangonan Official Blue */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-sky-700 text-white p-6 text-center space-y-2 relative">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-blue-200 dark:border-blue-700">
            <Shield className="w-9 h-9 text-blue-700 dark:text-sky-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            BAYAN NG BINANGONAN
          </h1>
          <p className="text-sm font-bold text-blue-100 bg-blue-900/40 py-1 px-3 rounded-full inline-block">
            MDRRMO & Resident Official App
          </p>
          <p className="text-xs text-blue-100 font-medium pt-1">
            Blue & White Senior-Friendly Access Portal with Primary Resident ID
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Quick Demo Credentials Box - Easy for User */}
          <div className="bg-blue-50 dark:bg-slate-800/80 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
              <span>1-TAP RESIDENT PROFILE EVALUATION SAMPLES:</span>
            </div>
            
            <p className="text-xs text-blue-800 dark:text-slate-300 leading-relaxed font-medium">
              Agad na pumasok bilang official verified resident gamit ang halimbawang Primary Resident IDs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('senior')}
                className="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 border border-blue-500 transition-all transform active:scale-95"
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>👴 Lolo Juan (Senior ID)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('limbon')}
                className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 border border-emerald-500 transition-all transform active:scale-95"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>📍 Brgy. Limbon-limbon (Mainland)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('resident')}
                className="w-full py-2.5 px-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 border border-sky-400 transition-all transform active:scale-95"
              >
                <LogIn className="w-4 h-4 shrink-0" />
                <span>👤 Maria (Mainland)</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Header */}
          <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsRegisterMode(false)}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                !isRegisterMode
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>QUICK LOG IN</span>
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterMode(true)}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                isRegisterMode
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>REGISTER WITH PRIMARY ID</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4 text-slate-900 dark:text-slate-100">
            {errorMessage && (
              <div className="p-3 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isRegisterMode && (
              <div className="p-3 bg-blue-50 dark:bg-slate-800/90 rounded-2xl border border-blue-200 dark:border-slate-700 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-200 font-bold">
                  <Key className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>AUTOMATIC RESIDENT PRIMARY KEY (UNIQUE ID):</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Ang inyong account ay awtomatikong bibigyan ng unique <strong>Primary Key / Binangonan Resident ID</strong> (hal. <code className="bg-blue-100 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-900 dark:text-sky-300 font-mono">BNG-2026-RES-XXXXX</code>) para sa legal at official LGU verification.
                </p>
              </div>
            )}

            {isRegisterMode && (
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                  👤 Buong Pangalan (Full Name):
                </label>
                <input
                  type="text"
                  placeholder="Halimbawa: Juan dela Cruz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                📧 Email Address / Gmail Account:
              </label>
              <input
                type="email"
                placeholder="Halimbawa: resident@binangonan.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                🔒 Password:
              </label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                📍 Barangay sa Binangonan (40 Complete Barangays):
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                <optgroup label="Mainland Barangays (23)" className="dark:bg-slate-800 dark:text-white">
                  {BARANGAYS_LIST.filter(b => b.locationType === 'Mainland').map(b => (
                    <option key={b.name} value={`Brgy. ${b.name}`} className="dark:bg-slate-800 dark:text-white">
                      Brgy. {b.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Talim Island Barangays (17)" className="dark:bg-slate-800 dark:text-white">
                  {BARANGAYS_LIST.filter(b => b.locationType === 'Talim Island').map(b => (
                    <option key={b.name} value={`Brgy. ${b.name}`} className="dark:bg-slate-800 dark:text-white">
                      Brgy. {b.name} (Talim Island)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    🏠 Street / Sitio / Complete House Address:
                  </label>
                  <input
                    type="text"
                    placeholder="Halimbawa: Purok 2, Coastal Road / Sitio Libis"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      📱 Contact Number:
                    </label>
                    <input
                      type="text"
                      placeholder="0917-000-0000"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      📅 Petsa ng Kapanganakan (Birth Date):
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      🏷️ Sektor / Kategorya:
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value as any)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Regular Resident">Regular Resident</option>
                      <option value="Senior Citizen">Senior Citizen (OSCA Member)</option>
                      <option value="PWD">Person with Disability (PWD)</option>
                      <option value="Solo Parent">Solo Parent</option>
                      <option value="Youth / SK">Kabataan / Youth (15-24 y/o)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      💍 Civil Status:
                    </label>
                    <select
                      value={civilStatus}
                      onChange={(e) => setCivilStatus(e.target.value as any)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      🚨 Emergency Contact Person:
                    </label>
                    <input
                      type="text"
                      placeholder="Pangalan ng Kamag-anak"
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      ☎️ Emergency Hotline:
                    </label>
                    <input
                      type="text"
                      placeholder="0917-000-0000"
                      value={emergencyContactPhone}
                      onChange={(e) => setEmergencyContactPhone(e.target.value)}
                      className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl font-semibold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-2xl font-black text-base shadow-lg flex items-center justify-center gap-2 border-2 border-blue-900 dark:border-blue-400 transition-all mt-4"
            >
              <span>{isRegisterMode ? 'GUMAWA NG ACCOUNT AT PRIMARY RESIDENT ID' : 'MAG-LOG IN SA AKING ACCOUNT'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Senior friendly notice */}
          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
            <p>
              🔒 Ligtas at Opisyal na Sistema ng Pamahalaang Bayan ng Binangonan, Rizal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

