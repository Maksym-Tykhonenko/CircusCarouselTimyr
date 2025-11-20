import React from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';

type SizeToken = 'small' | 'medium';

type Props = {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
  size?: SizeToken;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const sizeTokens: Record<
  SizeToken,
  {
    dimension: number;
    borderRadius: number;
  }
> = {
  small: {
    dimension: 42,
    borderRadius: 18,
  },
  medium: {
    dimension: 52,
    borderRadius: 22,
  },
};

export function CircusIconButton({
  label,
  onPress,
  accessibilityLabel,
  size = 'small',
  style,
  disabled = false,
}: Props) {
  const { dimension, borderRadius } = sizeTokens[size];

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      onPress={onPress}
      activeOpacity={0.85}
      style={style}>
      <ImageBackground
        source={require('../circusAssets/img/Group.png')}
        resizeMode="stretch"
        style={[
          styles.background,
          {
            width: dimension,
            height: dimension,
            borderRadius,
            opacity: disabled ? 0.6 : 1,
          },        
        ]}
        imageStyle={[styles.imageStyle, { borderRadius }]}>
        <Text style={styles.iconLabel}>{label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  imageStyle: {
    borderRadius: 22,
  },
});


