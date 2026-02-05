import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";

export default function AccountScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { colors, fontScale, isDark } = useTheme();
  const { user, updateProfile } = useUser();

  // Local state for editing
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
  });

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };
  
  const HeaderRight = () => (
    <TouchableOpacity
      style={[styles.editButton, { backgroundColor: colors.card }]}
      onPress={() => {
        if (isEditing) handleSave();
        else setIsEditing(true);
      }}
    >
      <Ionicons
        name={isEditing ? "checkmark" : "create-outline"}
        size={22}
        color={colors.primary}
      />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer
      header={<ScreenHeader title="Account" rightElement={<HeaderRight />} />}
    >
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.card, borderColor: colors.primary },
            ]}
          >
             {user?.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={{ width: 94, height: 94, borderRadius: 47 }} />
             ) : (
                <Ionicons name="person" size={48} color={colors.text} />
             )}
          </View>
          {isEditing && (
            <TouchableOpacity
              style={[
                styles.editAvatarButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <ThemedText
          style={[
            styles.userName,
            { color: colors.text, fontSize: 24 * fontScale },
          ]}
        >
          {user?.name || "John Doe"}
        </ThemedText>
        <ThemedText style={[styles.userRole, { color: colors.textSecondary }]}>
          {user?.role || "Student"}
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          PERSONAL INFORMATION
        </ThemedText>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <InfoField
            icon="person-outline"
            label="Full Name"
            value={isEditing ? formData.name : (user?.name || "John Doe")}
            editable={isEditing}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          />
          <InfoField
            icon="mail-outline"
            label="Email"
            value={isEditing ? formData.email : (user?.email || "john.doe@example.com")}
            editable={isEditing}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          />
          <InfoField
            icon="call-outline"
            label="Phone"
            value={isEditing ? formData.phone : (user?.phone || "+1 234 567 8900")}
            editable={isEditing}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
          />
          <InfoField
            icon="calendar-outline"
            label="Date of Birth"
            value={isEditing ? formData.dob : (user?.dob || "15 Jan 2005")}
            editable={isEditing}
            onChangeText={(text) => setFormData(prev => ({ ...prev, dob: text }))}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.sectionTitle, { color: colors.textSecondary }]}
        >
          ACADEMIC DETAILS
        </ThemedText>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
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
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="trophy-outline" size={28} color="#00bfff" />
          <ThemedText
            style={[
              styles.statValue,
              { color: colors.text, fontSize: 20 * fontScale },
            ]}
          >
            85%
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Attendance
          </ThemedText>
        </View>
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="star-outline" size={28} color="#f59e0b" />
          <ThemedText
            style={[
              styles.statValue,
              { color: colors.text, fontSize: 20 * fontScale },
            ]}
          >
            A+
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Grade
          </ThemedText>
        </View>
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="ribbon-outline" size={28} color="#8b5cf6" />
          <ThemedText
            style={[
              styles.statValue,
              { color: colors.text, fontSize: 20 * fontScale },
            ]}
          >
            12
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Achievements
          </ThemedText>
        </View>
      </View>
    </ScreenContainer>
  );
}

const InfoField = ({
  icon,
  label,
  value,
  editable,
  onChangeText,
}: {
  icon: any;
  label: string;
  value: string;
  editable: boolean;
  onChangeText?: (text: string) => void;
}) => {
  const { colors, fontScale } = useTheme();
  return (
    <View style={styles.infoField}>
      <View style={styles.infoHeader}>
        <Ionicons
          name={icon}
          size={18}
          color={colors.textSecondary}
          style={{ marginRight: 8 }}
        />
        <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
          {label}
        </ThemedText>
      </View>
      {editable ? (
        <TextInput
          style={[
            styles.infoInput,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.primary,
              fontSize: 16 * fontScale,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <ThemedText
          style={[
            styles.infoValue,
            { color: colors.text, fontSize: 16 * fontScale },
          ]}
        >
          {value}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
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
  },
  infoValue: {
    fontWeight: "500",
  },
  infoInput: {
    fontWeight: "500",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  statsSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
});
