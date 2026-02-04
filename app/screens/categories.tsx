import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

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
  const { colors, fontScale } = useTheme();

  return (
    <ScreenContainer header={<ScreenHeader title="All Categories" />}>
      <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                  styles.categoryCard, 
                  { backgroundColor: colors.card, borderColor: colors.border }
              ]}
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
                <Ionicons name={cat.icon as any} size={36} color={colors.textSecondary} />
              </View>
              <ThemedText style={[styles.categoryLabel, { color: colors.text, fontSize: 10 * fontScale }]}>{cat.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    // Elevation for Android
    elevation: 2,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  categoryLabel: {
    fontWeight: "600",
    textAlign: "center",
  },
});
