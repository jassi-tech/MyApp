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

const FEE_HISTORY = [
  { id: "1", month: "January 2026", amount: "₹5,000", status: "paid", date: "5 Jan 2026" },
  { id: "2", month: "February 2026", amount: "₹5,000", status: "pending", dueDate: "10 Feb 2026" },
  { id: "3", month: "December 2025", amount: "₹5,000", status: "paid", date: "3 Dec 2025" },
  { id: "4", month: "November 2025", amount: "₹5,000", status: "paid", date: "5 Nov 2025" },
];

const FEE_BREAKDOWN = [
  { label: "Tuition Fee", amount: "₹3,500" },
  { label: "Library Fee", amount: "₹500" },
  { label: "Lab Fee", amount: "₹700" },
  { label: "Sports Fee", amount: "₹300" },
];

export default function FeesScreen() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "#22c55e";
      case "pending": return "#f59e0b";
      case "overdue": return "#ef4444";
      default: return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Fee Details</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Total Pending</ThemedText>
          <ThemedText style={styles.summaryAmount}>₹5,000</ThemedText>
          <TouchableOpacity style={styles.payButton}>
            <ThemedText style={styles.payButtonText}>Pay Now</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Fee Breakdown</ThemedText>
        <View style={styles.breakdownCard}>
          {FEE_BREAKDOWN.map((item, index) => (
            <View key={index} style={styles.breakdownRow}>
              <ThemedText style={styles.breakdownLabel}>{item.label}</ThemedText>
              <ThemedText style={styles.breakdownAmount}>{item.amount}</ThemedText>
            </View>
          ))}
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <ThemedText style={styles.totalAmount}>₹5,000</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.sectionTitle}>Payment History</ThemedText>
        {FEE_HISTORY.map((fee) => (
          <View key={fee.id} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <ThemedText style={styles.monthText}>{fee.month}</ThemedText>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(fee.status) + "20" }]}>
                <ThemedText style={[styles.statusText, { color: getStatusColor(fee.status) }]}>
                  {fee.status.toUpperCase()}
                </ThemedText>
              </View>
            </View>
            <View style={styles.historyDetails}>
              <ThemedText style={styles.amountText}>{fee.amount}</ThemedText>
              <ThemedText style={styles.dateText}>
                {fee.status === "paid" ? `Paid on ${fee.date}` : `Due: ${fee.dueDate}`}
              </ThemedText>
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
  summaryCard: {
    backgroundColor: "#00bfff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: Palette.white,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  payButtonText: {
    color: "#00bfff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Palette.white,
    marginBottom: 16,
    marginTop: 8,
  },
  breakdownCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#ccc",
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.white,
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Palette.white,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00bfff",
  },
  historyCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.white,
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
  historyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#00bfff",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
  },
});
