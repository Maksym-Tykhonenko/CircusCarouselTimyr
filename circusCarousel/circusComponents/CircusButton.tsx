import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { buttonImageSource } from '../circusStyles/images';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

const palette: Record<
  ButtonVariant,
  {
    textColor: string;
    borderColor: string;
    overlayColor: string;
  }
> = {
  primary: {
    textColor: '#FFFFFF',
    borderColor: '#FCCE45',
    overlayColor: 'rgba(111, 44, 242, 0.5)',
  },
  secondary: {
    textColor: '#3E0544',
    borderColor: '#F14081',
    overlayColor: 'rgba(252, 206, 69, 0.6)',
  },
  ghost: {
    textColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    overlayColor: 'rgba(3, 19, 54, 0.4)',
  },
};

export function CircusButton({ label, onPress, variant = 'primary' }: Props) {
  const colors = palette[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonWrapper, { borderColor: colors.borderColor }]}
      activeOpacity={0.85}>
      <ImageBackground
        source={require('../circusAssets/img/btnBg.png')}
        resizeMode="stretch"
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}>
        {/* <View style={[styles.overlay, { backgroundColor: colors.overlayColor }]} /> */}
        <Text style={[styles.buttonLabel, { color: colors.textColor }]}>
          {label}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    // borderWidth: 2,
    // borderRadius: 28,
    overflow: 'hidden',
  },
  imageBackground: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 26,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 26,
  },
  buttonLabel: {
    fontSize: 16,
    // paddingHorizontal: 24,
    paddingVertical: 12,
    fontWeight: '700',
  },
});

