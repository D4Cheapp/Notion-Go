/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { errorsSelector } from 'src/reduxjs/base/selectors';
import { useActions, useAppSelector } from '@/hooks/reduxHooks';
import { styles } from './ErrorsContainerStyles';
import ErrorMessage from './ErrorMessage';

const ErrorsContainer = (): React.ReactNode => {
  const errors = useAppSelector(errorsSelector);
  const { closeError } = useActions();

  const handleCloseClick = useCallback((index: number) => closeError(index), [errors]);

  return (
    <SafeAreaView style={styles.container}>
      {errors.map((error) => (
        <ErrorMessage key={error.id} error={error} onCloseClick={handleCloseClick} />
      ))}
    </SafeAreaView>
  );
};

export default ErrorsContainer;
