// ...existing code...
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useStudent } from "@/context/StudentContext";

export default function ReportsScreen() {
  const { colors, fontScale, isDark } = useTheme();
  const { reports } = useStudent();

  const submittedData = reports.filter(r => r.status === 'Completed' || r.status === 'Review');
  const pendingData = reports.filter(r => r.status === 'Pending');

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
              { 
                backgroundColor: isDark ? "rgba(52, 199, 89, 0.1)" : colors.backgroundSecondary,
                borderColor: colors.border
              },
            ]}
          >
            <ThemedText style={[styles.summaryValue, { color: colors.text }]}>
              {pendingData.length}
            </ThemedText>
            <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>Pending</ThemedText>
          </View>
          <View
            style={[
              styles.summaryCard,
              { 
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : colors.card,
                  borderColor: colors.border
              },
            ]}
          >
            <ThemedText style={[styles.summaryValue, { color: colors.text }]}>
              {submittedData.length}
            </ThemedText>
            <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>Submitted</ThemedText>
          </View>
        </View>

        {/* Actionable Pending Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text, fontSize: 16 * fontScale }]}>
              Action Required
            </ThemedText>
          </View>
        </View>

        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {pendingData.length > 0 ? (
             pendingData.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={[
                  styles.itemRow,
                  { borderBottomColor: colors.border },
                  index === pendingData.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => handleUpload(item.name)}
              >
                <View style={styles.itemNameContainer}>
                  <View style={[styles.iconCirclePending, { backgroundColor: colors.backgroundSecondary }]}>
                    <Ionicons
                      name="document-outline"
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  <View style={styles.textStack}>
                    <ThemedText style={[styles.itemName, { color: colors.text, fontSize: 14 * fontScale }]} numberOfLines={1}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={[styles.itemSubText, { color: colors.textSecondary }]}>
                      Click to upload document
                    </ThemedText>
                  </View>
                </View>

                <View style={[styles.actionButton, { backgroundColor: isDark ? "rgba(52, 199, 89, 0.1)" : "#dcfce7" }]}>
                  <Ionicons name="add" size={18} color={isDark ? "#34C759" : "#10b981"} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
             <ThemedText style={{ padding: 16, color: colors.textSecondary, textAlign: 'center' }}>No pending actions.</ThemedText>
          )}
        </View>

        {/* History Section */}
        <View style={[styles.sectionHeader, { marginTop: 36 }]}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={20}
              color={colors.icon}
              style={{ marginRight: 8 }}
            />
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text, fontSize: 16 * fontScale }]}>
              Submission History
            </ThemedText>
          </View>
        </View>

        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {submittedData.length > 0 ? (
             submittedData.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.itemRow,
                  { borderBottomColor: colors.border },
                  index === submittedData.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={styles.itemNameContainer}>
                  <View style={[styles.iconCircleSubmitted, { backgroundColor: colors.backgroundSecondary }]}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color={colors.textSecondary}
                    />
                  </View>
                  <View style={styles.textStack}>
                    <ThemedText style={[styles.itemName, { color: colors.text, fontSize: 14 * fontScale }]} numberOfLines={1}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={[styles.itemSubText, { color: colors.textSecondary }]}>
                      Verified and Stored
                    </ThemedText>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    item.status === "Completed"
                      ? { backgroundColor: isDark ? "rgba(52, 199, 89, 0.12)" : "#dcfce7" }
                      : { backgroundColor: isDark ? "rgba(10, 132, 255, 0.12)" : "#e0f2fe" },
                  ]}
                >
                  <ThemedText style={[styles.statusText, { color: colors.text }]}>{item.status}</ThemedText>
                </View>
              </View>
            ))
          ) : (
              <ThemedText style={{ padding: 16, color: colors.textSecondary, textAlign: 'center' }}>No submission history.</ThemedText>
          )}
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
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 12,
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
    fontWeight: "600",
  },
  listCard: {
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconCircleSubmitted: {
    width: 34,
    height: 34,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textStack: {
    flex: 1,
  },
  itemName: {
    fontWeight: "600",
    marginBottom: 2,
  },
  itemSubText: {
    fontSize: 10,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
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
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
