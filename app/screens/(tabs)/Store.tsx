import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Card from "@/components/common/cards";
import { ScreenContainer } from "@/components/common/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Course } from "@/services/courseService";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Health"];

export default function StoreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { colors, fontScale } = useTheme();
  const { allCourses, isCoursePurchased, loading, error, refreshCourses } = useCourses();

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter courses by category, search, AND exclude purchased courses
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesCategory = activeCategory === "All" || course.category === activeCategory;
      const matchesSearch = debouncedSearch === "" ||
        course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        course.instructor.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        course.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        course.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      const notPurchased = !isCoursePurchased(course.id);
      
      return matchesCategory && matchesSearch && notPurchased;
    });
  }, [allCourses, activeCategory, debouncedSearch, isCoursePurchased]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
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
                  backgroundColor: activeCategory === category ? colors.primary : colors.card,
                  borderColor: activeCategory === category ? colors.primary : colors.border,
                  shadowColor: activeCategory === category ? colors.primary : '#000',
                  shadowOpacity: activeCategory === category ? 0.3 : 0,
                  elevation: activeCategory === category ? 4 : 0
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

      <View style={[styles.section, { marginBottom: 30 }]}>
        <View style={styles.resultsContainer}>
          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={colors.primary} />
              <ThemedText style={{ marginTop: 10, color: colors.textSecondary }}>Loading courses...</ThemedText>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <LinearGradient
                colors={[colors.error + '20', colors.error + '10']}
                style={styles.errorIconCircle}
              >
                <Ionicons name="cloud-offline-outline" size={40} color={colors.error} />
              </LinearGradient>
              <ThemedText style={[styles.errorTitle, { color: colors.text }]}>Connection Issue</ThemedText>
              <ThemedText style={[styles.errorSubtitle, { color: colors.textSecondary }]}>
                We couldn't reach the server. Please check your internet connection and try again.
              </ThemedText>
              <TouchableOpacity 
                style={[styles.retryButton, { backgroundColor: colors.primary }]}
                onPress={refreshCourses}
              >
                <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
              </TouchableOpacity>
            </View>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <CourseCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyState 
              activeCategory={activeCategory}
              searchQuery={debouncedSearch}
              onViewPurchased={() => router.push("/screens/categories/purchased" as any)}
              onClearSearch={handleClearSearch}
            />
          )}
        </View>
      </View>
  </ScreenContainer>
  );
}

// Empty State Component
const EmptyState = ({ 
  activeCategory, 
  searchQuery,
  onViewPurchased,
  onClearSearch 
}: { 
  activeCategory: string; 
  searchQuery: string;
  onViewPurchased: () => void;
  onClearSearch: () => void;
}) => {
  const { colors } = useTheme();
  
  // Different messages based on search vs no search
  const isSearching = searchQuery.length > 0;
  
  return (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name={isSearching ? "search-outline" : "checkmark-circle"} 
        size={64} 
        color={isSearching ? colors.textSecondary : (colors.success || "#10b981")} 
      />
      <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
        {isSearching 
          ? "No courses found"
          : (activeCategory === "All" 
            ? "You've purchased all courses!"
            : `All ${activeCategory} courses purchased!`)}
      </ThemedText>
      <ThemedText style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        {isSearching 
          ? `No results for "${searchQuery}". Try different keywords.`
          : "Visit your purchased courses to continue learning"}
      </ThemedText>
      {isSearching ? (
        <TouchableOpacity 
          style={[styles.emptyButton, { backgroundColor: colors.primary }]}
          onPress={onClearSearch}
        >
          <ThemedText style={styles.emptyButtonText}>Reset Search</ThemedText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.emptyButton, { backgroundColor: colors.primary }]}
          onPress={onViewPurchased}
        >
          <ThemedText style={styles.emptyButtonText}>Go to My Courses</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Course Card Component
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
      image={item.thumbnail}
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
              <ThemedText style={[styles.price, { color: colors.text, fontSize: 16 * fontScale }]}>${item.price}</ThemedText>
              {item.originalPrice && (
                <ThemedText style={[styles.originalPrice, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
                  ${item.originalPrice}
                </ThemedText>
              )}
            </>
          )}
        </View>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <ThemedText style={[styles.ratingText, { color: colors.textSecondary }]}>{item.rating} ({item.studentsCount})</ThemedText>
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
  center: {
    // padding: 20,
    // alignItems: "left",
    // justifyContent: "center",
  },
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
  clearButton: {
    padding: 4,
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
  resultsContainer: {
    width: '100%',
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
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 30,
    lineHeight: 20,
  },
  emptyButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
  },
  errorIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorSubtitle: {
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  retryButton: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
