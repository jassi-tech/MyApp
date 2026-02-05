import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useStudent } from "@/context/StudentContext";

export default function NotificationScreen() {
  const { colors, fontScale } = useTheme();
  const { notifications, markNotificationAsRead } = useStudent();

  const handlePress = (id: string, read: boolean) => {
      if (!read) {
          markNotificationAsRead(id);
      }
  };

  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View style={[
      styles.notificationItem, 
      { borderBottomColor: colors.border },
      !item.read && { backgroundColor: colors.backgroundSecondary }
    ]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
        <Ionicons name={(item.icon || "notifications-outline") as any} size={24} color={colors.text} />
        {!item.read && <View style={[styles.unreadDot, { borderColor: colors.backgroundSecondary }]} />}
      </View>
      <View style={styles.contentContainer}>
        <ThemedText style={[styles.title, { color: colors.text, fontSize: 14 * fontScale }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.description, { color: colors.textSecondary }]}>{item.message}</ThemedText>
        <ThemedText style={[styles.time, { color: colors.textSecondary }]}>{item.time}</ThemedText>
      </View>
    </View>
  );

  return (
    <ScreenContainer header={<ScreenHeader title="Notifications" />}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ThemedText style={{ color: colors.textSecondary }}>No notifications.</ThemedText>
            </View>
        }
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
