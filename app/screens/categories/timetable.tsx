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
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIMETABLE_DATA: Record<string, any[]> = {
  Mon: [
    { time: "08:00 - 08:45 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "08:45 - 09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 2", icon: "flash-outline", color: "#fef2f2", iconColor: "#dc2626" },
    { time: "09:30 - 10:15 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
    { time: "10:15 - 10:45 AM", subject: "Break", teacher: "-", room: "Cafeteria", icon: "cafe-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "10:45 - 11:30 AM", subject: "History", teacher: "Mr. Miller", room: "Room 301", icon: "earth-outline", color: "#faf5ff", iconColor: "#9333ea" },
    { time: "11:30 - 12:15 PM", subject: "Computer Science", teacher: "Dr. Lee", room: "Lab 3", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#0891b2" },
  ],
  Tue: [
    { time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Dr. Wilson", room: "Bio Lab", icon: "leaf-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "08:45 - 09:30 AM", subject: "Chemistry", teacher: "Dr. Brown", room: "Chem Lab", icon: "flask-outline", color: "#ecfdf5", iconColor: "#059669" },
    { time: "09:30 - 10:15 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "10:15 - 10:45 AM", subject: "Break", teacher: "-", room: "Cafeteria", icon: "cafe-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "10:45 - 11:30 AM", subject: "Geography", teacher: "Ms. Taylor", room: "Room 205", icon: "map-outline", color: "#fef3c7", iconColor: "#d97706" },
  ],
  Wed: [
    { time: "08:00 - 08:45 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
    { time: "08:45 - 09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 2", icon: "flash-outline", color: "#fef2f2", iconColor: "#dc2626" },
    { time: "09:30 - 10:15 AM", subject: "Art", teacher: "Mr. Garcia", room: "Art Studio", icon: "color-palette-outline", color: "#fce7f3", iconColor: "#db2777" },
  ],
  Thu: [
    { time: "08:00 - 08:45 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "08:45 - 09:30 AM", subject: "History", teacher: "Mr. Miller", room: "Room 301", icon: "earth-outline", color: "#faf5ff", iconColor: "#9333ea" },
    { time: "09:30 - 10:15 AM", subject: "Music", teacher: "Ms. Anderson", room: "Music Room", icon: "musical-notes-outline", color: "#fef3c7", iconColor: "#ca8a04" },
  ],
  Fri: [
    { time: "08:00 - 08:45 AM", subject: "Computer Science", teacher: "Dr. Lee", room: "Lab 3", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#0891b2" },
    { time: "08:45 - 09:30 AM", subject: "Chemistry", teacher: "Dr. Brown", room: "Chem Lab", icon: "flask-outline", color: "#ecfdf5", iconColor: "#059669" },
    { time: "09:30 - 10:15 AM", subject: "Physical Education", teacher: "Coach Roberts", room: "Gym", icon: "fitness-outline", color: "#fef2f2", iconColor: "#dc2626" },
  ],
  Sat: [
    { time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Dr. Wilson", room: "Bio Lab", icon: "leaf-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "08:45 - 09:30 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
  ],
};

export default function TimetableScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Mon");

  const schedule = TIMETABLE_DATA[selectedDay] || TIMETABLE_DATA["Mon"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <ThemedText style={styles.headerTitle}>Class Timetable</ThemedText>
          <ThemedText style={styles.headerSubtitle}>{selectedDay}day's Schedule</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.daySelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelectorScroll}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.dayTab,
                selectedDay === day && styles.activeDayTab,
              ]}
            >
              <ThemedText style={[
                styles.dayTabText,
                selectedDay === day && styles.activeDayTabText
              ]}>
                {day}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          key={selectedDay}
          entering={FadeInRight.duration(300)}
          exiting={FadeOutLeft.duration(200)}
        >
          {schedule.map((item, index) => (
            <View key={index} style={styles.periodWrapper}>
              <View style={styles.timelineSection}>
                <View style={styles.timelineDot} />
                {index < schedule.length - 1 && <View style={styles.timelineLine} />}
              </View>

              <View style={styles.periodCard}>
                <View style={styles.timeSection}>
                  <ThemedText style={styles.timeText}>{item.time.split(" - ")[0]}</ThemedText>
                  <View style={styles.timeDivider} />
                  <ThemedText style={styles.timeText}>{item.time.split(" - ")[1]}</ThemedText>
                </View>

                <View style={styles.contentSection}>
                  <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                    <Ionicons name={item.icon} size={28} color={item.iconColor} />
                  </View>
                  <View style={styles.infoBox}>
                    <ThemedText style={styles.subjectText}>{item.subject}</ThemedText>
                    <View style={styles.detailsRow}>
                      <Ionicons name="person-outline" size={12} color="#666" style={{ marginRight: 4 }} />
                      <ThemedText style={styles.detailsText}>{item.teacher}</ThemedText>
                    </View>
                    <View style={styles.detailsRow}>
                      <Ionicons name="location-outline" size={12} color="#666" style={{ marginRight: 4 }} />
                      <ThemedText style={styles.roomText}>{item.room}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Palette.white,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#00bfff",
    marginTop: 2,
  },
  daySelectorContainer: {
    paddingVertical: 20,
    backgroundColor: "#0a0a0a",
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  daySelectorScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dayTab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: Palette.darkGray,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#2a2a2a',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  activeDayTab: {
    backgroundColor: '#00bfff',
    borderColor: '#00bfff',
    elevation: 6,
    shadowColor: "#00bfff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  dayTabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.5,
  },
  activeDayTabText: {
    color: Palette.white,
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
    borderColor: "#1a1a1a",
    zIndex: 2,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#2a2a2a",
    marginTop: 4,
  },
  periodCard: {
    flex: 1,
    backgroundColor: Palette.darkGray,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  timeText: {
    fontSize: 11,
    color: "#888",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  timeDivider: {
    width: 20,
    height: 1,
    backgroundColor: "#444",
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  infoBox: {
    flex: 1,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "700",
    color: Palette.white,
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
    color: "#999",
    fontWeight: "500",
  },
  roomText: {
    fontSize: 13,
    color: "#00bfff",
    fontWeight: "600",
  },
});
