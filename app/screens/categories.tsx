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

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const CATEGORIES = [
  { id: "1", label: "Inbox", icon: "mail-outline" },
  { id: "2", label: "Timetable", icon: "calendar-outline" },
  { id: "3", label: "Fees", icon: "receipt-outline" },
  { id: "4", label: "Notice", icon: "document-text-outline" },
  { id: "5", label: "Homework", icon: "cloud-upload-outline" },
  { id: "6", label: "Syllabus", icon: "book-outline" },
  { id: "7", label: "Circular", icon: "list-outline" },
  { id: "8", label: "Leave Request", icon: "document-outline" },
  { id: "9", label: "Examination", icon: "school-outline" },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="All Categories" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => {
                const routes: Record<string, string> = {
                  "Attendance": "/screens/attendance",
                  "Timetable": "/screens/categories/timetable",
                  "Inbox": "/screens/categories/inbox",
                  "Fees": "/screens/categories/fees",
                  "Notice": "/screens/categories/notice",
                  "Homework": "/screens/categories/homework",
                  "Syllabus": "/screens/categories/syllabus",
                  "Circular": "/screens/categories/circular",
                  "Leave Request": "/screens/categories/leave-request",
                  "Examination": "/screens/categories/examination",
                };
                const route = routes[cat.label];
                if (route) router.push(route as any);
              }}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name={cat.icon as any} size={36} color="#cfcaca" />
              </View>
              <ThemedText style={styles.categoryLabel}>{cat.label}</ThemedText>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "28%",
    aspectRatio: 1,
    backgroundColor: Palette.darkGray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    // Elevation for Android
    elevation: 3,
    // Shadow for iOS
    shadowColor: "#ffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    color: Palette.white,
    fontWeight: "600",
    textAlign: "center",
  },
});
