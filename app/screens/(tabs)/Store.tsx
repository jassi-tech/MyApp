import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import Card from "@/components/common/cards";
import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";

interface StoreItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  rating: number;
  students: string;
}

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Health"];

const FEATURED_COURSES: StoreItem[] = [
  {
    id: "1",
    title: "Complete React Native Masterclass 2026",
    subtitle: "Build professional iOS and Android apps with Expo and TypeScript.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    price: "$89.99",
    rating: 4.9,
    students: "12.5k",
  },
  {
    id: "2",
    title: "Advanced UI/UX Design Principles",
    subtitle: "Master Figma and create stunning user interfaces for mobile.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=2670&auto=format&fit=crop",
    price: "$74.99",
    rating: 4.8,
    students: "8.2k",
  },
];

const RECENTLY_ADDED: StoreItem[] = [
  {
    id: "3",
    title: "Next.js 15 & Tailwind CSS",
    subtitle: "Build high-performance web applications with ease.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    price: "$59.99",
    rating: 4.7,
    students: "3.1k",
  },
  {
    id: "4",
    title: "Professional Backend with Node.js",
    subtitle: "Scalable APIs with Express and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
    price: "$69.99",
    rating: 4.9,
    students: "5.4k",
  },
];

export default function StoreScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Find your course</ThemedText>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Palette.gray} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for courses, skills..." 
            placeholderTextColor={Palette.gray}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category} 
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryChip,
                activeCategory === category && styles.categoryChipActive
              ]}
            >
              <ThemedText style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Courses</ThemedText>
          <TouchableOpacity><ThemedText style={styles.seeAll}>See All</ThemedText></TouchableOpacity>
        </View>
        {FEATURED_COURSES.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
      </View>

      <View style={[styles.section, { marginBottom: 30 }]}>
         <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recently Added</ThemedText>
          <TouchableOpacity><ThemedText style={styles.seeAll}>See All</ThemedText></TouchableOpacity>
        </View>
        {RECENTLY_ADDED.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const CourseCard = ({ item }: { item: StoreItem }) => (
  <Card
    title={item.title}
    subtitle={item.subtitle}
    image={item.image}
    onPress={() => {}}
    style={styles.card}
  >
    <View style={styles.cardFooter}>
      <View style={styles.statsRow}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <ThemedText style={styles.statsText}>{item.rating}</ThemedText>
        <Ionicons name="people" size={14} color={Palette.gray} style={{ marginLeft: 8 }} />
        <ThemedText style={styles.statsText}>{item.students}</ThemedText>
      </View>
      <ThemedText style={styles.price}>{item.price}</ThemedText>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  headerTitle: {
    color: Palette.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.darkGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Palette.white,
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  categoryChipActive: {
    backgroundColor: Palette.green,
    borderColor: Palette.green,
  },
  categoryText: {
    color: Palette.gray,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: Palette.deepPurple,
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: Palette.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: Palette.green,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    fontSize: 12,
    color: Palette.gray,
    marginLeft: 4,
  },
  price: {
    color: Palette.green,
    fontWeight: "bold",
    fontSize: 18,
  },
});
