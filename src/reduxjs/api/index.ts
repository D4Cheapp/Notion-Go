/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@notionhq/client';
import { TaskType } from 'src/types';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  GetClientInfoActionType,
  SetAllTasksActionType,
  SetCheckStatusActionType,
  SetClientInfoActionType,
  SetTaskCheckStatusActionType,
} from './types';

interface SliceInterface {
  client: Client | null;
  database_id: string | null;
  tasks: TaskType[];
}

const apiSlice = createSlice({
  name: 'apiSlice',
  initialState: { client: null } as SliceInterface,
  reducers: {
    getAllTasksLocal: (state) => state,

    getAllTasks: (state, action: GetAllTasksActionType) => state,

    setAllTasks: (state, action: SetAllTasksActionType) => {
      state.tasks = action.payload;
    },

    deleteTask: (state, action: DeleteTaskActionType) => {
      const task = state.tasks;
      task.splice(action.payload.index, 1);
      state.tasks = task;
    },

    setCheckStatus: (state, action: SetCheckStatusActionType) => {},

    setTaskCheckStatus: (state, action: SetTaskCheckStatusActionType) => {
      state.tasks[action.payload.index].properties.Done.checkbox = action.payload.check;
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
