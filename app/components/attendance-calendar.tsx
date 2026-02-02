import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

interface AttendanceCalendarProps {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
  presentDays?: number[]; // Mocking attendance status for now
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  initialDate = new Date(),
  onDateSelect,
  presentDays = [11],
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const today = useMemo(() => new Date(), []);
  const [selectedDay, setSelectedDay] = useState<number | null>(
    currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
      ? today.getDate()
      : null
  );

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    let startDayIndex = firstDay.getDay() - 1;
    if (startDayIndex === -1) startDayIndex = 6;

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIndex - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    setCurrentDate(newDate);

    if (
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
      setSelectedDay(today.getDate());
    } else {
      setSelectedDay(null);
    }
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    if (onDateSelect) {
      onDateSelect(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.monthTitle}>{monthName}</ThemedText>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {daysOfWeek.map((day) => (
          <ThemedText key={day} style={styles.weekDayText}>
            {day}
          </ThemedText>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {calendarData.map((item, index) => (
          <View key={`${item.day}-${index}`} style={styles.dayCell}>
            {item.isCurrentMonth ? (
              <TouchableOpacity
                onPress={() => handleDayPress(item.day)}
                style={[
                  styles.dayCircle,
                  item.day === selectedDay && styles.selectedDayCircle,
                  isToday(item.day) && !selectedDay && styles.todayCircle,
                  isToday(item.day) && styles.todayHighlight,
                ]}
              >
                <ThemedText
                  style={[
                    styles.dayText,
                    item.day === selectedDay && styles.selectedDayText,
                    isToday(item.day) && styles.todayText,
                  ]}
                >
                  {item.day}
                </ThemedText>
              </TouchableOpacity>
            ) : (
              <ThemedText style={styles.placeholderDayText}>{item.day}</ThemedText>
            )}
            {item.isCurrentMonth && presentDays.includes(item.day) && (
              <View style={styles.presentIndicator}>
                <ThemedText style={styles.presentIndicatorText}>P</ThemedText>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Palette.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDayText: {
    width: "14%",
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayCircle: {
    backgroundColor: "#00bfff",
  },
  todayCircle: {
    backgroundColor: "#e0f2fe",
  },
  todayHighlight: {
    borderWidth: 1,
    borderColor: "#00bfff",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDayText: {
    color: Palette.white,
    fontWeight: "bold",
  },
  todayText: {
    color: "#0369a1",
    fontWeight: "bold",
  },
  placeholderDayText: {
    fontSize: 14,
    color: "#ccc",
  },
  presentIndicator: {
    position: "absolute",
    bottom: 2,
    backgroundColor: "#10b981",
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  presentIndicatorText: {
    fontSize: 8,
    color: Palette.white,
    fontWeight: "bold",
  },
});
