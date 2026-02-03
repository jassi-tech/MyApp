import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/components/common/cards";
import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number;
  status: "Active" | "Completed";
}

const ACTIVE_COURSES: CourseItem[] = [
  {
    id: "1",
    title: "Mastering React Native Animation",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    progress: 65,
    status: "Active",
  },
  {
    id: "2",
    title: "Fullstack Development with Expo",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    progress: 30,
    status: "Active",
  },
];

const COMPLETED_COURSES: CourseItem[] = [
  {
    id: "3",
    title: "TypeScript for Beginners",
    instructor: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
    progress: 100,
    status: "Completed",
  },
];

export default function CoursesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Active Courses</ThemedText>
        {ACTIVE_COURSES.map((course) => (
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
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
              </View>
              <ThemedText style={styles.progressText}>{course.progress}%</ThemedText>
            </View>
            <ThemedText style={styles.statusLabelActive}>{course.status}</ThemedText>
          </Card>
        ))}
      </View>

      <View style={[styles.section, { marginBottom: 20 }]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Completed</ThemedText>
        {COMPLETED_COURSES.map((course) => (
          <Card
            key={course.id}
            variant="horizontal"
            title={course.title}
            subtitle={`Instructor: ${course.instructor}`}
            image={course.image}
            onPress={() => router.push(`/screens/course-details?id=${course.id}`)}
            style={styles.card}
          >
            <ThemedText style={styles.statusLabelCompleted}>{course.status}</ThemedText>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    color: Palette.white,
    marginBottom: 12,
    fontSize: 18,
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
    backgroundColor: Palette.lightGray,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Palette.green,
  },
  progressText: {
    fontSize: 12,
    color: Palette.gray,
    fontWeight: "600",
  },
  statusLabelActive: {
    fontSize: 12,
    color: Palette.green,
    fontWeight: "bold",
    marginTop: 4,
  },
  statusLabelCompleted: {
    fontSize: 12,
    color: Palette.gray,
    fontWeight: "bold",
    marginTop: 4,
  },
});
