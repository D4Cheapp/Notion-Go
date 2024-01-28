import { ErrorContext } from 'components/ErrorsContainer/ErrorContext';
import { useContext } from 'react';

const useErrorMessage = (): ((error: string) => void) => {
  const { setErrors, errors } = useContext(ErrorContext);

  const setErrorsReturn = (error: string) => {
    const errorObject = { message: error, id: Date.now() };
    setErrors(errors.length > 0 ? [...errors, errorObject] : [errorObject]);
  };

  return setErrorsReturn;
};

export { useErrorMessage };
