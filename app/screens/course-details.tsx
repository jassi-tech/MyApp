import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const { width } = Dimensions.get("window");

const COURSE_DATA: Record<string, any> = {
  "1": {
    id: "1",
    title: "Mastering React Native Animation",
    instructor: "Sarah Johnson",
    description:
      "Learn advanced animation techniques in React Native to create stunning user experiences. This course covers everything from simple transitions to complex gesture-based interactions.",
    duration: "8h 15m",
    lessons: 5,
    rating: 4.8,
    students: 1234,
    lastUpdated: "Feb 2024",
    lessons_list: [
      {
        id: "1",
        title: "Introduction to Animations",
        duration: "12:30",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Understanding Animated API",
        duration: "18:45",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "Spring Animations",
        duration: "15:20",
        completed: false,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: "4",
        title: "Timing Animations",
        duration: "20:10",
        completed: false,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      },
      {
        id: "5",
        title: "Gesture-Based Animations",
        duration: "25:30",
        completed: false,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Fullstack Development with Expo",
    instructor: "Michael Chen",
    description:
      "Build complete mobile applications with Expo and modern backend technologies. A comprehensive guide to building scalable apps.",
    duration: "12h 45m",
    lessons: 36,
    rating: 4.9,
    students: 2156,
    lastUpdated: "Jan 2024",
    lessons_list: [
      {
        id: "1",
        title: "Getting Started with Expo",
        duration: "10:00",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Setting Up Backend",
        duration: "22:15",
        completed: false,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "API Integration",
        duration: "18:30",
        completed: false,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  },
  "3": {
    id: "3",
    title: "TypeScript for Beginners",
    instructor: "Elena Rodriguez",
    description:
      "Master TypeScript fundamentals and advanced concepts for modern development. Essential for any React Native developer.",
    duration: "6h",
    lessons: 18,
    rating: 4.7,
    students: 3421,
    lastUpdated: "Mar 2024",
    lessons_list: [
      {
        id: "1",
        title: "TypeScript Basics",
        duration: "14:20",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Types and Interfaces",
        duration: "16:45",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "Generics",
        duration: "19:30",
        completed: true,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  },
};

export default function CourseDetailsScreen() {
  const params = useLocalSearchParams();
  const courseId = params.id as string;
  const course = COURSE_DATA[courseId];

  const [selectedLesson, setSelectedLesson] = useState(course?.lessons_list[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScreenHeader title="Details" />
        <View style={styles.centerContainer}>
          <ThemedText>Course not found</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const completedLessons = course.lessons_list.filter(
    (l: any) => l.completed,
  ).length;
  const progress = Math.round(
    (completedLessons / course.lessons_list.length) * 100,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Details"
        rightElement={
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={Palette.white} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          {!isPlaying && (
            <View style={styles.videoOverlay}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color={Palette.white} />
              </View>
              {/* <ThemedText style={styles.videoTitle}>
                {selectedLesson.title}
              </ThemedText> */}
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          {/* Main Info */}
          <View style={styles.headerInfo}>
            <ThemedText type="title" style={styles.courseTitle}>
              {course.title}
            </ThemedText>
            <View style={styles.instructorRow}>
              <ThemedText style={styles.instructorLabel}>Created by</ThemedText>
              <ThemedText style={styles.instructorName}>
                {course.instructor}
              </ThemedText>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#f59e0b" />
              <View>
                <ThemedText style={styles.statValue}>
                  {course.rating}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Rating</ThemedText>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="people" size={18} color={Palette.gray} />
              <View>
                <ThemedText style={styles.statValue}>
                  {course.students.toLocaleString()}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Students</ThemedText>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={18} color={Palette.gray} />
              <View>
                <ThemedText style={styles.statValue}>
                  {course.duration}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Duration</ThemedText>
              </View>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionHeader}>
              About Course
            </ThemedText>
            <ThemedText style={styles.description}>
              {course.description}
            </ThemedText>
          </View>

          {/* Lessons */}
          <View style={styles.section}>
            <View style={styles.lessonsHeaderRow}>
              <ThemedText type="subtitle" style={styles.sectionHeader}>
                Lessons
              </ThemedText>
              <ThemedText style={styles.lessonsCount}>
                {course.lessons} videos
              </ThemedText>
            </View>

            <View style={styles.lessonsList}>
              {course.lessons_list.map((lesson: any, index: number) => {
                const isActive = selectedLesson.id === lesson.id;
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[
                      styles.lessonItem,
                      isActive && styles.lessonItemActive,
                    ]}
                    onPress={() => setSelectedLesson(lesson)}
                  >
                    <View style={styles.lessonLeft}>
                      <View
                        style={[
                          styles.indexCircle,
                          lesson.completed && styles.indexCircleCompleted,
                          isActive && styles.indexCircleActive,
                        ]}
                      >
                        {lesson.completed ? (
                          <Ionicons
                            name="checkmark"
                            size={12}
                            color={Palette.white}
                          />
                        ) : (
                          <ThemedText
                            style={[
                              styles.indexText,
                              isActive && styles.indexTextActive,
                            ]}
                          >
                            {index + 1}
                          </ThemedText>
                        )}
                      </View>
                      <View style={styles.lessonInfo}>
                        <ThemedText
                          style={[
                            styles.lessonTitle,
                            isActive && styles.lessonTitleActive,
                          ]}
                          numberOfLines={1}
                        >
                          {lesson.title}
                        </ThemedText>
                        <ThemedText style={styles.lessonDuration}>
                          {lesson.duration}
                        </ThemedText>
                      </View>
                    </View>
                    {isActive ? (
                      <Ionicons
                        name="pause-circle"
                        size={24}
                        color={Palette.primary}
                      />
                    ) : (
                      <Ionicons
                        name="play-circle-outline"
                        size={24}
                        color={Palette.gray}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  videoContainer: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
    backgroundColor: "#000",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  // videoTitle: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   padding: 16,
  //   backgroundColor:
  //     "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)", // Simple gradient fallback
  //   color: Palette.white,
  //   fontSize: 14,
  //   fontWeight: "600",
  // },
  contentContainer: {
    padding: 20,
  },
  headerInfo: {
    marginBottom: 24,
  },
  courseTitle: {
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 8,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorLabel: {
    color: Palette.gray,
    fontSize: 14,
    marginRight: 6,
  },
  instructorName: {
    color: Palette.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // Slightly lighter than background
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    justifyContent: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: Palette.white,
  },
  statLabel: {
    fontSize: 12,
    color: Palette.gray,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#333",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 12,
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#ccc",
  },
  lessonsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonsCount: {
    fontSize: 13,
    color: Palette.gray,
  },
  lessonsList: {
    gap: 12,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
  },
  lessonItemActive: {
    backgroundColor: "#2C2C2E", // Slightly lighter active state
    borderLeftWidth: 3,
    borderLeftColor: Palette.primary,
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  indexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  indexCircleCompleted: {
    backgroundColor: Palette.green,
  },
  indexCircleActive: {
    backgroundColor: Palette.primary,
  },
  indexText: {
    fontSize: 10,
    fontWeight: "600",
    color: Palette.gray,
  },
  indexTextActive: {
    color: Palette.white,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: Palette.white,
    marginBottom: 2,
  },
  lessonTitleActive: {
    fontWeight: "600",
    color: Palette.primary,
  },
  lessonDuration: {
    fontSize: 12,
    color: Palette.gray,
  },
});
