import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Palette.white} />
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            Profile
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>

        {/* User Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source="https://i.pravatar.cc/300?img=11" // Placeholder image
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.onlineStatus} />
          </View>
          <ThemedText type="subtitle" style={styles.userName}>
            Name
          </ThemedText>
          <ThemedText style={styles.userEmail}>Email@gmail.com</ThemedText>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => router.push("/screens/settings")}
          />

          {/* Account Security with Progress */}
          <View style={styles.securitySection}>
            <View style={styles.securityHeader}>
              <View style={styles.row}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={Palette.white}
                  style={styles.menuIcon}
                />
                <ThemedText style={styles.menuText}>
                  Account Security
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Palette.gray} />
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: "70%" }]} />
            </View>
            <ThemedText style={styles.progressText}>Excellent</ThemedText>
          </View>

          <MenuItem icon="time-outline" title="Activity History" />
          <MenuItem icon="mail-outline" title="Contact Us" />
          <MenuItem icon="shield-checkmark-outline" title="Privacy Policy" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuItem = ({
  icon,
  title,
  noBorder,
  onPress,
}: {
  icon: any;
  title: string;
  noBorder?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={[styles.menuItem, noBorder && styles.noBorder]}
    onPress={onPress}
  >
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={24}
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
    backgroundColor: Palette.black,
  },
  contentContainer: {
    paddingBottom: 40,
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
  headerTitle: {
    color: Palette.white,
    fontSize: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#333",
  },
  onlineStatus: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Palette.green,
    borderWidth: 3,
    borderColor: Palette.black,
  },
  userName: {
    color: Palette.white,
    fontSize: 22,
    marginBottom: 4,
  },
  userEmail: {
    color: Palette.gray,
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: Palette.white,
  },
  securitySection: {
    marginVertical: 10,
  },
  securityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  progressContainer: {
    height: 6,
    backgroundColor: Palette.darkGray,
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 6,
    marginHorizontal: 40, // Indent to align with text
  },
  progressBar: {
    height: "100%",
    backgroundColor: Palette.red,
    borderRadius: 3,
  },
  progressText: {
    color: Palette.gray,
    fontSize: 12,
    marginLeft: 40,
  },
});
