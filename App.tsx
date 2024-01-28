/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { registerRootComponent } from 'expo';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { ErrorContext, ErrorType } from 'components/ErrorsContainer/ErrorContext';
import ErrorFallback from 'components/ErrorsContainer';
import { Colors } from 'constants/theme';
import Layout from './src/layout';

void SplashScreen.preventAutoHideAsync();
registerRootComponent(App);

function App() {
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const [fontsLoaded] = useFonts({
    light: require('./src/assets/fonts/Roboto-Light.ttf'),
    regular: require('./src/assets/fonts/Roboto-Regular.ttf'),
    bold: require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  const exceptionHandler = (error: Error) => {
    const errorObject = { message: error.message, id: Date.now() };
    setErrors(errors ? [...errors, errorObject] : [errorObject]);
  };

  setJSExceptionHandler(exceptionHandler, true);

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
      <ErrorContext.Provider
        value={{
          errors,
          setErrors,
        }}
      >
        {errors.length !== 0 && <ErrorFallback errors={errors} setErrors={setErrors} />}
        <Layout />
      </ErrorContext.Provider>
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
