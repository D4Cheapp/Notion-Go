import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View, Image, Text, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { taskViewSelector } from 'src/reduxjs/base/selectors';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';
import ModalWindow from '@/components/ModalWindow';
import { styles } from './HeaderStyles';

const Header = (): React.ReactNode => {
  const [isOptionModalWindow, setOptionModalWindow] = useState(false);
  const [authKey, setAuthKey] = useState<string>();
  const [databaseId, setDatabaseId] = useState<string>();
  const { getClientInfo, setTaskView } = useActions();
  const taskView = useAppSelector(taskViewSelector);

  const handleAuthKeyInput = (data: string) => setAuthKey(data);

  const handleDatabaseIdInput = (data: string) => setDatabaseId(data);

  const handleOptionClick = () => setOptionModalWindow(true);

  const handleOptionSaveClick = useCallback(async () => {
    if (authKey) {
      await SecureStore.setItemAsync('auth_key', authKey);
    }
    if (databaseId) {
      await SecureStore.setItemAsync('database_id', databaseId);
    }
    if (databaseId && authKey) {
      getClientInfo({ auth_key: authKey, database_id: databaseId });
    }
    setOptionModalWindow(false);
  }, [authKey, databaseId]);

  const handleOptionCloseClick = useCallback(() => setOptionModalWindow(false), []);

  const handleCalendarClick = () => setTaskView(taskView === 'calendar' ? 'list' : 'calendar');

  const loadAuthData = async () => {
    const databaseId = await SecureStore.getItemAsync('database_id');
    const authKey = await SecureStore.getItemAsync('auth_key');
    if (databaseId) {
      setDatabaseId(databaseId);
    }
    if (authKey) {
      setAuthKey(authKey);
    }
  };

  useEffect(() => void loadAuthData(), []);

  return (
    <View style={styles.header}>
      <Pressable onPress={handleCalendarClick}>
        <Image
          style={styles.taskViewImage}
          source={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            taskView === 'calendar'
              ? require('../../assets/images/darkTheme/globalIcons/calendar.webp')
              : require('../../assets/images/darkTheme/globalIcons/list.webp')
          }
        />
      </Pressable>
      <Text style={styles.title}>Notion Todo</Text>
      <View>
        <ModalWindow
          title="Notion api"
          isWindowActive={isOptionModalWindow}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          action={handleOptionSaveClick}
          closeAction={handleOptionCloseClick}
        >
          <View style={styles.dataContentContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Notion api key</Text>
              <TextInput
                onChangeText={handleAuthKeyInput}
                defaultValue={authKey}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Database id</Text>
              <TextInput
                onChangeText={handleDatabaseIdInput}
                defaultValue={databaseId}
                style={styles.input}
              />
            </View>
          </View>
        </ModalWindow>
        <Pressable onPress={handleOptionClick}>
          <Image
            style={styles.settingsImage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require('../../assets/images/darkTheme/globalIcons/settings.webp')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
