import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircusButton } from '../circusComponents/CircusButton';
import { ScreenBackground } from '../circusComponents/ScreenBackground';

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  onNext: () => void;
  onSkip: () => void;
  pathToImage: string;
};

export const OnboardingSlideScreen = ({
  title,
  description,
  buttonLabel,
  onNext,
  onSkip,
  pathToImage,
}: Props) => {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        {/* <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipLabel}>Skip</Text>
        </TouchableOpacity> */}
        <View style={styles.content}>
          <Image source={pathToImage} style={styles.hero} />
          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <CircusButton label={buttonLabel} onPress={onNext} />
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  skipButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
  },
  skipLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    // paddingHorizontal: 24,
    // paddingVertical: 48,
  },
  hero: {
    flex: 1,
    borderRadius: 24,
    // backgroundColor: '#07245D',
    // marginBottom: 24,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#051A45',
    borderRadius: 26,
    padding: 24,
    borderWidth: 2,
    borderColor: '#122C6B',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#E0F0FF',
    marginBottom: 24,
    lineHeight: 22,
  },
});

