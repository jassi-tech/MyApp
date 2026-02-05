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

import { useStudent } from "../../context/StudentContext";

export default function FeesScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { fees, submitFeePayment } = useStudent();

  const pendingAmount = fees.filter(f => f.status !== 'paid')
    .reduce((acc, f) => {
        const amt = parseInt(f.amount.replace(/[^0-9]/g, '')) || 0;
        return acc + amt;
    }, 0);

  const currentFee = fees.find(f => f.status !== 'paid') || fees[0];
  const feeBreakdown = currentFee?.breakdown || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "overdue":
        return "#ef4444";
      default:
        return "#666";
    }
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Fee Details" />}>
      <View style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Total Pending</ThemedText>
          <ThemedText style={[styles.summaryAmount, { fontSize: 36 * fontScale }]}>₹{pendingAmount.toLocaleString()}</ThemedText>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => currentFee && submitFeePayment(currentFee.id)}
            disabled={pendingAmount === 0}
          >
            <ThemedText style={styles.payButtonText}>{pendingAmount > 0 ? 'Pay Now' : 'All Paid'}</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Fee Breakdown</ThemedText>
        <View style={[styles.breakdownCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {feeBreakdown.map((item, index) => (
            <View key={index} style={[styles.breakdownRow, { borderBottomColor: colors.border }]}>
              <ThemedText style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                {item.label}
              </ThemedText>
              <ThemedText style={[styles.breakdownAmount, { color: colors.text }]}>
                {item.amount}
              </ThemedText>
            </View>
          ))}
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <ThemedText style={[styles.totalLabel, { color: colors.text }]}>Total</ThemedText>
            <ThemedText style={styles.totalAmount}>{currentFee?.amount || '₹0'}</ThemedText>
          </View>
        </View>

        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Payment History</ThemedText>
        {fees.map((fee) => (
          <View key={fee.id} style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.historyHeader}>
              <ThemedText style={[styles.monthText, { color: colors.text }]}>{fee.month}</ThemedText>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(fee.status) + "20" },
                ]}
              >
                <ThemedText
                  style={[
                    styles.statusText,
                    { color: getStatusColor(fee.status) },
                  ]}
                >
                  {fee.status.toUpperCase()}
                </ThemedText>
              </View>
            </View>
            <View style={styles.historyDetails}>
              <ThemedText style={styles.amountText}>{fee.amount}</ThemedText>
              <ThemedText style={[styles.dateText, { color: colors.textSecondary }]}>
                {fee.status === "paid"
                  ? `Paid on ${fee.date}`
                  : `Due: ${fee.dueDate}`}
              </ThemedText>
            </View>
          </View>
        ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 26,
  },
  payButton: {
    backgroundColor: "#fff",
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
    marginBottom: 16,
    marginTop: 8,
  },
  breakdownCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  breakdownLabel: {
    fontSize: 14,
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00bfff",
  },
  historyCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
  },
});
