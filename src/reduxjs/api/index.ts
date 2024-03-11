/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@notionhq/client';
import { BlockType, TaskType } from 'src/types';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  GetClientInfoActionType,
  GetTaskContentActionType,
  SetAllTasksActionType,
  SetCheckStatusActionType,
  SetClientInfoActionType,
  SetTaskCheckStatusActionType,
  SetTaskContentActionType,
} from './types';

interface SliceInterface {
  client: Client | null;
  database_id: string | null;
  tasks: TaskType[];
  taskContent: BlockType[];
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

    getTaskContent: (state, action: GetTaskContentActionType) => state,

    setTaskContent: (state, action: SetTaskContentActionType) => {
      state.taskContent = action.payload;
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
