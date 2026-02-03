import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { CourseProvider } from "./context/CourseContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <CourseProvider>
      <LanguageProvider>
        <ThemeProvider>
          <RootLayoutNav />
        </ThemeProvider>
      </LanguageProvider>
    </CourseProvider>
  );
}

function RootLayoutNav() {
  const { isDark, themeMode } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For now, we'll just simulate a delay or wait for nothing 
        // as we don't have custom fonts yet.
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}
