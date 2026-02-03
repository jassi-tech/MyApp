import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/components/common/cards";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useCourses } from "@/context/CourseContext";

export default function CoursesScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { purchasedCourses } = useCourses();

  const activeCourses = purchasedCourses.filter(c => 
    c.lessons_list.some(l => !l.completed) || c.lessons_list.every(l => !l.completed)
  );
  
  const completedCourses = purchasedCourses.filter(c => 
    c.lessons_list.length > 0 && c.lessons_list.every(l => l.completed)
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text, fontSize: 18 * fontScale }]}>Active Courses</ThemedText>
        {activeCourses.length > 0 ? (
          activeCourses.map((course) => (
            <Card
              key={course.id}
              variant="horizontal"
              title={course.title}
              subtitle={`Instructor: ${course.instructor}`}
              image={course.image}
              onPress={() => router.push(`/screens/course-details?id=${course.id}`)}
              style={styles.card}
            >
              <View style={styles.progressRow}>
                <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                  <View style={[styles.progressBar, { 
                    width: `${Math.round((course.lessons_list.filter(l => l.completed).length / course.lessons_list.length) * 100)}%`, 
                    backgroundColor: colors.primary 
                  }]} />
                </View>
                <ThemedText style={[styles.progressText, { color: colors.textSecondary }]}>
                  {Math.round((course.lessons_list.filter(l => l.completed).length / course.lessons_list.length) * 100)}%
                </ThemedText>
              </View>
              <ThemedText style={[styles.statusLabelActive, { color: colors.primary }]}>Active</ThemedText>
            </Card>
          ))
        ) : (
          <ThemedText style={{ color: colors.textSecondary, marginBottom: 20 }}>No active courses yet. Visit the Store to enroll!</ThemedText>
        )}
      </View>

      {completedCourses.length > 0 && (
        <View style={[styles.section, { marginBottom: 20 }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text, fontSize: 18 * fontScale }]}>Completed</ThemedText>
          {completedCourses.map((course) => (
            <Card
              key={course.id}
              variant="horizontal"
              title={course.title}
              subtitle={`Instructor: ${course.instructor}`}
              image={course.image}
              onPress={() => router.push(`/screens/course-details?id=${course.id}`)}
              style={styles.card}
            >
              <ThemedText style={[styles.statusLabelCompleted, { color: colors.textSecondary }]}>Completed</ThemedText>
            </Card>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: "100%",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusLabelActive: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  statusLabelCompleted: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
});
