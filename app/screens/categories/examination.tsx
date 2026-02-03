import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const EXAM_SCHEDULE = [
  {
    id: "1",
    subject: "Mathematics",
    date: "15 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall A",
  },
  {
    id: "2",
    subject: "Science",
    date: "17 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall B",
  },
  {
    id: "3",
    subject: "English",
    date: "19 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall A",
  },
  {
    id: "4",
    subject: "History",
    date: "21 Feb 2026",
    time: "9:00 AM - 12:00 PM",
    room: "Hall C",
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

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "#22c55e";
    if (grade.startsWith("B")) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Examination" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "schedule" && styles.activeTab]}
          onPress={() => setActiveTab("schedule")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "schedule" && styles.activeTabText,
            ]}
          >
            Schedule
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "results" && styles.activeTab]}
          onPress={() => setActiveTab("results")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "results" && styles.activeTabText,
            ]}
          >
            Results
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "schedule" ? (
          <>
            {EXAM_SCHEDULE.map((exam) => (
              <View key={exam.id} style={styles.examCard}>
                <View style={styles.examHeader}>
                  <ThemedText style={styles.subjectText}>
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
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <ThemedText style={styles.detailText}>
                      {exam.date}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <ThemedText style={styles.detailText}>
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
              <View key={index} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <ThemedText style={styles.subjectText}>
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
                  <ThemedText style={styles.marksText}>
                    {result.marks} / {result.total}
                  </ThemedText>
                  <ThemedText style={styles.percentageText}>
                    {((result.marks / result.total) * 100).toFixed(1)}%
                  </ThemedText>
                </View>
                <View style={styles.progressBar}>
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
  tabContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Palette.darkGray,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#00bfff",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: Palette.white,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  examCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
    color: Palette.white,
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
    color: "#888",
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
    color: Palette.white,
    marginBottom: 4,
  },
  performanceGrade: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
    color: "#ccc",
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#00bfff",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00bfff",
    borderRadius: 4,
  },
});
