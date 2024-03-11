import { Client } from '@notionhq/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { BlockType, TaskType } from 'src/types';

export type SetClientInfoActionType = PayloadAction<{
  auth_key: string | null;
  database_id: string | null;
}>;
export type GetClientInfoActionType = PayloadAction<Client | null>;
export type SetAllTasksActionType = PayloadAction<TaskType[]>;
export type GetAllTasksActionType = PayloadAction<{
  client: Client | null;
  database_id: string;
  page_size?: number;
}>;
export type GetTaskContentActionType = PayloadAction<{
  client: Client | null;
  task_id: string;
}>;
export type SetTaskContentActionType = PayloadAction<BlockType[]>;
export type SetCheckStatusActionType = PayloadAction<{
  client: Client;
  task_id: string;
  checked: boolean;
}>;
export type SetTaskCheckStatusActionType = PayloadAction<{ index: number; check: boolean }>;
export type DeleteTaskActionType = PayloadAction<{
  client: Client;
  index: number;
  task_id: string;
}>;
