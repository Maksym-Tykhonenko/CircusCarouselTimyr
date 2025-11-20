import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircusButton } from '../circusComponents/CircusButton';
import { ScreenBackground } from '../circusComponents/ScreenBackground';

type Props = {
  onPlay: () => void;
  onOpenStories: () => void;
  onOpenSettings: () => void;
};

export const MainScreen = ({
  onPlay,
  onOpenStories,
  onOpenSettings,
}: Props) => {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../circusAssets/img/logo.png')}
            style={{ width: 300, height: 300 }}
          />
          <View style={styles.buttons}>
            <CircusButton label="Play" onPress={onPlay} />
            <CircusButton label="Circus Stories" onPress={onOpenStories} />
            <CircusButton label="Settings" onPress={onOpenSettings} />
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
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 48,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 60,
    letterSpacing: 2,
  },
  buttons: {
    width: '100%',
    gap: 18,
  },
});

