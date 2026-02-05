import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/common/screen-container";
import Card from "@/components/common/cards";
import { ThemedText } from "@/components/themed-text";
import { Course } from "@/services/courseService";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

export default function CoursesScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { purchasedCourses, courseProgress, loading, error, refreshCourses } = useCourses();

  const activeCourses = purchasedCourses.filter(
    (c) => (courseProgress[c.id] || 0) < 100
  );
 
  const completedCourses = purchasedCourses.filter(
    (c) => (courseProgress[c.id] || 0) === 100
  );

  return (
    <ScreenContainer scrollable>
      <View style={styles.section}>
        <ThemedText
          type="subtitle"
          style={[
            styles.sectionTitle,
            { color: colors.text, fontSize: 18 * fontScale },
          ]}
        >
          Active Courses
        </ThemedText>
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : error ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <ThemedText style={{ color: colors.text }}>{error}</ThemedText>
            <TouchableOpacity onPress={refreshCourses} style={{ marginTop: 10 }}>
              <ThemedText style={{ color: colors.primary }}>Retry</ThemedText>
            </TouchableOpacity>
          </View>
        ) : activeCourses.length > 0 ? (
          activeCourses.map((course) => (
            <Card
              key={course.id}
              variant="horizontal"
              title={course.title}
              subtitle={`Instructor: ${course.instructor}`}
              image={course.thumbnail}
              onPress={() =>
                router.push(`/screens/course-details?id=${course.id}`)
              }
              style={styles.card}
            >
              <View style={styles.progressRow}>
                <View
                  style={[
                    styles.progressBarContainer,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${courseProgress[course.id] || 0}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
                <ThemedText
                  style={[styles.progressText, { color: colors.textSecondary }]}
                >
                  {courseProgress[course.id] || 0}%
                </ThemedText>
              </View>
              <ThemedText
                style={[styles.statusLabelActive, { color: colors.primary }]}
              >
                Active
              </ThemedText>
            </Card>
          ))
        ) : (
          <View>
            <ThemedText
              style={{ color: colors.textSecondary, marginBottom: 16 }}
            >
              No active courses yet. Visit the Store to enroll!
            </ThemedText>
            <TouchableOpacity
              style={[styles.storeButton, { backgroundColor: colors.pink }]}
              onPress={() => router.push("/screens/(tabs)/Store" as any)}
            >
              <ThemedText style={styles.storeButtonText}>
                Browse Courses
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {completedCourses.length > 0 && (
        <View style={[styles.section, { marginBottom: 20 }]}>
          <ThemedText
            type="subtitle"
            style={[
              styles.sectionTitle,
              { color: colors.text, fontSize: 18 * fontScale },
            ]}
          >
            Completed
          </ThemedText>
          {completedCourses.map((course) => (
            <Card
              key={course.id}
              variant="horizontal"
              title={course.title}
              subtitle={`Instructor: ${course.instructor}`}
              image={course.thumbnail}
              onPress={() =>
                router.push(`/screens/course-details?id=${course.id}`)
              }
              style={styles.card}
            >
              <ThemedText
                style={[
                  styles.statusLabelCompleted,
                  { color: colors.textSecondary },
                ]}
              >
                Completed
              </ThemedText>
            </Card>
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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

  storeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  storeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
