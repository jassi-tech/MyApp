import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

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

  const handleSubmit = () => {
    // Handle problem submission
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Report a Problem</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#00bfff" />
          <ThemedText style={styles.infoText}>
            Help us improve by reporting any issues you encounter. We'll get back to you as soon as possible.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>SELECT CATEGORY</ThemedText>
          <View style={styles.categoriesGrid}>
            {PROBLEM_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={20}
                  color={selectedCategory === category.id ? "#00bfff" : "#888"}
                />
                <ThemedText
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category.id && styles.categoryChipTextActive,
                  ]}
                >
                  {category.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>DESCRIBE THE PROBLEM</ThemedText>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Please provide details about the issue..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>ATTACHMENTS (OPTIONAL)</ThemedText>
          <TouchableOpacity style={styles.attachmentButton}>
            <Ionicons name="camera-outline" size={24} color="#00bfff" />
            <ThemedText style={styles.attachmentText}>Add Screenshot</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedCategory || !description) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!selectedCategory || !description}
        >
          <ThemedText style={styles.submitButtonText}>Submit Report</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Palette.white,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#00bfff20",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#00bfff40",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#ccc",
    lineHeight: 18,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
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
    backgroundColor: Palette.darkGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    gap: 8,
  },
  categoryChipActive: {
    borderColor: "#00bfff",
    backgroundColor: "#00bfff20",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#00bfff",
  },
  descriptionInput: {
    backgroundColor: Palette.darkGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: Palette.white,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    minHeight: 150,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.darkGray,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderStyle: "dashed",
    gap: 10,
  },
  attachmentText: {
    fontSize: 15,
    color: "#00bfff",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#00bfff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Palette.white,
  },
});
