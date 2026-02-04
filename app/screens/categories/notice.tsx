import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

const NOTICES = [
  {
    id: "1",
    title: "School Reopening After Winter Break",
    date: "2 Feb 2026",
    category: "Important",
    content: "School will reopen on 15th February 2026 after winter break.",
  },
  {
    id: "2",
    title: "Annual Sports Day",
    date: "1 Feb 2026",
    category: "Event",
    content: "Annual Sports Day will be held on 20th February 2026.",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    date: "30 Jan 2026",
    category: "Meeting",
    content: "PTM scheduled for all classes on 25th February 2026.",
  },
  {
    id: "4",
    title: "Library Timings Update",
    date: "28 Jan 2026",
    category: "General",
    content: "Library will remain open till 6 PM from next week.",
  },
];

export default function NoticeScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Important":
        return "#ef4444";
      case "Event":
        return "#8b5cf6";
      case "Meeting":
        return "#f59e0b";
      default:
        return "#666";
    }
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Notice Board" />}>
      {NOTICES.map((notice) => (
          <TouchableOpacity 
            key={notice.id} 
            style={[styles.noticeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.noticeHeader}>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(notice.category) + "20" },
                ]}
              >
                <ThemedText
                  style={[
                    styles.categoryText,
                    { color: getCategoryColor(notice.category) },
                  ]}
                >
                  {notice.category}
                </ThemedText>
              </View>
              <ThemedText style={[styles.dateText, { color: colors.textSecondary }]}>{notice.date}</ThemedText>
            </View>
            <ThemedText style={[styles.titleText, { color: colors.text, fontSize: 18 * fontScale }]}>{notice.title}</ThemedText>
            <ThemedText style={[styles.contentText, { color: colors.textSecondary, fontSize: 14 * fontScale }]} numberOfLines={2}>
              {notice.content}
            </ThemedText>
            <TouchableOpacity style={styles.readMore}>
              <ThemedText style={styles.readMoreText}>Read More</ThemedText>
              <Ionicons name="arrow-forward" size={14} color="#00bfff" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  noticeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
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
  },
  titleText: {
    fontWeight: "700",
    marginBottom: 8,
  },
  contentText: {
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
