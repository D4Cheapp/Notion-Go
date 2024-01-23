import React, { useEffect, useState } from 'react';
import { Client } from '@notionhq/client';
import { useErrorBoundary } from 'react-error-boundary';
import * as SecureStore from 'expo-secure-store';
import { Header, Todo } from './components';

export type todoViewType = 'calendar' | 'list';

function Layout() {
  const [taskView, setTaskView] = useState<todoViewType>('list');
  const [client, setClient] = useState<Client>();
  const [authData, setAuthData] = useState<{
    auth_key: string | null;
    database_id: string | null;
  }>();
  const { showBoundary } = useErrorBoundary();

  const getAuthData = async () => {
    const auth_key = await SecureStore.getItemAsync('auth_key');
    const database_id = await SecureStore.getItemAsync('database_id');
    setAuthData({ auth_key, database_id });
  };

  const getClient = () => {
    if (authData?.auth_key && authData?.database_id) {
      try {
        const client = new Client({
          auth: authData.auth_key,
        });
        setClient(client);
      } catch (error) {
        showBoundary(error);
      }
    }
  };

  const authAttempt = async () => {
    await getAuthData();
    getClient();
  };

  useEffect(() => {
    void authAttempt();
  }, []);

  return (
    <>
      <Header taskView={taskView} setTaskView={setTaskView} authAttempt={authAttempt} />
      <Todo client={client} database_id={authData?.database_id} todoView={taskView} />
    </>
  );
}

export default Layout;
