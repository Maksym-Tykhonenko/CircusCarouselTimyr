import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

type Props = {
  children: ReactNode;
  overlayColor?: string;
};

export const ScreenBackground = ({
  children,
  overlayColor = 'rgba(3, 19, 54, 0.75)',
}: Props) => {
  return (
    <ImageBackground
      source={require('../circusAssets/img/bg.png')}
      style={styles.background}>
      <View
        pointerEvents="none"
        style={[styles.overlay]}
      />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
});

