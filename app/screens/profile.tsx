import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";

export default function Profile() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { user } = useUser();

  const displayName = user?.name || "Guest User";
  const displayEmail = user?.email || "guest@example.com";
  const displayImage = user?.profileImage;

  return (
    <ScreenContainer header={<ScreenHeader title="Profile" />}>
      <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={displayImage || "https://i.pravatar.cc/300?img=11"}
              style={[styles.avatar, { borderColor: colors.border }]}
              contentFit="cover"
            />
            <View style={[styles.onlineStatus, { borderColor: colors.background }]} />
          </View>
          <ThemedText type="subtitle" style={[styles.userName, { color: colors.text }]}>
            {displayName}
          </ThemedText>
          <ThemedText style={[styles.userEmail, { color: colors.textSecondary }]}>{displayEmail}</ThemedText>
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
                  color={colors.text}
                  style={styles.menuIcon}
                />
                <ThemedText style={[styles.menuText, { color: colors.text }]}>
                  Account Security
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
            <ThemedText style={[styles.progressText, { color: colors.primary }]}>Excellent</ThemedText>
            <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
              <View style={[styles.progressBar, { width: "90%", backgroundColor: colors.primary }]} />
            </View>
          </TouchableOpacity>

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
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.menuItem, noBorder && styles.noBorder, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Ionicons
          name={icon}
          size={24}
          color={colors.text}
          style={styles.menuIcon}
        />
        <ThemedText style={[styles.menuText, { color: colors.text }]}>{title}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

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
  },
  onlineStatus: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#34C759", // Keep green for success/online
    borderWidth: 3,
  },
  userName: {
    fontSize: 22,
    marginBottom: 4,
  },
  userEmail: {
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
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 12,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
