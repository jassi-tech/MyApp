import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ScreenContainer } from "@/components/common/screen-container";
import { ScreenHeader } from "@/components/common/screen-header";
import { ThemedText } from "@/components/themed-text";
import { useStudent } from "@/context/StudentContext";
import { useTheme } from "@/context/ThemeContext";

export default function NotesScreen() {
  const router = useRouter();
  const { colors, fontScale, isDark } = useTheme();
  const { notes } = useStudent();

  return (
    <ScreenContainer header={<ScreenHeader title="Free Notes" />}>
      {notes.length > 0 ? (
        notes.map((note) => (
          <TouchableOpacity 
            key={note.id} 
            style={[styles.noteCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#e0f2fe" }]}>
              <Ionicons name={note.format === 'PDF' ? "document-text-outline" : "document-outline" as any} size={28} color={isDark ? colors.text : "#0284c7"} />
            </View>
            <View style={styles.noteContent}>
              <ThemedText style={[styles.noteTitle, { color: colors.text, fontSize: 16 * fontScale }]}>{note.title}</ThemedText>
              <ThemedText style={[styles.noteSubject, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>{note.subject}</ThemedText>
              <View style={styles.metaRow}>
                 <ThemedText style={[styles.metaText, { color: colors.textSecondary }]}>{note.date}</ThemedText>
                 <ThemedText style={[styles.metaText, { color: colors.textSecondary }]}> • </ThemedText>
                 <ThemedText style={[styles.metaText, { color: colors.textSecondary }]}>{note.size}</ThemedText>
                 <ThemedText style={[styles.metaText, { color: colors.textSecondary }]}> • </ThemedText>
                 <ThemedText style={[styles.formatText, { color: "#0284c7" }]}>{note.format}</ThemedText>
              </View>
            </View>
            <Ionicons name="download-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={colors.border} />
            <ThemedText style={{ marginTop: 16, color: colors.textSecondary }}>No notes available yet.</ThemedText>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  noteSubject: {
    marginBottom: 6,
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  metaText: {
      fontSize: 12,
  },
  formatText: {
      fontSize: 12,
      fontWeight: '700',
  },
  emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 100,
  }
});
