import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = 280;

export default function LifetimeDealScreen() {
  const { colors, fontScale } = useTheme();
  const router = useRouter();

  const benefits = [
    { icon: 'infinite', title: 'Life Access', desc: 'Own it forever' },
    { icon: 'videocam', title: '500+ Courses', desc: 'All categories' },
    { icon: 'download', title: 'Offline Mode', desc: 'Learn anywhere' },
    { icon: 'ribbon', title: 'Certificates', desc: 'Verified skills' },
    { icon: 'people', title: 'Community', desc: 'Private group' },
    { icon: 'headset', title: '24/7 Support', desc: 'Priority help' },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* 1. Professional Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#E35FF2', '#8F36FF']}
            style={styles.heroGradient}
          >
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.heroTextContent}>
              <ThemedText style={[styles.heroBadge, { fontSize: 12 * fontScale }]}>
                LIMITED TIME OFFER
              </ThemedText>
              <ThemedText style={[styles.heroTitle, { fontSize: 32 * fontScale }]}>
                Unlock Your{'\n'}Future Today
              </ThemedText>
              <ThemedText style={[styles.heroSubtitle, { fontSize: 16 * fontScale }]}>
                One payment. {fontScale > 1 ? '' : '\n'}Endless possibilities.
              </ThemedText>
            </View>

            {/* Pop-out Student Image */}
            <View style={styles.heroImageContainer}>
              <Image 
                source={require('../../../assets/images/student.png')} 
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
        </View>

        {/* 2. Pricing Content */}
        <View style={styles.contentWrapper}>
          <View style={[styles.pricingCard, { backgroundColor: colors.card }]}>
            <View style={styles.priceRow}>
              <View>
                <ThemedText style={[styles.priceLabel, { color: colors.textSecondary }]}>Lifetime Access</ThemedText>
                <View style={styles.priceStack}>
                  <ThemedText style={[styles.originalPrice, { color: colors.textSecondary }]}>$499</ThemedText>
                  <ThemedText style={[styles.salePrice, { color: colors.text }]}>$99</ThemedText>
                </View>
              </View>
              <View style={styles.saveBadge}>
                <ThemedText style={styles.saveText}>Save 80%</ThemedText>
              </View>
            </View>
          </View>

          {/* 3. Benefits Grid */}
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>What's Included</ThemedText>
          <View style={styles.benefitsGrid}>
            {benefits.map((item, index) => (
              <View key={index} style={[styles.benefitCard, { backgroundColor: colors.card }]}>
                <View style={[styles.benefitIconBox, { backgroundColor: colors.primary + '15' }]}>
                  <Ionicons name={item.icon as any} size={22} color={colors.primary} />
                </View>
                <ThemedText style={[styles.benefitTitle, { color: colors.text }]}>{item.title}</ThemedText>
                <ThemedText style={[styles.benefitDesc, { color: colors.textSecondary }]}>{item.desc}</ThemedText>
              </View>
            ))}
          </View>

          {/* 4. Social Proof / Info */}
          <View style={[styles.trustSection, { backgroundColor: colors.primary + '08' }]}>
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            <ThemedText style={[styles.trustText, { color: colors.text }]}>
              Join 5,000+ students worldwide. Secure checkout.
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* 5. Sticky Bottom CTA */}
      <View style={[styles.stickyFooter, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.mainActionButton}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Success", "Lifetime Deal unlocked!")}
        >
          <LinearGradient
            colors={['#E35FF2', '#8F36FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionGradient}
          >
            <ThemedText style={styles.actionButtonText}>Redeem Lifetime Deal</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    height: HERO_HEIGHT,
    width: '100%',
  },
  heroGradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTextContent: {
    zIndex: 10,
  },
  heroBadge: {
    color: '#FFFF00',
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#FFF',
    fontWeight: '900',
    lineHeight: 38,
    marginBottom: 12,
  },
  heroSubtitle: {
    color: '#F4DEFF',
    fontWeight: '600',
    lineHeight: 24,
    opacity: 0.9,
  },
  heroImageContainer: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    width: width * 0.65,
    height: HERO_HEIGHT * 0.8,
    zIndex: 5,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    marginTop: -40,
    zIndex: 20,
  },
  pricingCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 32,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceStack: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginRight: 8,
    opacity: 0.6,
  },
  salePrice: {
    fontSize: 36,
    fontWeight: '900',
  },
  saveBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
  },
  saveText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    marginLeft: 4,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(143, 54, 255, 0.05)',
  },
  benefitIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 12,
    opacity: 0.8,
  },
  trustSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  trustText: {
    fontSize: 13,
    marginLeft: 10,
    fontWeight: '500',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
  },
  mainActionButton: {
    height: 58,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#8F36FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  actionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  }
});
