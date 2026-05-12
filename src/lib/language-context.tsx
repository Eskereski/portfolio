"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { defaultLanguage, getHtmlLang, normalizeLanguage, type Language } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return defaultLanguage;

    try {
      const stored = localStorage.getItem("language");
      if (stored) return normalizeLanguage(stored);
      return normalizeLanguage(navigator.language);
    } catch {
      return defaultLanguage;
    }
  });

  useEffect(() => {
    try {
      document.documentElement.lang = getHtmlLang(language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
