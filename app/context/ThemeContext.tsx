import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { FontSizes, ThemeColors, ThemeColorsType } from "../constants/theme";

type ThemeMode = "dark" | "light" | "auto";
type FontSize = keyof typeof FontSizes;

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  colors: ThemeColorsType;
  fontScale: number;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("auto");
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("themeMode");
      const storedFontSize = await AsyncStorage.getItem("fontSize");

      if (storedTheme) setThemeModeState(storedTheme as ThemeMode);
      if (storedFontSize) setFontSizeState(storedFontSize as FontSize);
    } catch (e) {
      console.warn("Failed to load theme settings", e);
    } finally {
      setIsReady(true);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem("themeMode", mode);
    } catch (e) {
      console.warn("Failed to save theme setting", e);
    }
  };

  const setFontSize = async (size: FontSize) => {
    setFontSizeState(size);
    try {
      await AsyncStorage.setItem("fontSize", size);
    } catch (e) {
      console.warn("Failed to save font size setting", e);
    }
  };

  const isDark =
    themeMode === "dark" ||
    (themeMode === "auto" && systemColorScheme === "dark");

  const colors = isDark ? ThemeColors.dark : ThemeColors.light;
  const fontScale = FontSizes[fontSize];

  if (!isReady) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        fontSize,
        setFontSize,
        colors,
        fontScale,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
