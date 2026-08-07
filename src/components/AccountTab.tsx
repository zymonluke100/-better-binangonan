import React, { useState } from 'react';
import { User, Shield, HeartPulse, LogOut, Award, MapPin, Phone, CheckCircle2, Edit3, Key, Calendar, Briefcase, Users, Heart, Save, X, Activity, Vote } from 'lucide-react';
import { UserProfile } from '../types';
import { BARANGAYS_LIST } from '../data/binangonanData';

interface AccountTabProps {
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const AccountTab: React.FC<AccountTabProps> = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(user);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser(editForm);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Blue & White Official Binangonan Digital Resident ID Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-800 text-white rounded-3xl p-5 border-2 border-blue-400 shadow-lg space-y-4 relative overflow-hidden">
        {/* Background watermark badge */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Shield className="w-48 h-48 text-white" />
        </div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white text-blue-800 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-blue-200 shadow-md shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {user.name}
                </h2>
                {user.isSeniorCitizen && (
                  <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 font-black text-[10px] rounded-full uppercase shadow-xs">
                    Senior Citizen
                  </span>
                )}
                {user.sector && user.sector !== 'Senior Citizen' && (
                  <span className="px-2 py-0.5 bg-sky-300 text-slate-900 font-bold text-[10px] rounded-full uppercase">
                    {user.sector}
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100 font-semibold">{user.email}</p>
              <div className="flex items-center gap-1 text-[11px] text-blue-200 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span className="font-bold">{user.barangay}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={() => {
                setEditForm(user);
                setIsEditing(true);
              }}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">I-Edit</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>

        {/* Resident ID Details & Primary Key */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-blue-950/70 p-3 rounded-2xl border border-blue-700/60 text-xs relative z-10">
          <div>
            <span className="text-blue-300 text-[10px] font-bold block uppercase flex items-center gap-1">
              <Key className="w-3 h-3 text-amber-400" />
              PRIMARY KEY / RESIDENT ID:
            </span>
            <span className="text-white font-mono font-black text-xs sm:text-sm tracking-wide">
              {user.residentId || user.seniorIdNumber || 'BNG-2026-RES-901'}
            </span>
          </div>

          <div>
            <span className="text-blue-300 text-[10px] font-bold block uppercase">
              REGISTERED HOTLINE:
            </span>
            <span className="text-white font-mono font-bold">
              {user.contactNumber || '0917-555-0192'}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-blue-300 text-[10px] font-bold block uppercase">
              SECTOR & STATUS:
            </span>
            <span className="text-emerald-300 font-bold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Resident</span>
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

      {/* Complete Life Profile Section ("Talaan ng Impormasyon") */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-blue-200 dark:border-slate-700 p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <h3 className="font-black text-slate-900 dark:text-white text-base uppercase tracking-tight">
              KUMPLETONG IMPORMASYON SA BUHAY AT PAMAYANAN
            </h3>
          </div>
          <button
            onClick={() => {
              setEditForm(user);
              setIsEditing(true);
            }}
            className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-sky-300 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Baguhin / Edit</span>
          </button>
        </div>

        {/* Life details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block">
              🏠 Tinitirhang Anit / Address:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.address || `Purok Proper, ${user.barangay}, Binangonan, Rizal`}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-500" />
              Petsa ng Kapanganakan & Edad:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.birthDate || '1990-01-01'} ({user.age || 36} taong gulang)
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block">
              💍 Kasarian at Civil Status:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.gender || 'Male'} • {user.civilStatus || 'Single'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-emerald-500" />
              Trabaho / Hanapbuhay:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.occupation || 'Manggagawa / Resident Member'}
            </p>
          </div>

          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-1">
            <span className="text-rose-800 dark:text-rose-300 text-[10px] font-bold uppercase block flex items-center gap-1">
              <HeartPulse className="w-3 h-3 text-rose-600" />
              Emergency Contact Person & Phone:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.emergencyContactName || 'Kamag-anak / Pamilya'}
            </p>
            <p className="font-mono text-rose-700 dark:text-rose-300 font-bold">
              📞 {user.emergencyContactPhone || user.contactNumber || '0917-000-0000'}
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-slate-900/80 rounded-2xl border border-blue-200 dark:border-slate-700/80 space-y-1">
            <span className="text-blue-800 dark:text-sky-300 text-[10px] font-bold uppercase block flex items-center gap-1">
              <Activity className="w-3 h-3 text-blue-600" />
              Blood Type & PhilHealth No.:
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Blood Type: <span className="text-blue-700 dark:text-sky-400">{user.bloodType || 'O+'}</span>
            </p>
            <p className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">
              PhilHealth ID: {user.philHealthNo || '12-345678901-2'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-500" />
              Laki ng Pamilya (Household):
            </span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {user.householdSize || 4} Kasapi sa Bahay ({user.numDependents || 2} Dependents)
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase block flex items-center gap-1">
              <Vote className="w-3 h-3 text-amber-500" />
              Voter Status sa Binangonan:
            </span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              ✓ {user.voterStatus || 'Registered Voter (Binangonan)'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Resident Account Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-200 dark:border-slate-700 p-4 space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-700 pb-2 uppercase">
          MGA SERBISYO AT CERTIFICATE STATUS
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
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">Approved / Verified</span>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-300">
            <span>Cedula / Community Tax Certificate</span>
            <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-bold">2026 Updated</span>
          </div>
        </div>
      </div>

      {/* Profile Edit Drawer / Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-auto">
            <div className="bg-gradient-to-r from-blue-800 to-sky-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-300" />
                <h3 className="font-black text-base uppercase">Baguhin ang Impormasyon ng Account</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 hover:bg-white/20 rounded-lg text-white transition-all font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 space-y-4 text-xs font-sans text-slate-900 dark:text-slate-100 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  👤 Buong Pangalan (Full Name):
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    📧 Email Address:
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    📱 Contact Number:
                  </label>
                  <input
                    type="text"
                    value={editForm.contactNumber}
                    onChange={(e) => setEditForm({ ...editForm, contactNumber: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  📍 Barangay sa Binangonan:
                </label>
                <select
                  value={editForm.barangay}
                  onChange={(e) => setEditForm({ ...editForm, barangay: e.target.value })}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs"
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

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  🏠 Complete Street / Sitio / House Address:
                </label>
                <input
                  type="text"
                  value={editForm.address || ''}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    📅 Petsa ng Kapanganakan (Birth Date):
                  </label>
                  <input
                    type="date"
                    value={editForm.birthDate || ''}
                    onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    💼 Trabaho / Hanapbuhay:
                  </label>
                  <input
                    type="text"
                    value={editForm.occupation || ''}
                    onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    🚨 Emergency Contact Person:
                  </label>
                  <input
                    type="text"
                    value={editForm.emergencyContactName || ''}
                    onChange={(e) => setEditForm({ ...editForm, emergencyContactName: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    📞 Emergency Contact Phone:
                  </label>
                  <input
                    type="text"
                    value={editForm.emergencyContactPhone || ''}
                    onChange={(e) => setEditForm({ ...editForm, emergencyContactPhone: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    🩸 Blood Type:
                  </label>
                  <select
                    value={editForm.bloodType || 'O+'}
                    onChange={(e) => setEditForm({ ...editForm, bloodType: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    🗳️ Voter Status:
                  </label>
                  <select
                    value={editForm.voterStatus || 'Registered Voter (Binangonan)'}
                    onChange={(e) => setEditForm({ ...editForm, voterStatus: e.target.value as any })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs"
                  >
                    <option value="Registered Voter (Binangonan)">Registered Voter (Binangonan)</option>
                    <option value="Non-Voter">Non-Voter</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                >
                  Kanselahin
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>I-save ang Bagong Impormasyon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

