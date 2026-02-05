import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
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

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });
  const shakeAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }],
  }));

  const triggerErrorFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shakeAnimation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), 4, true),
      withTiming(0, { duration: 50 }),
    );
  };

  const handleLogin = () => {
    const newErrors = {
      username: !username.trim(),
      password: !password.trim(),
    };

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      triggerErrorFeedback();
      return;
    }

    // Proceed to home if valid
    router.replace("/screens/(tabs)/Home" as any);
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
        {/* Header / Logo Section */}
        <View style={styles.headerSection}>
          <LinearGradient
            colors={[colors.primary, colors.pink + "80"]}
            style={styles.logoCircle}
          >
            <Image
              source={require("../../../assets/svg/Subtract.svg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </LinearGradient>
          <ThemedText
            style={[
              styles.appTitle,
              { color: colors.text, fontSize: 32 * fontScale },
            ]}
          >
            MobileApp
          </ThemedText>
        </View>

        {/* Form Section */}
        <Animated.View style={[styles.formSection, animatedStyle]}>
          {/* Username Input */}
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: errors.username ? colors.error : colors.border,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { color: colors.text, fontSize: 16 * fontScale },
              ]}
              placeholder="Username"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username)
                  setErrors((prev) => ({ ...prev, username: false }));
              }}
            />
          </View>

          {/* Password Input */}
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: errors.password ? colors.error : colors.border,
              },
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { color: colors.text, fontSize: 16 * fontScale },
              ]}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: false }));
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textSecondary}
                style={styles.inputIconRight}
              />
            </TouchableOpacity>
          </View>

          {/* Options: Forgot Password */}
          <View style={[styles.optionsRow, { justifyContent: "flex-end" }]}>
            <TouchableOpacity
              onPress={() => {
                router.push("/screens/onboarding/forget" as any);
              }}
            >
              <ThemedText
                style={{
                  color: colors.textSecondary,
                  fontSize: 14 * fontScale,
                }}
              >
                Forget password
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButtonContainer}
            activeOpacity={0.9}
            onPress={handleLogin}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary + "DD"]} // Use primary color gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <ThemedText style={styles.loginButtonText}>Login</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          {/* Create Account Link */}
          <View style={styles.signupRow}>
            <ThemedText style={{ color: colors.textSecondary }}>
              Not a member?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={() => {
                router.push("/screens/onboarding/signup" as any);
              }}
            >
              <ThemedText style={{ color: colors.primary, fontWeight: "600" }}>
                Create an account
              </ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Social Login Section */}
        <View style={styles.socialSection}>
          <ThemedText style={[styles.orText, { color: colors.textSecondary }]}>
            Or continue with
          </ThemedText>

          <View>
            <TouchableOpacity
              style={[
                styles.socialButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name="logo-google" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Side Hint (Optional per user request, mainly sticking to Login) */}
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
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
    tintColor: "#FFF",
  },
  appTitle: {
    fontWeight: "800",
    letterSpacing: 1,
  },
  formSection: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputIconRight: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonContainer: {
    width: "100%",
    height: 56,
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
  socialSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  orText: {
    marginBottom: 20,
    fontSize: 14,
  },
  socialButton: {
    width: 80,
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
