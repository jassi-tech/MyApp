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

import { AttendanceCalendar } from "@/components/attendance-calendar";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function AttendanceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>My Attendance</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Section */}
        <AttendanceCalendar />

        {/* Month Attendance Summary */}
        <ThemedText style={styles.sectionTitle}>
          Month Attendance Summary
        </ThemedText>
        <View style={styles.summaryGrid}>
          <SummaryCard
            label="Present"
            value="1 Days"
            icon="person"
            color="#ecfdf5" 
            iconColor="#10b981"
          />
          <SummaryCard
            label="Absent"
            value="1 Days"
            icon="calendar"
            color="#fff1f2" 
            iconColor="#f43f5e" 
          />
          <SummaryCard
            label="Leave"
            value="1 Days"
            icon="calendar"
            color="#fff7ed" // Light orange
            iconColor="#f59e0b" // Orange
          />
          <SummaryCard
            label="Holiday"
            value="1 Days"
            icon="calendar"
            color="#faf5ff" // Light purple
            iconColor="#a855f7" // Purple
          />
        </View>

        {/* Academic Attendance Summary */}
        <ThemedText style={styles.sectionTitle}>
          Academic Attendance Summary
        </ThemedText>
        <View style={styles.academicList}>
          <AcademicItem
            label="Total Attendance Days"
            value="99"
            icon="calendar-outline"
            badgeColor="#fbcfe8"
          />
          <AcademicItem
            label="Total No of Present Days"
            value="99"
            icon="help-outline"
            badgeColor="#dcfce7"
          />
          <AcademicItem
            label="Total No of Absent Days"
            value="99"
            icon="help-outline"
            badgeColor="#fee2e2"
          />
          <AcademicItem
            label="Total No of Leave Days"
            value="3"
            icon="help-outline"
            badgeColor="#fef3c7"
          />
          <AcademicItem
            label="Annual Percentage till Date"
            value="2.0"
            icon="help-outline"
            badgeColor="#e0f2fe"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SummaryCard = ({ label, value, icon, color, iconColor }: any) => (
  <View style={[styles.summaryCard, { backgroundColor: color }]}>
    <View style={styles.summaryCardHeader}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <View style={styles.summaryCardText}>
        <ThemedText style={[styles.summaryCardLabel, { color: "#333" }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.summaryCardValue, { color: "#666" }]}>
          {value}
        </ThemedText>
      </View>
    </View>
  </View>
);

const AcademicItem = ({ label, value, icon, badgeColor }: any) => (
  <View style={styles.academicItem}>
    <View style={styles.academicItemLeft}>
      <View style={styles.academicIconWrapper}>
        <Ionicons name={icon} size={20} color={Palette.gray} />
      </View>
      <ThemedText style={styles.academicLabel}>{label}</ThemedText>
    </View>
    <View style={[styles.academicBadge, { backgroundColor: badgeColor }]}>
      <ThemedText style={styles.academicBadgeText}>{value}</ThemedText>
    </View>
  </View>
);

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
    paddingVertical: 12,
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
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.white,
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#c3c6ca",
    marginBottom: 16,
    marginTop: 8,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  summaryCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryCardText: {
    marginLeft: 10,
  },
  summaryCardLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  summaryCardValue: {
    fontSize: 11,
  },
  academicList: {
    marginBottom: 30,
  },
  academicItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Palette.darkGray,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  academicItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  academicIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  academicLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#afa7a7",
  },
  academicBadge: {
    minWidth: 32,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  academicBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
});
