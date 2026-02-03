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
import { useTheme } from "@/context/ThemeContext";

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
  const { colors, fontScale } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: colors.text, fontSize: 20 * fontScale }]}>Help Center</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text, fontSize: 16 * fontScale }]}
          placeholder="Search for help..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="chatbubbles-outline" size={28} color="#00bfff" />
            <ThemedText style={[styles.quickActionText, { color: colors.text, fontSize: 12 * fontScale }]}>Live Chat</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="mail-outline" size={28} color="#8b5cf6" />
            <ThemedText style={[styles.quickActionText, { color: colors.text, fontSize: 12 * fontScale }]}>Email Us</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="call-outline" size={28} color="#f59e0b" />
            <ThemedText style={[styles.quickActionText, { color: colors.text, fontSize: 12 * fontScale }]}>Call Support</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>FREQUENTLY ASKED QUESTIONS</ThemedText>

        {FAQ_CATEGORIES.map((category) => (
          <View key={category.id} style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() =>
                setExpandedCategory(expandedCategory === category.id ? null : category.id)
              }
            >
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIconContainer, { backgroundColor: colors.background }]}>
                  <Ionicons name={category.icon as any} size={22} color={colors.primary} />
                </View>
                <ThemedText style={[styles.categoryTitle, { color: colors.text, fontSize: 16 * fontScale }]}>{category.title}</ThemedText>
              </View>
              <Ionicons
                name={expandedCategory === category.id ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {expandedCategory === category.id && (
              <View style={[styles.questionsContainer, { borderTopColor: colors.border }]}>
                {category.questions.map((item, index) => (
                  <View key={index} style={styles.questionItem}>
                    <ThemedText style={[styles.question, { color: colors.text, fontSize: 14 * fontScale }]}>{item.q}</ThemedText>
                    <ThemedText style={[styles.answer, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>{item.a}</ThemedText>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
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
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  quickActionText: {
    marginTop: 8,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },
  categoryCard: {
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryTitle: {
    fontWeight: "600",
  },
  questionsContainer: {
    borderTopWidth: 1,
    padding: 16,
    paddingTop: 12,
  },
  questionItem: {
    marginBottom: 16,
  },
  question: {
    fontWeight: "600",
    marginBottom: 6,
  },
  answer: {
    lineHeight: 18,
  },
});
