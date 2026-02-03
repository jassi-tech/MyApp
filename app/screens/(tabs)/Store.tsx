import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import Card from "@/components/common/cards";
import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Course } from "@/constants/courses";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Health"];

export default function StoreScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { colors, fontScale } = useTheme();
  const { allCourses, isCoursePurchased } = useCourses();

  const filteredCourses = allCourses.filter(course => 
    activeCategory === "All" || course.category === activeCategory
  );

  // For demonstration, let's treat the first 2 as "Featured" if they aren't purchased, 
  // or just show all available in a nice grid/list
  const featured = filteredCourses.filter(c => !isCoursePurchased(c.id)).slice(0, 2);
  const others = filteredCourses.filter(c => !featured.find(f => f.id === c.id));

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.headerTitle, { color: colors.text, fontSize: 24 * fontScale }]}>Find your course</ThemedText>
        <View style={[styles.searchContainer, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for courses, skills..." 
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text, fontSize: 16 * fontScale }]}
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
                { 
                  backgroundColor: activeCategory === category ? colors.primary : colors.backgroundSecondary,
                  borderColor: activeCategory === category ? colors.primary : colors.border
                }
              ]}
            >
              <ThemedText style={[
                styles.categoryText,
                { 
                  color: activeCategory === category ? '#fff' : colors.textSecondary,
                  fontSize: 14 * fontScale
                }
              ]}>
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {featured.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Featured Courses</ThemedText>
            <TouchableOpacity><ThemedText style={[styles.seeAll, { color: colors.primary }]}>See All</ThemedText></TouchableOpacity>
          </View>
          {featured.map((item) => (
            <CourseCard key={item.id} item={item} />
          ))}
        </View>
      )}

      <View style={[styles.section, { marginBottom: 30 }]}>
         <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            {activeCategory === "All" ? "Recently Added" : `${activeCategory} Courses`}
          </ThemedText>
          <TouchableOpacity><ThemedText style={[styles.seeAll, { color: colors.primary }]}>See All</ThemedText></TouchableOpacity>
        </View>
        {others.length > 0 ? (
          others.map((item) => (
            <CourseCard key={item.id} item={item} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <ThemedText style={{ color: colors.textSecondary }}>No courses found in this category.</ThemedText>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const CourseCard = ({ item }: { item: Course }) => {
  const { colors, fontScale } = useTheme();
  const router = useRouter();
  const { isCoursePurchased } = useCourses();
  const purchased = isCoursePurchased(item.id);

  return (
    <Card
      variant="horizontal"
      title={item.title}
      subtitle={`${item.instructor} · ${item.duration}`}
      image={item.image}
      onPress={() => router.push(`/screens/course-details?id=${item.id}`)}
      style={[styles.card, { backgroundColor: colors.card, borderBlockColor: colors.border }]}
      imageStyle={styles.cardImage}
    >
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.cardFooter}>
        <View style={styles.priceRow}>
          {purchased ? (
             <ThemedText style={[styles.purchasedTag, { color: colors.primary, fontSize: 14 * fontScale }]}>Purchased</ThemedText>
          ) : (
            <>
              <ThemedText style={[styles.price, { color: colors.text, fontSize: 16 * fontScale }]}>{item.price}</ThemedText>
              <ThemedText style={[styles.originalPrice, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>{item.originalPrice}</ThemedText>
            </>
          )}
        </View>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <ThemedText style={[styles.ratingText, { color: colors.textSecondary }]}>{item.rating} ({item.students})</ThemedText>
        </View>
      </View>

      {item.isTopAuthor && (
        <View style={[styles.topAuthorBadge, { backgroundColor: colors.primary + '15' }]}>
          <ThemedText style={[styles.topAuthorText, { color: colors.primary }]}>Top Author</ThemedText>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
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
    marginRight: 10,
    borderWidth: 1,
  },
  categoryText: {
    fontWeight: "600",
  },
  section: {
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    marginBottom: 16,
    borderWidth: 0,
  },
  cardImage: {
    width: 140, 
    height: 140,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    marginVertical: 6,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    flexWrap: "wrap-reverse", // Pro fix: wraps 'upwards' if space is tight
    gap: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontWeight: "bold",
    marginRight: 4,
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 10,
    marginLeft: 2,
  },
  topAuthorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  topAuthorText: {
    fontSize: 10,
    fontWeight: "500",
  },
  purchasedTag: {
    fontWeight: "700",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
