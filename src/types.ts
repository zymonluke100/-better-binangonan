export type NavTab = 'home' | 'services' | 'updates' | 'emergency' | 'ai' | 'account';

export interface UserProfile {
  residentId: string; // Unique Primary Key e.g. BNG-2026-89412
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  barangay: string;
  address?: string; // Street / Sitio / House No.
  birthDate?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  civilStatus?: 'Single' | 'Married' | 'Widowed' | 'Separated';
  occupation?: string;
  contactNumber: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodType?: string;
  philHealthNo?: string;
  householdSize?: number;
  numDependents?: number;
  sector?: 'Regular Resident' | 'Senior Citizen' | 'PWD' | 'Solo Parent' | 'Youth / SK';
  isSeniorCitizen?: boolean;
  seniorIdNumber?: string;
  pwdIdNumber?: string;
  voterStatus?: 'Registered Voter (Binangonan)' | 'Non-Voter';
  isLoggedIn: boolean;
  createdAt?: string;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  uvIndex: number;
  forecast: {
    day: string;
    temp: number;
    icon: string;
  }[];
}

export interface FuelPrice {
  type: string;
  price: number;
  change: string;
  isUp: boolean;
  station: string;
}

export interface TrafficReport {
  id: string;
  location: string;
  status: 'Smooth' | 'Moderate' | 'Heavy' | 'Standstill';
  reportedAt: string;
  notes: string;
  barangay: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'LGU Advisory' | 'Traffic' | 'Weather' | 'Health' | 'Event' | 'Community';
  summary: string;
  content: string;
  date: string;
  source: string;
  important?: boolean;
  badge?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  category: 'Disaster & Rescue' | 'Police' | 'Fire' | 'Medical' | 'Utilities';
  phonePrimary: string;
  phoneSecondary?: string;
  address: string;
  description: string;
  is24_7: boolean;
}

export interface BarangayInfo {
  name: string;
  captain: string;
  contact: string;
  locationType: 'Mainland' | 'Talim Island';
  populationEst: string;
  hallAddress: string;
}

export interface MunicipalOffice {
  id: string;
  name: string;
  head: string;
  location: string;
  contact: string;
  email: string;
  services: string[];
}

export interface ResidentReport {
  id: string;
  category: 'Traffic Jam' | 'Flooding' | 'Power Interruption' | 'Garbage Uncollected' | 'Emergency' | 'General';
  barangay: string;
  locationDetail: string;
  description: string;
  timestamp: string;
  upvotes: number;
  status: 'Pending' | 'In Progress' | 'Resolved';
  reporterName: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
