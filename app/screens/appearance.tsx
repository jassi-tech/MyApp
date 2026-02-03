import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { ScreenContainer } from '@/components/common/screen-container';
import { ThemedText } from '@/components/themed-text';
import { FontSizes } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export default function AppearanceScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, fontSize, setFontSize, colors, fontScale } = useTheme();
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleThemeChange = (mode: typeof themeMode) => {
    setThemeMode(mode);
    showToast(`Theme set to ${mode.charAt(0).toUpperCase() + mode.slice(1)}`);
  };

  const handleFontSizeChange = (size: typeof fontSize) => {
    setFontSize(size);
    showToast(`Font size set to ${size.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };

  return (
    <ScreenContainer>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <ThemedText type="subtitle" style={[styles.headerTitle, { color: colors.text }]}>Appearance</ThemedText>
        </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Theme Selection */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>THEME</ThemedText>
          <View style={styles.themeRow}>
            {(['dark', 'light', 'auto'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => handleThemeChange(mode)}
                style={[
                  styles.themeCard,
                  { 
                    backgroundColor: colors.card,
                    borderColor: themeMode === mode ? colors.primary : colors.border 
                  }
                ]}
              >
                <View style={styles.iconContainer}>
                    <Ionicons 
                    name={mode === 'dark' ? 'moon' : mode === 'light' ? 'sunny' : 'hardware-chip-outline'} 
                    size={24} 
                    color={themeMode === mode ? colors.primary : colors.icon} 
                    />
                    {themeMode === mode && (
                        <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                            <Ionicons name="checkmark" size={10} color="#fff" />
                        </View>
                    )}
                </View>
                <ThemedText style={[
                    styles.themeLabel, 
                    { color: themeMode === mode ? colors.text : colors.textSecondary }
                ]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Size Selection */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>FONT SIZE</ThemedText>
          <View style={[styles.cardContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {(Object.keys(FontSizes) as Array<keyof typeof FontSizes>).map((size, index, arr) => (
              <TouchableOpacity
                key={size}
                onPress={() => handleFontSizeChange(size)}
                style={[
                  styles.optionRow,
                  { borderBottomWidth: index === arr.length - 1 ? 0 : 1, borderBottomColor: colors.border }
                ]}
              >
                <ThemedText style={{ fontSize: 16 * FontSizes[size], color: colors.text }}>
                  {size.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </ThemedText>
                {fontSize === size && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accessibility Dummy */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCESSIBILITY</ThemedText>
          <View style={[styles.cardContainer, { backgroundColor: colors.card, borderColor: colors.border, padding: 16 }]}>
            <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="flash-off-outline" size={18} color={colors.textSecondary} style={{ marginRight: 8 }} />
                        <ThemedText style={{ color: colors.text, fontSize: 16 }}>Reduced Motion</ThemedText>
                    </View>
                    <ThemedText style={{ color: colors.textSecondary, fontSize: 13 }}>Minimize animations</ThemedText>
                </View>
                <Switch 
                    value={false} 
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={"#fff"}
                />
            </View>
          </View>
        </View>

        {/* Preview */}
        <View style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>PREVIEW</ThemedText>
            <View style={[styles.cardContainer, { backgroundColor: colors.card, borderColor: colors.border, padding: 16 }]}>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text, fontSize: 18 * fontScale, marginBottom: 8 }}>
                    Sample Text
                </ThemedText>
                <ThemedText style={{ color: colors.textSecondary, fontSize: 14 * fontScale }}>
                    This is how your text will appear with the current settings.
                </ThemedText>
            </View>
        </View>

      </ScrollView>

      {/* Toast Notification */}
      {toastMessage && (
        <View style={[styles.toast, { backgroundColor: colors.text }]}>
          <ThemedText style={[styles.toastText, { color: colors.background }]}>{toastMessage}</ThemedText>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 12,
        letterSpacing: 1,
    },
    themeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    themeCard: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    iconContainer: {
        marginBottom: 8,
        position: 'relative',
    },
    checkBadge: {
        position: 'absolute',
        top: -4,
        right: -8,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    themeLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    cardContainer: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toast: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    toastText: {
        fontSize: 14,
        fontWeight: '600',
    }
});
