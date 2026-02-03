import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const CIRCULARS = [
  {
    id: "1",
    title: "Admission Process for New Session",
    date: "2 Feb 2026",
    category: "Admission",
    size: "245 KB",
  },
  {
    id: "2",
    title: "Examination Guidelines 2026",
    date: "30 Jan 2026",
    category: "Examination",
    size: "180 KB",
  },
  {
    id: "3",
    title: "Code of Conduct for Students",
    date: "25 Jan 2026",
    category: "General",
    size: "320 KB",
  },
  {
    id: "4",
    title: "Sports Activity Schedule",
    date: "20 Jan 2026",
    category: "Sports",
    size: "156 KB",
  },
];

export default function CircularScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Circulars" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CIRCULARS.map((circular) => (
          <TouchableOpacity key={circular.id} style={styles.circularCard}>
            <View style={styles.documentIcon}>
              <Ionicons name="document-text" size={32} color="#00bfff" />
            </View>
            <View style={styles.circularContent}>
              <ThemedText style={styles.titleText}>{circular.title}</ThemedText>
              <View style={styles.metaRow}>
                <View style={styles.categoryBadge}>
                  <ThemedText style={styles.categoryText}>
                    {circular.category}
                  </ThemedText>
                </View>
                <ThemedText style={styles.sizeText}>{circular.size}</ThemedText>
              </View>
              <ThemedText style={styles.dateText}>{circular.date}</ThemedText>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={22} color="#00bfff" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    // moved to common component
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  circularCard: {
    flexDirection: "row",
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  documentIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#00bfff20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  circularContent: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: Palette.white,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: "#00bfff20",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00bfff",
  },
  sizeText: {
    fontSize: 12,
    color: "#666",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00bfff20",
    justifyContent: "center",
    alignItems: "center",
  },
});
