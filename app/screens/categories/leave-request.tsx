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

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const LEAVE_HISTORY = [
  { id: "1", reason: "Medical Emergency", from: "5 Feb", to: "7 Feb", status: "approved", days: 3 },
  { id: "2", reason: "Family Function", from: "20 Jan", to: "21 Jan", status: "approved", days: 2 },
  { id: "3", reason: "Sick Leave", from: "10 Jan", to: "10 Jan", status: "rejected", days: 1 },
];

export default function LeaveRequestScreen() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "#22c55e";
      case "pending": return "#f59e0b";
      case "rejected": return "#ef4444";
      default: return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Leave Request</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <ThemedText style={styles.balanceLabel}>Available Leave Balance</ThemedText>
          <ThemedText style={styles.balanceValue}>12 Days</ThemedText>
        </View>

        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Ionicons name="add-circle-outline" size={20} color={Palette.white} />
          <ThemedText style={styles.applyButtonText}>Apply for Leave</ThemedText>
        </TouchableOpacity>

        {showForm && (
          <View style={styles.formCard}>
            <ThemedText style={styles.formTitle}>New Leave Application</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Reason for leave"
              placeholderTextColor="#666"
            />
            <View style={styles.dateRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="From Date"
                placeholderTextColor="#666"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="To Date"
                placeholderTextColor="#666"
              />
            </View>
            <TouchableOpacity style={styles.submitButton}>
              <ThemedText style={styles.submitButtonText}>Submit Request</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <ThemedText style={styles.sectionTitle}>Leave History</ThemedText>
        {LEAVE_HISTORY.map((leave) => (
          <View key={leave.id} style={styles.leaveCard}>
            <View style={styles.leaveHeader}>
              <ThemedText style={styles.reasonText}>{leave.reason}</ThemedText>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(leave.status) + "20" }]}>
                <ThemedText style={[styles.statusText, { color: getStatusColor(leave.status) }]}>
                  {leave.status.toUpperCase()}
                </ThemedText>
              </View>
            </View>
            <View style={styles.leaveDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <ThemedText style={styles.detailText}>
                  {leave.from} to {leave.to} ({leave.days} {leave.days === 1 ? 'day' : 'days'})
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
    color: Palette.white,
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
    color: Palette.white,
  },
  formCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Palette.white,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
    color: Palette.white,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
    color: Palette.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Palette.white,
    marginBottom: 16,
  },
  leaveCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
    color: Palette.white,
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
    color: "#888",
  },
});
