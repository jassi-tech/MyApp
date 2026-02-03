import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function ActivityHistory() {
  const { colors, fontScale } = useTheme();

  const ACTIVITY_DATA = [
    {
      id: '1',
      title: 'Login Attempt',
      description: 'Successful login from iPhone 13',
      date: 'Today, 10:23 AM',
      icon: 'log-in-outline',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Password Changed',
      description: 'Your password was updated',
      date: 'Yesterday, 2:15 PM',
      icon: 'key-outline',
      color: colors.text,
    },
    {
      id: '3',
      title: 'New Device',
      description: 'New login from Chrome on Windows',
      date: 'Jan 28, 2026',
      icon: 'laptop-outline',
      color: colors.textSecondary,
    },
    {
      id: '4',
      title: '2FA Enabled',
      description: 'Two-factor authentication was enabled',
      date: 'Jan 20, 2026',
      icon: 'shield-checkmark-outline',
      color: colors.primary,
    },
    {
      id: '5',
      title: 'Profile Updated',
      description: 'Avatar image changed',
      date: 'Jan 15, 2026',
      icon: 'person-outline',
      color: colors.text,
    },
  ];

  const renderItem = ({ item }: { item: typeof ACTIVITY_DATA[0] }) => (
    <View style={styles.activityItem}>
      <View style={[styles.iconContainer, { backgroundColor: colors.border }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={[styles.itemTitle, { color: colors.text, fontSize: 16 * fontScale }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.itemDescription, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>{item.description}</ThemedText>
        <ThemedText style={[styles.itemDate, { color: colors.textSecondary, fontSize: 11 * fontScale }]}>{item.date}</ThemedText>
      </View>
    </View>
  );

  return (
    <ScreenContainer header={<ScreenHeader title="Activity History" />} scrollable={false}>
      <FlatList
        data={ACTIVITY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
      paddingBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    marginBottom: 4,
  },
  itemDate: {
  },
  separator: {
    height: 1,
    marginLeft: 64, // Align with text
  },
});
