import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

const LEAVE_HISTORY = [
  {
    id: "1",
    reason: "Medical Emergency",
    from: "5 Feb",
    to: "7 Feb",
    status: "approved",
    days: 3,
  },
  {
    id: "2",
    reason: "Family Function",
    from: "20 Jan",
    to: "21 Jan",
    status: "approved",
    days: 2,
  },
  {
    id: "3",
    reason: "Sick Leave",
    from: "10 Jan",
    to: "10 Jan",
    status: "rejected",
    days: 1,
  },
];

export default function LeaveRequestScreen() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { colors, fontScale, isDark } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Leave Request" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <ThemedText style={styles.balanceLabel}>
            Available Leave Balance
          </ThemedText>
          <ThemedText style={styles.balanceValue}>12 Days</ThemedText>
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <ThemedText style={styles.applyButtonText}>
            Apply for Leave
          </ThemedText>
        </TouchableOpacity>

        {showForm && (
          <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.formTitle, { color: colors.text }]}>
              New Leave Application
            </ThemedText>
            <TextInput
              style={[
                  styles.input, 
                  { 
                      backgroundColor: colors.background, 
                      borderColor: colors.border,
                      color: colors.text
                  }
              ]}
              placeholder="Reason for leave"
              placeholderTextColor={colors.textSecondary}
            />
            <View style={styles.dateRow}>
              <TextInput
                style={[
                    styles.input, 
                    styles.halfInput,
                    { 
                        backgroundColor: colors.background, 
                        borderColor: colors.border,
                        color: colors.text
                    }
                ]}
                placeholder="From Date"
                placeholderTextColor={colors.textSecondary}
              />
              <TextInput
                style={[
                    styles.input, 
                    styles.halfInput,
                    { 
                        backgroundColor: colors.background, 
                        borderColor: colors.border,
                        color: colors.text
                    }
                ]}
                placeholder="To Date"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            <TouchableOpacity style={styles.submitButton}>
              <ThemedText style={styles.submitButtonText}>
                Submit Request
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Leave History</ThemedText>
        {LEAVE_HISTORY.map((leave) => (
          <View key={leave.id} style={[styles.leaveCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.leaveHeader}>
              <ThemedText style={[styles.reasonText, { color: colors.text }]}>{leave.reason}</ThemedText>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(leave.status) + "20" },
                ]}
              >
                <ThemedText
                  style={[
                    styles.statusText,
                    { color: getStatusColor(leave.status) },
                  ]}
                >
                  {leave.status.toUpperCase()}
                </ThemedText>
              </View>
            </View>
            <View style={styles.leaveDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                <ThemedText style={[styles.detailText, { color: colors.textSecondary }]}>
                  {leave.from} to {leave.to} ({leave.days}{" "}
                  {leave.days === 1 ? "day" : "days"})
                </ThemedText>
              </View>
            </View>
          </View>
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
  balanceCard: {
    backgroundColor: "#8b5cf6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  applyButton: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  formCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#00bfff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  leaveCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  leaveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reasonText: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  leaveDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
});
