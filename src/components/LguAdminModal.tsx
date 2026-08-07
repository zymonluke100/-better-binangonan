import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { fetchAllProfilesFromFirestore } from '../services/accountStore';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ShieldCheck, Database, Users, Search, RefreshCw, X, CheckCircle2, Megaphone, Plus, Building2, ExternalLink, Filter, MapPin, Mail, Phone, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BARANGAYS_LIST } from '../data/binangonanData';

interface LguAdminModalProps {
  onClose: () => void;
  currentUser: UserProfile | null;
}

export const LguAdminModal: React.FC<LguAdminModalProps> = ({ onClose, currentUser }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'residents' | 'announcements' | 'database'>('residents');
  const [residentsList, setResidentsList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All');

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState('Public Safety');
  const [annContent, setAnnContent] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');
  const [isPostingAnn, setIsPostingAnn] = useState(false);

  const loadResidents = async () => {
    setLoading(true);
    const data = await fetchAllProfilesFromFirestore();
    setResidentsList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadResidents();
  }, []);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    setIsPostingAnn(true);
    setAnnSuccess('');

    try {
      await addDoc(collection(db, 'announcements'), {
        title: annTitle.trim(),
        category: annCategory,
        content: annContent.trim(),
        author: currentUser?.name || 'Binangonan LGU Official',
        barangay: currentUser?.barangay || 'All Barangays',
        createdAt: new Date().toISOString().split('T')[0],
      });

      setAnnSuccess(t('Matagumpay na naipost ang opisyal na abiso sa Cloud Firestore Database!', 'Official announcement broadcasted live to Firestore Database!'));
      setAnnTitle('');
      setAnnContent('');
    } catch (err) {
      console.error('Error broadcasting announcement:', err);
    } finally {
      setIsPostingAnn(false);
    }
  };

  const filteredResidents = residentsList.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.residentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBarangay =
      selectedBarangay === 'All' || res.barangay.includes(selectedBarangay);

    return matchesSearch && matchesBarangay;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-tight text-white">
                  {t('LGU CITIZEN REGISTRY & CLOUD DATABASE PORTAL', 'LGU CITIZEN REGISTRY & CLOUD DATABASE PORTAL')}
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold rounded-full border border-emerald-500/30">
                  LIVE FIRESTORE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Binangonan, Rizal • Real-Time Registered Residents & Community Sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('residents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'residents'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t('Mga Nakarehistrong Mamamayan', 'Registered Citizens')} ({residentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'announcements'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>{t('Mag-post ng Live Balita / Abiso', 'Post Live Announcement')}</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t('Cloud Database Info', 'Cloud Database Info')}</span>
          </button>
        </div>

        {/* Body Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: REGISTERED RESIDENTS LIST */}
          {activeTab === 'residents' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('Maghanap ayon sa Pangalan, Email, o Resident ID...', 'Search by name, email, or Resident Key...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedBarangay}
                    onChange={(e) => setSelectedBarangay(e.target.value)}
                    className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="All">Lahat ng Barangay (All)</option>
                    {BARANGAYS_LIST.map((b) => (
                      <option key={b.name} value={b.name}>
                        Brgy. {b.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={loadResidents}
                    className="p-2 bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 text-blue-900 dark:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
                    title="Refresh list from Firestore"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>

              {/* Residents Table */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Mamamayan / Citizen</th>
                        <th className="p-3">Primary Key ID</th>
                        <th className="p-3">Barangay</th>
                        <th className="p-3">Sektor</th>
                        <th className="p-3">Kontak / Emergency</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      {filteredResidents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            {loading ? 'Naglo-load ng mamamayan mula sa Cloud Firestore...' : 'Walang nahanap na nakarehistrong mamamayan sa pamantayan.'}
                          </td>
                        </tr>
                      ) : (
                        filteredResidents.map((res) => (
                          <tr key={res.residentId || res.email} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-slate-900 dark:text-white">{res.name}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {res.email}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                                {res.residentId}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                              {res.barangay}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                res.sector === 'Senior Citizen' || res.isSeniorCitizen
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  : res.sector === 'PWD'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : res.sector === 'Solo Parent'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              }`}>
                                {res.sector || 'Regular Resident'}
                              </span>
                            </td>
                            <td className="p-3 text-[11px] text-slate-600 dark:text-slate-400">
                              <div>{res.contactNumber || 'N/A'}</div>
                              {res.emergencyContactName && (
                                <div className="text-[10px] text-slate-400">
                                  ICE: {res.emergencyContactName} ({res.emergencyContactPhone})
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                <ShieldCheck className="w-3 h-3" />
                                <span>VERIFIED</span>
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POST OFFICIAL ANNOUNCEMENT */}
          {activeTab === 'announcements' && (
            <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-500" />
                  <span>{t('I-broadcast ang Opisyal na Abiso sa Lahat ng Mamamayan', 'Broadcast Live Official LGU Announcement')}</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ang anumang ilalagay dito ay lalabas nang live sa totoong Firestore Cloud Database para sa lahat ng nakarehistrong mamamayan sa Binangonan.
                </p>
              </div>

              {annSuccess && (
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{annSuccess}</span>
                </div>
              )}

              <form onSubmit={handlePostAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pamagat ng Abiso / Announcement Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Walang Pasok sa Lahat ng Antas, o Libreng Bakuna sa Municipal Health Center"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    required
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Kategorya / Category
                    </label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="Public Safety">Public Safety & Weather Alert</option>
                      <option value="Health & Vaccination">Health & Pag-asa Hospital Advisory</option>
                      <option value="Traffic & Roadwork">Traffic & Infrastructure Maintenance</option>
                      <option value="Ayuda & Social Services">Ayuda & Senior Citizen Assistance</option>
                      <option value="Cultural & Events">Binangonan Festival & Civic Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Naglabas ng Abiso / Official Author
                    </label>
                    <input
                      type="text"
                      value={currentUser?.name || 'Binangonan LGU Official'}
                      readOnly
                      className="w-full p-2.5 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nilalaman at Detalye / Announcement Content
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Isulat ang kumpletong impormasyon para sa mamamayan ng Binangonan..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    required
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPostingAnn}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isPostingAnn ? 'Ipinapadala sa Cloud Firestore...' : 'I-BROADCAST SA FIRESTORE CLOUD DATABASE'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: CLOUD DATABASE TECHNICAL INFO */}
          {activeTab === 'database' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-emerald-400" />
                  <h4 className="font-black text-base tracking-tight text-white">
                    LIVE GOOGLE FIRESTORE CLOUD DATABASE SPECIFICATIONS
                  </h4>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Ang lahat ng impormasyon ng mamamayan, pagrehistro ng residente, at ulat ng lungsod ay nakatagpo at direktang nakakonekta sa opisyal na Cloud Firestore instance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">FIREBASE PROJECT ID:</span>
                    <strong className="text-emerald-400">mystic-flow-zn50x</strong>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">DATABASE INSTANCE ID:</span>
                    <strong className="text-amber-300 truncate block">ai-studio-betterbinangonan-69346ec4...</strong>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">PRIMARY COLLECTIONS:</span>
                    <strong className="text-sky-300">users, reports, announcements</strong>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">SECURITY RULES STATUS:</span>
                    <strong className="text-emerald-400">DEPLOYED & ACTIVE</strong>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-4 rounded-2xl flex items-start gap-3 text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs">Saan Maaaring Makita ang Data sa Firebase Console?</h5>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    Maaari ring buksan ng administrator ang Google Firebase Console online upang makita ang lahat ng hilaw na dokumento sa database under the <strong>users</strong>, <strong>reports</strong>, at <strong>announcements</strong> collections.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
