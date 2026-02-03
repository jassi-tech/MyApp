import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { LanguageCode, useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
];

export default function LanguageScreen() {
  const { language: selectedLanguage, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { colors, fontScale } = useTheme();

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <ScreenHeader title="Language" />

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text, fontSize: 16 * fontScale }]}
          placeholder="Search languages..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredLanguages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              { backgroundColor: colors.card, borderColor: colors.border },
              selectedLanguage === language.code && { borderColor: colors.primary },
            ]}
            onPress={() => setLanguage(language.code as LanguageCode)}
          >
            <View style={styles.languageInfo}>
              <ThemedText style={[styles.languageName, { color: colors.text, fontSize: 16 * fontScale }]}>{language.name}</ThemedText>
              <ThemedText style={[styles.languageNative, { color: colors.textSecondary }]}>{language.nativeName}</ThemedText>
            </View>
            {selectedLanguage === language.code && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 40,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
  },
  languageItemActive: {
    // handled dynamically
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
  },
});
