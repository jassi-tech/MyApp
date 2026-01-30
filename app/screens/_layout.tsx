import { Stack } from "expo-router";
import React from "react";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="GetStarted" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      
      {/* Profile Sub-screens */}
      <Stack.Screen name="account-security" options={{ headerShown: false }} />
      <Stack.Screen name="activity-history" options={{ headerShown: false }} />
      <Stack.Screen name="contact-us" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
      
      {/* Other screens */}
      <Stack.Screen name="details" options={{ headerShown: false }} />
    </Stack>
  );
}
