import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const THEMES = [
  { id: "dark", label: "Dark", icon: "moon" },
  { id: "light", label: "Light", icon: "sunny" },
  { id: "auto", label: "Auto", icon: "phone-portrait" },
];

const FONT_SIZES = ["Small", "Medium", "Large", "Extra Large"];

export default function AppearanceScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedFontSize, setSelectedFontSize] = useState("Medium");
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Appearance</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>THEME</ThemedText>
          <View style={styles.themeGrid}>
            {THEMES.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeCard,
                  selectedTheme === theme.id && styles.themeCardActive,
                ]}
                onPress={() => setSelectedTheme(theme.id)}
              >
                <View style={styles.themeIconContainer}>
                  <Ionicons
                    name={theme.icon as any}
                    size={32}
                    color={selectedTheme === theme.id ? "#00bfff" : "#888"}
                  />
                </View>
                <ThemedText
                  style={[
                    styles.themeLabel,
                    selectedTheme === theme.id && styles.themeLabelActive,
                  ]}
                >
                  {theme.label}
                </ThemedText>
                {selectedTheme === theme.id && (
                  <View style={styles.checkmark}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#00bfff"
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>FONT SIZE</ThemedText>
          <View style={styles.card}>
            {FONT_SIZES.map((size, index) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.fontSizeItem,
                  index < FONT_SIZES.length - 1 && styles.fontSizeItemBorder,
                ]}
                onPress={() => setSelectedFontSize(size)}
              >
                <ThemedText style={styles.fontSizeLabel}>{size}</ThemedText>
                {selectedFontSize === size && (
                  <Ionicons name="checkmark" size={20} color="#00bfff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>ACCESSIBILITY</ThemedText>
          <View style={styles.card}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <Ionicons
                  name="flash-outline"
                  size={20}
                  color="#888"
                  style={{ marginRight: 12 }}
                />
                <View>
                  <ThemedText style={styles.toggleLabel}>
                    Reduced Motion
                  </ThemedText>
                  <ThemedText style={styles.toggleDescription}>
                    Minimize animations
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={reducedMotion}
                onValueChange={setReducedMotion}
                trackColor={{ false: "#2a2a2a", true: "#00bfff" }}
                thumbColor={Palette.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.previewSection}>
          <ThemedText style={styles.sectionTitle}>PREVIEW</ThemedText>
          <View style={styles.previewCard}>
            <ThemedText style={styles.previewTitle}>Sample Text</ThemedText>
            <ThemedText style={styles.previewText}>
              This is how your text will appear with the current settings.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Palette.white,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 12,
    letterSpacing: 1,
  },
  themeGrid: {
    flexDirection: "row",
    gap: 12,
  },
  themeCard: {
    flex: 1,
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    position: "relative",
  },
  themeCardActive: {
    borderColor: "#00bfff",
  },
  themeIconContainer: {
    marginBottom: 12,
  },
  themeLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  themeLabelActive: {
    color: Palette.white,
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  card: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  fontSizeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  fontSizeItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  fontSizeLabel: {
    fontSize: 16,
    color: Palette.white,
  },
  toggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: Palette.white,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
    color: "#666",
  },
  previewSection: {
    marginTop: 8,
  },
  previewCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
  },
});
