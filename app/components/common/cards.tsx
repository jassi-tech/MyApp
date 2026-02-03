import React, { ReactNode } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    type GestureResponderEvent,
    type ImageResizeMode,
    type ImageSourcePropType,
    type ImageStyle,
    type StyleProp,
    type ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";

export type CardProps = {
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType | string;
  imageResizeMode?: ImageResizeMode;
  imageStyle?: StyleProp<ImageStyle>;
  children?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  headerRight?: ReactNode;
  footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
  elevation?: number;
  loading?: boolean;
  disabled?: boolean;
  variant?: "vertical" | "horizontal";
};

export default function Card({
  title,
  subtitle,
  image,
  imageResizeMode = "cover",
  imageStyle,
  children,
  onPress,
  headerRight,
  footer,
  style,
  rounded = true,
  elevation = 2,
  loading = false,
  disabled = false,
  variant = "vertical",
}: CardProps) {
  const backgroundColor = useThemeColor({}, "background") as string | undefined;
  const borderColor = "transparent"; // Removed border color for cleaner look, or use standard if preferred

  const Wrapper: any = onPress ? TouchableOpacity : View;

  const resolvedImageSource =
    typeof image === "string"
      ? { uri: image }
      : (image as ImageSourcePropType | undefined);

  const isHorizontal = variant === "horizontal";

  return (
    <Wrapper
      activeOpacity={onPress ? (disabled ? 1 : 0.8) : 1}
      onPress={onPress}
      style={[
        isHorizontal ? styles.containerHorizontal : styles.container,
        {
          backgroundColor: isHorizontal ? "transparent" : backgroundColor, // Horizontal cards might look better without background or transparent
          borderColor,
          borderRadius: rounded ? 12 : 6,
          elevation: isHorizontal ? 0 : elevation, // Remove elevation for horizontal list items usually
        },
        style,
      ]}
      disabled={disabled}
    >
      {loading ? (
        <View style={[styles.center, { padding: 20, minHeight: 80 }]}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {resolvedImageSource ? (
            <Image
              source={resolvedImageSource}
              resizeMode={imageResizeMode}
              style={[
                isHorizontal ? styles.imageHorizontal : styles.image,
                rounded ? (isHorizontal ? styles.imageRoundedHorizontal : styles.imageRounded) : undefined,
                imageStyle,
              ]}
            />
          ) : null}

          <View style={isHorizontal ? styles.contentHorizontal : styles.content}>
            {(title || headerRight) && (
              <View style={styles.headerRow}>
                {title ? (
                  <ThemedText
                    type="subtitle"
                    style={[styles.title, isHorizontal && styles.titleHorizontal]}
                    numberOfLines={2}
                  >
                    {title}
                  </ThemedText>
                ) : (
                  <View />
                )}

                {headerRight ? (
                  <View style={styles.headerRight}>{headerRight}</View>
                ) : null}
              </View>
            )}

            {subtitle ? (
              <ThemedText
                type="default"
                style={styles.subtitle}
                numberOfLines={1}
              >
                {subtitle}
              </ThemedText>
            ) : null}

            {children ? <View style={styles.children}>{children}</View> : null}
          </View>

          {!isHorizontal && footer ? <View style={styles.footer}>{footer}</View> : null}
        </>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  containerHorizontal: {
    flexDirection: "row",
    marginVertical: 8,
    overflow: "hidden",
    alignItems: "center", // Align items vertically in the row
    backgroundColor: "transparent",
  },
  center: { alignItems: "center", justifyContent: "center" },
  image: {
    width: "100%",
    height: 140,
  },
  imageHorizontal: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageRounded: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageRoundedHorizontal: {
    borderRadius: 12, // Rounded corners for horizontal image
  },
  content: {
    padding: 12,
  },
  contentHorizontal: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 4,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Align top for text wrapping
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerRight: {
    marginLeft: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  titleHorizontal: {
    fontSize: 15, // Slightly smaller for horizontal list maybe
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 4,
    color: "#666",
    fontSize: 13,
  },
  children: {
    marginTop: 4,
  },
  footer: {
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
});
