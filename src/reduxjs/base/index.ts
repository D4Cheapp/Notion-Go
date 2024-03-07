import { createSlice } from '@reduxjs/toolkit';
import {
  CloseErrorActionType,
  ErrorMessageType,
  SetErrorActionType,
  SetIsLoadingActionType,
  SetTaskViewActionType,
} from './types';

interface SliceInterface {
  errors: ErrorMessageType[];
  taskView: 'calendar' | 'list';
  isLoading: boolean;
}

const baseSlice = createSlice({
  name: 'baseSlice',
  initialState: { errors: [], taskView: 'list', isLoading: false } as SliceInterface,
  reducers: {
    setError: (state, action: SetErrorActionType) => {
      const stateErrors = state.errors;
      const receivedErrors = { message: action.payload, id: Date.now() };
      state.errors = stateErrors ? [...stateErrors, receivedErrors] : [receivedErrors];
    },

    closeError: (state, action: CloseErrorActionType) => {
      state.errors = state.errors.filter((error) => error.id !== action.payload);
    },

    setTaskView: (state, action: SetTaskViewActionType) => {
      state.taskView = action.payload;
    },

    setIsLoading: (state, action: SetIsLoadingActionType) => {
      state.isLoading = action.payload;
    },
  },
});

export const baseActions = baseSlice.actions;
export default baseSlice.reducer;
