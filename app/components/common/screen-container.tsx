import React from "react";
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/context/ThemeContext";

interface ScreenContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function ScreenContainer({
  children,
  header,
  scrollable = true,
  style,
  contentContainerStyle,
}: ScreenContainerProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }, style]}>
      {header}
      {scrollable ? (
        <ScrollView 
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, { flex: 1 }, contentContainerStyle]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
});
