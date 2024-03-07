/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from 'src/reduxjs';
import Layout from './src/layout';
import { Colors } from '@/constants/theme';

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
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <Provider store={store}>
          <Layout />
      </Provider>
    </SafeAreaView>
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
