import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tagalog' | 'english';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (tagalogText: string, englishText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('binangonan_language');
    return saved === 'english' || saved === 'tagalog' ? saved : 'tagalog';
  });

  useEffect(() => {
    localStorage.setItem('binangonan_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'tagalog' ? 'english' : 'tagalog'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (tagalogText: string, englishText: string): string => {
    return language === 'tagalog' ? tagalogText : englishText;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
