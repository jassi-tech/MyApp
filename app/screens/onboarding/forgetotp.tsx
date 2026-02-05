import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function ForgetOtpScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const shakeAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  const triggerErrorFeedback = () => {
    setIsError(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shakeAnimation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), 4, true),
      withTiming(0, { duration: 50 }),
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <LinearGradient
            colors={[colors.primary, colors.pink + "80"]}
            style={styles.logoCircle}
          >
            <Ionicons name="key-outline" size={40} color="#FFF" />
          </LinearGradient>
          <ThemedText
            style={[
              styles.appTitle,
              { color: colors.text, fontSize: 32 * fontScale },
            ]}
          >
            Verify Code
          </ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              { color: colors.textSecondary, fontSize: 16 * fontScale },
            ]}
          >
            Enter the code sent to your email to reset your password.
          </ThemedText>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            {/* Visual Boxes */}
            <Animated.View style={[styles.otpBoxesContainer, animatedStyle]}>
              {Array(4)
                .fill(0)
                .map((_, index) => {
                  const digit = otp[index] || "";
                  const isFocused = otp.length === index;
                  const isFilled = digit !== "";

                  return (
                    <View
                      key={index}
                      style={[
                        styles.otpBox,
                        {
                          backgroundColor: colors.backgroundSecondary,
                          borderColor: isError
                            ? colors.error
                            : isFocused
                              ? colors.primary
                              : isFilled
                                ? colors.primary + "50"
                                : colors.border,
                          shadowColor: colors.shadow,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[styles.otpText, { color: colors.text }]}
                      >
                        {digit}
                      </ThemedText>
                    </View>
                  );
                })}
            </Animated.View>

            {/* Hidden Input Layer */}
            <TextInput
              style={styles.hiddenInput}
              value={otp}
              onChangeText={(text) => {
                // Only allow numeric input
                if (/^\d*$/.test(text)) {
                  setOtp(text);
                  if (isError) setIsError(false);
                }
              }}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
              caretHidden
            />
          </View>

          <TouchableOpacity
            style={styles.loginButtonContainer}
            activeOpacity={0.9}
            onPress={() => {
              if (otp === "1234") {
                router.replace("/screens/onboarding/new-password" as any);
              } else {
                triggerErrorFeedback();
              }
            }}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary + "DD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <ThemedText style={styles.loginButtonText}>Verify</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <ThemedText style={{ color: colors.textSecondary }}>
              Didn't receive code?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={() => {
                /* Handle Resend */
              }}
            >
              <ThemedText style={{ color: colors.primary, fontWeight: "600" }}>
                Resend
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 60,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  appTitle: {
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    height: 60,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  // Hidden input handles the actual typing
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  // Container for the 4 visual boxes
  otpBoxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  // Individual box styling
  otpBox: {
    width: 65,
    height: 65,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  otpText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  loginButtonContainer: {
    width: "100%",
    height: 45,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  loginButton: {
    flex: 1,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
