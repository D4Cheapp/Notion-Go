import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from 'constants/theme';

void SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    light: require('./assets/fonts/Roboto-Light.ttf'),
    regular: require('./assets/fonts/Roboto-Regular.ttf'),
    bold: require('./assets/fonts/Roboto-Bold.ttf'),
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
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <View style={styles.header}>


        <Text
          style={{
            fontFamily: 'bold',
            color: Colors.seaSalt,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Notion Todo
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.raisinBlack,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderBottomColor: Colors.englishViolet,
    borderWidth: 2,
    borderStyle: 'solid',
  },
});

export default App;
