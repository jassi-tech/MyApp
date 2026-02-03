import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

interface TwoFactorModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TwoFactorModal({ isVisible, onClose, onSuccess }: TwoFactorModalProps) {
  const { colors, fontScale } = useTheme();
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleNextStep = () => {
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password to continue.");
      return;
    }
    // Simple simulated password check
    if (password.length < 4) {
      Alert.alert("Error", "Password must be at least 4 characters.");
      return;
    }
    setStep(2);
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert(
          "Biometrics Unavailable",
          "Your device doesn't support biometrics or you haven't enrolled any. Please enable it in your device settings."
        );
        setIsAuthenticating(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Provide a second factor",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        onSuccess();
        reset();
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred during authentication.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const reset = () => {
    setStep(1);
    setPassword("");
    setIsAuthenticating(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.header}>
            <ThemedText style={[styles.title, { color: colors.text, fontSize: 18 * fontScale }]}>
              {step === 1 ? "Verify Identity" : "Second Factor"}
            </ThemedText>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {step === 1 ? (
            <View style={styles.content}>
              <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
                Enter your password{"\n"}(Something you know)
              </ThemedText>
              <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter Password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleNextStep}
              >
                <ThemedText style={styles.buttonText}>Next</ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.content}>
              <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
                Provide a second factor{"\n"}(Something you have or are), like:
              </ThemedText>
              
              <View style={styles.factorItem}>
                <View style={[styles.iconBox, { backgroundColor: colors.backgroundSecondary }]}>
                   <Ionicons name="finger-print-outline" size={32} color={colors.primary} />
                </View>
                <ThemedText style={[styles.factorLabel, { color: colors.text }]}>
                    Biometrics (fingerprint, Face ID)
                </ThemedText>
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleBiometricAuth}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Verify Biometrics</ThemedText>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backLink}
                onPress={() => setStep(1)}
                disabled={isAuthenticating}
              >
                <ThemedText style={{ color: colors.primary }}>Back to password</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    alignItems: "stretch",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  factorItem: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  factorLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  backLink: {
      alignItems: 'center',
      marginTop: 20,
  }
});
