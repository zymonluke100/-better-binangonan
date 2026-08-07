import React, { useState } from 'react';
import { NavTab, ResidentReport, UserProfile } from './types';
import {
  INITIAL_WEATHER,
  INITIAL_FUEL_PRICES,
  FOREX_RATES,
  INITIAL_TRAFFIC,
  INITIAL_ANNOUNCEMENTS,
  EMERGENCY_CONTACTS,
  INITIAL_CITIZEN_REPORTS,
} from './data/binangonanData';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HeaderGreeting } from './components/HeaderGreeting';
import { ResidentServices } from './components/ResidentServices';
import { FeaturedBanners } from './components/FeaturedBanners';
import { CityAtAGlance } from './components/CityAtAGlance';
import { CommunityFeeds } from './components/CommunityFeeds';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { CityDirectory } from './components/CityDirectory';
import { AIAssistantTab } from './components/AIAssistantTab';
import { AuthScreen } from './components/AuthScreen';
import { AccountTab } from './components/AccountTab';

import { WeatherModal } from './components/WeatherModal';
import { PesoCheckerModal } from './components/PesoCheckerModal';
import { CityHistoryModal } from './components/CityHistoryModal';
import { FerryScheduleModal } from './components/FerryScheduleModal';
import { WasteScheduleModal } from './components/WasteScheduleModal';
import { Fuel, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('binangonan_theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });
  const [language, setLanguage] = useState<'tagalog' | 'english'>('tagalog');

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('binangonan_theme', theme);
  }, [theme]);

  // User state - Pre-logged in with Senior Demo account for instant ease of use!
  const [user, setUser] = useState<UserProfile | null>({
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
    occupation: 'Retired Public School Teacher',
    contactNumber: '0918-123-4567',
    emergencyContactName: 'Maria Cruz (Anak)',
    emergencyContactPhone: '0917-555-9081',
    bloodType: 'O+',
    philHealthNo: '12-05981248-9',
    householdSize: 4,
    numDependents: 2,
    sector: 'Senior Citizen',
    isSeniorCitizen: true,
    seniorIdNumber: 'BNG-2026-SR-7890',
    voterStatus: 'Registered Voter (Binangonan)',
    isLoggedIn: true,
    createdAt: '2026-01-15'
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'tagalog' ? 'english' : 'tagalog'));
  };

  // Live state
  const [citizenReports, setCitizenReports] = useState<ResidentReport[]>(INITIAL_CITIZEN_REPORTS);
  const [trafficList, setTrafficList] = useState(INITIAL_TRAFFIC);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);

  // Modal triggers
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showPesoModal, setShowPesoModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showFerryModal, setShowFerryModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [showFuelModal, setShowFuelModal] = useState(false);

  const handleAddReport = (newReport: ResidentReport) => {
    setCitizenReports((prev) => [newReport, ...prev]);
  };

  const handleUpvoteReport = (id: string) => {
    setCitizenReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  // If user chooses to log out, show AuthScreen
  if (!user || !user.isLoggedIn) {
    return (
      <AuthScreen
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white pb-20 transition-colors duration-200">
        {/* Top Fixed Header */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenEmergency={() => setActiveTab('emergency')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          language={language}
          onToggleLanguage={toggleLanguage}
        />

      {/* Main Container - Framed like native app on mobile & centered container on desktop */}
      <main className="max-w-md sm:max-w-xl mx-auto px-3.5 sm:px-4 py-4 space-y-5">
        {activeTab === 'home' && (
          <>
            <HeaderGreeting
              weather={INITIAL_WEATHER}
              onOpenWeatherModal={() => setShowWeatherModal(true)}
            />

            <ResidentServices
              onOpenFuelPrices={() => setShowFuelModal(true)}
              onOpenHealth={() => setActiveTab('emergency')}
              onOpenEmergency={() => setActiveTab('emergency')}
              onOpenFerrySchedule={() => setShowFerryModal(true)}
              onOpenWasteSchedule={() => setShowWasteModal(true)}
              onOpenPermits={() => setActiveTab('services')}
              onOpenPesoChecker={() => setShowPesoModal(true)}
            />

            <FeaturedBanners
              onOpenPesoChecker={() => setShowPesoModal(true)}
              onOpenFerry={() => setShowFerryModal(true)}
              onSelectTab={setActiveTab}
              onOpenHistory={() => setShowHistoryModal(true)}
            />

            <CityAtAGlance
              weather={INITIAL_WEATHER}
              fuelPrices={INITIAL_FUEL_PRICES}
              forex={FOREX_RATES}
              trafficList={trafficList}
              onOpenWeatherModal={() => setShowWeatherModal(true)}
              onOpenFuelPrices={() => setShowFuelModal(true)}
              onOpenPesoChecker={() => setShowPesoModal(true)}
              onOpenHistory={() => setShowHistoryModal(true)}
              onOpenDirectory={() => setActiveTab('services')}
              onSelectTab={setActiveTab}
            />
          </>
        )}

        {activeTab === 'updates' && (
          <CommunityFeeds
            announcements={announcements}
            trafficList={trafficList}
            citizenReports={citizenReports}
            onAddReport={handleAddReport}
            onUpvoteReport={handleUpvoteReport}
          />
        )}

        {activeTab === 'services' && <CityDirectory />}

        {activeTab === 'emergency' && <EmergencyDirectory contacts={EMERGENCY_CONTACTS} />}

        {activeTab === 'ai' && <AIAssistantTab />}

        {activeTab === 'account' && (
          <AccountTab
            user={user}
            onLogout={() => setUser(null)}
            onUpdateUser={(updated) => setUser(updated)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unresolvedReportsCount={citizenReports.filter((r) => r.status !== 'Resolved').length}
      />

      {/* MODALS */}
      {showWeatherModal && (
        <WeatherModal
          weather={INITIAL_WEATHER}
          onClose={() => setShowWeatherModal(false)}
        />
      )}

      {showPesoModal && (
        <PesoCheckerModal onClose={() => setShowPesoModal(false)} />
      )}

      {showHistoryModal && (
        <CityHistoryModal onClose={() => setShowHistoryModal(false)} />
      )}

      {showFerryModal && (
        <FerryScheduleModal onClose={() => setShowFerryModal(false)} />
      )}

      {showWasteModal && (
        <WasteScheduleModal onClose={() => setShowWasteModal(false)} />
      )}

      {/* Fuel Price Modal */}
      {showFuelModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Binangonan Fuel Price Monitor
                </h3>
              </div>
              <button
                onClick={() => setShowFuelModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {INITIAL_FUEL_PRICES.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">{f.type}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{f.station}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 dark:text-white block">
                      ₱{f.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">{f.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Sampled from major fuel stations along Manila East Road, Calumpang, Bilibiran & Darangan.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

