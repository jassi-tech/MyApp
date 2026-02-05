// ...existing code...

import { AttendanceCalendar } from "@/components/attendance-calendar";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useStudent } from "@/context/StudentContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

export default function AttendanceScreen() {
  const { colors, fontScale, isDark } = useTheme();
  const { attendance } = useStudent();

  return (
    <ScreenContainer header={<ScreenHeader title="My Attendance" />}>
      {/* Calendar Section */}
        <AttendanceCalendar />

        {/* Month Attendance Summary */}
        <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Month Attendance Summary
        </ThemedText>
        <View style={styles.summaryGrid}>
          <SummaryCard
            label="Present"
            value={`${attendance.present} Days`}
            icon="person"
            color={isDark ? "#064e3b" : "#ecfdf5"} 
            iconColor="#10b981"
            textColor={colors.text}
          />
          <SummaryCard
            label="Absent"
            value={`${attendance.absent} Days`}
            icon="calendar"
            color={isDark ? "#450a0a" : "#fff1f2"} 
            iconColor="#f43f5e" 
            textColor={colors.text}
          />
          <SummaryCard
            label="Leave"
            value={`${attendance.leave} Days`}
            icon="calendar"
            color={isDark ? "#451a03" : "#fff7ed"} 
            iconColor="#f59e0b" // Orange
            textColor={colors.text}
          />
          <SummaryCard
            label="Holiday"
            value={`${attendance.holiday} Days`}
            icon="calendar"
            color={isDark ? "#3b0764" : "#faf5ff"} 
            iconColor="#a855f7" // Purple
            textColor={colors.text}
          />
        </View>

        {/* Academic Attendance Summary */}
        <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Academic Attendance Summary
        </ThemedText>
        <View style={styles.academicList}>
          <AcademicItem
            label="Total Attendance Days"
            value={attendance.totalDays}
            icon="calendar-outline"
            badgeColor="#fbcfe8"
          />
          <AcademicItem
            label="Total No of Present Days"
            value={attendance.present}
            icon="help-outline"
            badgeColor="#dcfce7"
          />
          <AcademicItem
            label="Total No of Absent Days"
            value={attendance.absent}
            icon="help-outline"
            badgeColor="#fee2e2"
          />
          <AcademicItem
            label="Total No of Leave Days"
            value={attendance.leave}
            icon="help-outline"
            badgeColor="#fef3c7"
          />
          <AcademicItem
            label="Annual Percentage till Date"
            value={`${attendance.percentage}%`}
            icon="help-outline"
            badgeColor="#e0f2fe"
          />
        </View>
    </ScreenContainer>
  );
}

const SummaryCard = ({ label, value, icon, color, iconColor, textColor }: any) => (
  <View style={[styles.summaryCard, { backgroundColor: color }]}>
    <View style={styles.summaryCardHeader}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <View style={styles.summaryCardText}>
        <ThemedText style={[styles.summaryCardLabel, { color: textColor ?? "#333" }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.summaryCardValue, { color: textColor ? textColor + '99' : "#666" }]}>
          {value}
        </ThemedText>
      </View>
    </View>
  </View>
);

const AcademicItem = ({ label, value, icon, badgeColor }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.academicItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.academicItemLeft}>
            <View style={[styles.academicIconWrapper, { backgroundColor: colors.backgroundSecondary }]}>
                <Ionicons name={icon} size={20} color={colors.textSecondary} />
            </View>
            <ThemedText style={[styles.academicLabel, { color: colors.textSecondary }]}>{label}</ThemedText>
            </View>
            <View style={[styles.academicBadge, { backgroundColor: badgeColor }]}>
            <ThemedText style={styles.academicBadgeText}>{value}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
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
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  academicItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  academicIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  academicLabel: {
    fontSize: 13,
    fontWeight: "500",
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
