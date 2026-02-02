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

const FAQ_CATEGORIES = [
  {
    id: "1",
    title: "Getting Started",
    icon: "rocket-outline",
    questions: [
      { q: "How do I create an account?", a: "You can create an account by..." },
      { q: "How do I reset my password?", a: "To reset your password..." },
    ],
  },
  {
    id: "2",
    title: "Attendance",
    icon: "calendar-outline",
    questions: [
      { q: "How is attendance calculated?", a: "Attendance is calculated..." },
      { q: "Can I view past attendance?", a: "Yes, you can view..." },
    ],
  },
  {
    id: "3",
    title: "Grades & Results",
    icon: "star-outline",
    questions: [
      { q: "When are grades updated?", a: "Grades are typically updated..." },
      { q: "How do I view my report card?", a: "You can view your report card..." },
    ],
  },
  {
    id: "4",
    title: "Payments",
    icon: "card-outline",
    questions: [
      { q: "What payment methods are accepted?", a: "We accept..." },
      { q: "How do I download a receipt?", a: "To download a receipt..." },
    ],
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Help Center</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard}>
            <Ionicons name="chatbubbles-outline" size={28} color="#00bfff" />
            <ThemedText style={styles.quickActionText}>Live Chat</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <Ionicons name="mail-outline" size={28} color="#8b5cf6" />
            <ThemedText style={styles.quickActionText}>Email Us</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard}>
            <Ionicons name="call-outline" size={28} color="#f59e0b" />
            <ThemedText style={styles.quickActionText}>Call Support</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</ThemedText>

        {FAQ_CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() =>
                setExpandedCategory(expandedCategory === category.id ? null : category.id)
              }
            >
              <View style={styles.categoryLeft}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name={category.icon as any} size={22} color="#00bfff" />
                </View>
                <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
              </View>
              <Ionicons
                name={expandedCategory === category.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>

            {expandedCategory === category.id && (
              <View style={styles.questionsContainer}>
                {category.questions.map((item, index) => (
                  <View key={index} style={styles.questionItem}>
                    <ThemedText style={styles.question}>{item.q}</ThemedText>
                    <ThemedText style={styles.answer}>{item.a}</ThemedText>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.darkGray,
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Palette.white,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 40,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  quickActionText: {
    fontSize: 12,
    color: Palette.white,
    marginTop: 8,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 12,
    letterSpacing: 1,
  },
  categoryCard: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.white,
  },
  questionsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    padding: 16,
    paddingTop: 12,
  },
  questionItem: {
    marginBottom: 16,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.white,
    marginBottom: 6,
  },
  answer: {
    fontSize: 13,
    color: "#888",
    lineHeight: 18,
  },
});
