import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@/context/ThemeContext";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
          default: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="doc.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          title: "Courses",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="briefcase.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
