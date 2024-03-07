import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View, Image, Text, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { taskViewSelector } from 'src/reduxjs/base/selectors';
import { styles } from './HeaderStyles';
import ModalWindow from '@/components/ModalWindow';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';

function Header() {
  const [isOptionModalWindow, setOptionModalWindow] = useState(false);
  const [authKey, setAuthKey] = useState<string>();
  const [databaseId, setDatabaseId] = useState<string>();
  const { getClientInfo, setTaskView } = useActions();
  const taskView = useAppSelector(taskViewSelector);

  const onAuthKeyInput = (data: string) => setAuthKey(data);

  const onDatabaseIdInput = (data: string) => setDatabaseId(data);

  const onOptionClick = () => setOptionModalWindow(true);

  const onOptionSaveClick = useCallback(async () => {
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

  const onOptionCloseClick = useCallback(() => setOptionModalWindow(false), []);

  const onCalendarClick = () => setTaskView(taskView === 'calendar' ? 'list' : 'calendar');

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
      <Pressable onPress={onCalendarClick}>
        <Image
          style={styles.taskViewImage}
          source={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            taskView === 'calendar'
              ? require('../../assets/images/calendar.png')
              : require('../../assets/images/list.png')
          }
        />
      </Pressable>
      <Text style={styles.title}>Notion Todo</Text>
      <View>
        <ModalWindow
          title="Notion api"
          isWindowActive={isOptionModalWindow}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          action={onOptionSaveClick}
          closeAction={onOptionCloseClick}
        >
          <View style={styles.dataContentContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ключ интеграции notion</Text>
              <TextInput
                onChangeText={onAuthKeyInput}
                defaultValue={authKey}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ID базы данных</Text>
              <TextInput
                onChangeText={onDatabaseIdInput}
                defaultValue={databaseId}
                style={styles.input}
              />
            </View>
          </View>
        </ModalWindow>
        <Pressable onPress={onOptionClick}>
          <Image
            style={styles.settingsImage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require('../../assets/images/settings.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default Header;
