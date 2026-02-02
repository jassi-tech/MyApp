import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Push Notifications</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>GENERAL</ThemedText>
          <View style={styles.card}>
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
          <ThemedText style={styles.sectionTitle}>CATEGORIES</ThemedText>
          <View style={styles.card}>
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
          <ThemedText style={styles.sectionTitle}>PREFERENCES</ThemedText>
          <View style={styles.card}>
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
      </ScrollView>
    </SafeAreaView>
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
}) => (
  <View style={[styles.toggleItem, !isLast && styles.toggleItemBorder]}>
    <View style={styles.toggleLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={value ? "#00bfff" : "#666"} />
      </View>
      <View style={styles.toggleTextContainer}>
        <ThemedText style={styles.toggleLabel}>{label}</ThemedText>
        <ThemedText style={styles.toggleDescription}>{description}</ThemedText>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#2a2a2a", true: "#00bfff" }}
      thumbColor={Palette.white}
    />
  </View>
);

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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 12,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  toggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  toggleItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
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
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: Palette.white,
    marginBottom: 4,
    fontWeight: "500",
  },
  toggleDescription: {
    fontSize: 12,
    color: "#666",
  },
});
