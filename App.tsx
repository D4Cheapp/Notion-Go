/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Client } from '@notionhq/client';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import Header from 'components/Header';
import { Colors } from 'constants/theme';

void SplashScreen.preventAutoHideAsync();

function App() {
  const [taskView, setTaskView] = useState<'calendar' | 'list'>('list');
  const [client, setClient] = useState<Client>();
  const [authData, setAuthData] = useState<{
    auth_key: string | null;
    database_id: string | null;
  }>();

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

  const getAuthData = async () => {
    const auth_key = await SecureStore.getItemAsync('auth_key');
    const database_id = await SecureStore.getItemAsync('database_id');
    setAuthData({ auth_key, database_id });
  };

  const getClient = () => {
    if (authData?.auth_key && authData?.database_id) {
      const client = new Client({
        auth: authData.auth_key,
      });
      setClient(client);
    }
  };

  const authAttempt = async () => {
    await getAuthData();
    getClient();
  };

  useEffect(() => {
    void authAttempt();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <Header taskView={taskView} setTaskView={setTaskView} authAttempt={authAttempt} />
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
