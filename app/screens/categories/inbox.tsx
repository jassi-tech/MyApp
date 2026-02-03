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

const MESSAGES = [
  {
    id: "1",
    sender: "Principal Office",
    subject: "Annual Day Celebration",
    date: "2 Feb",
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    sender: "Class Teacher",
    subject: "Parent-Teacher Meeting",
    date: "1 Feb",
    isRead: false,
    priority: "normal",
  },
  {
    id: "3",
    sender: "Accounts Department",
    subject: "Fee Payment Reminder",
    date: "31 Jan",
    isRead: true,
    priority: "normal",
  },
  {
    id: "4",
    sender: "Sports Department",
    subject: "Inter-School Tournament",
    date: "30 Jan",
    isRead: true,
    priority: "normal",
  },
  {
    id: "5",
    sender: "Library",
    subject: "Book Return Notice",
    date: "29 Jan",
    isRead: true,
    priority: "low",
  },
];

export default function InboxScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredMessages =
    filter === "unread" ? MESSAGES.filter((m) => !m.isRead) : MESSAGES;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Inbox"
        rightElement={
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={22} color={Palette.white} />
          </TouchableOpacity>
        }
      />

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.tab, filter === "all" && styles.activeTab]}
          onPress={() => setFilter("all")}
        >
          <ThemedText
            style={[styles.tabText, filter === "all" && styles.activeTabText]}
          >
            All ({MESSAGES.length})
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filter === "unread" && styles.activeTab]}
          onPress={() => setFilter("unread")}
        >
          <ThemedText
            style={[
              styles.tabText,
              filter === "unread" && styles.activeTabText,
            ]}
          >
            Unread ({MESSAGES.filter((m) => !m.isRead).length})
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredMessages.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <View style={styles.senderRow}>
                {!message.isRead && <View style={styles.unreadDot} />}
                <ThemedText
                  style={[
                    styles.senderText,
                    !message.isRead && styles.unreadText,
                  ]}
                >
                  {message.sender}
                </ThemedText>
                {message.priority === "high" && (
                  <Ionicons
                    name="alert-circle"
                    size={16}
                    color="#ef4444"
                    style={{ marginLeft: 6 }}
                  />
                )}
              </View>
              <ThemedText style={styles.dateText}>{message.date}</ThemedText>
            </View>
            <ThemedText
              style={[styles.subjectText, !message.isRead && styles.unreadText]}
            >
              {message.subject}
            </ThemedText>
            <View style={styles.messageFooter}>
              <Ionicons name="mail-outline" size={14} color="#666" />
              <ThemedText style={styles.footerText}>Tap to read</ThemedText>
            </View>
          </TouchableOpacity>
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
    // moved to common component
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  filterTabs: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Palette.darkGray,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#00bfff",
  },
  tabText: {
    fontSize: 14,
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
  messageCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00bfff",
    marginRight: 8,
  },
  senderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  unreadText: {
    color: Palette.white,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  subjectText: {
    fontSize: 15,
    color: "#ccc",
    marginBottom: 12,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
  },
});
