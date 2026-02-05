import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

import { useUser } from "@/context/UserContext";

export default function PushNotificationsScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { preferences, updatePreferences } = useUser();

  const handleToggle = (key: keyof typeof preferences, value: boolean) => {
      updatePreferences({ [key]: value });
  };

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
            value={preferences.allNotifications}
            onValueChange={(val) => handleToggle('allNotifications', val)}
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
            value={preferences.messages}
            onValueChange={(val) => handleToggle('messages', val)}
          />
          <NotificationToggle
            icon="document-text-outline"
            label="Assignments"
            description="New homework and deadlines"
            value={preferences.assignments}
            onValueChange={(val) => handleToggle('assignments', val)}
          />
          <NotificationToggle
            icon="star-outline"
            label="Grades"
            description="Grade updates and results"
            value={preferences.grades}
            onValueChange={(val) => handleToggle('grades', val)}
          />
          <NotificationToggle
            icon="calendar-outline"
            label="Attendance"
            description="Attendance reminders"
            value={preferences.attendance}
            onValueChange={(val) => handleToggle('attendance', val)}
          />
          <NotificationToggle
            icon="megaphone-outline"
            label="Events"
            description="School events and activities"
            value={preferences.events}
            onValueChange={(val) => handleToggle('events', val)}
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
            value={preferences.sound}
            onValueChange={(val) => handleToggle('sound', val)}
          />
          <NotificationToggle
            icon="phone-portrait-outline"
            label="Vibration"
            description="Vibrate for notifications"
            value={preferences.vibration}
            onValueChange={(val) => handleToggle('vibration', val)}
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
