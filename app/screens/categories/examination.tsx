import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

const TABS = ["Schedule", "Results"];

const EXAM_SCHEDULE = [
  {
    id: "1",
    subject: "Mathematics",
    date: "15 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall A",
    icon: "calculator-outline",
    color: "#e0f2fe",
  },
  {
    id: "2",
    subject: "Science",
    date: "17 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall B",
    icon: "flask-outline",
    color: "#f0fdf4",
  },
  {
    id: "3",
    subject: "English",
    date: "19 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall A",
    icon: "book-outline",
    color: "#fff7ed",
  },
  {
    id: "4",
    subject: "History",
    date: "21 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall C",
    icon: "earth-outline",
    color: "#faf5ff",
  },
];

const RESULTS = [
  { subject: "Mathematics", marks: 85, total: 100, grade: "A" },
  { subject: "Science", marks: 92, total: 100, grade: "A+" },
  { subject: "English", marks: 78, total: 100, grade: "B+" },
  { subject: "History", marks: 88, total: 100, grade: "A" },
];

export default function ExaminationScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"schedule" | "results">(
    "schedule",
  );
  const { colors, fontScale, isDark } = useTheme();

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "#22c55e";
    if (grade.startsWith("B")) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Examination" />}>
      <View style={[styles.tabContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === "schedule" && { backgroundColor: keyToColor(activeTab, colors) },
            activeTab !== "schedule" && { backgroundColor: "transparent" }
          ]} // Simplified logic, let's fix this properly
          onPress={() => setActiveTab("schedule")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "schedule" && styles.activeTabText,
              activeTab !== "schedule" && { color: colors.textSecondary }
            ]}
          >
            Schedule
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === "results" && { backgroundColor: keyToColor(activeTab, colors) },
            activeTab !== "results" && { backgroundColor: "transparent" }
          ]}
          onPress={() => setActiveTab("results")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "results" && styles.activeTabText,
              activeTab !== "results" && { color: colors.textSecondary }
            ]}
          >
            Results
          </ThemedText>
        </TouchableOpacity>
      </View>

      {activeTab === "schedule" ? (
          <>
            {EXAM_SCHEDULE.map((exam) => (
              <View key={exam.id} style={[styles.examCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.examHeader}>
                  <ThemedText style={[styles.subjectText, { color: colors.text }]}>
                    {exam.subject}
                  </ThemedText>
                  <View style={styles.roomBadge}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#00bfff"
                    />
                    <ThemedText style={styles.roomText}>{exam.room}</ThemedText>
                  </View>
                </View>
                <View style={styles.examDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                    <ThemedText style={[styles.detailText, { color: colors.textSecondary }]}>
                      {exam.date}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                    <ThemedText style={[styles.detailText, { color: colors.textSecondary }]}>
                      {exam.time}
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            <View style={styles.performanceCard}>
              <ThemedText style={styles.performanceLabel}>
                Overall Performance
              </ThemedText>
              <ThemedText style={styles.performanceValue}>85.75%</ThemedText>
              <ThemedText style={styles.performanceGrade}>Grade: A</ThemedText>
            </View>

            {RESULTS.map((result, index) => (
              <View key={index} style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.resultHeader}>
                  <ThemedText style={[styles.subjectText, { color: colors.text }]}>
                    {result.subject}
                  </ThemedText>
                  <View
                    style={[
                      styles.gradeBadge,
                      { backgroundColor: getGradeColor(result.grade) + "20" },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.gradeText,
                        { color: getGradeColor(result.grade) },
                      ]}
                    >
                      {result.grade}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.marksRow}>
                  <ThemedText style={[styles.marksText, { color: colors.textSecondary }]}>
                    {result.marks} / {result.total}
                  </ThemedText>
                  <ThemedText style={[styles.percentageText, { fontSize: 20 * fontScale }]}>
                    {((result.marks / result.total) * 100).toFixed(1)}%
                  </ThemedText>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(result.marks / result.total) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </>
        )}
    </ScreenContainer>
  );
}

// Helper to avoid inline complex logic in return
function keyToColor(key: string, colors: any) {
    return colors.primary;
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
      // handled inline
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  examCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  examHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "700",
  },
  roomBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#00bfff20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  roomText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00bfff",
  },
  examDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  performanceCard: {
    backgroundColor: "#8b5cf6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  performanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  performanceGrade: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  marksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  marksText: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentageText: {
    fontWeight: "700",
    color: "#00bfff",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00bfff",
    borderRadius: 4,
  },
});
