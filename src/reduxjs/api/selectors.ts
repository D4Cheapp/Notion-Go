import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '..';

const selector = (state: RootStateType) => state.api;
export const tasksSelector = createSelector(selector, (state) => state.tasks);
export const clientSelector = createSelector(selector, (state) => state.client);
