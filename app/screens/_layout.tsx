import { Stack } from "expo-router";
import React from "react";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/GetStarted" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/login" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/forget" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/forgetotp" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/new-password" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/signup" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/signupotp" options={{ headerShown: false }} />
      {/* <Stack.Screen name="register" options={{ headerShown: false }} /> */}
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      
      <Stack.Screen name="account-security" options={{ headerShown: false }} />
      <Stack.Screen name="activity-history" options={{ headerShown: false }} />
      <Stack.Screen name="contact-us" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
      
      <Stack.Screen name="details" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen name="attendance" options={{ headerShown: false }} />
      <Stack.Screen name="quiz" options={{ headerShown: false }} />
      <Stack.Screen name="quiz-details" options={{ headerShown: false }} />
      <Stack.Screen name="categories/timetable" options={{ headerShown: false }} />
      <Stack.Screen name="categories/inbox" options={{ headerShown: false }} />
      <Stack.Screen name="categories/fees" options={{ headerShown: false }} />
      <Stack.Screen name="categories/notice" options={{ headerShown: false }} />
      <Stack.Screen name="categories/homework" options={{ headerShown: false }} />
      <Stack.Screen name="categories/syllabus" options={{ headerShown: false }} />
      <Stack.Screen name="categories/circular" options={{ headerShown: false }} />
      <Stack.Screen name="categories/leave-request" options={{ headerShown: false }} />
      <Stack.Screen name="categories/examination" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account" options={{ headerShown: false }} />
      <Stack.Screen name="settings/appearance" options={{ headerShown: false }} />
      <Stack.Screen name="settings/language" options={{ headerShown: false }} />
      <Stack.Screen name="settings/push-notifications" options={{ headerShown: false }} />
      <Stack.Screen name="settings/email-notifications" options={{ headerShown: false }} />
      <Stack.Screen name="settings/help-center" options={{ headerShown: false }} />
      <Stack.Screen name="settings/report-problem" options={{ headerShown: false }} />
      <Stack.Screen name="Course" options={{ headerShown: false }} />
      <Stack.Screen name="course-details" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment-success" options={{ headerShown: false }} />
    </Stack>
  );
}
