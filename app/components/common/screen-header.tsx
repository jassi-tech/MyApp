import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightElement,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <TouchableOpacity 
        style={[styles.backButton, { backgroundColor: colors.backgroundSecondary }]} 
        onPress={handleBack}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <ThemedText type="subtitle" style={[styles.headerTitle, { color: colors.text, fontSize: 16 * fontScale }]}>
          {title}
        </ThemedText>
        {subtitle && (
          <ThemedText style={[styles.headerSubtitle, { fontSize: 12 * fontScale }]}>{subtitle}</ThemedText>
        )}
      </View>
      <View style={styles.rightContainer}>
        {rightElement || <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    alignItems: "center",
  },
  headerTitle: {
    // color set dynamically
  },
  headerSubtitle: {
    color: "#00bfff",
    marginTop: 2,
  },
  rightContainer: {
    width: 40,
    alignItems: "center",
  },
  placeholder: {
    width: 40,
  },
});
