/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorBoundary } from 'react-error-boundary';
import { registerRootComponent } from 'expo';
import { ErrorFallback } from 'components/ErrorFallback';
import { Colors } from 'constants/theme';
import Layout from './src/layout';

void SplashScreen.preventAutoHideAsync();
registerRootComponent(App);

function App() {
  const [fontsLoaded] = useFonts({
    light: require('./src/assets/fonts/Roboto-Light.ttf'),
    regular: require('./src/assets/fonts/Roboto-Regular.ttf'),
    bold: require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
        <Layout />
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.raisinBlack,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
