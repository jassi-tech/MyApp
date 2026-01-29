import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { Link } from "expo-router";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to Home</ThemedText>
      <ThemedText type="subtitle">This is your home screen</ThemedText>
      
      <ThemedText style={styles.text}>
        Start building your app here. Scroll down to test scrolling functionality.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 1</ThemedText>
      <ThemedText style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 2</ThemedText>
      <ThemedText style={styles.text}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 3</ThemedText>
      <ThemedText style={styles.text}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 4</ThemedText>
      <ThemedText style={styles.text}>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 5</ThemedText>
      <ThemedText style={styles.text}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 6</ThemedText>
      <ThemedText style={styles.text}>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Section 7</ThemedText>
      <ThemedText style={styles.text}>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>End of Content</ThemedText>
      <ThemedText style={styles.text}>
        You reached the bottom! Scrolling is working perfectly.
      </ThemedText>
    </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  text: {
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 22,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
  },
});

