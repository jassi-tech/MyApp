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

import { useStudent } from "@/context/StudentContext";

export default function SyllabusScreen() {
  const router = useRouter();
  const { colors, fontScale, isDark } = useTheme();
  const { syllabus } = useStudent();

  return (
    <ScreenContainer header={<ScreenHeader title="Syllabus" />}>
      {syllabus.map((subject) => {
          const completedTopics = subject.topics.filter(t => t.completed).length;
          const totalTopics = subject.topics.length;
          const progress = subject.progress * 100;
          
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
                  {subject.subject}
                </ThemedText>
                <ThemedText style={[styles.chaptersText, { color: colors.textSecondary }]}>
                  {completedTopics} of {totalTopics} topics completed
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
