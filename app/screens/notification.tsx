import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "New Course Available!",
    description: "Check out our new 'React Native Masterclass' course.",
    time: "2h ago",
    icon: "book-outline",
    read: false,
  },
  {
    id: "2",
    title: "Assignment Graded",
    description: "Your assignment for 'UI Design' has been graded. Good job!",
    time: "5h ago",
    icon: "school-outline",
    read: true,
  },
  {
    id: "3",
    title: "Update Available",
    description: "A new update for the app is available. Please update for new features.",
    time: "1d ago",
    icon: "cloud-upload-outline",
    read: true,
  },
  {
    id: "4",
    title: "Welcome to MyApp!",
    description: "Thanks for joining us. Let's start learning!",
    time: "2d ago",
    icon: "happy-outline",
    read: true,
  },
];

export default function NotificationScreen() {
  const renderItem = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
    <View style={[styles.notificationItem, !item.read && styles.unreadItem]}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={24} color={Palette.white} />
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
        <ThemedText style={styles.time}>{item.time}</ThemedText>
      </View>
    </View>
  );

  return (
    <ScreenContainer header={<ScreenHeader title="Notifications" />}>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    alignItems: "center",
  },
  unreadItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Palette.red,
    borderWidth: 2,
    borderColor: Palette.black,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Palette.gray,
    marginBottom: 4,
  },
  time: {
    fontSize: 10,
    color: Palette.gray,
  },
});
