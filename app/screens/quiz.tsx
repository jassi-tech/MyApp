import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useStudent } from "@/context/StudentContext";
import { useTheme } from "@/context/ThemeContext";

const SUBJECTS = [
  { id: "1", label: "Mathematics", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0ea5e9" },
  { id: "2", label: "Science", icon: "flask-outline", color: "#f0fdf4", iconColor: "#22c55e" },
  { id: "3", label: "English", icon: "book-outline", color: "#fff7ed", iconColor: "#f59e0b" },
  { id: "4", label: "History", icon: "earth-outline", color: "#fef2f2", iconColor: "#ef4444" },
  { id: "5", label: "Geography", icon: "map-outline", color: "#faf5ff", iconColor: "#a855f7" },
  { id: "6", label: "Computers", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#06b6d4" },
];

export default function QuizScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  const handleSubjectPress = (subject: typeof SUBJECTS[0]) => {
    router.push({
      pathname: "/screens/quiz-details",
      params: { id: subject.id, title: subject.label },
    });
  };
  const { subjects: quizSubjects } = useStudent();

  return (
    <ScreenContainer header={<ScreenHeader title="Quiz" />}>
      <View style={styles.gridContainer}>
        {quizSubjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[
              styles.card,
              {
                backgroundColor: subject.color,
                shadowColor: colors.shadow,
              },
            ]}
            onPress={() => router.push("/screens/quiz-details" as any)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: "rgba(255,255,255,0.6)" },
              ]}
            >
              <Ionicons
                name={subject.icon as any}
                size={32}
                color={subject.iconColor}
              />
            </View>
            <ThemedText style={[styles.cardTitle, { color: "#1f2937" }]}>
              {subject.label}
            </ThemedText>
            <View style={styles.badge}>
              <ThemedText style={[styles.badgeText, { color: subject.iconColor }]}>
                {subject.questionCount} Questions
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  card: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    aspectRatio: 0.8, // Taller cards
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
