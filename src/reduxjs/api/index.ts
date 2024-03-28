/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@notionhq/client';
import { TaskContentBlockType, TaskType } from 'src/types';
import { SetTaskCompleteStatusActionType } from './types';
import {
  DeleteTaskActionType,
  GetAllTasksActionType,
  GetClientInfoActionType,
  GetSortedTasksActionType,
  GetTaskContentActionType,
  SetAllTasksActionType,
  SetAllTasksPropertiesActionType,
  SetClientInfoActionType,
  SetTaskContentActionType,
  SetTaskPropertyActionType,
  SetTaskPropertyLocalActionType,
} from './types';

interface SliceInterface {
  client: Client | null;
  databaseId: string | null;
  tasks: TaskType[];
  taskContent: TaskContentBlockType[] | null;
  completedTasks: string[];
  databaseProperties: TaskType['properties'] | null;
}

const apiSlice = createSlice({
  name: 'apiSlice',
  initialState: { client: null, completedTasks: [] } as unknown as SliceInterface,
  reducers: {
    getAllTasks: (state, action: GetAllTasksActionType) => state,

    getSortedTasks: (state, action: GetSortedTasksActionType) => state,

    setAllTasks: (state, action: SetAllTasksActionType) => {
      const { tasks, completedTasks } = action.payload;
      state.tasks = tasks;
      if (completedTasks) {
        state.completedTasks = completedTasks;
      }
    },

    getTaskContent: (state, action: GetTaskContentActionType) => state,

    setTaskContent: (state, action: SetTaskContentActionType) => {
      state.taskContent = action.payload;
    },

    setTaskProperty: (state, action: SetTaskPropertyActionType) => state,

    setTaskCompleteStatus: (state, action: SetTaskCompleteStatusActionType) => {
      const { task_id, checked } = action.payload;
      if (checked) {
        state.completedTasks.push(task_id);
      } else {
        state.completedTasks = state.completedTasks.filter((id) => id !== task_id);
      }
    },

    deleteTask: (state, action: DeleteTaskActionType) => {
      const { index, task_id } = action.payload;
      const isTaskComplete = state.completedTasks.includes(task_id);
      if (isTaskComplete) {
        state.completedTasks = state.completedTasks.filter((id) => id !== task_id);
      }
      state.tasks.splice(index, 1);
    },

    getClientInfo: (state, action: SetClientInfoActionType) => {
      state.databaseId = action.payload.database_id;
    },

    setClientInfo: (state, action: GetClientInfoActionType) => {
      state.client = action.payload;
    },
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;
