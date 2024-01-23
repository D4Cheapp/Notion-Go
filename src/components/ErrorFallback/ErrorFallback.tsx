/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { styles } from './ErrorFallbackStyles';

interface ErrorFallbackInterface {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackInterface) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={[styles.text, styles.text]}>Ошибка: {error.message}</Text>

        <Pressable onPress={resetErrorBoundary}>
          <Image
            style={styles.closeButton}
            source={require('../../assets/images/cross.png')}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default ErrorFallback;
