import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

export default function PurchasedCoursesScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { purchasedCourses } = useCourses();

  if (purchasedCourses.length === 0) {
    return (
      <ScreenContainer header={<ScreenHeader title="My Purchased Courses" />}>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="school-outline"
            size={64}
            color={colors.textSecondary}
          />
          <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
            No Courses Yet
          </ThemedText>
          <ThemedText
            style={[styles.emptySubtitle, { color: colors.textSecondary }]}
          >
            Visit the Store to purchase your first course
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
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer header={<ScreenHeader title="My Purchased Courses" />}>
      {purchasedCourses.map((course) => {
        const completedLessons = course.lessons_list.filter(
          (l) => l.completed,
        ).length;
        const totalLessons = course.lessons_list.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        const isCompleted = completedLessons === totalLessons;

        return (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() =>
              router.push(`/screens/course-details?id=${course.id}`)
            }
          >
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <ThemedText
                style={[
                  styles.titleText,
                  { color: colors.text, fontSize: 16 * fontScale },
                ]}
                numberOfLines={2}
              >
                {course.title}
              </ThemedText>
              <View style={styles.metaRow}>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText
                  style={[
                    styles.instructorText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {course.instructor}
                </ThemedText>
              </View>
              <View style={styles.metaRow}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText
                  style={[styles.durationText, { color: colors.textSecondary }]}
                >
                  {course.duration}
                </ThemedText>
                <View style={styles.separator} />
                <Ionicons
                  name="play-circle-outline"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText
                  style={[styles.lessonsText, { color: colors.textSecondary }]}
                >
                  {course.lessons} lessons
                </ThemedText>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
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
                        width: `${progress}%`,
                        backgroundColor: isCompleted
                          ? "#10b981"
                          : colors.primary,
                      },
                    ]}
                  />
                </View>
                <ThemedText
                  style={[styles.progressText, { color: colors.textSecondary }]}
                >
                  {progress}%
                </ThemedText>
              </View>

              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: isCompleted
                      ? "#10b98120"
                      : colors.primary + "20",
                  },
                ]}
              >
                <Ionicons
                  name={isCompleted ? "checkmark-circle" : "time-outline"}
                  size={12}
                  color={isCompleted ? "#10b981" : colors.primary}
                />
                <ThemedText
                  style={[
                    styles.statusText,
                    { color: isCompleted ? "#10b981" : colors.primary },
                  ]}
                >
                  {isCompleted ? "Completed" : "In Progress"}
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() =>
                router.push(`/screens/course-details?id=${course.id}`)
              }
            >
              <Ionicons name="play-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  storeButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  storeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  courseCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  courseContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  instructorText: {
    fontSize: 12,
  },
  durationText: {
    fontSize: 12,
  },
  lessonsText: {
    fontSize: 12,
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 6,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  progressText: {
    fontSize: 11,
    fontWeight: "600",
    minWidth: 35,
    textAlign: "right",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  playButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
