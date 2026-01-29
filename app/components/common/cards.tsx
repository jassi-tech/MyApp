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
}: CardProps) {
  const backgroundColor = useThemeColor({}, "background") as string | undefined;
  const borderColor = useThemeColor({}, "tint") as string | undefined;

  const Wrapper: any = onPress ? TouchableOpacity : View;

  const resolvedImageSource =
    typeof image === "string"
      ? { uri: image }
      : (image as ImageSourcePropType | undefined);

  return (
    <Wrapper
      activeOpacity={onPress ? (disabled ? 1 : 0.8) : 1}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderRadius: rounded ? 12 : 6,
          elevation,
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
                styles.image,
                rounded ? styles.imageRounded : undefined,
                imageStyle,
              ]}
            />
          ) : null}

          <View style={styles.content}>
            {(title || headerRight) && (
              <View style={styles.headerRow}>
                {title ? (
                  <ThemedText
                    type="subtitle"
                    style={styles.title}
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
                numberOfLines={2}
              >
                {subtitle}
              </ThemedText>
            ) : null}

            {children ? <View style={styles.children}>{children}</View> : null}
          </View>

          {footer ? <View style={styles.footer}>{footer}</View> : null}
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
  center: { alignItems: "center", justifyContent: "center" },
  image: {
    width: "100%",
    height: 140,
  },
  imageRounded: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  headerRight: {
    marginLeft: 8,
  },
  title: {
    flex: 1,
  },
  subtitle: {
    marginBottom: 8,
    color: "#666",
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
