import { Client } from '@notionhq/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { TaskContentBlockType, TaskType } from 'src/types';

export type SetClientInfoActionType = PayloadAction<{
  auth_key: string | null;
  database_id: string | null;
}>;
export type GetClientInfoActionType = PayloadAction<Client | null>;
export type SetAllTasksActionType = PayloadAction<{
  tasks: TaskType[];
  completedTasks?: string[] | null;
}>;
export type GetSortedTasksActionType = PayloadAction<{
  sorts: Array<
    | {
        property: string;
        direction: 'ascending' | 'descending';
      }
    | {
        timestamp: 'created_time' | 'last_edited_time';
        direction: 'ascending' | 'descending';
      }
  >;
  client: Client | null;
  database_id: string;
  page_size?: number;
}>;
export type SetAllTasksPropertiesActionType = PayloadAction<TaskType['properties']>;
export type GetAllTasksActionType = PayloadAction<{
  client: Client | null;
  database_id: string;
  page_size?: number;
}>;
export type GetTaskContentActionType = PayloadAction<{
  client: Client | null;
  task_id: string;
}>;
export type SetTaskContentActionType = PayloadAction<TaskContentBlockType[] | null>;
export type SetTaskPropertyActionType = PayloadAction<{
  client: Client;
  index: number;
  task_id: string;
}>;
export type SetTaskPropertyLocalActionType = PayloadAction<{
  index: number;
  task_id: string;
  propertyName: string;
  changedProperty: TaskType['properties'];
}>;
export type SetTaskCompleteStatusActionType = PayloadAction<{
  task_id: string;
  checked: boolean;
}>;
export type DeleteTaskActionType = PayloadAction<{
  client: Client;
  index: number;
  task_id: string;
}>;
