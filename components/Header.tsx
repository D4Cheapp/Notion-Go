/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { StyleSheet, Pressable, View, Image, Text, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Colors } from 'constants/theme';
import ModalWindow from './ModalWindow';

interface HeaderInterface {
  authAttempt: () => Promise<void>;
  taskView: 'calendar' | 'list';
  setTaskView: Dispatch<SetStateAction<'calendar' | 'list'>>;
}

function Header({ taskView, setTaskView, authAttempt }: HeaderInterface) {
  const [isOptionModalWindow, setOptionModalWindow] = useState(false);
  const [authKey, setAuthKey] = useState<string>();
  const [databaseId, setDatabaseId] = useState<string>();

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

    await authAttempt();
    setOptionModalWindow(false);
  }, [authKey, databaseId]);

  const onOptionCloseClick = useCallback(() => setOptionModalWindow(false), []);

  const onCalendarClick = () =>
    setTaskView(taskView === 'calendar' ? 'list' : 'calendar');

  return (
    <View style={styles.header}>
      <Pressable onPress={onCalendarClick}>
        <Image
          style={{ height: 35, width: 35 }}
          source={
            taskView === 'calendar'
              ? require('../assets/images/calendar.png')
              : require('../assets/images/list.png')
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
              <TextInput onChangeText={onAuthKeyInput} style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ID базы данных</Text>
              <TextInput onChangeText={onDatabaseIdInput} style={styles.input} />
            </View>
          </View>
        </ModalWindow>
        <Pressable onPress={onOptionClick}>
          <Image
            style={{ height: 40, width: 40 }}
            source={require('../assets/images/settings.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderBottomColor: Colors.englishViolet,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  title: {
    fontFamily: 'bold',
    color: Colors.seaSalt,
    textAlign: 'center',
    fontSize: 30,
  },
  dataContentContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 15,
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
  },
  inputLabel: {
    color: Colors.seaSalt,
    fontSize: 20,
    textAlign: 'left',
  },
  input: {
    borderColor: Colors.seaSalt,
    borderWidth: 2,
    borderRadius: 5,
    color: Colors.seaSalt,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default Header;
