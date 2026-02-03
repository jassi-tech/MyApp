import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

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

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={Palette.white} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <ThemedText type="subtitle" style={styles.headerTitle}>
          {title}
        </ThemedText>
        {subtitle && (
          <ThemedText style={styles.headerSubtitle}>{subtitle}</ThemedText>
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
    borderBottomColor: Palette.darkGray,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    alignItems: "center",
  },
  headerTitle: {
    color: Palette.white,
  },
  headerSubtitle: {
    fontSize: 12,
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
