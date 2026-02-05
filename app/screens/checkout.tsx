import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";

import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useCourses } from "@/context/CourseContext";
import { useTheme } from "@/context/ThemeContext";
import { PaymentService } from "@/services/paymentService";

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
  { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
  { id: 'google', name: 'Google Pay', icon: 'logo-google' },
  { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const courseId = params.courseId as string;
  const { allCourses, purchaseCourse } = useCourses();
  const { colors, fontScale } = useTheme();

  const course = allCourses.find((c) => c.id === courseId);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  const { loading: contextLoading } = useCourses();

  const parsePrice = (price: string | number | undefined) => {
    if (price === undefined || price === null) return 0;
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  };

  const originalPrice = course ? parsePrice(course.price) : 0;
  const discountAmount = appliedDiscount 
    ? (appliedDiscount.amount < 1 ? originalPrice * appliedDiscount.amount : appliedDiscount.amount)
    : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);
  
  const handleApplyCode = async () => {
    setCodeError(null);
    const code = referralCode.trim();
    
    if (!code) return;

    try {
        const discount = await PaymentService.validateReferralCode(code);
        setAppliedDiscount(discount);
    } catch (error: any) {
        setCodeError(error.message || "Invalid referral code");
        setAppliedDiscount(null);
    }
  };

  if (contextLoading && !course) {
    return (
      <ScreenContainer header={<ScreenHeader title="Checkout" />}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText style={{ marginTop: 10, color: colors.textSecondary }}>Loading course...</ThemedText>
        </View>
      </ScreenContainer>
    );
  }

  if (!course) {
    return (
      <ScreenContainer header={<ScreenHeader title="Checkout" />}>
        <View style={styles.centerContainer}>
          <ThemedText style={{ color: colors.text }}>Course not found</ThemedText>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 10 }}>
            <ThemedText style={{ color: colors.primary }}>Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
        await PaymentService.processPayment(courseId, selectedMethod, finalPrice);
        purchaseCourse(courseId);
        router.push({
            pathname: "/screens/payment-success",
            params: { courseId: course.id }
        });
    } catch (error) {
        // Handle error (could add an alert here later)
        console.error("Payment failed", error);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <ScreenContainer scrollable={false} header={<ScreenHeader title="Checkout" />}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Summary */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Order Summary</ThemedText>
          <View style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
             <View style={styles.courseInfo}>
               <ThemedText style={[styles.courseTitle, { color: colors.text }]} numberOfLines={2}>{course.title}</ThemedText>
               <ThemedText style={[styles.courseInstructor, { color: colors.textSecondary }]}>{course.instructor}</ThemedText>
             </View>
              <ThemedText style={[styles.coursePrice, { color: colors.primary }]}>${course.price}</ThemedText>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</ThemedText>
          <View style={styles.methodsList}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                style={[
                  styles.methodItem,
                  { 
                    backgroundColor: colors.card,
                    borderColor: selectedMethod === method.id ? colors.primary : colors.border
                  }
                ]}
              >
                <View style={styles.methodLeft}>
                  <Ionicons name={method.icon as any} size={24} color={selectedMethod === method.id ? colors.primary : colors.textSecondary} />
                  <ThemedText style={[styles.methodName, { color: colors.text }]}>{method.name}</ThemedText>
                </View>
                <View style={[
                  styles.radio, 
                  { borderColor: selectedMethod === method.id ? colors.primary : colors.border },
                  selectedMethod === method.id && { backgroundColor: colors.primary }
                ]}>
                  {selectedMethod === method.id && <View style={[styles.radioInner, { backgroundColor: colors.primaryContrast || "#FFFFFF" }]} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Referral Code */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Referral Code</ThemedText>
          <View style={styles.codeContainer}>
             <TextInput
               style={[
                 styles.codeInput,
                 { 
                   color: colors.text, 
                   borderColor: codeError ? (colors.error || '#ef4444') : (appliedDiscount ? (colors.success || '#10b981') : colors.border),
                   backgroundColor: colors.card,
                   borderWidth: 1
                 }
               ]}
               placeholder="Enter code (e.g. SAVE10)"
               placeholderTextColor={colors.textSecondary}
               value={referralCode}
               onChangeText={setReferralCode}
               editable={!appliedDiscount}
             />
             <TouchableOpacity 
               style={[
                 styles.applyButton, 
                 { 
                   backgroundColor: appliedDiscount ? colors.backgroundSecondary : colors.primary,
                   opacity: !referralCode && !appliedDiscount ? 0.6 : 1
                 }
               ]}
               onPress={appliedDiscount ? () => {
                 setAppliedDiscount(null);
                 setReferralCode("");
               } : handleApplyCode}
               disabled={!referralCode && !appliedDiscount}
             >
               <ThemedText style={[
                 styles.applyButtonText, 
                 { color: appliedDiscount ? colors.text : (colors.primaryContrast || "#FFFFFF") }
               ]}>
                 {appliedDiscount ? "Remove" : "Apply"}
               </ThemedText>
             </TouchableOpacity>
           </View>
           {codeError && (
             <ThemedText style={{ color: colors.error || '#ef4444', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
               {codeError}
             </ThemedText>
           )}
           {appliedDiscount && (
             <ThemedText style={{ color: colors.success || '#10b981', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
               Code applied! You saved ${discountAmount.toFixed(2)}
             </ThemedText>
           )}
        </View>

        {/* Total details */}
        <View style={[styles.totalSection, { borderTopColor: colors.border }]}>
           <View style={styles.totalRow}>
             <ThemedText style={{ color: colors.textSecondary }}>Subtotal</ThemedText>
             <ThemedText style={{ color: colors.text }}>${originalPrice.toFixed(2)}</ThemedText>
           </View>
           {appliedDiscount && (
             <View style={styles.totalRow}>
               <ThemedText style={{ color: colors.success || '#10b981' }}>Discount</ThemedText>
               <ThemedText style={{ color: colors.success || '#10b981' }}>-${discountAmount.toFixed(2)}</ThemedText>
             </View>
           )}
           <View style={styles.totalRow}>
             <ThemedText style={{ color: colors.textSecondary }}>Tax (0%)</ThemedText>
             <ThemedText style={{ color: colors.text }}>$0.00</ThemedText>
           </View>
           <View style={[styles.totalRow, styles.finalTotal]}>
             <ThemedText style={[styles.totalLabel, { color: colors.text }]}>Total Amount</ThemedText>
             <ThemedText style={[styles.totalValue, { color: colors.primary }]}>${finalPrice.toFixed(2)}</ThemedText>
           </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.payButton, { backgroundColor: isProcessing ? colors.textSecondary : colors.primary }]}
          onPress={handlePurchase}
          disabled={isProcessing}
        >
          <ThemedText style={[styles.payButtonText, { color: colors.primaryContrast || "#FFFFFF" }]}>
            {isProcessing ? 'Processing...' : `Pay $${finalPrice.toFixed(2)}`}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 15,
    paddingBottom: 120,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "bold",
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  methodsList: {
    gap: 12,
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  methodName: {
    fontSize: 15,
    fontWeight: "500",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  totalSection: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
  },
  payButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  codeInput: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  applyButton: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
