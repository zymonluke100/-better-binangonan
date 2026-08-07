import React, { useState } from 'react';
import { Radio, Navigation, Megaphone, PlusCircle, ThumbsUp, AlertCircle, CheckCircle, Clock, MapPin, Filter, Search, Camera, X } from 'lucide-react';
import { Announcement, TrafficReport, ResidentReport } from '../types';
import { BARANGAYS_LIST } from '../data/binangonanData';
import { useLanguage } from '../context/LanguageContext';

interface CommunityFeedsProps {
  announcements: Announcement[];
  trafficList: TrafficReport[];
  citizenReports: ResidentReport[];
  onAddReport: (report: ResidentReport) => void;
  onUpvoteReport: (id: string) => void;
}

export const CommunityFeeds: React.FC<CommunityFeedsProps> = ({
  announcements,
  trafficList,
  citizenReports,
  onAddReport,
  onUpvoteReport,
}) => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<'All' | 'Traffic' | 'LGU' | 'Citizen'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New report form state
  const [repCategory, setRepCategory] = useState<ResidentReport['category']>('Traffic Jam');
  const [repBarangay, setRepBarangay] = useState('Calumpang');
  const [repLocation, setRepLocation] = useState('');
  const [repDescription, setRepDescription] = useState('');
  const [repName, setRepName] = useState('');

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repLocation.trim() || !repDescription.trim()) return;

    const newRep: ResidentReport = {
      id: `rep-${Date.now()}`,
      category: repCategory,
      barangay: repBarangay,
      locationDetail: repLocation,
      description: repDescription,
      timestamp: 'Just now',
      upvotes: 1,
      status: 'Pending',
      reporterName: repName.trim() || 'Resident',
    };

    onAddReport(newRep);
    setIsReportModalOpen(false);
    setRepLocation('');
    setRepDescription('');
    setRepName('');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header & Submit Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-sky-600 dark:text-sky-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {t('Mga Balita at Ulat sa Binangonan', 'Binangonan Local Updates & Feeds')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('Kasalukuyang balita sa bayan, ulat sa kalsada, at abiso mula sa LGU', 'Real-time community alerts, traffic logs, and citizen reports')}
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('Mag-ulat ng Insidente', 'Report an Incident')}</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('Maghanap ng balita, kalsada, o barangay...', 'Search updates by keyword, road, or barangay...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Traffic', 'LGU', 'Citizen'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              {cat === 'All'
                ? t('Lahat', 'All')
                : cat === 'Traffic'
                ? t('Trapiko', 'Traffic')
                : cat === 'LGU'
                ? t('Abiso ng LGU', 'LGU Advisories')
                : t('Ulat ng Residente', 'Citizen Reports')}
            </button>
          ))}
        </div>
      </div>

      {/* TRAFFIC MONITOR CARDS */}
      {(filterCategory === 'All' || filterCategory === 'Traffic') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-500" />
              <span>Live Traffic Reports</span>
            </h3>
            <span className="text-[11px] text-slate-400">Mainland Arterials</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {trafficList
              .filter(t => !searchQuery || t.location.toLowerCase().includes(searchQuery.toLowerCase()) || t.notes.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((tr) => (
                <div
                  key={tr.id}
                  className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {tr.location}
                      </h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tr.status === 'Heavy' || tr.status === 'Standstill'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : tr.status === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {tr.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {tr.notes}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/50">
                    <span>Brgy. {tr.barangay}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tr.reportedAt}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* LGU ANNOUNCEMENTS */}
      {(filterCategory === 'All' || filterCategory === 'LGU') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-amber-500" />
              <span>Official LGU & Emergency Advisories</span>
            </h3>
          </div>

          <div className="space-y-2.5">
            {announcements
              .filter(a => !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.summary.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((ann) => (
                <div
                  key={ann.id}
                  className={`p-4 bg-white dark:bg-slate-800 rounded-2xl border ${
                    ann.important
                      ? 'border-sky-500/50 ring-1 ring-sky-500/20'
                      : 'border-slate-200/80 dark:border-slate-700/80'
                  } shadow-xs space-y-2`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {ann.badge && (
                          <span className="px-2 py-0.5 bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold text-[10px] rounded-md">
                            {ann.badge}
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-slate-400">{ann.source}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {ann.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">{ann.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CITIZEN COMMUNITY REPORTS */}
      {(filterCategory === 'All' || filterCategory === 'Citizen') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Resident Incident Feed</span>
            </h3>
            <span className="text-[11px] text-slate-400">{citizenReports.length} Reports</span>
          </div>

          <div className="space-y-2.5">
            {citizenReports
              .filter(r => !searchQuery || r.description.toLowerCase().includes(searchQuery.toLowerCase()) || r.barangay.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded-md">
                          {rep.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Brgy. {rep.barangay}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {rep.locationDetail}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rep.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {rep.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {rep.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-700/50">
                    <span className="text-[11px] text-slate-400">
                      Posted by <strong className="text-slate-600 dark:text-slate-300">{rep.reporterName}</strong> • {rep.timestamp}
                    </span>

                    <button
                      onClick={() => onUpvoteReport(rep.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-sky-950 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{rep.upvotes} Confirmations</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Submit Binangonan Resident Incident Report
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="p-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Incident Category
                </label>
                <select
                  value={repCategory}
                  onChange={(e) => setRepCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                >
                  <option value="Traffic Jam">Traffic Jam / Obstruction</option>
                  <option value="Flooding">Flooding / Drainage Overflow</option>
                  <option value="Power Interruption">Power Interruption / Fallen Wire</option>
                  <option value="Garbage Uncollected">Garbage Uncollected</option>
                  <option value="Emergency">Emergency Hazard</option>
                  <option value="General">General Community Concern</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Barangay Location
                  </label>
                  <select
                    value={repBarangay}
                    onChange={(e) => setRepBarangay(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  >
                    {BARANGAYS_LIST.map((b) => (
                      <option key={b.name} value={b.name}>
                        Brgy. {b.name} ({b.locationType})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Reporter Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kuya Cardo"
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Street / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Calumpang Elementary School along Manila East Rd"
                  value={repLocation}
                  onChange={(e) => setRepLocation(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description & Current Situation
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what is happening so nearby residents and barangay enforcers can respond..."
                  value={repDescription}
                  onChange={(e) => setRepDescription(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Post Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
