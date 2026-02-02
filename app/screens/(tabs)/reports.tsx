import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

interface ReportItem {
  id: string;
  name: string;
  status: "Completed" | "Pending" | "Review";
}

const SUBMITTED_REPORTS: ReportItem[] = [
  { id: "1", name: "Medical Board Exam Result", status: "Completed" },
  { id: "2", name: "Semester 1 Transcript", status: "Review" },
];

const PENDING_DOCUMENTS: ReportItem[] = [
  { id: "3", name: "Lab Report - Biology", status: "Pending" },
  { id: "4", name: "Vaccination Record", status: "Pending" },
  { id: "5", name: "ID Proof / Adhaar Card", status: "Pending" },
];

export default function ReportsScreen() {
  const [submittedData] = useState<ReportItem[]>(SUBMITTED_REPORTS);
  const [pendingData] = useState<ReportItem[]>(PENDING_DOCUMENTS);

  const handleUpload = (docName: string) => {
    Alert.alert("Professional Upload", `Ready to upload: ${docName}`, [
      { text: "Cancel", style: "cancel" },
      { text: "Choose File", onPress: () => {} },
    ]);
  };

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dashboard Summary Section */}
        <View style={styles.summaryContainer}>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: "rgba(52, 199, 89, 0.1)" },
            ]}
          >
            <ThemedText style={styles.summaryValue}>
              {pendingData.length}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Pending</ThemedText>
          </View>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: "rgba(255, 255, 255, 0.05)" },
            ]}
          >
            <ThemedText style={styles.summaryValue}>
              {submittedData.length}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Submitted</ThemedText>
          </View>
        </View>

        {/* Actionable Pending Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={Palette.green}
              style={{ marginRight: 8 }}
            />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Action Required
            </ThemedText>
          </View>
        </View>

        <View style={styles.listCard}>
          {pendingData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={[
                styles.itemRow,
                index === pendingData.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => handleUpload(item.name)}
            >
              <View style={styles.itemNameContainer}>
                <View style={styles.iconCirclePending}>
                  <Ionicons
                    name="document-outline"
                    size={20}
                    color={Palette.white}
                  />
                </View>
                <View style={styles.textStack}>
                  <ThemedText style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.itemSubText}>
                    Click to upload document
                  </ThemedText>
                </View>
              </View>

              <View style={styles.actionButton}>
                <Ionicons name="add" size={18} color={Palette.green} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* History Section */}
        <View style={[styles.sectionHeader, { marginTop: 36 }]}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={20}
              color={Palette.gray}
              style={{ marginRight: 8 }}
            />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Submission History
            </ThemedText>
          </View>
        </View>

        <View style={styles.listCard}>
          {submittedData.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                index === submittedData.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.itemNameContainer}>
                <View style={styles.iconCircleSubmitted}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={Palette.gray}
                  />
                </View>
                <View style={styles.textStack}>
                  <ThemedText style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.itemSubText}>
                    Verified and Stored
                  </ThemedText>
                </View>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  item.status === "Completed"
                    ? styles.badgeCompleted
                    : styles.badgeReview,
                ]}
              >
                <ThemedText style={styles.statusText}>{item.status}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 14,
    paddingBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "600",
    color: Palette.white,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: Palette.gray,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.white,
  },
  listCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  itemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCirclePending: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: Palette.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconCircleSubmitted: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textStack: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.white,
    marginBottom: 2,
  },
  itemSubText: {
    fontSize: 10,
    color: Palette.gray,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(52, 199, 89, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 84,
    alignItems: "center",
  },
  badgeCompleted: {
    backgroundColor: "rgba(52, 199, 89, 0.12)",
  },
  badgeReview: {
    backgroundColor: "rgba(10, 132, 255, 0.12)",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: Palette.white,
  },
});
