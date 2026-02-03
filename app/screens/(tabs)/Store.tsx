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
  originalPrice: string;
  rating: number;
  students: string;
  author: string;
  updatedAt: string;
  isTopAuthor?: boolean;
}

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Health"];

const FEATURED_COURSES: StoreItem[] = [
  {
    id: "1",
    title: "JavaScript for Modern Web Development",
    subtitle: "Build professional websites with JS.",
    author: "Robert Fox",
    updatedAt: "3 hr",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2670&auto=format&fit=crop",
    price: "$10.99",
    originalPrice: "$32",
    rating: 4.5,
    students: "2,980",
    isTopAuthor: true,
  },
  {
    id: "2",
    title: "Python Programming for Data Analysis",
    subtitle: "Master Python and Data Science.",
    author: "Eleanor Pena",
    updatedAt: "3 hr",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
    price: "$10.99",
    originalPrice: "$32",
    rating: 4.5,
    students: "2,980",
    isTopAuthor: true,
  },
];

const RECENTLY_ADDED: StoreItem[] = [
  {
    id: "3",
    title: "Next.js 15 & Tailwind CSS",
    subtitle: "Build high-performance web applications.",
    author: "Arlene McCoy",
    updatedAt: "5 hr",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    price: "$59.99",
    originalPrice: "$89",
    rating: 4.7,
    students: "3.1k",
    isTopAuthor: false,
  },
  {
    id: "4",
    title: "Professional Backend with Node.js",
    subtitle: "Scalable APIs with Express.",
    author: "Guy Hawkins",
    updatedAt: "1 day",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
    price: "$69.99",
    originalPrice: "$99",
    rating: 4.9,
    students: "5.4k",
    isTopAuthor: true,
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
    variant="horizontal"
    title={item.title}
    subtitle={`${item.author} · ${item.updatedAt}`}
    image={item.image}
    onPress={() => {}}
    style={styles.card}
    imageStyle={styles.cardImage}
  >
    <View style={styles.divider} />

    <View style={styles.cardFooter}>
      <View style={styles.priceRow}>
        <ThemedText style={styles.price}>{item.price}</ThemedText>
        <ThemedText style={styles.originalPrice}>{item.originalPrice}</ThemedText>
      </View>
      
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#f59e0b" />
        <ThemedText style={styles.ratingText}>{item.rating} ({item.students})</ThemedText>
      </View>
    </View>

    {item.isTopAuthor && (
      <View style={styles.topAuthorBadge}>
        <ThemedText style={styles.topAuthorText}>Top Author</ThemedText>
      </View>
    )}
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
    marginBottom: 16,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  cardImage: {
    width: 130, // Slightly wider to match image proportion
    height: 130,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    color: Palette.white,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
  originalPrice: {
    color: Palette.gray,
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    color: Palette.gray, // Or white if preferred
    marginLeft: 4,
  },
  topAuthorBadge: {
    backgroundColor: "#e8def8", // Light purple background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  topAuthorText: {
    fontSize: 11,
    color: "#6b21a8", // Dark purple text
    fontWeight: "600",
  },
});
