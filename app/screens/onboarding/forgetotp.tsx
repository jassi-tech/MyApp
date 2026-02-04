import { Ionicons } from "@expo/vector-icons";
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
    View
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function ForgetOtpScreen() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();
  
  const [otp, setOtp] = useState("");

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
          <ThemedText style={[styles.appTitle, { color: colors.text, fontSize: 32 * fontScale }]}>
            Verify Code
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary, fontSize: 16 * fontScale }]}>
            Enter the code sent to your email to reset your password.
          </ThemedText>
        </View>

        <View style={styles.formSection}>
          
          <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text, fontSize: 24 * fontScale }]}
              placeholder="0 0 0 0"
              placeholderTextColor={colors.textSecondary + "80"}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={4}
              textAlign="center"
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButtonContainer}
            activeOpacity={0.9}
            onPress={() => router.replace("/screens/onboarding/new-password" as any)}
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
            <ThemedText style={{ color: colors.textSecondary }}>Didn't receive code? </ThemedText>
            <TouchableOpacity onPress={() => {/* Handle Resend */}}>
              <ThemedText style={{ color: colors.primary, fontWeight: "600" }}>Resend</ThemedText>
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
    position: 'absolute',
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
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    height: "100%",
    fontWeight: 'bold',
    letterSpacing: 10
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
