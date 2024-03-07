/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@notionhq/client';
import { TaskType } from 'src/types';
import { GetAllTasksActionType, GetClientInfoActionType, SetAllTasksActionType, SetClientInfoActionType } from './types';

interface SliceInterface {
  client: Client | null;
  database_id: string | null;
  tasks: TaskType[];
}

const apiSlice = createSlice({
  name: 'apiSlice',
  initialState: { client: null } as SliceInterface,
  reducers: {
    getAllTasks: (state, action: GetAllTasksActionType) => state,

    getAllTasksLocal: (state) => state,

    setAllTasks: (state, action: SetAllTasksActionType) => {
      state.tasks = action.payload;
    },

    getClientInfo: (state, action: SetClientInfoActionType) => {
      state.database_id = action.payload.database_id;
    },

    setClientInfo: (state, action: GetClientInfoActionType) => {
      state.client = action.payload;
    },
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;
