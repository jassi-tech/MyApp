import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "@/components/common/button";
import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

interface NotFoundProps {
  title?: string;
  message?: string;
  onGoHome?: () => void;
}

export default function NotFound({
  title = "404",
  message = "Oops! The page you're looking for doesn't exist.",
  onGoHome,
}: NotFoundProps) {
  const router = useRouter();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.replace("/");
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle-outline" size={80} color={Palette.red} />
        </View>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.message}>{message}</ThemedText>
        <Button
          label="Go to Home"
          onPress={handleGoHome}
          variant="primary"
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 150,
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: Palette.gray,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    borderRadius: 30,
  },
});
