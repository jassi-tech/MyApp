import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    FadeInRight,
    FadeOutLeft
} from "react-native-reanimated";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNextStep1 = () => {
    if (!currentPassword.trim()) {
      Alert.alert("Required", "Please enter your current password.");
      return;
    }
    // Simple simulated verification
    if (currentPassword !== "password123") {
        Alert.alert("Error", "Incorrect current password. (Hint: password123)");
        return;
    }
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (newPassword.length < 6) {
      Alert.alert("Weak Password", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword === currentPassword) {
        Alert.alert("Try again", "New password cannot be the same as current password.");
        return;
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Mismatch", "Passwords do not match.");
      return;
    }
    
    // Success flow
    Alert.alert(
      "Success", 
      "Your password has been changed successfully.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View 
            entering={FadeInRight} 
            exiting={FadeOutLeft}
            style={styles.stepContainer}
          >
            <View style={styles.iconCircle}>
                <Ionicons name="key-outline" size={32} color={colors.primary} />
            </View>
            <ThemedText style={[styles.stepTitle, { color: colors.text, fontSize: 18 * fontScale }]}>
              Verify Current Password
            </ThemedText>
            <ThemedText style={[styles.stepDescription, { color: colors.textSecondary }]}>
              Please enter your current password to proceed with the change.
            </ThemedText>
            
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
               <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
               <TextInput
                 style={[styles.input, { color: colors.text }]}
                 placeholder="Current Password"
                 placeholderTextColor={colors.textSecondary}
                 secureTextEntry
                 value={currentPassword}
                 onChangeText={setCurrentPassword}
                 autoFocus
               />
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={handleNextStep1}
            >
              <ThemedText style={styles.buttonText}>Next</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View 
            entering={FadeInRight} 
            exiting={FadeOutLeft}
            style={styles.stepContainer}
          >
            <View style={styles.iconCircle}>
                <Ionicons name="create-outline" size={32} color={colors.primary} />
            </View>
            <ThemedText style={[styles.stepTitle, { color: colors.text, fontSize: 18 * fontScale }]}>
              Set New Password
            </ThemedText>
            <ThemedText style={[styles.stepDescription, { color: colors.textSecondary }]}>
              Create a strong password with at least 6 characters.
            </ThemedText>
            
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
               <Ionicons name="shield-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
               <TextInput
                 style={[styles.input, { color: colors.text }]}
                 placeholder="New Password"
                 placeholderTextColor={colors.textSecondary}
                 secureTextEntry
                 value={newPassword}
                 onChangeText={setNewPassword}
                 autoFocus
               />
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={handleNextStep2}
            >
              <ThemedText style={styles.buttonText}>Next</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backLink}
              onPress={() => setStep(1)}
            >
              <ThemedText style={{ color: colors.primary }}>Back</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View 
            entering={FadeInRight} 
            exiting={FadeOutLeft}
            style={styles.stepContainer}
          >
            <View style={styles.iconCircle}>
                <Ionicons name="checkmark-done-outline" size={32} color={colors.primary} />
            </View>
            <ThemedText style={[styles.stepTitle, { color: colors.text, fontSize: 18 * fontScale }]}>
              Confirm Password
            </ThemedText>
            <ThemedText style={[styles.stepDescription, { color: colors.textSecondary }]}>
              Re-enter your new password to verify.
            </ThemedText>
            
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
               <Ionicons name="lock-open-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
               <TextInput
                 style={[styles.input, { color: colors.text }]}
                 placeholder="Confirm Password"
                 placeholderTextColor={colors.textSecondary}
                 secureTextEntry
                 value={confirmPassword}
                 onChangeText={setConfirmPassword}
                 autoFocus
               />
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={handleFinalSubmit}
            >
              <ThemedText style={styles.buttonText}>Change Password</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backLink}
              onPress={() => setStep(2)}
            >
              <ThemedText style={{ color: colors.primary }}>Back</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        );
    }
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Change Password" />}>
      <View style={styles.progressHeader}>
         <View style={styles.dotsContainer}>
            <View style={[styles.dot, step >= 1 && { backgroundColor: colors.primary }]} />
            <View style={[styles.line, step >= 2 && { backgroundColor: colors.primary, opacity: 1 }, { backgroundColor: colors.border, opacity: 0.3 }]} />
            <View style={[styles.dot, step >= 2 && { backgroundColor: colors.primary }, { backgroundColor: colors.border }]} />
            <View style={[styles.line, step >= 3 && { backgroundColor: colors.primary, opacity: 1 }, { backgroundColor: colors.border, opacity: 0.3 }]} />
            <View style={[styles.dot, step >= 3 && { backgroundColor: colors.primary }, { backgroundColor: colors.border }]} />
         </View>
      </View>

      {renderStep()}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  line: {
    width: 40,
    height: 2,
    marginHorizontal: 4,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(10, 126, 164, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 24,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
      marginTop: 24,
      padding: 10,
  }
});
