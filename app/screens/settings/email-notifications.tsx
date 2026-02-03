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
import { useTheme } from "@/context/ThemeContext";

const FREQUENCIES = ["Instant", "Daily Digest", "Weekly Summary", "Never"];

export default function EmailNotificationsScreen() {
  const router = useRouter();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [frequency, setFrequency] = useState("Daily Digest");
  const [messages, setMessages] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [grades, setGrades] = useState(true);
  const [events, setEvents] = useState(false);
  const { colors, fontScale } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: colors.text, fontSize: 20 * fontScale }]}>Email Notifications</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>GENERAL</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <Ionicons name="mail" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
                <View>
                  <ThemedText style={[styles.toggleLabel, { color: colors.text, fontSize: 16 * fontScale }]}>Email Notifications</ThemedText>
                  <ThemedText style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                    Receive updates via email
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={"#fff"}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>FREQUENCY</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {FREQUENCIES.map((freq, index) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.frequencyItem,
                  index < FREQUENCIES.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
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
                    color={emailEnabled ? colors.textSecondary : colors.border}
                    style={{ marginRight: 10 }}
                  />
                  <ThemedText
                    style={[styles.frequencyLabel, { color: colors.text, fontSize: 16 * fontScale }, !emailEnabled && { color: colors.border }]}
                  >
                    {freq}
                  </ThemedText>
                </View>
                {frequency === freq && emailEnabled && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>CATEGORIES</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <View style={[styles.emailToggleItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <View style={styles.emailToggleLeft}>
        <Ionicons
          name={icon}
          size={18}
          color={disabled ? colors.border : colors.textSecondary}
          style={{ marginRight: 10 }}
        />
        <ThemedText style={[styles.emailToggleLabel, { color: colors.text, fontSize: 16 * fontScale }, disabled && { color: colors.border }]}>
          {label}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={"#fff"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
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
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  toggleLabel: {
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
  },
  frequencyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  frequencyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyLabel: {
  },
  disabledText: {
  },
  emailToggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  emailToggleItemBorder: {
    marginBottom: 12,
    paddingBottom: 12,
  },
  emailToggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emailToggleLabel: {
  },
});
