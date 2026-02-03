import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import Button from "@/components/common/button";
import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

export default function ContactUs() {
  const { colors, fontScale } = useTheme();

  return (
    <ScreenContainer header={<ScreenHeader title="Contact Us" />}>
        <ThemedText style={[styles.description, { color: colors.textSecondary, fontSize: 16 * fontScale }]}>
            Have a question or need help? Send us a message and we&apos;ll get back to you as soon as possible.
        </ThemedText>

        <View style={styles.formGroup}>
            <ThemedText style={[styles.label, { color: colors.text, fontSize: 15 * fontScale }]}>Subject</ThemedText>
            <TextInput 
                style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, borderWidth: 1, fontSize: 16 * fontScale }]}
                placeholder="How can we help?"
                placeholderTextColor={colors.textSecondary}
            />
        </View>

        <View style={styles.formGroup}>
            <ThemedText style={[styles.label, { color: colors.text, fontSize: 15 * fontScale }]}>Message</ThemedText>
            <TextInput 
                style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, borderWidth: 1, fontSize: 16 * fontScale }]}
                placeholder="Describe your issue..."
                placeholderTextColor={colors.textSecondary}
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

const ContactMethod = ({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => {
  const { colors, fontScale } = useTheme();
  return (
    <TouchableOpacity style={[styles.contactMethod, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        <View>
            <ThemedText style={[styles.methodTitle, { color: colors.text, fontSize: 16 * fontScale }]}>{title}</ThemedText>
            <ThemedText style={[styles.methodSubtitle, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>{subtitle}</ThemedText>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  description: {
      marginBottom: 30,
      lineHeight: 24,
  },
  formGroup: {
      marginBottom: 20,
  },
  label: {
      marginBottom: 8,
      fontWeight: 'bold',
  },
  input: {
      borderRadius: 12,
      padding: 16,
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
      marginBottom: 20,
  },
  contactMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
  },
  iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
  },
  methodTitle: {
      fontWeight: 'bold',
  },
  methodSubtitle: {
  }
});
