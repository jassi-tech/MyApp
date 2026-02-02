import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function AccountSecurity() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <ScreenContainer header={<ScreenHeader title="Account Security" />}>
        <View style={styles.statusSection}>
            <View style={styles.propgressHeader}>
                <ThemedText style={styles.sectionTitle}>Security Status</ThemedText>
                <ThemedText style={styles.statusText}>Excellent</ThemedText>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: "85%" }]} />
            </View>
            <ThemedText style={styles.statusDescription}>
                Your account is well protected. good job!
            </ThemedText>
        </View>

        <SettingsSection title="Login & Recovery">
          <MenuItem 
            icon="key-outline" 
            title="Change Password" 
            onPress={() => {}} 
          />
          <View style={styles.menuItem}>
            <View style={styles.row}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={Palette.white}
                style={styles.menuIcon}
              />
              <ThemedText style={styles.menuText}>Two-Factor Authentication</ThemedText>
            </View>
            <Switch
                value={is2FAEnabled}
                onValueChange={setIs2FAEnabled}
                trackColor={{ false: Palette.darkGray, true: Palette.green }}
                thumbColor={Palette.white}
            />
          </View>
          <MenuItem 
            icon="mail-outline" 
            title="Recovery Email" 
            value="em***@gmail.com"
            onPress={() => {}} 
          />
        </SettingsSection>

        <SettingsSection title="Devices">
            <MenuItem 
                icon="phone-portrait-outline" 
                title="Manage Devices" 
                value="2 Active"
                onPress={() => {}} 
            />
        </SettingsSection>
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
  value,
  onPress,
}: {
  icon: any;
  title: string;
  value?: string;
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
    <View style={styles.row}>
        {value && <ThemedText style={styles.valueText}>{value}</ThemedText>}
        <Ionicons name="chevron-forward" size={20} color={Palette.gray} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  statusSection: {
      marginBottom: 30,
  },
  propgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
      color: Palette.green,
      fontWeight: 'bold',
  },
  progressContainer: {
    height: 4,
    backgroundColor: Palette.darkGray,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Palette.green,
    borderRadius: 4,
  },
  statusDescription: {
      color: Palette.gray,
      fontSize: 12,
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
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Palette.darkGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 12,
    color: Palette.white,
  },
  valueText: {
      color: Palette.gray,
      marginRight: 10,
      fontSize: 10,
  }
});
