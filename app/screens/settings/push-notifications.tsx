import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

export default function PushNotificationsScreen() {
  const router = useRouter();
  const [allNotifications, setAllNotifications] = useState(true);
  const [messages, setMessages] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [grades, setGrades] = useState(true);
  const [attendance, setAttendance] = useState(false);
  const [events, setEvents] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const { colors, fontScale } = useTheme();

  return (
    <ScreenContainer header={<ScreenHeader title="Push Notifications" />}>
      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          GENERAL
        </ThemedText>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <NotificationToggle
            icon="notifications"
            label="All Notifications"
            description="Enable or disable all push notifications"
            value={allNotifications}
            onValueChange={setAllNotifications}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          CATEGORIES
        </ThemedText>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <NotificationToggle
            icon="chatbubbles-outline"
            label="Messages"
            description="New messages and announcements"
            value={messages}
            onValueChange={setMessages}
          />
          <NotificationToggle
            icon="document-text-outline"
            label="Assignments"
            description="New homework and deadlines"
            value={assignments}
            onValueChange={setAssignments}
          />
          <NotificationToggle
            icon="star-outline"
            label="Grades"
            description="Grade updates and results"
            value={grades}
            onValueChange={setGrades}
          />
          <NotificationToggle
            icon="calendar-outline"
            label="Attendance"
            description="Attendance reminders"
            value={attendance}
            onValueChange={setAttendance}
          />
          <NotificationToggle
            icon="megaphone-outline"
            label="Events"
            description="School events and activities"
            value={events}
            onValueChange={setEvents}
            isLast
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          PREFERENCES
        </ThemedText>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <NotificationToggle
            icon="volume-high-outline"
            label="Sound"
            description="Play sound for notifications"
            value={sound}
            onValueChange={setSound}
          />
          <NotificationToggle
            icon="phone-portrait-outline"
            label="Vibration"
            description="Vibrate for notifications"
            value={vibration}
            onValueChange={setVibration}
            isLast
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const NotificationToggle = ({
  icon,
  label,
  description,
  value,
  onValueChange,
  isLast = false,
}: {
  icon: any;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <View
      style={[
        styles.toggleItem,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.toggleLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: colors.background }]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={value ? colors.primary : colors.textSecondary}
          />
        </View>
        <View style={styles.toggleTextContainer}>
          <ThemedText
            style={[
              styles.toggleLabel,
              { color: colors.text, fontSize: 16 * fontScale },
            ]}
          >
            {label}
          </ThemedText>
          <ThemedText
            style={[styles.toggleDescription, { color: colors.textSecondary }]}
          >
            {description}
          </ThemedText>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={"#fff"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  toggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 12,
    paddingBottom: 12,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleLabel: {
    marginBottom: 4,
    fontWeight: "500",
  },
  toggleDescription: {
    fontSize: 12,
  },
});
