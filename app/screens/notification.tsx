import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

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
  const { colors, fontScale } = useTheme();

  const renderItem = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
    <View style={[
      styles.notificationItem, 
      { borderBottomColor: colors.border },
      !item.read && { backgroundColor: colors.backgroundSecondary }
    ]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
        <Ionicons name={item.icon as any} size={24} color={colors.text} />
        {!item.read && <View style={[styles.unreadDot, { borderColor: colors.backgroundSecondary }]} />}
      </View>
      <View style={styles.contentContainer}>
        <ThemedText style={[styles.title, { color: colors.text, fontSize: 14 * fontScale }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.description, { color: colors.textSecondary }]}>{item.description}</ThemedText>
        <ThemedText style={[styles.time, { color: colors.textSecondary }]}>{item.time}</ThemedText>
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
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    backgroundColor: "#FF3B30",
    borderWidth: 2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
  },
  time: {
    fontSize: 10,
  },
});
