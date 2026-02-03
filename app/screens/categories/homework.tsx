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
import { useTheme } from "@/context/ThemeContext";

const HOMEWORK = [
  {
    id: "1",
    subject: "Mathematics",
    title: "Chapter 5 - Exercises 5.1 to 5.3",
    dueDate: "5 Feb",
    status: "pending",
    icon: "calculator-outline",
    color: "#e0f2fe",
  },
  {
    id: "2",
    subject: "English",
    title: "Essay on 'My Favorite Book'",
    dueDate: "6 Feb",
    status: "pending",
    icon: "book-outline",
    color: "#fff7ed",
  },
  {
    id: "3",
    subject: "Science",
    title: "Lab Report - Chemical Reactions",
    dueDate: "3 Feb",
    status: "submitted",
    icon: "flask-outline",
    color: "#f0fdf4",
  },
  {
    id: "4",
    subject: "History",
    title: "Project on Ancient Civilizations",
    dueDate: "10 Feb",
    status: "pending",
    icon: "earth-outline",
    color: "#faf5ff",
  },
];

export default function HomeworkScreen() {
  const router = useRouter();
  const { colors, fontScale, isDark } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "graded":
        return "#8b5cf6";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Homework" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statValue, { fontSize: 24 * fontScale }]}>2</ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statValue, { fontSize: 24 * fontScale }]}>1</ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>Submitted</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.statValue, { fontSize: 24 * fontScale }]}>1</ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>Upcoming</ThemedText>
          </View>
        </View>

        <ThemedText style={[styles.sectionTitle, { color: colors.text, fontSize: 18 * fontScale }]}>All Assignments</ThemedText>
        {HOMEWORK.map((hw) => (
          <TouchableOpacity 
            key={hw.id} 
            style={[styles.homeworkCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : hw.color }]}>
              <Ionicons name={hw.icon as any} size={24} color={isDark ? colors.text : "#333"} />
            </View>
            <View style={styles.homeworkContent}>
              <View style={styles.homeworkHeader}>
                <ThemedText style={styles.subjectText}>{hw.subject}</ThemedText>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(hw.status) + "20" },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.statusText,
                      { color: getStatusColor(hw.status) },
                    ]}
                  >
                    {hw.status.toUpperCase()}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.titleText, { color: colors.text, fontSize: 15 * fontScale }]}>{hw.title}</ThemedText>
              <View style={styles.dueRow}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <ThemedText style={[styles.dueText, { color: colors.textSecondary }]}>
                  Due: {hw.dueDate}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    // moved to common component
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontWeight: "bold",
    color: "#00bfff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 16,
  },
  homeworkCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  homeworkContent: {
    flex: 1,
  },
  homeworkHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00bfff",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  titleText: {
    marginBottom: 8,
  },
  dueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dueText: {
    fontSize: 12,
  },
});
