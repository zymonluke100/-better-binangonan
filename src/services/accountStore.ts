import { UserProfile } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

export interface SavedAccount {
  passwordHash: string; // Plain password for local demo or hashed string
  pin?: string;
  isVerified: boolean;
  registrationDate: string;
  verificationSource: string;
  profile: UserProfile;
}

const STORAGE_ACCOUNTS_KEY = 'binangonan_registered_accounts_v1';
const CURRENT_SESSION_KEY = 'binangonan_active_resident_session_v1';

// Helper to save profile to Firestore cloud database
export const syncProfileToFirestore = async (profile: UserProfile) => {
  try {
    const docId = profile.residentId || profile.email.replace(/[^a-zA-Z0-9]/g, '_');
    const userRef = doc(db, 'users', docId);
    await setDoc(userRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore sync note:', err);
  }
};

// Fetch ALL registered residents live from Firestore Cloud Database
export const fetchAllProfilesFromFirestore = async (): Promise<UserProfile[]> => {
  try {
    const snap = await getDocs(collection(db, 'users'));
    const cloudProfiles: UserProfile[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as UserProfile;
      if (data && data.name) {
        cloudProfiles.push(data);
      }
    });

    if (cloudProfiles.length > 0) {
      return cloudProfiles;
    }

    // Auto-seed default accounts to Firestore if empty
    for (const defaultAcc of DEFAULT_ACCOUNTS) {
      await syncProfileToFirestore(defaultAcc.profile);
    }
    return DEFAULT_ACCOUNTS.map((acc) => acc.profile);
  } catch (err) {
    console.warn('Firestore read error, falling back to local registry:', err);
  }

  // Fallback to local accounts
  const local = getStoredAccounts();
  return local.map((acc) => acc.profile);
};

// Helper to fetch single profile from Firestore
export const fetchProfileFromFirestore = async (docId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', docId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn('Firestore read note:', err);
  }
  return null;
};

// Pre-seeded official demo resident accounts
const DEFAULT_ACCOUNTS: SavedAccount[] = [
  {
    passwordHash: 'password123',
    isVerified: true,
    registrationDate: '2026-01-15',
    verificationSource: 'OSCA & LGU Registry',
    profile: {
      residentId: 'BNG-2026-SR-7890',
      name: 'Lolo Juan Dela Cruz',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      email: 'juan.delacruz@binangonan.ph',
      barangay: 'Brgy. Calumpang',
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
      createdAt: '2026-01-15',
    },
  },
  {
    passwordHash: 'password123',
    isVerified: true,
    registrationDate: '2026-02-01',
    verificationSource: 'Barangay Limbon-limbon Hall',
    profile: {
      residentId: 'BNG-2026-RES-40118',
      name: 'Pedro Unida',
      firstName: 'Pedro',
      lastName: 'Unida',
      email: 'pedro.limbon@binangonan.ph',
      barangay: 'Brgy. Limbon-limbon',
      address: 'Purok 2 Coastal Road, Brgy. Limbon-limbon, Binangonan, Rizal',
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
      createdAt: '2026-02-01',
    },
  },
  {
    passwordHash: 'password123',
    isVerified: true,
    registrationDate: '2026-02-10',
    verificationSource: 'LGU Online Registration',
    profile: {
      residentId: 'BNG-2026-SP-91204',
      name: 'Maria Santos',
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@binangonan.ph',
      barangay: 'Brgy. Layunan',
      address: '88 Mabini St., Brgy. Layunan, Binangonan, Rizal',
      birthDate: '1992-08-05',
      age: 33,
      gender: 'Female',
      civilStatus: 'Single',
      occupation: 'Store Owner & Enterprise Member',
      contactNumber: '0920-444-1122',
      emergencyContactName: 'Rosa Santos (Ina)',
      emergencyContactPhone: '0920-444-1123',
      bloodType: 'B+',
      householdSize: 3,
      numDependents: 2,
      sector: 'Solo Parent',
      isSeniorCitizen: false,
      voterStatus: 'Registered Voter (Binangonan)',
      isLoggedIn: true,
      createdAt: '2026-02-10',
    },
  },
];

// Helper to initialize accounts storage
export const getStoredAccounts = (): SavedAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_ACCOUNTS;
  } catch (err) {
    console.error('Error reading stored accounts:', err);
    return DEFAULT_ACCOUNTS;
  }
};

// Save accounts array
export const saveAccountsToStorage = (accounts: SavedAccount[]) => {
  try {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Error saving accounts:', err);
  }
};

// Register a new real account
export const registerAccount = (
  profile: UserProfile,
  password: string
): { success: boolean; message: string; account?: SavedAccount } => {
  const accounts = getStoredAccounts();

  // Check if email or contact or residentId already exists
  const existingEmail = accounts.find(
    (acc) => acc.profile.email.toLowerCase() === profile.email.toLowerCase()
  );
  if (existingEmail) {
    return {
      success: false,
      message: 'Ang email address na ito ay mayroon nang nakarehistro. Paki-log in o gumamit ng ibang email.',
    };
  }

  const newAccount: SavedAccount = {
    passwordHash: password || '123456',
    isVerified: true,
    registrationDate: new Date().toISOString().split('T')[0],
    verificationSource: 'Citizen Self-Registration (Verified LGU Key)',
    profile: {
      ...profile,
      isLoggedIn: true,
    },
  };

  accounts.push(newAccount);
  saveAccountsToStorage(accounts);
  saveCurrentSession(newAccount.profile);

  // Sync with cloud Firestore database
  syncProfileToFirestore(newAccount.profile);

  return {
    success: true,
    message: 'Matagumpay na nairehistro ang inyong opisyal na Binangonan Resident Account!',
    account: newAccount,
  };
};

// Authenticate user by Email/ResidentID and Password
export const authenticateAccount = (
  identifier: string,
  password: string
): { success: boolean; message: string; profile?: UserProfile } => {
  const accounts = getStoredAccounts();
  const cleanId = identifier.trim().toLowerCase();

  const found = accounts.find((acc) => {
    const p = acc.profile;
    return (
      p.email.toLowerCase() === cleanId ||
      p.residentId.toLowerCase() === cleanId ||
      p.contactNumber.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '')
    );
  });

  if (!found) {
    return {
      success: false,
      message: 'Hindi mahanap ang account. Pakisuri ang inyong Email / Resident ID o gumawa ng bagong account.',
    };
  }

  if (found.passwordHash !== password) {
    return {
      success: false,
      message: 'Maling password. Paki-subukan ulit o gamitin ang password123 para sa demo accounts.',
    };
  }

  const activeProfile = { ...found.profile, isLoggedIn: true };
  saveCurrentSession(activeProfile);

  return {
    success: true,
    message: 'Matagumpay na nakapasok!',
    profile: activeProfile,
  };
};

// Current Active Session Storage
export const getActiveSession = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading session:', err);
  }
  // Default session to Juan Dela Cruz if none
  return DEFAULT_ACCOUNTS[0].profile;
};

export const saveCurrentSession = (profile: UserProfile | null) => {
  try {
    if (profile) {
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  } catch (err) {
    console.error('Error saving session:', err);
  }
};

export const updateAccountProfile = (updatedProfile: UserProfile) => {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex(
    (acc) => acc.profile.residentId === updatedProfile.residentId || acc.profile.email === updatedProfile.email
  );

  if (index !== -1) {
    accounts[index].profile = updatedProfile;
    saveAccountsToStorage(accounts);
  }

  saveCurrentSession(updatedProfile);
  syncProfileToFirestore(updatedProfile);
};
