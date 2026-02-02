import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

const ACTIVITY_DATA = [
  {
    id: '1',
    title: 'Login Attempt',
    description: 'Successful login from iPhone 13',
    date: 'Today, 10:23 AM',
    icon: 'log-in-outline',
    color: Palette.green,
  },
  {
    id: '2',
    title: 'Password Changed',
    description: 'Your password was updated',
    date: 'Yesterday, 2:15 PM',
    icon: 'key-outline',
    color: Palette.white,
  },
  {
    id: '3',
    title: 'New Device',
    description: 'New login from Chrome on Windows',
    date: 'Jan 28, 2026',
    icon: 'laptop-outline',
    color: Palette.gray,
  },
  {
    id: '4',
    title: '2FA Enabled',
    description: 'Two-factor authentication was enabled',
    date: 'Jan 20, 2026',
    icon: 'shield-checkmark-outline',
    color: Palette.green,
  },
  {
    id: '5',
    title: 'Profile Updated',
    description: 'Avatar image changed',
    date: 'Jan 15, 2026',
    icon: 'person-outline',
    color: Palette.white,
  },
];

export default function ActivityHistory() {

  const renderItem = ({ item }: { item: typeof ACTIVITY_DATA[0] }) => (
    <View style={styles.activityItem}>
      <View style={[styles.iconContainer, { backgroundColor: Palette.darkGray }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
        <ThemedText style={styles.itemDate}>{item.date}</ThemedText>
      </View>
    </View>
  );

  return (
    <ScreenContainer header={<ScreenHeader title="Activity History" />} scrollable={false}>
      <FlatList
        data={ACTIVITY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Palette.white,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: Palette.gray,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 10,
    color: Palette.gray,
  },
  separator: {
    height: 1,
    backgroundColor: Palette.darkGray,
    marginLeft: 66, // Align with text
  },
});
