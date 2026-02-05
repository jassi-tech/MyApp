import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function InboxScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { colors, fontScale } = useTheme();
  const { messages } = useStudent();

  const filteredMessages =
    filter === "unread" ? messages.filter((m) => !m.isRead) : messages;

  const formatDate = (dateStr: string) => {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch (e) {
        return dateStr;
    }
  };

  return (
    <ScreenContainer 
      header={
        <ScreenHeader
          title="Inbox"
          rightElement={
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.backgroundSecondary }]}>
              <Ionicons name="filter-outline" size={22} color={colors.text} />
            </TouchableOpacity>
          }
        />
      }
    >
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[
            styles.tab, 
            { backgroundColor: filter === "all" ? colors.primary : colors.backgroundSecondary }
          ]}
          onPress={() => setFilter("all")}
        >
          <ThemedText
            style={[
              styles.tabText, 
              { color: filter === "all" ? '#fff' : colors.textSecondary }
            ]}
          >
            All ({messages.length})
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab, 
            { backgroundColor: filter === "unread" ? colors.primary : colors.backgroundSecondary }
          ]}
          onPress={() => setFilter("unread")}
        >
          <ThemedText
            style={[
              styles.tabText,
              { color: filter === "unread" ? '#fff' : colors.textSecondary }
            ]}
          >
            Unread ({messages.filter((m) => !m.isRead).length})
          </ThemedText>
        </TouchableOpacity>
      </View>

      {filteredMessages.map((message) => (
          <TouchableOpacity 
            key={message.id} 
            style={[
              styles.messageCard, 
              { 
                backgroundColor: colors.card,
                borderColor: colors.border
              }
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.senderRow}>
                {!message.isRead && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
                <ThemedText
                  style={[
                    styles.senderText,
                    { 
                        color: !message.isRead ? colors.text : colors.textSecondary,
                        fontSize: 14 * fontScale
                    }
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
              <ThemedText style={[styles.dateText, { color: colors.textSecondary }]}>{formatDate(message.date)}</ThemedText>
            </View>
            <ThemedText
              style={[
                  styles.subjectText, 
                  { 
                      color: !message.isRead ? colors.text : colors.textSecondary,
                      fontSize: 15 * fontScale 
                  }
              ]}
            >
              {message.subject}
            </ThemedText>
            <View style={styles.messageFooter}>
              <Ionicons name="mail-outline" size={14} color={colors.textSecondary} />
              <ThemedText style={[styles.footerText, { color: colors.textSecondary }]}>Tap to read</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  messageCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
    marginRight: 8,
  },
  senderText: {
    fontWeight: "600",
  },
  dateText: {
    fontSize: 12,
  },
  subjectText: {
    marginBottom: 12,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 12,
  },
});
