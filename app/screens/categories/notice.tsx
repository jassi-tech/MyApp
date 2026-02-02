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

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const NOTICES = [
  { id: "1", title: "School Reopening After Winter Break", date: "2 Feb 2026", category: "Important", content: "School will reopen on 15th February 2026 after winter break." },
  { id: "2", title: "Annual Sports Day", date: "1 Feb 2026", category: "Event", content: "Annual Sports Day will be held on 20th February 2026." },
  { id: "3", title: "Parent-Teacher Meeting", date: "30 Jan 2026", category: "Meeting", content: "PTM scheduled for all classes on 25th February 2026." },
  { id: "4", title: "Library Timings Update", date: "28 Jan 2026", category: "General", content: "Library will remain open till 6 PM from next week." },
];

export default function NoticeScreen() {
  const router = useRouter();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Important": return "#ef4444";
      case "Event": return "#8b5cf6";
      case "Meeting": return "#f59e0b";
      default: return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Notice Board</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {NOTICES.map((notice) => (
          <TouchableOpacity key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(notice.category) + "20" }]}>
                <ThemedText style={[styles.categoryText, { color: getCategoryColor(notice.category) }]}>
                  {notice.category}
                </ThemedText>
              </View>
              <ThemedText style={styles.dateText}>{notice.date}</ThemedText>
            </View>
            <ThemedText style={styles.titleText}>{notice.title}</ThemedText>
            <ThemedText style={styles.contentText} numberOfLines={2}>{notice.content}</ThemedText>
            <TouchableOpacity style={styles.readMore}>
              <ThemedText style={styles.readMoreText}>Read More</ThemedText>
              <Ionicons name="arrow-forward" size={14} color="#00bfff" />
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
  noticeCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  noticeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: Palette.white,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: "#00bfff",
    fontWeight: "600",
  },
});
