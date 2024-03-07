import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import ErrorsContainer from './components/ErrorsContainer';
import { errorsSelector } from './reduxjs/base/selectors';
import Todo from '@/components/Todo';
import Header from '@/components/Header';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';

function Layout() {
  const { getClientInfo, setError } = useActions();
  const errors = useAppSelector(errorsSelector);

  const exceptionHandler = (error: Error) => {
    setError(error.message);
  };

  setJSExceptionHandler(exceptionHandler, true);

  const getClientData = async () => {
    const auth_key = await SecureStore.getItemAsync('auth_key');
    const database_id = await SecureStore.getItemAsync('database_id');
    getClientInfo({ auth_key, database_id });
  };

  useEffect(() => {
    void getClientData();
  }, []);

  return (
    <>
      {errors.length !== 0 && <ErrorsContainer />}
      <Header />
      <Todo />
    </>
  );
}

export default Layout;
