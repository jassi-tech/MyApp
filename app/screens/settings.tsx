import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "@/components/common/button";
import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function Settings() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  return (
    <ScreenContainer header={<ScreenHeader title="Settings" />}>
        <SettingsSection title="General">
          <MenuItem icon="person-outline" title="Account" onPress={() => router.push("/screens/settings/account")} />
          <MenuItem icon="moon-outline" title="Appearance" onPress={() => router.push("/screens/settings/appearance")} />
          <MenuItem
            icon="language-outline"
            title="Language"
            onPress={() => router.push("/screens/settings/language")}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <MenuItem
            icon="notifications-outline"
            title="Push Notifications"
            onPress={() => router.push("/screens/settings/push-notifications")}
          />
          <MenuItem
            icon="mail-outline"
            title="Email Notifications"
            onPress={() => router.push("/screens/settings/email-notifications")}
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <MenuItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => router.push("/screens/settings/help-center")}
          />
          <MenuItem
            icon="alert-circle-outline"
            title="Report a Problem"
            onPress={() => router.push("/screens/settings/report-problem")}
          />
        </SettingsSection>

        <Button
          label="Log Out"
          onPress={() => router.replace("/screens/onboarding/GetStarted")}
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
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <View style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>{title}</ThemedText>
      <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 16 }]}>{children}</View>
    </View>
  );
};

const MenuItem = ({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: () => void;
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.text}
          style={styles.menuIcon}
        />
        <ThemedText style={[styles.menuText, { color: colors.text, fontSize: 16 * fontScale }]}>{title}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    fontWeight: "600",
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
  },
  logoutButton: {
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 60,
  },
});
