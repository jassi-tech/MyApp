import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <ScreenContainer header={<ScreenHeader title="Privacy Policy" />}>
        <ThemedText style={styles.lastUpdated}>Last Updated: January 30, 2026</ThemedText>

        <Section title="1. Introduction">
            <ThemedText style={styles.paragraph}>
                Welcome to our Privacy Policy. Your privacy is critically important to us.
                We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website.
            </ThemedText>
        </Section>

        <Section title="2. Information We Collect">
            <ThemedText style={styles.paragraph}>
                We only collect information about you if we have a reason to do so – for example, to provide our services, to communicate with you, or to make our services better.
            </ThemedText>
        </Section>

        <Section title="3. Security">
            <ThemedText style={styles.paragraph}>
                The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </ThemedText>
        </Section>
        
        <Section title="4. Changes to This Policy">
            <ThemedText style={styles.paragraph}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </ThemedText>
        </Section>
    </ScreenContainer>
  );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        {children}
    </View>
);

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  lastUpdated: {
      color: Palette.gray,
      marginBottom: 20,
      fontStyle: 'italic',
  },
  section: {
      marginBottom: 24,
  },
  sectionTitle: {
      color: Palette.white,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  paragraph: {
      color: Palette.gray,
      fontSize: 16,
      lineHeight: 24,
  }
});
