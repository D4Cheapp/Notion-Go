import React, { useEffect, useState } from 'react';
import { Client } from '@notionhq/client';
import * as SecureStore from 'expo-secure-store';
import Todo from 'components/Todo';
import Header from 'components/Header';

export type TodoViewType = 'calendar' | 'list';

function Layout() {
  const [taskView, setTaskView] = useState<TodoViewType>('list');
  const [client, setClient] = useState<Client>();
  const [authData, setAuthData] = useState<{
    auth_key: string | null;
    database_id: string | null;
  }>();

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

  useEffect(() => {
    void authAttempt();
  }, [authData?.auth_key, authData?.database_id]);

  return (
    <>
      <Header taskView={taskView} setTaskView={setTaskView} authAttempt={authAttempt} />
      <Todo client={client} database_id={authData?.database_id} todoView={taskView} />
    </>
  );
}

export default Layout;
