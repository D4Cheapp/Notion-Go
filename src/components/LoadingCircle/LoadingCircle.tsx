import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { styles } from './LoadingCircleStyles';

interface Props {
  trigger: boolean;
  size: number;
}

const LoadingCircle = ({ trigger, size }: Props): React.ReactNode => {
  const loadingAnimationRef = useRef(new Animated.Value(0)).current;
  const spin = loadingAnimationRef.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '720deg'],
  });

  useEffect(() => {
    if (trigger) {
      Animated.loop(
        Animated.timing(loadingAnimationRef, {
          toValue: 2,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [trigger]);

  return (
    <View style={styles.loadingContainer}>
      <Animated.View
        style={{
          ...styles.loadingCircle,
          ...{ width: size, height: size, borderWidth: size / 15 },
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

export default LoadingCircle;
