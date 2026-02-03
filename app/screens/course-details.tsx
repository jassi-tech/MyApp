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

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

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
        completed: true,
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
  const router = useRouter();
  const params = useLocalSearchParams();
  const courseId = params.id as string;
  const course = COURSE_DATA[courseId];
  const { colors, fontScale } = useTheme();

  const { isCoursePurchased } = useCourses();
  const [selectedLesson, setSelectedLesson] = useState(course?.lessons_list[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ScreenHeader title="Details" />
        <View style={styles.centerContainer}>
          <ThemedText style={{ color: colors.text }}>Course not found</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Details"
        rightElement={
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player */}
        <View style={[styles.videoContainer, { backgroundColor: '#000' }]}>
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
                <Ionicons name="play" size={32} color="#FFFFFF" />
              </View>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          {/* Main Info */}
          <View style={styles.headerInfo}>
            <ThemedText type="title" style={[styles.courseTitle, { color: colors.text, fontSize: 22 * fontScale }]}>
              {course.title}
            </ThemedText>
            <View style={styles.instructorRow}>
              <ThemedText style={[styles.instructorLabel, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>Created by</ThemedText>
              <ThemedText style={[styles.instructorName, { color: colors.primary, fontSize: 14 * fontScale }]}>
                {course.instructor}
              </ThemedText>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={[styles.statsGrid, { backgroundColor: colors.card }]}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#f59e0b" />
              <View>
                <ThemedText style={[styles.statValue, { color: colors.text, fontSize: 14 * fontScale }]}>
                  {course.rating}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>Rating</ThemedText>
              </View>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Ionicons name="people" size={18} color={colors.textSecondary} />
              <View>
                <ThemedText style={[styles.statValue, { color: colors.text, fontSize: 14 * fontScale }]}>
                  {course.students.toLocaleString()}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>Students</ThemedText>
              </View>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={18} color={colors.textSecondary} />
              <View>
                <ThemedText style={[styles.statValue, { color: colors.text, fontSize: 14 * fontScale }]}>
                  {course.duration}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>Duration</ThemedText>
              </View>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionHeader, { color: colors.text, fontSize: 18 * fontScale }]}>
              About Course
            </ThemedText>
            <ThemedText style={[styles.description, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
              {course.description}
            </ThemedText>
          </View>

          {/* Lessons */}
          <View style={styles.section}>
            <View style={styles.lessonsHeaderRow}>
              <ThemedText type="subtitle" style={[styles.sectionHeader, { color: colors.text, fontSize: 18 * fontScale }]}>
                Lessons
              </ThemedText>
              <ThemedText style={[styles.lessonsCount, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>
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
                      { backgroundColor: colors.card },
                      isActive && { borderLeftColor: colors.primary, borderLeftWidth: 3, backgroundColor: colors.backgroundSecondary },
                    ]}
                    onPress={() => setSelectedLesson(lesson)}
                  >
                    <View style={styles.lessonLeft}>
                      <View
                        style={[
                          styles.indexCircle,
                          { backgroundColor: colors.border },
                          lesson.completed && { backgroundColor: '#10b981' }, // Success green
                          isActive && { backgroundColor: colors.primary },
                        ]}
                      >
                        {lesson.completed ? (
                          <Ionicons
                            name="checkmark"
                            size={12}
                            color="#FFFFFF"
                          />
                        ) : (
                          <ThemedText
                            style={[
                              styles.indexText,
                              { color: colors.textSecondary },
                              isActive && { color: '#FFFFFF' },
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
                            { color: colors.text, fontSize: 15 * fontScale },
                            isActive && { color: colors.primary, fontWeight: '700' },
                          ]}
                          numberOfLines={1}
                        >
                          {lesson.title}
                        </ThemedText>
                        <ThemedText style={[styles.lessonDuration, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
                          {lesson.duration}
                        </ThemedText>
                      </View>
                    </View>
                    {isActive ? (
                      <Ionicons
                        name="pause-circle"
                        size={24}
                        color={colors.primary}
                      />
                    ) : (
                      <Ionicons
                        name="play-circle-outline"
                        size={24}
                        color={colors.textSecondary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {!isCoursePurchased(course.id) && (
        <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.buyButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push({
              pathname: "/screens/checkout" as any,
              params: { courseId: course.id }
            })}
          >
            <ThemedText style={styles.buyButtonText}>Enroll Now • {course.price || "$49.99"}</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  contentContainer: {
    padding: 20,
  },
  headerInfo: {
    marginBottom: 24,
  },
  courseTitle: {
    lineHeight: 30,
    marginBottom: 8,
    fontWeight: '700',
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorLabel: {
    marginRight: 6,
  },
  instructorName: {
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "700",
  },
  statLabel: {
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 12,
    fontWeight: '700',
  },
  description: {
    lineHeight: 24,
  },
  lessonsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonsCount: {
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  indexText: {
    fontSize: 10,
    fontWeight: "600",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "500",
    marginBottom: 2,
  },
  lessonDuration: {
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    paddingBottom: 34,
  },
  buyButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
