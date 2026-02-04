import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

const { width } = Dimensions.get("window");

export interface LifetimeDealBannerProps {
  onRedeem?: () => void;
}

// 1. Define Standard Dimensions for Absolute Consistency
const BANNER_CARD_HEIGHT = 190;
const IMAGE_HEIGHT = 160;
const HEAD_POP_OUT = 15; // How much the head sticks out above the card
const FEET_POP_OUT = 5; // How much the image extends below the card

export function LifetimeDealBanner({ onRedeem }: LifetimeDealBannerProps) {
  const { fontScale } = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. Background Card */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={["#E35FF2", "#8F36FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Subtle Grid Pattern */}
          <View style={styles.gridLayer}>
            {[...Array(12)].map((_, i) => (
              <View
                key={`v-${i}`}
                style={[styles.gridV, { left: ((width - 32) * i) / 11 }]}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <View
                key={`h-${i}`}
                style={[styles.gridH, { top: (BANNER_CARD_HEIGHT * i) / 7 }]}
              />
            ))}
          </View>

          {/* Card Content: Two Pane Layout */}
          <View style={styles.cardInner}>
            {/* Left Pane: Text and Button */}
            <View style={styles.leftPane}>
              <View style={styles.titleGroupBox}>
                <ThemedText
                  style={[
                    styles.topTitle,
                    { fontSize: styles.topTitle.fontSize * fontScale },
                  ]}
                >
                  Get Lifetime
                  <View style={styles.highlightSection}>
                    <ThemedText
                      style={[
                        styles.emphasizedDeal,
                        {
                          fontSize: styles.emphasizedDeal.fontSize * fontScale,
                        },
                      ]}
                    >
                      Deal
                    </ThemedText>
                    <View style={styles.titleAccentLine} />
                  </View>
                </ThemedText>
              </View>

              <ThemedText
                style={[
                  styles.subPromoText,
                  { fontSize: styles.subPromoText.fontSize * fontScale },
                ]}
              >
                Access to all on-demand courses
              </ThemedText>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.redeemNowButton}
                onPress={onRedeem}
              >
                <LinearGradient
                  colors={["#333333", "#000000"]}
                  style={styles.buttonInnerGradient}
                >
                  <ThemedText style={styles.buttonLabelText}>
                    Redeem Now
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Right Pane: Reserved for Student Image Overlap */}
            <View style={styles.rightPane} />
            <View style={styles.studentImgLayer} pointerEvents="none">
              <Image
                source={require("../../../assets/images/student.png")}
                style={styles.actualStudentImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // paddingHorizontal: 5,
    // Ensure the container itself is large enough to contain the pop-outs
    paddingTop: HEAD_POP_OUT + 5,
    paddingBottom: FEET_POP_OUT + 5,
    position: "relative",
    alignSelf: "center",
    marginBottom: 5,
  },
  cardWrapper: {
    width: "100%",
    height: BANNER_CARD_HEIGHT,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  gridLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
  },
  gridV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 0.8,
    backgroundColor: "#FFFFFF",
  },
  gridH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 0.8,
    backgroundColor: "#FFFFFF",
  },
  cardInner: {
    flex: 1,
    flexDirection: "row",
    zIndex: 10,
  },
  leftPane: {
    flex: 1.4, // Keep text on the left
    paddingLeft: 18,
    justifyContent: "center",
  },
  rightPane: {
    flex: 1,
  },
  titleGroupBox: {
    marginBottom: 2,
  },
  topTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 22,
  },
  highlightSection: {
    alignSelf: "flex-start",
    position: "relative",
  },
  emphasizedDeal: {
    color: "#FFFF00",
    fontStyle: "italic",
    fontWeight: "900",
    fontSize: 24,
    paddingLeft: 4,
    paddingRight: 4,
    overflow: "visible",
    zIndex: 99,
  },
  titleAccentLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 3,
    backgroundColor: "#FFFF00",
    borderRadius: 4,
    transform: [{ rotate: "-1.5deg" }],
  },
  subPromoText: {
    color: "#F4DEFF",
    fontWeight: "400",
    marginBottom: 16,
    fontSize: 12,
  },
  redeemNowButton: {
    width: 120,
    height: 38,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  buttonInnerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabelText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  studentImgLayer: {
    position: "absolute",
    // Position image relative to the bottom of the container (which includes its own safety padding)
    bottom: 0, // Aligned near the bottom safety margin
    right: 18,
    width: width * 0.42,
    height: IMAGE_HEIGHT,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    zIndex: 0,
  },
  actualStudentImg: {
    width: "115%", // Slightly wider for arms
    height: "100%",
  },
});
