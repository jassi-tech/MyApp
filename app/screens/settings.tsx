import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "@/components/common/button";
import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function Settings() {
  const router = useRouter();

  return (
    <ScreenContainer header={<ScreenHeader title="Settings" />}>
        <SettingsSection title="General">
          <MenuItem icon="person-outline" title="Account" onPress={() => {}} />
          <MenuItem icon="moon-outline" title="Appearance" onPress={() => {}} />
          <MenuItem
            icon="language-outline"
            title="Language"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <MenuItem
            icon="notifications-outline"
            title="Push Notifications"
            onPress={() => {}}
          />
          <MenuItem
            icon="mail-outline"
            title="Email Notifications"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <MenuItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <MenuItem
            icon="alert-circle-outline"
            title="Report a Problem"
            onPress={() => {}}
          />
        </SettingsSection>

        <Button
          label="Log Out"
          onPress={() => router.replace("/screens/GetStarted")}
          variant="danger"
          style={styles.logoutButton}
        />
    </ScreenContainer>
  );
}

const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const MenuItem = ({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={22}
        color={Palette.white}
        style={styles.menuIcon}
      />
      <ThemedText style={styles.menuText}>{title}</ThemedText>
    </View>
    <Ionicons name="chevron-forward" size={20} color={Palette.gray} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Palette.gray,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  sectionContent: {
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: Palette.white,
  },
  logoutButton: {
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 60,
  },
});
