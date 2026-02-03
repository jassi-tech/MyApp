import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageCode = "en" | "hi" | "es" | "fr" | "de" | "zh" | "ja" | "ar";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => Promise<void>;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem("userLanguage");
      if (storedLanguage) {
        setLanguageState(storedLanguage as LanguageCode);
      }
    } catch (e) {
      console.warn("Failed to load language setting", e);
    } finally {
      setIsReady(true);
    }
  };

  const setLanguage = async (code: LanguageCode) => {
    setLanguageState(code);
    try {
      await AsyncStorage.setItem("userLanguage", code);
    } catch (e) {
      console.warn("Failed to save language setting", e);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isReady,
      }}
    >
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
