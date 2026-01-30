import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/button';
import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/theme';

export default function GetStarted() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/svg/SoftSkill.svg')}
            style={styles.image}
            contentFit="contain"
          />
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            Grow Your Soft Skill{'\n'}And{'\n'}Be More Creative
          </ThemedText>
        </View>

        {/* Button */}
        <Button
          label="Get Started"
          onPress={() => {
            // TODO: Future implementation - Redirect to Login page here before Home
            // For now, navigate directly to Home for progression
            router.push('/screens/Home');
          }}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Palette.deepPurple, // Deep Purple background
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
    color: Palette.white,
    textAlign: 'center',
    lineHeight: 34,
    // fontSize and fontWeight handled by ThemedText type="title", but keeping usage of style for color and specific tweaks if needed
  },
  button: {
    backgroundColor: Palette.white,
    width: '100%',
    maxWidth: 200,
    borderRadius: 8,
    // padding handled by Button component size
  },
  buttonText: {
    color: Palette.deepPurple, // Same as background
    fontSize: 18,
    fontWeight: 'bold',
  },
});
