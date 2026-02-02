import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";
import CoursesScreen from "@/screens/Course";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => router.push("/screens/profile")}>
            <Image
              source="https://i.pravatar.cc/300?img=11"
              style={styles.avatar}
              contentFit="cover"
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.userName}>Rumi Aktar</ThemedText>
            <ThemedText style={styles.welcomeText}>
              Let&apos;s learn something new
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push("/screens/notification")}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={Palette.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={16}
          color={Palette.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses"
          placeholderTextColor={Palette.gray}
        />
      </View>

      <View style={styles.grid}>
        <CategoryItem icon="grid-outline" label="Category" />
        <CategoryItem icon="calendar-outline" label="Attendance" />
        <CategoryItem icon="help-circle-outline" label="Quiz" />
      </View>

      <CoursesScreen />
    </ScreenContainer>
  );
}

const CategoryItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={20} color={Palette.white} />
    </View>
    <ThemedText style={styles.categoryLabel}>{label}</ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  titleContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 12,
    fontWeight: "bold",
    color: Palette.white,
  },
  welcomeText: {
    fontSize: 10,
    color: Palette.gray,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    color: Palette.white,
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 10,
    color: Palette.white,
    textAlign: "center",
    fontWeight: "600",
  },
});
