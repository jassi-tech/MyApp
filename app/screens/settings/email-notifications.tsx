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

const FREQUENCIES = ["Instant", "Daily Digest", "Weekly Summary", "Never"];

export default function EmailNotificationsScreen() {
  const router = useRouter();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [frequency, setFrequency] = useState("Daily Digest");
  const [messages, setMessages] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [grades, setGrades] = useState(true);
  const [events, setEvents] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Email Notifications</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>GENERAL</ThemedText>
          <View style={styles.card}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <Ionicons name="mail" size={20} color="#888" style={{ marginRight: 12 }} />
                <View>
                  <ThemedText style={styles.toggleLabel}>Email Notifications</ThemedText>
                  <ThemedText style={styles.toggleDescription}>
                    Receive updates via email
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: "#2a2a2a", true: "#00bfff" }}
                thumbColor={Palette.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>FREQUENCY</ThemedText>
          <View style={styles.card}>
            {FREQUENCIES.map((freq, index) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.frequencyItem,
                  index < FREQUENCIES.length - 1 && styles.frequencyItemBorder,
                ]}
                onPress={() => setFrequency(freq)}
                disabled={!emailEnabled}
              >
                <View style={styles.frequencyLeft}>
                  <Ionicons
                    name={
                      freq === "Instant"
                        ? "flash-outline"
                        : freq === "Daily Digest"
                        ? "calendar-outline"
                        : freq === "Weekly Summary"
                        ? "time-outline"
                        : "close-circle-outline"
                    }
                    size={18}
                    color={emailEnabled ? "#888" : "#444"}
                    style={{ marginRight: 10 }}
                  />
                  <ThemedText
                    style={[styles.frequencyLabel, !emailEnabled && styles.disabledText]}
                  >
                    {freq}
                  </ThemedText>
                </View>
                {frequency === freq && emailEnabled && (
                  <Ionicons name="checkmark" size={20} color="#00bfff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>CATEGORIES</ThemedText>
          <View style={styles.card}>
            <EmailToggle
              icon="chatbubbles-outline"
              label="Messages"
              value={messages}
              onValueChange={setMessages}
              disabled={!emailEnabled}
            />
            <EmailToggle
              icon="document-text-outline"
              label="Assignments"
              value={assignments}
              onValueChange={setAssignments}
              disabled={!emailEnabled}
            />
            <EmailToggle
              icon="star-outline"
              label="Grades"
              value={grades}
              onValueChange={setGrades}
              disabled={!emailEnabled}
            />
            <EmailToggle
              icon="megaphone-outline"
              label="Events"
              value={events}
              onValueChange={setEvents}
              disabled={!emailEnabled}
              isLast
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const EmailToggle = ({
  icon,
  label,
  value,
  onValueChange,
  disabled,
  isLast = false,
}: {
  icon: any;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled: boolean;
  isLast?: boolean;
}) => (
  <View style={[styles.emailToggleItem, !isLast && styles.emailToggleItemBorder]}>
    <View style={styles.emailToggleLeft}>
      <Ionicons
        name={icon}
        size={18}
        color={disabled ? "#444" : "#888"}
        style={{ marginRight: 10 }}
      />
      <ThemedText style={[styles.emailToggleLabel, disabled && styles.disabledText]}>
        {label}
      </ThemedText>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
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
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: Palette.white,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
    color: "#666",
  },
  frequencyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  frequencyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  frequencyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyLabel: {
    fontSize: 16,
    color: Palette.white,
  },
  disabledText: {
    color: "#444",
  },
  emailToggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  emailToggleItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    marginBottom: 12,
    paddingBottom: 12,
  },
  emailToggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emailToggleLabel: {
    fontSize: 16,
    color: Palette.white,
  },
});
