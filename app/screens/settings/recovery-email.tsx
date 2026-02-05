import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useUser } from "@/context/UserContext";

export default function RecoveryEmailScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const { recoveryEmail, updateRecoveryEmail } = useUser();
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    Alert.alert(
      "Verification Sent",
      `A verification code has been sent to ${newEmail}. Please check your inbox.`,
      [{ text: "OK", onPress: () => {
          updateRecoveryEmail(newEmail);
          setIsEditing(false);
          setNewEmail("");
      }}]
    );
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Recovery Email" />}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="mail-outline" size={40} color={colors.primary} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={[styles.title, { color: colors.text, fontSize: 20 * fontScale }]}>
            Recovery Email
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
            This email helps you regain access to your account if you forget your password or get locked out.
          </ThemedText>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Current Email</ThemedText>
          <ThemedText style={[styles.emailText, { color: colors.text }]}>{recoveryEmail || "Not set"}</ThemedText>
          <View style={[styles.statusBadge, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            <ThemedText style={[styles.statusText, { color: colors.primary }]}>Verified</ThemedText>
          </View>
        </View>

        {isEditing ? (
          <View style={styles.editSection}>
            <ThemedText style={[styles.label, { color: colors.textSecondary, marginBottom: 12 }]}>New Recovery Email</ThemedText>
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="at-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter new email"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={newEmail}
                onChangeText={setNewEmail}
                autoFocus
              />
            </View>
            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={handleUpdate}
            >
              <ThemedText style={styles.buttonText}>Send Verification</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <ThemedText style={{ color: colors.textSecondary }}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.primary }]}
            onPress={() => setIsEditing(true)}
          >
            <ThemedText style={[styles.outlineButtonText, { color: colors.primary }]}>Change Recovery Email</ThemedText>
          </TouchableOpacity>
        )}

        <View style={[styles.securityNote, { backgroundColor: colors.backgroundSecondary }]}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
          <ThemedText style={[styles.noteText, { color: colors.textSecondary }]}>
            Your recovery email is only used for security purposes and is never shared.
          </ThemedText>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  infoCard: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editSection: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
  },
  mainButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
  },
  outlineButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityNote: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  noteText: {
    fontSize: 12,
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  }
});
