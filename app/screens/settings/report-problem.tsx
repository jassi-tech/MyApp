import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const PROBLEM_CATEGORIES = [
  { id: "login", label: "Login Issues", icon: "lock-closed-outline" },
  { id: "performance", label: "App Performance", icon: "speedometer-outline" },
  { id: "payment", label: "Payment Problems", icon: "card-outline" },
  { id: "content", label: "Content Issues", icon: "document-text-outline" },
  { id: "other", label: "Other", icon: "ellipsis-horizontal-outline" },
];

export default function ReportProblemScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const { colors, fontScale } = useTheme();

  const handleSubmit = () => {
    // Handle problem submission
    router.back();
  };

  return (
    <ScreenContainer header={<ScreenHeader title="Report a Problem" />}>
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.primary + "20",
            borderColor: colors.primary + "40",
          },
        ]}
      >
        <Ionicons name="information-circle" size={24} color={colors.primary} />
        <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
          Help us improve by reporting any issues you encounter. We'll get back
          to you as soon as possible.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          SELECT CATEGORY
        </ThemedText>
        <View style={styles.categoriesGrid}>
          {PROBLEM_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedCategory === category.id && {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary + "20",
                },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon as any}
                size={20}
                color={
                  selectedCategory === category.id
                    ? colors.primary
                    : colors.textSecondary
                }
              />
              <ThemedText
                style={[
                  styles.categoryChipText,
                  { color: colors.textSecondary, fontSize: 14 * fontScale },
                  selectedCategory === category.id && { color: colors.primary },
                ]}
              >
                {category.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          DESCRIBE THE PROBLEM
        </ThemedText>
        <TextInput
          style={[
            styles.descriptionInput,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
              fontSize: 15 * fontScale,
            },
          ]}
          placeholder="Please provide details about the issue..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          ATTACHMENTS (OPTIONAL)
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.attachmentButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="camera-outline" size={24} color={colors.primary} />
          <ThemedText
            style={[
              styles.attachmentText,
              { color: colors.primary, fontSize: 15 * fontScale },
            ]}
          >
            Add Screenshot
          </ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: colors.primary },
          (!selectedCategory || !description) && {
            backgroundColor: colors.border,
          },
        ]}
        onPress={handleSubmit}
        disabled={!selectedCategory || !description}
      >
        <ThemedText
          style={[
            styles.submitButtonText,
            { color: "#fff", fontSize: 16 * fontScale },
          ]}
        >
          Submit Report
        </ThemedText>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  categoryChipActive: {
    // handled dynamically
  },
  categoryChipText: {
    fontWeight: "500",
  },
  categoryChipTextActive: {
    // handled dynamically
  },
  descriptionInput: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minHeight: 150,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    gap: 10,
  },
  attachmentText: {
    fontWeight: "600",
  },
  submitButton: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    // handled dynamically
  },
  submitButtonText: {
    fontWeight: "bold",
  },
});
