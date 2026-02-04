import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video, VideoFullscreenUpdate, VideoFullscreenUpdateEvent } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get("window");

export default function CourseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const courseId = params.id as string;
  const { colors, fontScale } = useTheme();

  const { isCoursePurchased, allCourses } = useCourses();
  const course = allCourses.find((c) => c.id === courseId);
  const [selectedLesson, setSelectedLesson] = useState(
    course?.lessons_list?.[0],
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Update selected lesson when course changes
    if (course?.lessons_list?.[0]) {
      setSelectedLesson(course.lessons_list[0]);
    }
  }, [course]);

  /* Logic for handling lesson changes/playback */
  const purchased = course ? isCoursePurchased(course.id) : false;
  // STRICT LOCK: If not purchased, EVERYTHING is locked.
  const isLocked = !purchased;

  const handlePlayPress = async () => {
    // Prevent playback if locked
    if (isLocked) {
      // Optional: Show "Purchase to unlock" alert or shake effect
      return;
    }

    if (videoRef.current) {
      try {
        if (isPlaying) {
          await videoRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await videoRef.current.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        // Handle error silently
      }
    }
  };

  const handleLessonChange = async (lesson: any) => {
    try {
      if (videoRef.current) {
        await videoRef.current.pauseAsync();
        await videoRef.current.unloadAsync(); // Unload previous video
      }
      setSelectedLesson(lesson);
      setIsPlaying(false);
    } catch (error) {
      setSelectedLesson(lesson);
      setIsPlaying(false);
    }
  };

  const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
    try {
      if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    } catch (e) {
      // Handle error silently
    }
  };

  if (!course) {
    return (
      <ScreenContainer header={<ScreenHeader title="Details" />}>
        <View style={styles.centerContainer}>
          <ThemedText style={{ color: colors.text }}>
            Course not found
          </ThemedText>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={false}
      header={
        <ScreenHeader
          title="Details"
          rightElement={
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          }
        />
      }
    >
      {/* Video Player */}
      {selectedLesson && (
        <View style={[styles.videoContainer, { backgroundColor: "#000" }]}>
          {isLocked ? (
            // LOCKED OVERLAY
            <View style={styles.lockedOverlay}>
              <View style={styles.lockedContent}>
                <View
                  style={[
                    styles.lockIconCircle,
                    { backgroundColor: "rgba(255,255,255,0.2)" },
                  ]}
                >
                  <Ionicons name="lock-closed" size={32} color="#FFFFFF" />
                </View>
                <ThemedText style={styles.lockedTitle}>
                  Content Locked
                </ThemedText>
              </View>
            </View>
          ) : (
            // VIDEO PLAYER (Unlocked or Preview)
            <>
              <Video
                key={selectedLesson.id}
                ref={videoRef}
                source={{ uri: selectedLesson.videoUrl }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                onFullscreenUpdate={onFullscreenUpdate}
                shouldPlay={false}
                isLooping={false}
                isMuted={false}
                onPlaybackStatusUpdate={(status: any) => {
                  if (status.isLoaded) {
                    setIsPlaying(status.isPlaying);
                  }
                }}
              />
              {!isPlaying && (
                <TouchableOpacity
                  style={styles.videoOverlay}
                  onPress={handlePlayPress}
                  activeOpacity={0.9}
                >
                  <View style={styles.playButtonContainer}>
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={40} color="#FFFFFF" />
                    </View>
                    <ThemedText style={styles.videoLessonTitle}>
                      {selectedLesson.title}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Main Info */}
          <View style={styles.headerInfo}>
            <ThemedText
              type="title"
              style={[
                styles.courseTitle,
                { color: colors.text, fontSize: 22 * fontScale },
              ]}
            >
              {course.title}
            </ThemedText>
            <View style={styles.instructorRow}>
              <ThemedText
                style={[
                  styles.instructorLabel,
                  { color: colors.textSecondary, fontSize: 14 * fontScale },
                ]}
              >
                Created by
              </ThemedText>
              <ThemedText
                style={[
                  styles.instructorName,
                  { color: colors.primary, fontSize: 14 * fontScale },
                ]}
              >
                {course.instructor}
              </ThemedText>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={[styles.statsGrid, { backgroundColor: colors.card }]}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#f59e0b" />
              <View>
                <ThemedText
                  style={[
                    styles.statValue,
                    { color: colors.text, fontSize: 14 * fontScale },
                  ]}
                >
                  {course.rating}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.statLabel,
                    { color: colors.textSecondary, fontSize: 12 * fontScale },
                  ]}
                >
                  Rating
                </ThemedText>
              </View>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.statItem}>
              <Ionicons name="people" size={18} color={colors.textSecondary} />
              <View>
                <ThemedText
                  style={[
                    styles.statValue,
                    { color: colors.text, fontSize: 14 * fontScale },
                  ]}
                >
                  {typeof course.students === "string"
                    ? course.students
                    : course.students.toLocaleString()}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.statLabel,
                    { color: colors.textSecondary, fontSize: 12 * fontScale },
                  ]}
                >
                  Students
                </ThemedText>
              </View>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.statItem}>
              <Ionicons name="time" size={18} color={colors.textSecondary} />
              <View>
                <ThemedText
                  style={[
                    styles.statValue,
                    { color: colors.text, fontSize: 14 * fontScale },
                  ]}
                >
                  {course.duration}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.statLabel,
                    { color: colors.textSecondary, fontSize: 12 * fontScale },
                  ]}
                >
                  Duration
                </ThemedText>
              </View>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <ThemedText
              type="subtitle"
              style={[
                styles.sectionHeader,
                { color: colors.text, fontSize: 18 * fontScale },
              ]}
            >
              About Course
            </ThemedText>
            <ThemedText
              style={[
                styles.description,
                { color: colors.textSecondary, fontSize: 15 * fontScale },
              ]}
            >
              {course.description}
            </ThemedText>
          </View>

          {/* Lessons */}
          <View style={styles.section}>
            <View style={styles.lessonsHeaderRow}>
              <ThemedText
                type="subtitle"
                style={[
                  styles.sectionHeader,
                  { color: colors.text, fontSize: 18 * fontScale },
                ]}
              >
                Lessons
              </ThemedText>
              <ThemedText
                style={[
                  styles.lessonsCount,
                  { color: colors.textSecondary, fontSize: 13 * fontScale },
                ]}
              >
                {course.lessons} videos
              </ThemedText>
            </View>

            <View style={styles.lessonsList}>
              {course.lessons_list.map((lesson: any, index: number) => {
                const isActive = selectedLesson?.id === lesson.id;
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[
                      styles.lessonItem,
                      { backgroundColor: colors.card },
                      isActive && {
                        borderLeftColor: colors.primary,
                        borderLeftWidth: 3,
                        backgroundColor: colors.backgroundSecondary,
                      },
                    ]}
                    onPress={() => handleLessonChange(lesson)}
                  >
                    <View style={styles.lessonLeft}>
                      <View
                        style={[
                          styles.indexCircle,
                          { backgroundColor: colors.border },
                          lesson.completed && { backgroundColor: "#10b981" },
                          isActive && { backgroundColor: colors.primary },
                        ]}
                      >
                        {lesson.completed ? (
                          <Ionicons
                            name="checkmark"
                            size={12}
                            color="#FFFFFF"
                          />
                        ) : // Show Lock if not purchased
                        !purchased ? (
                          <Ionicons
                            name="lock-closed"
                            size={12}
                            color={isActive ? "#FFFFFF" : colors.textSecondary}
                          />
                        ) : (
                          <ThemedText
                            style={[
                              styles.indexText,
                              { color: colors.textSecondary },
                              isActive && { color: "#FFFFFF" },
                            ]}
                          >
                            {index + 1}
                          </ThemedText>
                        )}
                      </View>
                      <View style={styles.lessonInfo}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <ThemedText
                            style={[
                              styles.lessonTitle,
                              { color: colors.text, fontSize: 15 * fontScale },
                              isActive && {
                                color: colors.primary,
                                fontWeight: "700",
                              },
                            ]}
                            numberOfLines={1}
                          >
                            {lesson.title}
                          </ThemedText>
                        </View>
                        <ThemedText
                          style={[
                            styles.lessonDuration,
                            {
                              color: colors.textSecondary,
                              fontSize: 12 * fontScale,
                            },
                          ]}
                        >
                          {lesson.duration}
                        </ThemedText>
                      </View>
                    </View>
                    {isActive ? (
                      // If active & locked -> Show Lock
                      // If active & unlocked -> Show Pause
                      isLocked ? (
                        <Ionicons
                          name="lock-closed"
                          size={24}
                          color={colors.textSecondary}
                        />
                      ) : (
                        <Ionicons
                          name="pause-circle"
                          size={24}
                          color={colors.primary}
                        />
                      )
                    ) : // If not active:
                    // If locked -> Lock
                    // If unlocked -> Play circle
                    !purchased ? (
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={colors.textSecondary}
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
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.buyButton, { backgroundColor: colors.primary }]}
            onPress={() =>
              router.push({
                pathname: "/screens/checkout" as any,
                params: { courseId: course.id },
              })
            }
          >
            <ThemedText style={styles.buyButtonText}>
              Enroll Now • {course.price || "$49.99"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  playButtonContainer: {
    alignItems: "center",
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 191, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  videoLessonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    fontWeight: "700",
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
  statLabel: {},
  statDivider: {
    width: 1,
    height: 30,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 12,
    fontWeight: "700",
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
  lessonsCount: {},
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
  lessonDuration: {},
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
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 10,
  },
  lockedContent: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  lockIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  lockedTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lockedSubtitle: {
    color: "#E5E5E5",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  unlockButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  unlockButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
