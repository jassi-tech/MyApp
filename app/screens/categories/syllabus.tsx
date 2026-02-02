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

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const SUBJECTS = [
  { id: "1", name: "Mathematics", chapters: 12, completed: 8, icon: "calculator-outline", color: "#e0f2fe" },
  { id: "2", name: "Science", chapters: 10, completed: 6, icon: "flask-outline", color: "#f0fdf4" },
  { id: "3", name: "English", chapters: 8, completed: 5, icon: "book-outline", color: "#fff7ed" },
  { id: "4", name: "History", chapters: 9, completed: 4, icon: "earth-outline", color: "#faf5ff" },
  { id: "5", name: "Geography", chapters: 7, completed: 3, icon: "map-outline", color: "#fef3c7" },
];

export default function SyllabusScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Syllabus</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {SUBJECTS.map((subject) => {
          const progress = (subject.completed / subject.chapters) * 100;
          return (
            <TouchableOpacity key={subject.id} style={styles.subjectCard}>
              <View style={[styles.iconBox, { backgroundColor: subject.color }]}>
                <Ionicons name={subject.icon as any} size={28} color="#333" />
              </View>
              <View style={styles.subjectContent}>
                <ThemedText style={styles.subjectName}>{subject.name}</ThemedText>
                <ThemedText style={styles.chaptersText}>
                  {subject.completed} of {subject.chapters} chapters completed
                </ThemedText>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <ThemedText style={styles.progressText}>{Math.round(progress)}% Complete</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          );
        })}
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
  subjectCard: {
    flexDirection: "row",
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
    color: Palette.white,
    marginBottom: 6,
  },
  chaptersText: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#2a2a2a",
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
