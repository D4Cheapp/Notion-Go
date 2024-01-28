import { Dispatch, SetStateAction, createContext } from 'react';

export type ErrorType = { message: string; id: number };

export type ErrorContextType = {
  errors: ErrorType[];
  setErrors: Dispatch<SetStateAction<ErrorType[]>>;
};

//@ts-ignore
export const ErrorContext = createContext<ErrorContextType>({});
