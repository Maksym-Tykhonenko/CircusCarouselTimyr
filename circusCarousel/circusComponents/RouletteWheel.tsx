import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CircusButton } from './CircusButton';

type Props = {
  segments: string[];
  onResult?: (segment: string) => void;
  wheelImage?: ImageSourcePropType;
  label?: string;
};

export type RouletteWheelHandle = {
  spin: () => void;
};

const DEFAULT_LABEL = 'Spin the Wheel';

export const RouletteWheel = forwardRef<RouletteWheelHandle, Props>(
  (
    {
      segments,
      onResult,
      wheelImage = require('../circusAssets/img/round.png'),
      label = DEFAULT_LABEL,
    },
    ref,
  ) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const rotationValue = useRef(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentSegment, setCurrentSegment] = useState<string | null>(null);

    useEffect(() => {
      const id = rotation.addListener(({ value }) => {
        rotationValue.current = value;
      });
      return () => {
        rotation.removeListener(id);
      };
    }, [rotation]);

    const spinInternal = useCallback(() => {
      if (isSpinning || segments.length === 0) {
        return;
      }
      setIsSpinning(true);
      const randomIndex = Math.floor(Math.random() * segments.length);
      const extraTurns = 4 + Math.floor(Math.random() * 3);
      const segmentAngle = 360 / segments.length;
      const targetRotation =
        rotationValue.current +
        extraTurns * 360 +
        randomIndex * segmentAngle +
        segmentAngle / 2;

      Animated.timing(rotation, {
        toValue: targetRotation,
        duration: 3600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        const result = segments[randomIndex];
        setCurrentSegment(result);
        onResult?.(result);
        setIsSpinning(false);
      });
    }, [isSpinning, onResult, rotation, segments]);

    useImperativeHandle(
      ref,
      () => ({
        spin: spinInternal,
      }),
      [spinInternal],
    );

    const spinText =
      currentSegment && !isSpinning
        ? `Result: ${currentSegment}`
        : 'Tap spin to draw the next act';

    return (
      <View style={styles.container}>
        <View style={styles.wheelWrapper}>
          <Animated.Image
            source={wheelImage}
            style={[
              styles.wheel,
              {
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
            accessibilityLabel="Roulette wheel"
          />
          <View style={styles.pointer} />
        </View>
        <Text style={styles.statusLabel}>{spinText}</Text>
        <CircusButton
          label={isSpinning ? 'Spinning…' : label}
          onPress={spinInternal}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  wheelWrapper: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    width: '90%',
    height: '90%',
  },
  pointer: {
    position: 'absolute',
    top: '5%',
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FCCE45',
  },
  statusLabel: {
    color: '#C8E2FF',
    fontSize: 16,
    textAlign: 'center',
  },
});


