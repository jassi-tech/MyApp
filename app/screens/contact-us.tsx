import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import Button from "@/components/common/button";
import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

export default function ContactUs() {
  const router = useRouter();

  return (
    <ScreenContainer header={<ScreenHeader title="Contact Us" />}>
        <ThemedText style={styles.description}>
            Have a question or need help? Send us a message and we'll get back to you as soon as possible.
        </ThemedText>

        <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Subject</ThemedText>
            <TextInput 
                style={styles.input}
                placeholder="How can we help?"
                placeholderTextColor={Palette.gray}
            />
        </View>

        <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Message</ThemedText>
            <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Describe your issue..."
                placeholderTextColor={Palette.gray}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />
        </View>

        <Button 
            label="Send Message" 
            onPress={() => {}} 
            variant="primary"
            fullWidth
            style={styles.submitButton}
        />

        <View style={styles.contactMethods}>
            <ContactMethod 
                icon="mail-outline" 
                title="Email" 
                subtitle="support@myapp.com" 
            />
            <ContactMethod 
                icon="call-outline" 
                title="Phone" 
                subtitle="+1 (555) 123-4567" 
            />
        </View>
    </ScreenContainer>
  );
}

const ContactMethod = ({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <TouchableOpacity style={styles.contactMethod}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color={Palette.white} />
        </View>
        <View>
            <ThemedText style={styles.methodTitle}>{title}</ThemedText>
            <ThemedText style={styles.methodSubtitle}>{subtitle}</ThemedText>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
  description: {
      color: Palette.gray,
      marginBottom: 30,
      fontSize: 16,
      lineHeight: 24,
  },
  formGroup: {
      marginBottom: 20,
  },
  label: {
      color: Palette.white,
      marginBottom: 8,
      fontWeight: 'bold',
  },
  input: {
      backgroundColor: Palette.darkGray,
      borderRadius: 12,
      padding: 16,
      color: Palette.white,
      fontSize: 16,
  },
  textArea: {
      minHeight: 120,
  },
  submitButton: {
      marginTop: 10,
      marginBottom: 30,
  },
  contactMethods: {
      gap: 16,
  },
  contactMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Palette.darkGray,
      padding: 16,
      borderRadius: 12,
  },
  iconContainer: {
      marginRight: 16,
  },
  methodTitle: {
      fontWeight: 'bold',
      color: Palette.white,
      fontSize: 16,
  },
  methodSubtitle: {
      color: Palette.gray,
      fontSize: 14,
  }
});
