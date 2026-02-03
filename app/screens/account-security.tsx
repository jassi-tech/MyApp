import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { TwoFactorModal } from "@/components/security/TwoFactorModal";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function AccountSecurity() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [is2FAModalVisible, setIs2FAModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handle2FAToggle = (value: boolean) => {
    if (value) {
      setIs2FAModalVisible(true);
    } else {
      Alert.alert(
        "Disable Two-Factor Authentication?",
        "This will make your account less secure. Are you sure?",
        [
          { text: "Cancel", style: "cancel", onPress: () => setIs2FAEnabled(true) },
          { text: "Disable", style: "destructive", onPress: () => setIs2FAEnabled(false) }
        ]
      );
    }
  };

  const handle2FASuccess = () => {
    setIs2FAEnabled(true);
    setIs2FAModalVisible(false);
    Alert.alert("Success", "Two-Factor Authentication has been enabled.");
  };

  const handleBiometricToggle = async (value: boolean) => {
    if (value) {
      Alert.alert(
        "Enable Biometric Login?",
        "Use your fingerprint or Face ID for faster access.",
        [
          { text: "Cancel", style: "cancel", onPress: () => setIsBiometricEnabled(false) },
          { 
            text: "Setup", 
            onPress: async () => {
              const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to enable Biometric Login",
                fallbackLabel: "Use Passcode",
              });

              if (result.success) {
                setIsBiometricEnabled(true);
                Alert.alert("Success", "Biometric authentication enabled.");
              } else {
                setIsBiometricEnabled(false);
              }
            }
          }
        ]
      );
    } else {
      setIsBiometricEnabled(false);
    }
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Account Security" />}>
        <View style={styles.statusSection}>
            <View style={styles.propgressHeader}>
                <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>Security Status</ThemedText>
                <ThemedText style={[styles.statusText, { color: colors.primary }]}>Excellent</ThemedText>
            </View>
            <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
              <View style={[styles.progressBar, { width: "85%", backgroundColor: colors.primary }]} />
            </View>
            <ThemedText style={[styles.statusDescription, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
                Your account is well protected. Good job!
            </ThemedText>
        </View>

        <SettingsSection title="Login & Recovery">
          <MenuItem 
            icon="key-outline" 
            title="Change Password" 
            onPress={() => router.push("/screens/settings/change-password")} 
          />
          <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.row}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={colors.text}
                style={styles.menuIcon}
              />
              <ThemedText style={[styles.menuText, { color: colors.text, fontSize: 14 * fontScale }]}>Two-Factor Authentication</ThemedText>
            </View>
            <Switch
                value={is2FAEnabled}
                onValueChange={handle2FAToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
            />
          </View>

          {isBiometricSupported && (
            <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
              <View style={styles.row}>
                <Ionicons
                  name="finger-print-outline"
                  size={22}
                  color={colors.text}
                  style={styles.menuIcon}
                />
                <ThemedText style={[styles.menuText, { color: colors.text, fontSize: 14 * fontScale }]}>Biometric Authentication</ThemedText>
              </View>
              <Switch
                  value={isBiometricEnabled}
                  onValueChange={handleBiometricToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#FFFFFF"
              />
            </View>
          )}

          <MenuItem 
            icon="mail-outline" 
            title="Recovery Email" 
            value="em***@gmail.com"
            onPress={() => router.push("/screens/settings/recovery-email")} 
          />
        </SettingsSection>

        <SettingsSection title="Devices">
            <MenuItem 
                icon="phone-portrait-outline" 
                title="Manage Devices" 
                value="2 Active"
                onPress={() => router.push("/screens/settings/manage-devices")} 
            />
        </SettingsSection>

        <TwoFactorModal 
          isVisible={is2FAModalVisible}
          onClose={() => setIs2FAModalVisible(false)}
          onSuccess={handle2FASuccess}
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
  value,
  onPress,
}: {
  icon: any;
  title: string;
  value?: string;
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
        <ThemedText style={[styles.menuText, { color: colors.text, fontSize: 14 * fontScale }]}>{title}</ThemedText>
      </View>
      <View style={styles.row}>
          {value && <ThemedText style={[styles.valueText, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>{value}</ThemedText>}
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusSection: {
      marginBottom: 30,
      paddingHorizontal: 4,
  },
  propgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
      fontWeight: 'bold',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  statusDescription: {
      lineHeight: 18,
  },
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
    fontWeight: "500",
  },
  valueText: {
      marginRight: 8,
  }
});
