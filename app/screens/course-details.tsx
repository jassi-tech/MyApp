import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const { width } = Dimensions.get("window");

const COURSE_DATA: Record<string, any> = {
  "1": {
    id: "1",
    title: "Mastering React Native Animation",
    instructor: "Sarah Johnson",
    description: "Learn advanced animation techniques in React Native to create stunning user experiences.",
    duration: "8 hours",
    lessons: 24,
    rating: 4.8,
    students: 1234,
    lessons_list: [
      { id: "1", title: "Introduction to Animations", duration: "12:30", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "2", title: "Understanding Animated API", duration: "18:45", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "3", title: "Spring Animations", duration: "15:20", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { id: "4", title: "Timing Animations", duration: "20:10", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
      { id: "5", title: "Gesture-Based Animations", duration: "25:30", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    ],
  },
  "2": {
    id: "2",
    title: "Fullstack Development with Expo",
    instructor: "Michael Chen",
    description: "Build complete mobile applications with Expo and modern backend technologies.",
    duration: "12 hours",
    lessons: 36,
    rating: 4.9,
    students: 2156,
    lessons_list: [
      { id: "1", title: "Getting Started with Expo", duration: "10:00", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "2", title: "Setting Up Backend", duration: "22:15", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "3", title: "API Integration", duration: "18:30", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
  "3": {
    id: "3",
    title: "TypeScript for Beginners",
    instructor: "Elena Rodriguez",
    description: "Master TypeScript fundamentals and advanced concepts for modern development.",
    duration: "6 hours",
    lessons: 18,
    rating: 4.7,
    students: 3421,
    lessons_list: [
      { id: "1", title: "TypeScript Basics", duration: "14:20", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { id: "2", title: "Types and Interfaces", duration: "16:45", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { id: "3", title: "Generics", duration: "19:30", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
};

export default function CourseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const courseId = params.id as string;
  const course = COURSE_DATA[courseId];

  const [selectedLesson, setSelectedLesson] = useState(course?.lessons_list[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Course not found</ThemedText>
      </SafeAreaView>
    );
  }

  const completedLessons = course.lessons_list.filter((l: any) => l.completed).length;
  const progress = Math.round((completedLessons / course.lessons_list.length) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Course Details</ThemedText>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={22} color={Palette.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: selectedLesson.videoUrl }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status: any) => {
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
              }
            }}
          />
          <View style={styles.videoOverlay}>
            <ThemedText style={styles.videoTitle}>{selectedLesson.title}</ThemedText>
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <ThemedText style={styles.courseTitle}>{course.title}</ThemedText>
          <ThemedText style={styles.instructor}>by {course.instructor}</ThemedText>
          <ThemedText style={styles.description}>{course.description}</ThemedText>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="#f59e0b" />
              <ThemedText style={styles.statText}>{course.rating}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color="#888" />
              <ThemedText style={styles.statText}>{course.students.toLocaleString()}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#888" />
              <ThemedText style={styles.statText}>{course.duration}</ThemedText>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="book-outline" size={16} color="#888" />
              <ThemedText style={styles.statText}>{course.lessons} lessons</ThemedText>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>Your Progress</ThemedText>
              <ThemedText style={styles.progressPercent}>{progress}%</ThemedText>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <ThemedText style={styles.progressText}>
              {completedLessons} of {course.lessons_list.length} lessons completed
            </ThemedText>
          </View>
        </View>

        {/* Lessons List */}
        <View style={styles.lessonsSection}>
          <ThemedText style={styles.sectionTitle}>COURSE CONTENT</ThemedText>
          {course.lessons_list.map((lesson: any, index: number) => (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonCard,
                selectedLesson.id === lesson.id && styles.lessonCardActive,
              ]}
              onPress={() => setSelectedLesson(lesson)}
            >
              <View style={styles.lessonLeft}>
                <View style={[
                  styles.lessonNumber,
                  lesson.completed && styles.lessonNumberCompleted,
                  selectedLesson.id === lesson.id && styles.lessonNumberActive,
                ]}>
                  {lesson.completed ? (
                    <Ionicons name="checkmark" size={16} color={Palette.white} />
                  ) : (
                    <ThemedText style={styles.lessonNumberText}>{index + 1}</ThemedText>
                  )}
                </View>
                <View style={styles.lessonInfo}>
                  <ThemedText style={[
                    styles.lessonTitle,
                    selectedLesson.id === lesson.id && styles.lessonTitleActive,
                  ]}>
                    {lesson.title}
                  </ThemedText>
                  <View style={styles.lessonMeta}>
                    <Ionicons name="time-outline" size={12} color="#666" />
                    <ThemedText style={styles.lessonDuration}>{lesson.duration}</ThemedText>
                  </View>
                </View>
              </View>
              {selectedLesson.id === lesson.id && (
                <Ionicons name="play-circle" size={24} color="#00bfff" />
              )}
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
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  videoContainer: {
    width: width,
    height: width * 9 / 16,
    backgroundColor: "#000",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.white,
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 8,
  },
  instructor: {
    fontSize: 14,
    color: "#00bfff",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: "#888",
  },
  progressSection: {
    backgroundColor: Palette.darkGray,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.white,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00bfff",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00bfff",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#888",
  },
  lessonsSection: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 16,
    letterSpacing: 1,
  },
  lessonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Palette.darkGray,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#2a2a2a",
  },
  lessonCardActive: {
    borderColor: "#00bfff",
    backgroundColor: "#00bfff10",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonNumberCompleted: {
    backgroundColor: "#22c55e",
  },
  lessonNumberActive: {
    backgroundColor: "#00bfff",
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Palette.white,
    marginBottom: 4,
  },
  lessonTitleActive: {
    color: "#00bfff",
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: "#666",
  },
});
