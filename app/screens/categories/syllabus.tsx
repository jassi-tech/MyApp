import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

const SUBJECTS = [
  {
    id: "1",
    name: "Mathematics",
    chapters: 12,
    completed: 8,
    icon: "calculator-outline",
    color: "#e0f2fe",
  },
  {
    id: "2",
    name: "Science",
    chapters: 10,
    completed: 6,
    icon: "flask-outline",
    color: "#f0fdf4",
  },
  {
    id: "3",
    name: "English",
    chapters: 8,
    completed: 5,
    icon: "book-outline",
    color: "#fff7ed",
  },
  {
    id: "4",
    name: "History",
    chapters: 9,
    completed: 4,
    icon: "earth-outline",
    color: "#faf5ff",
  },
  {
    id: "5",
    name: "Geography",
    chapters: 7,
    completed: 3,
    icon: "map-outline",
    color: "#fef3c7",
  },
];

export default function SyllabusScreen() {
  const router = useRouter();
  const { colors, fontScale, isDark } = useTheme();

  return (
    <ScreenContainer header={<ScreenHeader title="Syllabus" />}>
      {SUBJECTS.map((subject) => {
          const progress = (subject.completed / subject.chapters) * 100;
          return (
            <TouchableOpacity 
              key={subject.id} 
              style={[styles.subjectCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View
                style={[styles.iconBox, { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : subject.color }]}
              >
                <Ionicons name={subject.icon as any} size={28} color={isDark ? colors.text : "#333"} />
              </View>
              <View style={styles.subjectContent}>
                <ThemedText style={[styles.subjectName, { color: colors.text }]}>
                  {subject.name}
                </ThemedText>
                <ThemedText style={[styles.chaptersText, { color: colors.textSecondary }]}>
                  {subject.completed} of {subject.chapters} chapters completed
                </ThemedText>
                <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                  <View
                    style={[styles.progressBarFill, { width: `${progress}%` }]}
                  />
                </View>
                <ThemedText style={styles.progressText}>
                  {Math.round(progress)}% Complete
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  subjectCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  subjectContent: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  chaptersText: {
    fontSize: 13,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00bfff",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#00bfff",
    fontWeight: "600",
  },
});
