import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ... keep data as is ...
const TIMETABLE_DATA: Record<string, any[]> = {
  Mon: [
    {
      time: "08:00 - 08:45 AM",
      subject: "Mathematics",
      teacher: "Dr. Smith",
      room: "Room 101",
      icon: "calculator-outline",
      color: "#e0f2fe",
      iconColor: "#0284c7",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "Physics",
      teacher: "Prof. Johnson",
      room: "Lab 2",
      icon: "flash-outline",
      color: "#fef2f2",
      iconColor: "#dc2626",
    },
    {
      time: "09:30 - 10:15 AM",
      subject: "English",
      teacher: "Ms. Davis",
      room: "Room 204",
      icon: "book-outline",
      color: "#fff7ed",
      iconColor: "#ea580c",
    },
    {
      time: "10:15 - 10:45 AM",
      subject: "Break",
      teacher: "-",
      room: "Cafeteria",
      icon: "cafe-outline",
      color: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      time: "10:45 - 11:30 AM",
      subject: "History",
      teacher: "Mr. Miller",
      room: "Room 301",
      icon: "earth-outline",
      color: "#faf5ff",
      iconColor: "#9333ea",
    },
    {
      time: "11:30 - 12:15 PM",
      subject: "Computer Science",
      teacher: "Dr. Lee",
      room: "Lab 3",
      icon: "desktop-outline",
      color: "#f0f9ff",
      iconColor: "#0891b2",
    },
  ],
  Tue: [
    {
      time: "08:00 - 08:45 AM",
      subject: "Biology",
      teacher: "Dr. Wilson",
      room: "Bio Lab",
      icon: "leaf-outline",
      color: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "Chemistry",
      teacher: "Dr. Brown",
      room: "Chem Lab",
      icon: "flask-outline",
      color: "#ecfdf5",
      iconColor: "#059669",
    },
    {
      time: "09:30 - 10:15 AM",
      subject: "Mathematics",
      teacher: "Dr. Smith",
      room: "Room 101",
      icon: "calculator-outline",
      color: "#e0f2fe",
      iconColor: "#0284c7",
    },
    {
      time: "10:15 - 10:45 AM",
      subject: "Break",
      teacher: "-",
      room: "Cafeteria",
      icon: "cafe-outline",
      color: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      time: "10:45 - 11:30 AM",
      subject: "Geography",
      teacher: "Ms. Taylor",
      room: "Room 205",
      icon: "map-outline",
      color: "#fef3c7",
      iconColor: "#d97706",
    },
  ],
  Wed: [
    {
      time: "08:00 - 08:45 AM",
      subject: "English",
      teacher: "Ms. Davis",
      room: "Room 204",
      icon: "book-outline",
      color: "#fff7ed",
      iconColor: "#ea580c",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "Physics",
      teacher: "Prof. Johnson",
      room: "Lab 2",
      icon: "flash-outline",
      color: "#fef2f2",
      iconColor: "#dc2626",
    },
    {
      time: "09:30 - 10:15 AM",
      subject: "Art",
      teacher: "Mr. Garcia",
      room: "Art Studio",
      icon: "color-palette-outline",
      color: "#fce7f3",
      iconColor: "#db2777",
    },
  ],
  Thu: [
    {
      time: "08:00 - 08:45 AM",
      subject: "Mathematics",
      teacher: "Dr. Smith",
      room: "Room 101",
      icon: "calculator-outline",
      color: "#e0f2fe",
      iconColor: "#0284c7",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "History",
      teacher: "Mr. Miller",
      room: "Room 301",
      icon: "earth-outline",
      color: "#faf5ff",
      iconColor: "#9333ea",
    },
    {
      time: "09:30 - 10:15 AM",
      subject: "Music",
      teacher: "Ms. Anderson",
      room: "Music Room",
      icon: "musical-notes-outline",
      color: "#fef3c7",
      iconColor: "#ca8a04",
    },
  ],
  Fri: [
    {
      time: "08:00 - 08:45 AM",
      subject: "Computer Science",
      teacher: "Dr. Lee",
      room: "Lab 3",
      icon: "desktop-outline",
      color: "#f0f9ff",
      iconColor: "#0891b2",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "Chemistry",
      teacher: "Dr. Brown",
      room: "Chem Lab",
      icon: "flask-outline",
      color: "#ecfdf5",
      iconColor: "#059669",
    },
    {
      time: "09:30 - 10:15 AM",
      subject: "Physical Education",
      teacher: "Coach Roberts",
      room: "Gym",
      icon: "fitness-outline",
      color: "#fef2f2",
      iconColor: "#dc2626",
    },
  ],
  Sat: [
    {
      time: "08:00 - 08:45 AM",
      subject: "Biology",
      teacher: "Dr. Wilson",
      room: "Bio Lab",
      icon: "leaf-outline",
      color: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      time: "08:45 - 09:30 AM",
      subject: "English",
      teacher: "Ms. Davis",
      room: "Room 204",
      icon: "book-outline",
      color: "#fff7ed",
      iconColor: "#ea580c",
    },
  ],
};

export default function TimetableScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Mon");
  const { colors, fontScale, isDark } = useTheme();

  const schedule = TIMETABLE_DATA[selectedDay] || TIMETABLE_DATA["Mon"];

  return (
    <ScreenContainer 
      scrollable={false}
      header={
        <ScreenHeader
          title="Class Timetable"
          subtitle={`${selectedDay}day's Schedule`}
        />
      }
    >
      <View style={[styles.daySelectorContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelectorScroll}
        >
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.dayTab,
                { 
                    backgroundColor: colors.card,
                    borderColor: colors.border
                },
                selectedDay === day && styles.activeDayTab,
              ]}
            >
              <ThemedText
                style={[
                  styles.dayTabText,
                  { color: colors.textSecondary },
                  selectedDay === day && { color: "#fff" },
                ]}
              >
                {day}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={selectedDay}
          entering={FadeInRight.duration(300)}
          exiting={FadeOutLeft.duration(200)}
        >
          {schedule.map((item, index) => (
            <View key={index} style={styles.periodWrapper}>
              <View style={styles.timelineSection}>
                <View style={[styles.timelineDot, { borderColor: colors.background }]} />
                {index < schedule.length - 1 && (
                  <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />
                )}
              </View>

              <View style={[styles.periodCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.timeSection, { borderBottomColor: colors.border }]}>
                  <ThemedText style={[styles.timeText, { color: colors.textSecondary }]}>
                    {item.time.split(" - ")[0]}
                  </ThemedText>
                  <View style={[styles.timeDivider, { backgroundColor: colors.border }]} />
                  <ThemedText style={[styles.timeText, { color: colors.textSecondary }]}>
                    {item.time.split(" - ")[1]}
                  </ThemedText>
                </View>

                <View style={styles.contentSection}>
                  <View
                    style={[
                        styles.iconBox, 
                        { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : item.color }
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={28}
                      color={item.iconColor}
                    />
                  </View>
                  <View style={styles.infoBox}>
                    <ThemedText style={[styles.subjectText, { color: colors.text, fontSize: 18 * fontScale }]}>
                      {item.subject}
                    </ThemedText>
                    <View style={styles.detailsRow}>
                      <Ionicons
                        name="person-outline"
                        size={12}
                        color={colors.textSecondary}
                        style={{ marginRight: 4 }}
                      />
                      <ThemedText style={[styles.detailsText, { color: colors.textSecondary }]}>
                        {item.teacher}
                      </ThemedText>
                    </View>
                    <View style={styles.detailsRow}>
                      <Ionicons
                        name="location-outline"
                        size={12}
                        color={colors.textSecondary}
                        style={{ marginRight: 4 }}
                      />
                      <ThemedText style={styles.roomText}>
                        {item.room}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  daySelectorContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  daySelectorScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dayTab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activeDayTab: {
    backgroundColor: "#00bfff",
    borderColor: "#00bfff",
    elevation: 4,
    shadowColor: "#00bfff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dayTabText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  periodWrapper: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineSection: {
    width: 30,
    alignItems: "center",
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00bfff",
    borderWidth: 3,
    zIndex: 2,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    marginTop: 4,
  },
  periodCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  timeDivider: {
    width: 20,
    height: 1,
    marginHorizontal: 8,
  },
  contentSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  subjectText: {
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 13,
    fontWeight: "500",
  },
  roomText: {
    fontSize: 13,
    color: "#00bfff",
    fontWeight: "600",
  },
});
