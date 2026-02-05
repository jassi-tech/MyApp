import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { LifetimeDealBanner } from "@/components/marketing/LifetimeDealBanner";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import CoursesScreen from "@/screens/Course";

export default function HomeScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { user } = useUser();

  const displayName = user?.name || "Guest User";
  const displayImage = user?.profileImage;

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => router.push("/screens/profile")}>
            <Image
              source={displayImage || "https://i.pravatar.cc/300?img=11"}
              style={styles.avatar}
              contentFit="cover"
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <ThemedText style={[styles.userName, { color: colors.text }]}>{displayName}</ThemedText>
            <ThemedText style={[styles.welcomeText, { color: colors.textSecondary }]}>
              Let&apos;s learn something new
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.notificationButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={() => router.push("/screens/notification")}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={colors.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
        <Ionicons
          name="search-outline"
          size={16}
          color={colors.icon}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Courses"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.grid}>
        <CategoryItem
          icon="grid-outline"
          label="Category"
          onPress={() => router.push("/screens/categories")}
        />
        <CategoryItem
          icon="calendar-outline"
          label="Attendance"
          onPress={() => router.push("/screens/attendance")}
        />
        <CategoryItem
          icon="help-circle-outline"
          label="Quiz"
          onPress={() => router.push("/screens/quiz")}
        />
      </View>

      <LifetimeDealBanner 
        onRedeem={() => router.push("/screens/marketing/lifetime-deal")} 
      />

      <CoursesScreen />
    </ScreenContainer>
  );
}

const CategoryItem = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <Ionicons name={icon} size={20} color={colors.text} />
      </View>
      <ThemedText style={[styles.categoryLabel, { color: colors.text, fontSize: 10 * fontScale }]}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

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
  },
  welcomeText: {
    fontSize: 10,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryLabel: {
    textAlign: "center",
    fontWeight: "600",
  },
});
