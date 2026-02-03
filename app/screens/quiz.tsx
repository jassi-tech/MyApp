import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

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

  const handleSubjectPress = (subject: typeof SUBJECTS[0]) => {
    router.push({
      pathname: "/screens/quiz-details",
      params: { id: subject.id, title: subject.label },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Select Subject" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.subtitle}>Choose a subject to start your quiz</ThemedText>
        
        <View style={styles.grid}>
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={styles.subjectCard}
              onPress={() => handleSubjectPress(subject)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: subject.color }]}>
                <Ionicons name={subject.icon as any} size={32} color={subject.iconColor} />
              </View>
              <ThemedText style={styles.subjectLabel}>{subject.label}</ThemedText>
              <ThemedText style={styles.quizInfo}>10 Questions</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.black,
  },
  scrollContent: {
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 24,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectCard: {
    width: "48%",
    backgroundColor: Palette.darkGray,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 4,
  },
  quizInfo: {
    fontSize: 12,
    color: "#888",
  },
});
