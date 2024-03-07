/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { errorsSelector } from 'src/reduxjs/base/selectors';
import { styles } from './ErrorsContainerStyles';
import ErrorMessage from './ErrorMessage';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';

function ErrorsContainer() {
  const errors = useAppSelector(errorsSelector);
  const { closeError } = useActions();

  const onCloseClick = useCallback((index: number) => closeError(index), [errors]);

  return (
    <SafeAreaView style={styles.container}>
      {errors.map((error) => (
        <ErrorMessage key={error.id} error={error} onCloseClick={onCloseClick} />
      ))}
    </SafeAreaView>
  );
}

export default ErrorsContainer;
