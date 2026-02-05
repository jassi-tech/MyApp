import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useUser } from "@/context/UserContext";

export default function ManageDevicesScreen() {
  const { colors, fontScale } = useTheme();
  const { devices, logoutDevice } = useUser();

  const handleLogoutDevice = (id: string, name: string) => {
    Alert.alert(
      "Log Out Device",
      `Are you sure you want to log out from ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => {
            logoutDevice(id);
        }}
      ]
    );
  };

  const handleLogoutAll = () => {
    Alert.alert(
      "Log Out All",
      "This will log you out from all devices except this one.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out All", style: "destructive", onPress: () => {
            // Logic to logout all would go here, maybe added to context later
            // For now, filtering locally not ideal for "All", but sufficient for refactor step
             devices.forEach(d => {
                 if (!d.isCurrent) logoutDevice(d.id);
             });
        }}
      ]
    );
  };

  const renderDevice = ({ item }: { item: typeof devices[0] }) => (
    <View style={[styles.deviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.deviceIconWrapper, { backgroundColor: colors.backgroundSecondary }]}>
        <Ionicons name={(item.icon || "phone-portrait-outline") as any} size={24} color={colors.text} />
      </View>
      <View style={styles.deviceInfo}>
        <View style={styles.deviceNameRow}>
            <ThemedText style={[styles.deviceName, { color: colors.text, fontSize: 16 * fontScale }]}>{item.name}</ThemedText>
            {item.isCurrent && (
                <View style={[styles.currentBadge, { backgroundColor: colors.primary + '20' }]}>
                    <ThemedText style={[styles.currentBadgeText, { color: colors.primary }]}>Active</ThemedText>
                </View>
            )}
        </View>
        <ThemedText style={[styles.deviceMeta, { color: colors.textSecondary }]}>
            {item.location} • {item.lastActive}
        </ThemedText>
      </View>
      {!item.isCurrent && (
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => handleLogoutDevice(item.id, item.name)}
          >
            <Ionicons name="log-out-outline" size={22} color={Palette.red || "#FF3B30"} />
          </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenContainer header={<ScreenHeader title="Manage Devices" />}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
            <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>Active Sessions</ThemedText>
            <ThemedText style={[styles.sectionDesc, { color: colors.textSecondary }]}>
                You're currently signed in to your account on these devices.
            </ThemedText>
        </View>

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={renderDevice}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={devices.length > 1 ? (
              <TouchableOpacity 
                style={[styles.logoutAllButton, { borderColor: Palette.red || "#FF3B30" }]}
                onPress={handleLogoutAll}
              >
                <Ionicons name="power-outline" size={20} color={Palette.red || "#FF3B30"} />
                <ThemedText style={[styles.logoutAllText, { color: Palette.red || "#FF3B30" }]}>Log out of all other devices</ThemedText>
              </TouchableOpacity>
          ) : null}
        />

        <View style={[styles.securityTip, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="alert-circle-outline" size={24} color={colors.primary} />
            <View style={styles.tipTextContent}>
                <ThemedText style={[styles.tipTitle, { color: colors.text }]}>Security Tip</ThemedText>
                <ThemedText style={[styles.tipDesc, { color: colors.textSecondary }]}>
                    If you don't recognize a device, log out immediately and change your password.
                </ThemedText>
            </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const Palette = { red: '#FF3B30' }; // Local fallback for red

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerSection: {
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  deviceIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deviceName: {
    fontWeight: 'bold',
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  deviceMeta: {
    fontSize: 12,
  },
  logoutButton: {
    padding: 8,
  },
  logoutAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    borderStyle: 'dashed',
  },
  logoutAllText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  securityTip: {
      flexDirection: 'row',
      padding: 20,
      borderRadius: 20,
      borderWidth: 1,
      marginVertical: 20,
      alignItems: 'flex-start',
  },
  tipTextContent: {
      flex: 1,
      marginLeft: 16,
  },
  tipTitle: {
      fontWeight: 'bold',
      marginBottom: 4,
  },
  tipDesc: {
      fontSize: 12,
      lineHeight: 18,
  }
});
