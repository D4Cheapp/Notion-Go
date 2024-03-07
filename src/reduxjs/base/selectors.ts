import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '..';

const selector = (state: RootStateType) => state.base;
export const errorsSelector = createSelector(selector, (state) => state.errors);
export const taskViewSelector = createSelector(selector, (state) => state.taskView);
export const isLoadingSelector = createSelector(selector, (state) => state.isLoading);
