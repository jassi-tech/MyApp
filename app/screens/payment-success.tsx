import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const courseId = params.courseId as string;
  const { allCourses } = useCourses();
  const { colors, fontScale } = useTheme();

  const course = allCourses.find((c) => c.id === courseId);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={[styles.successIconContainer, { backgroundColor: colors.primary + '15' }]}>
          <Ionicons name="checkmark-circle" size={100} color={colors.primary} />
        </View>

        <ThemedText type="title" style={[styles.title, { color: colors.text, fontSize: 24 * fontScale }]}>
          Payment Successful!
        </ThemedText>
        
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary, fontSize: 16 * fontScale }]}>
          You have successfully enrolled in:
        </ThemedText>
        
        <View style={[styles.courseBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThemedText style={[styles.courseTitle, { color: colors.text, fontSize: 18 * fontScale }]}>
            {course?.title || "Your New Course"}
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() => router.replace({
              pathname: "/screens/course-details",
              params: { id: courseId }
            })}
          >
            <ThemedText style={[styles.primaryButtonText, { fontSize: 18 * fontScale }]}>Start Learning</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryButton, { borderColor: colors.primary }]}
            onPress={() => router.dismissAll()}
          >
            <ThemedText style={[styles.secondaryButtonText, { color: colors.primary, fontSize: 16 * fontScale }]}>Go to Home</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  successIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  courseBox: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: 48,
  },
  courseTitle: {
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontWeight: "600",
  },
});
