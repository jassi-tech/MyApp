import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useStudent } from "@/context/StudentContext";
import { useTheme } from "@/context/ThemeContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ... keep data as is ... -> Removed static data

export default function TimetableScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { timetable } = useStudent();

  const [selectedDay, setSelectedDay] = useState("Mon");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter timetable for selected day
  const dailyTimetable = timetable[selectedDay] || [];

  // Animation values
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
    slideAnim.value = withSpring(0, { damping: 15 });
  }, [selectedDay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ translateY: slideAnim.value }],
    };
  });

  return (
    <ScreenContainer header={<ScreenHeader title="Class Timetable" />}>
      <View style={styles.contentContainer}>
        {/* Day Selector */}
        <View style={styles.daySelectorContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daySelectorContent}
          >
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDay === day && styles.dayButtonActive,
                  {
                    backgroundColor:
                      selectedDay === day
                        ? colors.primary
                        : colors.backgroundSecondary,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setSelectedDay(day);
                  fadeAnim.value = 0;
                  slideAnim.value = 50;
                  // Trigger re-render/animation effect
                }}
              >
                <ThemedText
                  style={[
                    styles.dayText,
                    selectedDay === day && styles.dayTextActive,
                    {
                      color:
                        selectedDay === day ? "#FFFFFF" : colors.textSecondary,
                    },
                  ]}
                >
                  {day}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Timetable List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {dailyTimetable.length > 0 ? (
            dailyTimetable.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                    styles.timelineItem,
                    animatedStyle,
                    // Stagger animation if desired, otherwise simple fade/slide
                ]}
              >
                {/* Time Column */}
                <View style={styles.timeColumn}>
                  <ThemedText style={[styles.timeText, { color: colors.text }]}>
                    {item.time.split(" ")[0]}
                  </ThemedText>
                  <ThemedText
                    style={[styles.ampmText, { color: colors.textSecondary }]}
                  >
                    {item.time.split(" ")[1]}
                  </ThemedText>
                  <View
                    style={[styles.timeLine, { backgroundColor: colors.border }]}
                  />
                </View>

                {/* Card */}
                <View
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: item.color, // Using pre-defined lightly colored backgrounds
                      shadowColor: colors.shadow,
                    },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: "rgba(255,255,255,0.7)" },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={item.iconColor}
                      />
                    </View>
                    <View style={styles.subjectInfo}>
                      <ThemedText style={[styles.subjectName, { color: "#1f2937" }]}> 
                         {/* Force dark text for contrast on light cards, or use theme aware logic if cards can be dark */}
                        {item.subject}
                      </ThemedText>
                      <ThemedText style={[styles.teacherName, { color: "#4b5563" }]}>
                        {item.teacher}
                      </ThemedText>
                    </View>
                  </View>
                  
                  <View style={[styles.divider, { backgroundColor: "rgba(0,0,0,0.05)" }]} />
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                       <Ionicons name="location-outline" size={16} color="#4b5563" />
                       <ThemedText style={[styles.roomText, { color: "#4b5563" }]}>
                         Room {item.room}
                       </ThemedText>
                    </View>
                     <View style={[styles.statusBadge, { backgroundColor: "rgba(255,255,255,0.5)" }]}>
                        <ThemedText style={[styles.statusText, { color: item.iconColor }]}>
                            On Time
                        </ThemedText>
                     </View>
                  </View>

                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="calendar-clear-outline"
                size={64}
                color={colors.border}
              />
              <ThemedText
                style={[styles.emptyText, { color: colors.textSecondary }]}
              >
                No classes scheduled for this day.
              </ThemedText>
            </View>
          )}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  daySelectorContainer: {
    paddingVertical: 15,
  },
  daySelectorContent: {
    paddingHorizontal: 20,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  dayButtonActive: {
    borderWidth: 0,
  },
  dayText: {
    fontWeight: "600",
    fontSize: 14,
  },
  dayTextActive: {
    // color handled inline
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timeColumn: {
    width: 60,
    alignItems: "center",
    marginRight: 10,
  },
  timeText: {
    fontWeight: "700",
    fontSize: 16,
  },
  ampmText: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  timeLine: {
    width: 2,
    flex: 1,
    borderRadius: 1,
    marginTop: 5,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
      height: 1,
      marginBottom: 12,
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  footerItem: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  roomText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  statusText: {
      fontSize: 12,
      fontWeight: '700',
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
  },
});
