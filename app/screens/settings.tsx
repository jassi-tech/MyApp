import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText type="subtitle">Settings</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* General Section */}
        <SettingsSection title="General">
          <MenuItem icon="person-outline" title="Account" onPress={() => {}} />
          <MenuItem icon="moon-outline" title="Appearance" onPress={() => {}} />
          <MenuItem
            icon="language-outline"
            title="Language"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Notifications Section */}
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

        {/* Support Section */}
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

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/screens/GetStarted")}
        >
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  container: {
    flex: 1,
    // backgroundColor: Palette.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  //   headerTitle: {
  //     color: Palette.white,
  //     // fontSize: 20,
  //   },
  contentContainer: {
    padding: 10,
  },
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
    //   backgroundColor: Palette.darkGray,
    //   borderRadius: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    // borderBottomColor: '#333',
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
    marginTop: 10,
    backgroundColor: Palette.darkGray,
    padding: 6,
    borderRadius: 60,
    alignItems: "center",
  },
  logoutText: {
    color: Palette.red,
    fontWeight: "bold",
    fontSize: 14,
  },
});
