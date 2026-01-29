import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  onPress,
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
}: ButtonProps & { textStyle?: StyleProp<TextStyle> }) {
  const tint = useThemeColor({}, "tint");
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");

  const getButtonStyle = () => {
    const baseStyle: any = {
      ...styles[`size_${size}`],
    };

    if (variant === "primary") {
      baseStyle.backgroundColor = tint;
    } else if (variant === "secondary") {
      baseStyle.backgroundColor = text;
      baseStyle.opacity = 0.15;
    } else if (variant === "outlined") {
      baseStyle.backgroundColor = "transparent";
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = tint;
    } else if (variant === "danger") {
      baseStyle.backgroundColor = "#e74c3c";
    }

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextColor = () => {
    if (variant === "outlined") return tint;
    if (variant === "secondary") return text;
    return background;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled || loading ? 1 : 0.8}
      disabled={disabled || loading}
      style={[styles.button, getButtonStyle(), style]}
    >
      <React.Fragment>
        {icon && iconPosition === "left" ? (
          <React.Fragment>{icon}</React.Fragment>
        ) : null}

        {loading ? (
          <ActivityIndicator
            size={size === "small" ? "small" : "small"}
            color={getTextColor()}
            style={
              icon && iconPosition === "left" ? styles.leftIcon : undefined
            }
          />
        ) : null}

        <ThemedText
          style={[
            styles[`text_${size}`],
            {
              color: getTextColor(),
              marginLeft: icon && iconPosition === "left" && !loading ? 8 : 0,
              marginRight: icon && iconPosition === "right" && !loading ? 8 : 0,
            },
            textStyle,
          ]}
        >
          {label}
        </ThemedText>

        {icon && iconPosition === "right" && !loading ? (
          <React.Fragment>{icon}</React.Fragment>
        ) : null}
      </React.Fragment>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  size_small: {
    paddingVertical: 8,
    minHeight: 32,
  },
  size_medium: {
    paddingVertical: 12,
    minHeight: 44,
  },
  size_large: {
    paddingVertical: 16,
    minHeight: 56,
  },
  text_small: {
    fontSize: 12,
    fontWeight: "600",
  },
  text_medium: {
    fontSize: 16,
    fontWeight: "600",
  },
  text_large: {
    fontSize: 18,
    fontWeight: "600",
  },
  leftIcon: {
    marginRight: 8,
  },
});
