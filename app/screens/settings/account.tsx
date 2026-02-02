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

export default function AccountScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Palette.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Account</ThemedText>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Ionicons
            name={isEditing ? "checkmark" : "create-outline"}
            size={22}
            color="#00bfff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={Palette.white} />
            </View>
            {isEditing && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={18} color={Palette.white} />
              </TouchableOpacity>
            )}
          </View>
          <ThemedText style={styles.userName}>John Doe</ThemedText>
          <ThemedText style={styles.userRole}>Student</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            PERSONAL INFORMATION
          </ThemedText>
          <View style={styles.card}>
            <InfoField
              icon="person-outline"
              label="Full Name"
              value="John Doe"
              editable={isEditing}
            />
            <InfoField
              icon="mail-outline"
              label="Email"
              value="john.doe@example.com"
              editable={isEditing}
            />
            <InfoField
              icon="call-outline"
              label="Phone"
              value="+1 234 567 8900"
              editable={isEditing}
            />
            <InfoField
              icon="calendar-outline"
              label="Date of Birth"
              value="15 Jan 2005"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>ACADEMIC DETAILS</ThemedText>
          <View style={styles.card}>
            <InfoField
              icon="school-outline"
              label="Class"
              value="10th Grade"
              editable={false}
            />
            <InfoField
              icon="id-card-outline"
              label="Roll Number"
              value="2024-A-101"
              editable={false}
            />
            <InfoField
              icon="location-outline"
              label="Section"
              value="A"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={28} color="#00bfff" />
            <ThemedText style={styles.statValue}>85%</ThemedText>
            <ThemedText style={styles.statLabel}>Attendance</ThemedText>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star-outline" size={28} color="#f59e0b" />
            <ThemedText style={styles.statValue}>A+</ThemedText>
            <ThemedText style={styles.statLabel}>Grade</ThemedText>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="ribbon-outline" size={28} color="#8b5cf6" />
            <ThemedText style={styles.statValue}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Achievements</ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoField = ({
  icon,
  label,
  value,
  editable,
}: {
  icon: any;
  label: string;
  value: string;
  editable: boolean;
}) => (
  <View style={styles.infoField}>
    <View style={styles.infoHeader}>
      <Ionicons name={icon} size={18} color="#666" style={{ marginRight: 8 }} />
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
    </View>
    {editable ? (
      <TextInput style={styles.infoInput} value={value} />
    ) : (
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    )}
  </View>
);

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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#00bfff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00bfff",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Palette.white,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: "#888",
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
  card: {
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  infoField: {
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: "#888",
  },
  infoValue: {
    fontSize: 16,
    color: Palette.white,
    fontWeight: "500",
  },
  infoInput: {
    fontSize: 16,
    color: Palette.white,
    fontWeight: "500",
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00bfff",
  },
  statsSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Palette.darkGray,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Palette.white,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
  },
});
