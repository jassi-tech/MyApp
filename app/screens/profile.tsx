import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function Profile() {
  const router = useRouter();

  return (
    <ScreenContainer header={<ScreenHeader title="Profile" />}>
      <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source="https://i.pravatar.cc/300?img=11"
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

        <View style={styles.menuContainer}>
          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => router.push("/screens/settings")}
          />

          <TouchableOpacity 
            style={styles.securitySection}
            onPress={() => router.push("/screens/account-security")}
          >
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
          </TouchableOpacity>

          <MenuItem 
            icon="time-outline" 
            title="Activity History" 
            onPress={() => router.push("/screens/activity-history")}
          />
          <MenuItem 
            icon="mail-outline" 
            title="Contact Us" 
            onPress={() => router.push("/screens/contact-us")}
          />
          <MenuItem 
            icon="shield-checkmark-outline" 
            title="Privacy Policy" 
            onPress={() => router.push("/screens/privacy-policy")}
          />
        </View>
    </ScreenContainer>
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
