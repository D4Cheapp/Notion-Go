/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './ErrorsContainerStyles';
import { ErrorType } from './ErrorContext';
import ErrorMessage from './ErrorMessage';

interface Props {
  errors: ErrorType[];
  setErrors: Dispatch<SetStateAction<ErrorType[]>>;
}

function ErrorsContainer({ errors, setErrors }: Props) {
  const onCloseClick = useCallback(
    (index: number) => {
      setErrors((errors) => errors.filter((error) => error.id !== index));
    },
    [errors],
  );

  return (
    <SafeAreaView style={styles.container}>
      {errors.map((error) => (
        <ErrorMessage key={error.id} error={error} onCloseClick={onCloseClick} />
      ))}
    </SafeAreaView>
  );
}

export default ErrorsContainer;
