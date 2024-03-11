import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '..';

const selector = (state: RootStateType) => state.api;
export const tasksSelector = createSelector(selector, (state) => state.tasks);
export const clientSelector = createSelector(selector, (state) => state.client);
export const databaseIdSelector = createSelector(selector, (state) => state.database_id);
export const taskContentSelector = createSelector(selector, (state) => state.taskContent);
