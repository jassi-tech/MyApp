import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/context/ThemeContext';

export default function GetStarted() {
  const router = useRouter();
  const { colors, fontScale } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/svg/SoftSkill.svg')}
            style={styles.image}
            contentFit="contain"
          />
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
            Grow Your Soft Skill{'\n'}And{'\n'}Be More Creative
          </ThemedText>
        </View>

        {/* Button */}
        <Button
          label="Get Started"
          onPress={() => {
            router.push('/screens/Home');
          }}
          style={[styles.button, { backgroundColor: colors.primary }]}
          textStyle={[styles.buttonText, { color: '#fff' }]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 90,
    paddingHorizontal: 15,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 250,
  },
  textContainer: {
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    lineHeight: 34,
  },
  button: {
    width: '100%',
    maxWidth: 200,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
