import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import apiReducer, { apiActions } from './api';
import baseReducer, { baseActions } from './base';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  api: apiReducer,
  base: baseReducer,
});

export const reducersActions = { ...apiActions, ...baseActions };
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
